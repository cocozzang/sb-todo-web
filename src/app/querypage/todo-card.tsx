"use client";

import { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import {
  CalendarIcon,
  CheckIcon,
  EditIcon,
  Trash2Icon,
  XIcon,
} from "lucide-react";
import {
  Button,
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui";
import { cn } from "../../lib/utils";
import { Checkbox } from "../../components/ui/checkbox";
import { ko } from "date-fns/locale";
import { useQueryClient } from "@tanstack/react-query";
import { useUpdateTodoMutation } from "./hooks/use-update-todo-mutation";
import { useDeleteTodoMutation } from "./hooks/use-delete-todo-mutation";

const TodoCard = (todo: any) => {
  const queryClient = useQueryClient();

  const [isDone, setIsDone] = useState(todo.status === 1 ? false : true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const [todoTitleDesc, setTodoTitleDesc] = useState({
    title: todo.title,
    description: todo.description,
  });

  const [isEditDate, setIsEditDate] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >({
    from: todo.startDate,
    to: todo.endDate,
  });

  // // https://nextjs.org/docs/messages/react-hydration-error#solution-1-using-useeffect-to-run-on-the-client-only
  // const [isClient, setIsClient] = useState(false);
  //
  // useEffect(() => {
  //   setIsClient(true);
  // }, []);

  useEffect(() => {
    if (showDeleteConfirm) {
      setIsAnimating(true);
    }
  }, [showDeleteConfirm]);

  const { mutate: updateTodoMutate } = useUpdateTodoMutation(queryClient);
  const { mutate: deleteTodo } = useDeleteTodoMutation(queryClient);

  const handleCheckedChange = () => {
    let todoStatus;

    setIsDone((prev) => {
      todoStatus = !prev;

      return todoStatus;
    });

    // todoUpdateAction({ todoId: todo.id, status: todoStatus ? 2 : 1 });
    updateTodoMutate({ todoId: todo.id, status: todoStatus ? 2 : 1 });
  };

  const handleEditClick = () => {
    setEdit(true);
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTodoTitleDesc((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditCancle = () => {
    setEdit(false);
    setTodoTitleDesc({ title: todo.title, description: todo.description });
  };

  const handleEditConfirm = async () => {
    // TODO: server action todo update 구현
    updateTodoMutate({ todoId: todo.id, ...todoTitleDesc });
    setEdit(false);
  };

  const handleCalendarOpenClose = (open: boolean) => {
    setIsEditDate(open);

    if (!open) {
      updateTodoMutate({
        todoId: todo.id,
        startDate: selectedDateRange?.from,
        endDate: selectedDateRange?.to,
      });
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirm(true);
  };

  const handleDeleteCancel = () => {
    setIsAnimating(false);
    setTimeout(() => setShowDeleteConfirm(false), 300);
  };

  return (
    <div>
      <div className="dark:bg-gray-800  rounded flex flex-col gap-2 w-56 shadow-slate-400 shadow p-2 overflow-hidden">
        <div className="flex justify-between my-1 relative ">
          <EditIcon
            size={"20"}
            className="cursor-pointer hover:scale-105"
            onClick={handleEditClick}
          />
          {!showDeleteConfirm && (
            <Trash2Icon
              size={20}
              className="text-red-500 cursor-pointer hover:scale-105"
              onClick={handleDeleteClick}
            />
          )}

          <div
            className={`flex justify-end gap-2 transition-all absolute right-[-50px] duration-300 ease-in-out opacity-0 ${
              isAnimating
                ? "right-[0px] opacity-100"
                : "translate-x-[50px] opacity-0"
            }`}
          >
            <CheckIcon
              size={16}
              className="cursor-pointer hover:scale-110"
              // onClick={handleDeleteConfirm}
              onClick={() => deleteTodo(todo.id)}
            />
            <XIcon
              size={16}
              className="cursor-pointer hover:scale-110"
              onClick={handleDeleteCancel}
            />
          </div>
        </div>

        {isEdit ? (
          <div className="flex flex-col gap-2">
            <Input
              name="title"
              value={todoTitleDesc.title}
              className={cn(
                "p-0.5 bg-white dark:bg-gray-200 text-black dark:text-black",
              )}
              onChange={handleEditChange}
            />
            <Input
              name="description"
              value={todoTitleDesc.description}
              className={cn(
                "p-0.5 bg-white dark:bg-gray-200 text-black dark:text-black",
              )}
              onChange={handleEditChange}
            />
            <div className="flex gap-2 justify-end">
              <Button size={"sm"} onClick={() => handleEditConfirm()}>
                save
              </Button>
              <Button
                size={"sm"}
                variant={"destructive"}
                onClick={handleEditCancle}
              >
                cancle
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex justify-between">
              <p
                className={`font-semibold truncate ${isDone && "line-through italic text-slate-400"}`}
              >
                {todo.title}
              </p>
              <Checkbox
                className="mr-[2px]"
                checked={isDone}
                onCheckedChange={handleCheckedChange}
              />
            </div>
            <div>
              {todo.description ? (
                <p className="truncate">{todo.description}</p>
              ) : (
                <p className="text-sm invisible">no desc</p>
              )}
            </div>
          </div>
        )}

        <div className="w-full border-t border-gray-300" />

        <div className="flex items-center gap-2">
          <Popover open={isEditDate} onOpenChange={handleCalendarOpenClose}>
            <PopoverTrigger asChild>
              <CalendarIcon
                className="text-slate-400 cursor-pointer"
                size={"20"}
                onClick={() => setIsEditDate(true)}
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                locale={ko}
                selected={selectedDateRange}
                onSelect={(e) => {
                  setSelectedDateRange(e);
                }}
                initialFocus={false}
              />
            </PopoverContent>
          </Popover>
          <div className="flex flex-col text-slate-400">
            <div className="flex gap-2 text-sm">
              <p className="w-7">start</p>
              <p>:</p>
              {selectedDateRange?.from && (
                <p className="text-sm">
                  {Intl.DateTimeFormat("kr", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })
                    .format(new Date(selectedDateRange.from))
                    .replace(/\./g, "")
                    .split(" ")
                    .join("-")}
                </p>
              )}
            </div>
            <div className="flex gap-2 text-sm">
              <p className="w-7">end</p>
              <p>:</p>
              {selectedDateRange?.to && (
                <p>
                  {Intl.DateTimeFormat("kr", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                  })
                    .format(new Date(selectedDateRange.to))
                    .replace(/\./g, "")
                    .split(" ")
                    .join("-")}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { TodoCard };
