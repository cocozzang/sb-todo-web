"use client";

import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../../const";
import { toast } from "react-toastify";

interface UpdateMyInfoPayload {
  userId: number;
  name?: string;
  password?: string;
}

interface UpdateMyInfoBody extends Omit<UpdateMyInfoPayload, "userId"> {
  userId?: number;
}

const updateMyInfoClient = async (updateMyInfoPayload: UpdateMyInfoPayload) => {
  let body: UpdateMyInfoBody = { ...updateMyInfoPayload };

  delete body["userId"];

  const res = await fetch(
    `${API_ENDPOINT}/user/${updateMyInfoPayload.userId}`,
    {
      credentials: "include",
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...body }),
    },
  );

  if (res.status === 401) throw new Error("401");

  if (res.status === 403) throw new Error("403");

  if (!res.ok || res.status !== 200) throw new Error("500");

  const myTodoList = await res.json();

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return myTodoList;
};

const useUpdateMyInfoMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: updateMyInfoClient,
    onMutate: async (updateMyInfoPayload) => {
      await queryClient.cancelQueries({ queryKey: ["my-info"] });

      const previousMyInfo = queryClient.getQueryData(["my-info"]);

      queryClient.setQueryData(["my-info"], (oldData: any) => ({
        ...oldData,
        ...updateMyInfoPayload,
      }));

      return { previousMyInfo };
    },
    onError: (_, __, context: any) => {
      if (context?.previousMyInfo) {
        queryClient.setQueryData(["my-info"], context.previousMyInfo);
      }

      toast.error("계정정보 변경에 실패하였습니다.", {
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      toast.success("계정정보 변경이 완료되었습니다.", {
        position: "bottom-right",
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["my-info"] }),
  });

export { useUpdateMyInfoMutation };
