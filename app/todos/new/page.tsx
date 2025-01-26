import { Button, TextArea, TextField } from "@radix-ui/themes";
import React from "react";

const NewTodoPage = () => {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Todo Title"></TextField.Root>
      <TextArea placeholder="Todo Description" />
      <Button>New Todo</Button>
    </div>
  );
};

export default NewTodoPage;
