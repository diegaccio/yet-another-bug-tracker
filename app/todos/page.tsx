import { prisma } from "@/prisma/client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import TodosGrid from "./TodosGrid";
import { ErrorMessage } from "../components";

const TodosPage = async () => {
  let todos = [];
  console.log("Fetching TODOS from the DB...");
  try {
    todos = await prisma.todo.findMany();
  } catch (error) {
    console.log("DATABASE Error: " + error);
    return <ErrorMessage>{"An unexpected error has occurred"}</ErrorMessage>;
  }
  return (
    <>
      <div>
        <Button className="mb-4">
          <Link href={"/todos/new"}>New Todo</Link>{" "}
        </Button>
      </div>
      <TodosGrid serverTodos={todos} />
    </>
  );
};

export default TodosPage;
