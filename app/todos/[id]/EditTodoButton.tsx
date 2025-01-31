import { Pencil2Icon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditTodoButton = ({ todoId }: { todoId: number }) => {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/todos/${todoId}/edit`}>Edit</Link>
    </Button>
  );
};

export default EditTodoButton;
