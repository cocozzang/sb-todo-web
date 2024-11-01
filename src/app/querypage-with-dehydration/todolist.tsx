"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { todoOptions } from "./todo-options";
import { TodoCard } from "./todo-card";
import { GetTodoListAction } from "../../actions/todo";

const TodoList = () => {
  const { data: todoList } = useSuspenseQuery({
    queryKey: ["todo-dehydration"],
    queryFn: GetTodoListAction,
  });

  return (
    <section className="pt-10 flex flex-col items-center">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
        {todoList.map((todo: any) => (
          <TodoCard {...todo} key={todo.id} />
        ))}
      </div>
    </section>
  );
};

export default TodoList;
