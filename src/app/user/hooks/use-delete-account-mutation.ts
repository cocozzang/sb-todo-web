"use client";

import { QueryClient, useMutation } from "@tanstack/react-query";
import { API_ENDPOINT } from "../../../const";
import { toast } from "react-toastify";

const deleteAccountClient = async (userId: number) => {
  const res = await fetch(`${API_ENDPOINT}/user/${userId}`, {
    credentials: "include",
    method: "DELETE",
  });

  if (res.status === 401) {
    throw new Error("401");
  }

  if (res.status === 403) throw new Error("403");

  if (!res.ok || res.status !== 200) throw new Error("500");

  const myInfo = await res.json();

  return myInfo;
};

const useDeleteAccountMutation = (queryClient: QueryClient) =>
  useMutation({
    mutationFn: deleteAccountClient,
    onError: () => {
      toast.error("회원탈퇴에 실패하였습니다. 잠시후 다시시도해주세요", {
        position: "bottom-right",
      });
    },
    onSuccess: () => {
      toast.success("회원탈퇴 성공", {
        position: "bottom-right",
      });

      queryClient.clear();
    },
  });
export { useDeleteAccountMutation };
