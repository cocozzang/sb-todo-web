import { QueryClient, useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../../const";

interface TodoUpdatePayload {
  todoId: number;
  title?: string;
  description?: string;
  status?: number;
  startDate?: Date;
  endDate?: Date;
}

interface TodoUpdateBody extends Omit<TodoUpdatePayload, "todoId"> {
  todoId?: number;
}

const updateTodoClientRequest = async (
  todoUpdatePayload: TodoUpdatePayload,
) => {
  let body: TodoUpdateBody = { ...todoUpdatePayload };

  delete body["todoId"];

  const res = await fetch(`${API_ENDPOINT}/todo/${todoUpdatePayload.todoId}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PATCH",
    credentials: "include",
    body: JSON.stringify(body),
  });

  const responseBody = await res.json();

  return responseBody;
};

const useUpdateTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: updateTodoClientRequest,
    onMutate: async (todoUpdatePayload) => {
      await queryClient.cancelQueries({ queryKey: ["todo-client"] });

      const previousTodoList = queryClient.getQueryData(["todo-client"]);

      queryClient.setQueryData(["todo-client"], (oldTodos: any[]) => {
        if (!oldTodos) return [];

        return oldTodos.map((todo) =>
          todo.id === todoUpdatePayload.todoId
            ? { ...todo, ...todoUpdatePayload }
            : todo,
        );
      });

      return { previousTodoList };
    },
    onError: (error, variables, context: any) => {
      if (context?.previousTodoList) {
        queryClient.setQueryData(["todo-client"], context.previousTodoList);
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["todo-client"] }),
  });

export { useUpdateTodoMutation };
