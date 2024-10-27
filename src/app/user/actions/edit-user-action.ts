"use server";

import { cookies } from "next/headers";
import { API_ENDPOINT, SESSION_COOKIE_NAME } from "../../../const";

interface UserUpdatePayload {
  userId: number;
  name: string;
  password?: string;
  profileImage?: string | null;
}

interface UserUpdateRequestBody extends Omit<UserUpdatePayload, "userId"> {
  userId?: number;
}

const editUserAction = async (userUpdatePayload: UserUpdatePayload) => {
  let requestBody: UserUpdateRequestBody = { ...userUpdatePayload };

  delete requestBody["userId"];

  try {
    const response = await fetch(
      `${API_ENDPOINT}/user/${userUpdatePayload.userId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
        },
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify(requestBody),
      },
    );

    const responseBody = await response.json();

    if (response.status !== 200) {
      return {
        status: response.status,
        success: false,
        error: responseBody.error,
        message: responseBody.message,
      };
    }

    return {
      status: response.status,
      success: true,
      data: responseBody,
    };
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: "서버와의 연결실패, 잠시 후 다시 시도해주세요.",
    };
  }
};

export { editUserAction };
