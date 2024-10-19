"use server";

import { cookies } from "next/headers";
import { API_ENDPOINT, SESSION_COOKIE_NAME } from "../../const";

const todoDeleteAction = async (todoId: number) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/todo/${todoId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
      },
      credentials: "include",
    }).then((res) => res.json());
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false };
  }
};

export { todoDeleteAction };
