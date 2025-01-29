import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";

const statusMap: Record<
  Status,
  { color: "red" | "yellow" | "green"; text: string }
> = {
  OPEN: { color: "red", text: "TO DO" },
  IN_PROGRESS: { color: "yellow", text: "IN PROGRESS" },
  CLOSED: { color: "green", text: "CLOSED" },
};

interface TodoStatusBadgeProps {
  status: Status;
}

const TodoStatusBadge = ({ status }: TodoStatusBadgeProps) => {
  return (
    <Badge color={statusMap[status].color}>{statusMap[status].text}</Badge>
  );
};

export default TodoStatusBadge;
