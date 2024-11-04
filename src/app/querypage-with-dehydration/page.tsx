import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "../(root)/get-query-client";
import TodoList from "./todolist";
import { todoOptions } from "./todo-options";
import { TodoAddSectionDehydration } from "./todo-add-section-dehydration";
import { GetTodoListAction } from "../../actions/todo";

const QuerypageWithDehydrationPage = () => {
  // const queryClient = getQueryClient();
  //
  // void queryClient.prefetchQuery({
  //   queryKey: ["todo-dehydration"],
  //   queryFn: GetTodoListAction,
  // });

  return (
    <div>
      <div>query page</div>
      <TodoAddSectionDehydration />
      {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
      {/*   <TodoList /> */}
      {/* </HydrationBoundary> */}
    </div>
  );
};

export default QuerypageWithDehydrationPage;
