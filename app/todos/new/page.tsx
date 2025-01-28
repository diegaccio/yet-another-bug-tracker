"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/app/validationSchemas";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";

type TodoForm = z.infer<typeof todoSchema>;

const NewTodoPage = () => {
  const [error, setError] = useState("");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoForm>({
    resolver: zodResolver(todoSchema),
  });
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            //simle mde does not have a placeholder prop so we use the placeholder prop from the controller
            <SimpleMDE placeholder="Todo Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button>New Todo</Button>
      </form>
    </div>
  );
};

export default NewTodoPage;
