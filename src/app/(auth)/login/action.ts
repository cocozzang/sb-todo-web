"use server";

import { cookies } from "next/headers";
import * as cookieParser from "set-cookie-parser";
import {
  API_ENDPOINT,
  SESSION_COOKIE_NAME,
  USER_INFO_COOKIE_NAME,
} from "../../../const";

export async function loginAction({
  account,
  password,
}: {
  account: string;
  password: string;
}) {
  try {
    const response = await fetch(API_ENDPOINT + "/auth/login/credential", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ account, password }),
    });

    if (response.status === 401) {
      return { success: false, message: "잘못된 아이디 또는 비밀번호입니다." };
    }

    if (response.status !== 201 && response.status !== 401) {
      throw new Error();
    }

    const setCookies = response.headers.getSetCookie();

    const cookieList = setCookies
      .map((cookieHeader) => {
        return cookieParser.parse(cookieHeader);
      })
      .flat(1);

    const userCookie = cookieList[0];
    const sessionCookie = cookieList[1];

    const sameSiteValue =
      sessionCookie.sameSite === "lax" ||
      sessionCookie.sameSite === "strict" ||
      sessionCookie.sameSite === "none"
        ? sessionCookie.sameSite
        : undefined;

    cookies().set(userCookie.name, userCookie.value, {
      secure: userCookie.secure,
      maxAge: userCookie.maxAge,
      expires: userCookie.expires,
      httpOnly: userCookie.httpOnly,
    });

    cookies().set(sessionCookie.name, sessionCookie.value, {
      secure: sessionCookie.secure,
      maxAge: sessionCookie.maxAge,
      expires: sessionCookie.expires,
      httpOnly: sessionCookie.httpOnly,
      sameSite: sameSiteValue,
    });

    return { success: true, message: "Login success" };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "서버와의 연결실패, 잠시 후 다시 시도해주세요.",
    };
  }
}

export async function logoutAction() {
  const response = await fetch(API_ENDPOINT + "/auth/logout", {
    headers: {
      Cookie: `${SESSION_COOKIE_NAME}=${cookies().get(SESSION_COOKIE_NAME)?.value}`,
    },
    method: "POST",
  });

  if (response.status !== 201) return { success: false };

  const authCookieList = [SESSION_COOKIE_NAME, USER_INFO_COOKIE_NAME];

  authCookieList.forEach((cookie) => {
    cookies().delete(cookie);
  });

  return { success: true };
}
