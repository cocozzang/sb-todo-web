import { NavbarInput } from "./navbar-input";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { AccountMenu } from "./account-menu";

export const Navbar = () => {
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
