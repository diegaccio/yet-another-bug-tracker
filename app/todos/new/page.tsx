"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TodoForm {
  title: string;
  description: string;
}

const NewTodoPage = () => {
  const [error, setError] = useState("");
  const { register, control, handleSubmit } = useForm<TodoForm>();
  const router = useRouter();
  return (
    <div className="max-w-xl space-y-3">
      {error && (
        <Callout.Root color="red">
          <Callout.Icon>
            <InfoCircledIcon />
          </Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className="space-y-3"
        onSubmit={handleSubmit(async (data) => {
          try {
            await axios.post("/api/todos", data);
            router.push("/todos");
          } catch (error) {
            console.log(error);
            setError("An unexpected error occurred");
          }
        })}
      >
        <TextField.Root placeholder="Todo Title" {...register("title")} />
        {
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              //simle mde does not have a placeholder prop so we use the placeholder prop from the controller
              <SimpleMDE placeholder="Todo Description" {...field} />
            )}
          />
        }

        <Button>New Todo</Button>
      </form>
    </div>
  );
};

export default NewTodoPage;
