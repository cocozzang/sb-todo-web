"use client";

import { SearchIcon } from "lucide-react";
import { InputWithIcon } from "../ui";
import { cn } from "../../lib/utils";

const NavbarInput = () => {
  return (
    <div className="flex gap-1 items-center">
      {/* <Input placeholder="todo 검색해보셈" /> */}
      <InputWithIcon
        className={cn("dark:bg-zinc-200")}
        startIcon={SearchIcon}
        placeholder="todo 검색 ㄱ"
      />
    </div>
  );
};

export { NavbarInput };
