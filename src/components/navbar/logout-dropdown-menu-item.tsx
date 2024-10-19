"use client";

import { useRouter } from "next/navigation";
import { logoutAction } from "../../app/(auth)/login/action";
import { DropdownMenuItem } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";

const LogoutDropdownMenuItem = () => {
  const route = useRouter();

  const handleLogOut = async () => {
    try {
      const logOut = await logoutAction();

      if (logOut.success) {
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
