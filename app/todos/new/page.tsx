"use client";
import { Button, TextField } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

interface TodoForm {
  title: string;
  description: string;
}

const NewTodoPage = () => {
  const { register, control, handleSubmit } = useForm<TodoForm>();
  const router = useRouter();
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => {
        axios.post("/api/todos", data);
        router.push("/todos");
      })}
    >
      <TextField.Root placeholder="Todo Title" {...register("title")} />
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          //simle mde does not have a placeholder prop so we use the placeholder prop from the controller
          <SimpleMDE placeholder="Todo Description" {...field} />
        )}
      />

      <Button>New Todo</Button>
    </form>
  );
};

export default NewTodoPage;
