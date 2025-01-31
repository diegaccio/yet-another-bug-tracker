import { TrashIcon } from "@radix-ui/react-icons";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const DeleteTodoButton = ({ todoId }: { todoId: number }) => {
  return (
    <Button color="red">
      <TrashIcon />
      <Link href={`/todos/${todoId}/delete`}>Delete</Link>
    </Button>
  );
};

export default DeleteTodoButton;
