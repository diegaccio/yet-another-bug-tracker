"use client";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { todoSchema } from "@/app/validationSchemas";
import z from "zod";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Todo } from "@prisma/client";

type TodoFormData = z.infer<typeof todoSchema>;

//lazy loading to avoid server side rendering
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

const TodoForm = ({ todo }: { todo?: Todo }) => {
  const [error, setError] = useState("");

  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    try {
      if (todo) {
        await axios.patch(`/api/todos/${todo.id}`, data);
      } else {
        await axios.post("/api/todos", data);
      }
      router.push("/todos");
    } catch (error) {
      setSubmitting(false);
      console.log(error);
      setError("An unexpected error occurred");
    }
  });

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
      <form className="space-y-3" onSubmit={onSubmit}>
        <TextField.Root
          defaultValue={todo?.title}
          placeholder="Todo Title"
          {...register("title")}
        />
        <ErrorMessage>{errors.title?.message}</ErrorMessage>
        <Controller
          name="description"
          defaultValue={todo?.description}
          control={control}
          render={({ field }) => (
            //simle mde does not have a placeholder prop so we use the placeholder prop from the controller
            <SimpleMDE placeholder="Todo Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting} type="submit">
          {todo ? "Edit Todo" : "New Todo"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default TodoForm;
