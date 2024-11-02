import { NavbarInput } from "./navbar-input";
import { cookies } from "next/headers";
import { SESSION_COOKIE_NAME } from "../../const";
import { ThemeSwitchDropdownMenuItem } from "../theme-switch-dropdown-menu-item";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage, Button } from "../ui";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogoutDropdownMenuItem } from "./logout-dropdown-menu-item";
import { BookText, HomeIcon, Settings, UserIcon } from "lucide-react";
import { AccountMenu } from "./account-menu";

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

        <AccountMenu />
      </nav>
    </header>
  );
};
