"use server";

import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../const";

export async function fetchRequest(
  path: string,
  withSessionCookie: boolean,
  jsonBody: boolean,
  init?: RequestInit,
): Promise<Response> {
  let fetchOption = { ...init };

  delete fetchOption.body;
  delete fetchOption.headers;

  let header = {};
  let body = init?.body;

  let sessionCookie = {
    Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
  };

  withSessionCookie &&
    Object.assign(header, { "Content-Type": "application/json" });
  withSessionCookie && Object.assign(header, sessionCookie);

  header = { ...header, ...init?.headers };

  if (init?.body && jsonBody) {
    body = JSON.stringify(body);
  }

  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + path, {
    headers: header,
    body,
    ...fetchOption,
  });

  return response;
}
