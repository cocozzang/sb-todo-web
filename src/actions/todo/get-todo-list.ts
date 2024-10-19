"use server";

import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import { API_ENDPOINT, SESSION_COOKIE_NAME } from "../../const";

// redirect는 try catch문 내에서 사용못함
// https://github.com/vercel/next.js/issues/55586#issuecomment-1869024539
export async function GetTodoListAction() {
  const res = await fetch(`${API_ENDPOINT}/todo`, {
    headers: {
      Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
    },
    method: "GET",
  });

  if (res.status === 401) redirect("/login", RedirectType.push);

  if (!res.ok || res.status !== 200)
    return { message: "서버측 오류로 인한 데이터 페칭 실패" };

  const myTodoList = await res.json();

  return myTodoList;
}
