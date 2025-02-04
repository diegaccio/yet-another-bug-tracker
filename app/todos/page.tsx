import { Button } from "@radix-ui/themes";
import Link from "next/link";
import TodosGrid from "./TodosGrid";
import { ErrorMessage } from "../components";
import { getCachedTodos } from "../db/dbUtils";

const TodosPage = async () => {
  let todos = [];
  console.log("TODO PAGE: Fetching TODOS from the cache...");
  try {
    todos = await getCachedTodos();
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
