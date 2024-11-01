import TodoList from "./todolist";
import { TodoAddSectionQuerypage } from "./todo-add-section-querypage";

const Querypage = () => {
  return (
    <div>
      <div>query page</div>
      <TodoAddSectionQuerypage />
      <TodoList />
    </div>
  );
};

export default Querypage;
