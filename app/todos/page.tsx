"use client";
import { Button } from "@radix-ui/themes";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import Link from "next/link";
import ErrorMessage from "../components/ErrorMessage";
import TodoStatusBadge from "../components/TodoStatusBadge";
import useTodos from "../hooks/useTodos";
import DetailsButton from "./DetailsButton";

ModuleRegistry.registerModules([AllCommunityModule]);

const Page = () => {
  const { data: todos, error } = useTodos();

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

      <ErrorMessage>{error?.message}</ErrorMessage>

      <div style={{ height: "500px" }}>
        <AgGridReact
          theme={myTheme}
          rowData={todos}
          columnDefs={[
            { field: "id", headerName: "", cellRenderer: DetailsButton },
            { field: "id" },
            { headerName: "Title", field: "title" },
            { headerName: "Description", field: "description", flex: 3 },
            { field: "status", cellRenderer: TodoStatusBadge },
          ]}
        />
      </div>
    </>
  );
};

export default Page;
