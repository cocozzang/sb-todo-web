"use client";

import { useQuery } from "@tanstack/react-query";
import { TodoCard } from "./todo-card";
import { API_ENDPOINT } from "../../const";
import { useRouter } from "next/navigation";

async function GetTodoListClient() {
  const res = await fetch(`${API_ENDPOINT}/todo`, {
    credentials: "include",
    method: "GET",
  });

  if (res.status === 401) throw new Error("401");

  if (!res.ok || res.status !== 200) throw new Error("500");

  const myTodoList = await res.json();

  return myTodoList;
}

const TodoList = () => {
  const router = useRouter();
  const { data: todoList, error } = useQuery({
    queryKey: ["todo-client"],
    queryFn: GetTodoListClient,
  });

  if (error?.message.includes("401")) router.push("/login");

  if (error?.message.includes("500")) {
    return (
      <section className="pt-10 flex flex-col items-center">
        <p className="text-red-500">
          서버와의 연결실패 잠시 후 재시도 해주세요.
        </p>
      </section>
    );
  }

  return (
    <section className="pt-10 flex flex-col items-center">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
        {todoList?.map((todo: any) => <TodoCard {...todo} key={todo.id} />)}
      </div>
    </section>
  );
};

export default TodoList;
