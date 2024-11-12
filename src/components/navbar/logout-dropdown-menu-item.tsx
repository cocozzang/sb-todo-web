"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "../../app/(auth)/login/action";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

const LogoutDropdownMenuItem = () => {
  const route = useRouter();
  const queryClient = useQueryClient();

  const handleLogOut = async () => {
    try {
      const logOut = await logoutAction();

      if (logOut.success) {
        queryClient.clear();
        route.push("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenuItem onClick={handleLogOut}>
      <LogOut className="mr-2 h-4 w-4" />
      <span>로그아웃</span>
    </DropdownMenuItem>
  );
};

export { LogoutDropdownMenuItem };
