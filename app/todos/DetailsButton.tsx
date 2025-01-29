import { CustomCellRendererProps } from "ag-grid-react";
import Link from "../components/Link";

const DetailsButton = ({ value }: CustomCellRendererProps) => {
  const todoId = value as number;

  return (
    /*     <Button className="align-middle ml-auto mr-auto">
      <Link href={`/todos/${todoId}`}>Details</Link>
    </Button> */
    <Link href={`/todos/${todoId}`}>Details</Link>
  );
};

export default DetailsButton;
