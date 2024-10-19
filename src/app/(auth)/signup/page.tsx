"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signupAction } from "./action";
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
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleSignup() {
    const result = await signupAction({ account, password, name });

    if (result.success) {
      router.push("/login");
    } else {
      setError(result.message); // 로그인 실패 시 에러 메시지 설정
    }
  }

  return (
    <main className="flex justify-center mt-10">
      <section className="flex flex-col gap-8">
        <h1 className="italic text-xl">Sign up</h1>
        <div className="flex flex-col gap-2 max-w-sm items-end">
          <InputWithIcon
            placeholder="account"
            value={account}
            onChange={(e) => setAccount(e.target.value)}
          />
          <InputWithIcon
            placeholder="nick name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <InputWithIcon
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button className="max-w-40" onClick={handleSignup} size={"lg"}>
            회원가입
          </Button>
          <Link href={"/login"}>
            <div className="underline text-xs font-bold italic text-slate-400">
              로그인하기
            </div>
          </Link>
          {error && <div>{error}</div>}
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
