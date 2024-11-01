import { QueryClient, useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../../const";

const addTodoClientRequest = async ({
  title,
  description,
  startDate,
  endDate,
}: {
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
}) => {
  const res = await fetch(`${API_ENDPOINT}/todo`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ title, description, startDate, endDate }),
  });

  return await res.json();
};

const useAddTodoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: async ({
      title,
      description,
      startDate,
      endDate,
    }: {
      title: string;
      description: string;
      startDate: Date | null;
      endDate: Date | null;
      status?: number;
    }) =>
      await addTodoClientRequest({
        title,
        description,
        startDate,
        endDate,
      }),
    onMutate: ({ title, description, startDate, endDate }) => {
      queryClient.cancelQueries({ queryKey: ["todo-client"] });

      const previousTodoList = queryClient.getQueryData(["todo-client"]);

      queryClient.setQueryData(["todo-client"], (oldTodos: any) => [
        { title, description, startDate, endDate, status: 1 },
        ...oldTodos,
      ]);

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

export { useAddTodoMutation };
