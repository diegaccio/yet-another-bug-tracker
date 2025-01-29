"use client";
import { Button } from "@radix-ui/themes";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  ValueFormatterParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import Link from "next/link";
import ErrorMessage from "../components/ErrorMessage";
import useTodos from "../hooks/useTodos";
import DetailsButton from "./DetailsButton";
import TodoStatusBadgeGrid from "../components/TodoStatusBadgeGrid";

ModuleRegistry.registerModules([AllCommunityModule]);

function dateFormatter(params: ValueFormatterParams) {
  const date = new Date(params.value);
  return date.toDateString();
}

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
            { field: "status", cellRenderer: TodoStatusBadgeGrid },
            {
              field: "createdAt",
              headerName: "Created At",
              valueFormatter: dateFormatter,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Page;
