import { cookies } from "next/headers";
import { API_ENDPOINT, SESSION_COOKIE_NAME } from "../../../const";

interface UserUpdatePayload {
  userId: number;
  name: string;
  password: string;
  profileImage: string | null;
}

interface UserUpdateBody extends Omit<UserUpdatePayload, "userId"> {
  userId?: number;
}

const deleteUserAction = async (userUpdatePayload: UserUpdatePayload) => {
  let body: UserUpdateBody = { ...userUpdatePayload };

  delete body["userId"];

  try {
    const res = await fetch(
      `${API_ENDPOINT}/user/${userUpdatePayload.userId}`,
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

    const myTodoList = await res.json();

    return myTodoList;
  } catch (error) {
    return {};
  }
};

export { deleteUserAction };
