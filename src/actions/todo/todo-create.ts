"use server";

import { cookies } from "next/headers";
import { API_ENDPOINT, SESSION_COOKIE_NAME } from "../../const";

const todoCreateAction = async ({
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
      Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
    },
    credentials: "include",
    body: JSON.stringify({ title, description, startDate, endDate }),
  });

  return { success: true };
};

export { todoCreateAction };
