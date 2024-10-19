"use client";

import { useState } from "react";
import { todoCreateAction } from "../actions/todo";
import {
  Button,
  Calendar,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui";
import { useRouter } from "next/navigation";
import { CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";
import { cn } from "../lib/utils";
import { ko } from "date-fns/locale";
import { useTheme } from "next-themes";

const TodoAddSection = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // const [startDate, setStartDate] = useState("");
  // const [endDate, setEndDate] = useState("");

  // const [isEditDate, setIsEditDate] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >({ from: undefined, to: undefined });

  const handleCreateTodo = async () => {
    await todoCreateAction({
      title,
      description,
      startDate: selectedDateRange?.from
        ? new Date(selectedDateRange.from)
        : null,
      endDate: selectedDateRange?.to ? new Date(selectedDateRange.to) : null,
    });

    setTitle("");
    setDescription("");
    setSelectedDateRange({ from: undefined, to: undefined });

    router.refresh();
  };

  return (
    <section className="my-10 flex flex-col items-center">
      <div className="flex flex-col gap-2 w-80 items-center">
        <Input
          className={cn("dark:bg-zinc-200 dark:focus:no-ring dark:text-black")}
          type="text"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Input
          className={cn("dark:bg-zinc-200 dark:focus:no-ring dark:text-black")}
          type="text"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "dark:border-gray-600 dark:border-[0.5px] w-80 flex justify-start gap-5 text-left font-normal",
              )}
            >
              <CalendarIcon size={"20"} />
              <div className="w-full flex justify-around">
                {selectedDateRange?.from ? (
                  <span>
                    {Intl.DateTimeFormat("kr", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })
                      .format(new Date(selectedDateRange.from))
                      .replace(/\./g, "")
                      .split(" ")
                      .join("-")}
                  </span>
                ) : (
                  <span className="text-muted-foreground">start date</span>
                )}
                {selectedDateRange?.to ? (
                  <span>
                    {Intl.DateTimeFormat("kr", {
                      year: "2-digit",
                      month: "2-digit",
                      day: "2-digit",
                    })
                      .format(new Date(selectedDateRange.to))
                      .replace(/\./g, "")
                      .split(" ")
                      .join("-")}
                  </span>
                ) : (
                  <span className="text-muted-foreground">end date</span>
                )}
              </div>
            </Button>
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
        <div className="flex w-80 justify-end">
          <Button onClick={handleCreateTodo}>add todo</Button>
        </div>
      </div>
    </section>
  );
};

export { TodoAddSection };
