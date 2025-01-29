import { Button } from "@radix-ui/themes";
import { CustomCellRendererProps } from "ag-grid-react";
import Link from "next/link";

const DetailsButton = ({ value }: CustomCellRendererProps) => {
  const todoId = value as number;

  return (
    <Button className="align-middle ml-auto mr-auto">
      <Link href={`/todos/${todoId}`}>Details</Link>
    </Button>
  );
};

export default DetailsButton;
