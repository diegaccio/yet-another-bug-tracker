"use client";
import { ErrorMessage, TodoStatusBadgeGrid } from "@/app/components";
import { Todo } from "@prisma/client";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  themeQuartz,
  ValueFormatterParams,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import useTodos from "../hooks/useTodos";
import DetailsButton from "./DetailsButton";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

function dateFormatter(params: ValueFormatterParams) {
  const date = new Date(params.value);
  return date.toDateString();
}

interface TodoGridProps {
  serverTodos: Todo[];
}

const TodosGrid = ({ serverTodos }: TodoGridProps) => {
  const { data: todos, error, isLoading } = useTodos();

  const myTheme = themeQuartz.withParams({
    spacing: 12,
    accentColor: "green",
    fontFamily: "Geist Mono",
  });

  return (
    <>
      <ErrorMessage>{error?.message}</ErrorMessage>

      <div style={{ height: 500 }}>
        <AgGridReact
          theme={myTheme}
          rowData={isLoading ? serverTodos : todos}
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
          suppressServerSideFullWidthLoadingRow={true}
        />
      </div>
    </>
  );
};

export default TodosGrid;
