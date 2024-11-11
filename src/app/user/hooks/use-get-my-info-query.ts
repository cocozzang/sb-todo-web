"use client";

import { useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../../const";

const getMyInfoClient = async (userId: number) => {
  const res = await fetch(`${API_ENDPOINT}/user/${userId}`, {
    credentials: "include",
    method: "GET",
  });

  if (res.status === 401) {
    console.log(res.status, userId);
    throw new Error("401");
  }

  if (res.status === 403) throw new Error("403");

  if (!res.ok || res.status !== 200) throw new Error("500");

  const myInfo = await res.json();

  return myInfo;
};

const useGetMyInfoQuery = (userId: number) =>
  useQuery({
    queryKey: ["my-info"],
    queryFn: () => getMyInfoClient(userId),
  });

export { useGetMyInfoQuery };
