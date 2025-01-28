"use client";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { useEffect, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { Todo } from "@prisma/client";

ModuleRegistry.registerModules([AllCommunityModule]);

const Page = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError("An unexpected error occurred: " + error);
      }
    };

    fetchTodos();
  }, []);

  const myTheme = themeQuartz.withParams({
    spacing: 12,
    accentColor: "green",
    fontFamily: "Geist Mono",
  });

  return (
    <>
      <Button className="mb-4">
        <Link href={"/todos/new"}>New Todo</Link>{" "}
      </Button>

      <ErrorMessage>{error}</ErrorMessage>

      <div style={{ height: "500px" }}>
        <AgGridReact
          theme={myTheme}
          rowData={todos}
          columnDefs={[
            { field: "id" },
            { headerName: "Title", field: "title" },
            { headerName: "Description", field: "description", flex: 3 },
            { field: "status" },
          ]}
        />
      </div>
    </>
  );
};

export default Page;
