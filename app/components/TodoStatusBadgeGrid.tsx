import { Status } from "@prisma/client";
import { CustomCellRendererProps } from "ag-grid-react";
import TodoStatusBadge from "./TodoStatusBadge";

const TodoStatusBadgeGrid = ({ value }: CustomCellRendererProps) => {
  const status = value as Status;
  return <TodoStatusBadge status={status} />;
};

export default TodoStatusBadgeGrid;
