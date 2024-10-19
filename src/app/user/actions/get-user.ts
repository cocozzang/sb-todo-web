"use server";

import { cookies } from "next/headers";
import {
  API_ENDPOINT,
  SESSION_COOKIE_NAME,
  USER_INFO_COOKIE_NAME,
} from "../../../const";

const getUser = async (): Promise<ActionResponse<User>> => {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  const userCookie = cookies().get(USER_INFO_COOKIE_NAME);

  const userId = userCookie && JSON.parse(userCookie.value).id;

  try {
    const response = await fetch(API_ENDPOINT + `/user/${userId}`, {
      method: "GET",
      headers: {
        Cookie: `${sessionCookie?.name}=${sessionCookie?.value}`,
      },
    });

    const body = await response.json();

    if (response.status !== 200) {
      return {
        status: body.statusCode,
        success: false,
        error: body.error,
        message: body.message,
      };
    }

    return {
      status: response.status,
      success: true,
      data: body,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      success: false,
      message: "서버와의 연결실패, 잠시 후 다시 시도해주세요.",
    };
  }
};

export { getUser };
