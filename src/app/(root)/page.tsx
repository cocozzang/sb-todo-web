import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE_NAME } from "../../const";
import { TodoAddSection, TodoListSection } from "../../components";

export default async function Home() {
  const isCookie = cookies().get(SESSION_COOKIE_NAME) ? true : false; // 서버로부터 쿠키 확인

  if (!isCookie) {
    redirect("/login");
  }

  return (
    <main>
      <TodoAddSection />
      <TodoListSection />
    </main>
  );
}
