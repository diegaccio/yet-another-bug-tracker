import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import { CustomCellRendererProps } from "ag-grid-react";

const statusMap: Record<
  Status,
  { color: "red" | "yellow" | "green"; text: string }
> = {
  OPEN: { color: "red", text: "TO DO" },
  IN_PROGRESS: { color: "yellow", text: "IN PROGRESS" },
  CLOSED: { color: "green", text: "CLOSED" },
};

const TodoStatusBadge = ({ value }: CustomCellRendererProps) => {
  const status = value as Status;
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].text}</Badge>
  );
};

export default TodoStatusBadge;
