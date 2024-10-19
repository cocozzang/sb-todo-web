import { HomeIcon, Settings, UserIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "../ui";
import Link from "next/link";
import { NavbarInput } from "./navbar-input";
import { LogoutDropdownMenuItem } from "./logout-dropdown-menu-item";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../../const";
import { ThemeSwitchDropdownMenuItem } from "../theme-switch-dropdown-menu-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type UserInfo = {
  id: number;
  name: string;
  role: number;
  profile: string | null;
};

export const Navbar = () => {
  const sessionCookie = cookies().get(SESSION_COOKIE_NAME);
  const userInfoCookie = cookies().get("user.info");

  const userInfo: UserInfo | undefined = userInfoCookie?.value
    ? JSON.parse(userInfoCookie.value)
    : undefined;

  return (
    <header>
      <nav className="flex justify-center items-center gap-4">
        <Link href={"/"}>
          <HomeIcon className="text-zinc-500" />
        </Link>
        <NavbarInput />

        {/* TODO: login check하고 둘중 하나만 보이기 합시다 */}
        {sessionCookie ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                {userInfo?.profile && (
                  <AvatarImage src={`${userInfo?.profile}`} />
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
                  <span>계정 설정</span>
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
      </nav>
    </header>
  );
};
