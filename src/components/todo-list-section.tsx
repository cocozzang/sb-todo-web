import { GetTodoListAction } from "../actions/todo";
import { TodoCard } from "./todo-card";

const TodoListSection = async () => {
  const todoList = await GetTodoListAction();

  return (
    <section className="pt-10 flex flex-col items-center">
      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-3">
        {todoList &&
          todoList.map((todo: any) => <TodoCard {...todo} key={todo.id} />)}
      </div>
    </section>
  );
};

export { TodoListSection };
