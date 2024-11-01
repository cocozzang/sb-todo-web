import { queryOptions } from "@tanstack/react-query";
import { GetTodoListAction } from "../../actions/todo";
import { API_ENDPOINT } from "../../const";

export const todoOptions = queryOptions({
  queryKey: ["todo-dehydration"],
  queryFn: GetTodoListAction,
});

export const todoDeleteMutation = async (todoId: number) => {
  const res = await fetch(`${API_ENDPOINT}/todo/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
    },
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Something went wrong.");
  }

  const body = await res.json();

  console.log("hi coco");

  console.log(body);

  setTimeout(() => {
    console.log("3초 대기");
    return body;
  }, 3000);
};
