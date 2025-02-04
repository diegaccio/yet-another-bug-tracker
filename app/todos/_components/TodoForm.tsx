"use client";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { todoSchema, TodoSchemaType } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@prisma/client";
import { useState } from "react";
import { createTodo, patchTodo } from "@/app/actions/action";

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
  } = useForm<TodoSchemaType>({
    resolver: zodResolver(todoSchema),
  });

  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    setSubmitting(true);
    /*     try {
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
    } */

    let result = null;
    if (todo) {
      result = await patchTodo(data, todo.id);
    } else {
      result = await createTodo(data);
    }

    if (!result) {
      setError("An unexpected error occurred");
      setSubmitting(false);
      return;
    }

    if (result.error) {
      setError("An unexpected error occurred: " + result.error);
      setSubmitting(false);
      return;
    }

    console.log("Todo added: " + data);

    router.push("/todos");
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
