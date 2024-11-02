"use client";

import { useCookies } from "react-cookie";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage, Button } from "../ui";
import Link from "next/link";
import { BookText, Settings, UserIcon } from "lucide-react";
import { LogoutDropdownMenuItem } from "./logout-dropdown-menu-item";
import { ThemeSwitchDropdownMenuItem } from "../theme-switch-dropdown-menu-item";
import { useEffect, useState } from "react";

const AccountMenu = () => {
  const [cookie] = useCookies<any>(["user.info"]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && cookie["user.info"]?.id ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar>
              {cookie.userInfo?.profile && (
                <AvatarImage src={`${cookie.userInfo?.profile}`} />
              )}
              <AvatarFallback>
                <UserIcon className="text-zinc-400" />
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <Link href={"/user"}>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <div>계정 설정</div>
              </DropdownMenuItem>
            </Link>
            <Link href={"/querypage-with-dehydration"}>
              <DropdownMenuItem>
                <BookText className="mr-2 h-4 w-4" />
                <div>dehydration</div>
              </DropdownMenuItem>
            </Link>
            <Link href={"/querypage"}>
              <DropdownMenuItem>
                <BookText className="mr-2 h-4 w-4" />
                <div>react query</div>
              </DropdownMenuItem>
            </Link>
            <ThemeSwitchDropdownMenuItem />
            <LogoutDropdownMenuItem />
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <div className="flex gap-4">
          <Link href={"/login"}>
            <Button size={"sm"}>로그인</Button>
          </Link>

          <Link href={"/signup"}>
            <Button variant={"secondary"} size={"sm"}>
              회원가입
            </Button>
          </Link>
        </div>
      )}
    </>
  );
};

export { AccountMenu };
