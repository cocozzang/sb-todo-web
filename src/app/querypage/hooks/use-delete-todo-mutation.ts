import { QueryClient, useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../../const";

const todoDeleteMutation = async (todoId: number) => {
  const res = await fetch(`${API_ENDPOINT}/todo/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Something went wrong.");
  }

  return await res.json();
};

const useDeleteTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async (todoId: number) => await todoDeleteMutation(todoId),
    onMutate: async (todoId: number) => {
      await queryClient.cancelQueries({ queryKey: ["todo-client"] });

      const previousTodoList = queryClient.getQueryData(["todo-client"]);

      console.log(previousTodoList);

      queryClient.setQueryData(["todo-client"], (oldTodos: any) =>
        oldTodos?.filter((todo: any) => todo.id !== todoId),
      );

      return { previousTodoList };
    },
    onError: (error, todoId, context: any) => {
      if (context?.previousTodoList) {
        queryClient.setQueryData(["todo-client"], context.previousTodoList);
      }
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["todo-client"] }),
  });

export { useDeleteTodoMutation };
