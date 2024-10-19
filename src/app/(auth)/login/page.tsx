"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginAction } from "./action";
import { Button, InputWithIcon } from "../../../components/ui";
import { cn } from "../../../lib/utils";
import Image from "next/image";

const handleLoginWithGoogle = () => {
  window.location.href = "http://localhost:3000/auth/login/google";
};

const LoginPage = () => {
  const router = useRouter();

  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleLoginWithCredential() {
    const result = await loginAction({ account, password });
    if (result.success) {
      router.push("/");
    } else {
      setError(result.message);
    }
  }

  return (
    <main className="flex justify-center mt-10">
      <section className="flex flex-col gap-8">
        <h1 className="italic text-xl">Login</h1>
        <div className="flex flex-col gap-2 max-w-sm items-end">
          <InputWithIcon
            placeholder="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <InputWithIcon
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button
            className="max-w-40"
            onClick={handleLoginWithCredential}
            size={"lg"}
          >
            Login
          </Button>
          <Link href={"/signup"}>
            <div className="underline text-xs font-bold italic text-slate-400">
              회원가입하기
            </div>
          </Link>
        </div>

        <div className="flex flex-col gap-2">
          <Button
            className={cn(
              "flex items-center justify-center space-x-2 px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-md shadow-sm hover:bg-gray-100 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-300",
            )}
            onClick={handleLoginWithGoogle}
          >
            <Image src="/google-icon.svg" alt="google" width={24} height={24} />
            <span>continue with google</span>
          </Button>
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
