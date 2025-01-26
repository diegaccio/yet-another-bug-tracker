"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

const NewTodoPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Todo Title"></TextField.Root>
      <SimpleMDE placeholder="Todo Description" />
      <Button>New Todo</Button>
    </div>
  );
};

export default NewTodoPage;
