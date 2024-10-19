"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { API_ENDPOINT, SESSION_COOKIE_NAME } from "../../const";

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

const todoUpdateAction = async (todoUpdatePayload: TodoUpdatePayload) => {
  let body: TodoUpdateBody = { ...todoUpdatePayload };

  delete body["todoId"];

  try {
    const res = await fetch(
      `${API_ENDPOINT}/todo/${todoUpdatePayload.todoId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
        },
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(body),
      },
    );

    if (res.status === 401) throw new Error("로그인이 필요합니다.");

    const responseBody = await res.json();

    return responseBody;
  } catch (error) {
    return {};
  }
};

export { todoUpdateAction };
