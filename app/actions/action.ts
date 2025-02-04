"use server";

import { prisma } from "@/prisma/client";
import { todoSchema, TodoSchemaType } from "../validationSchemas";
import { revalidatePath } from "next/cache";

export async function createTodo(data: TodoSchemaType) {
  const parse = todoSchema.safeParse(data);

  if (parse.error) {
    return { success: false, error: parse.error.format() };
  }

  const todo = parse.data;

  try {
    const newTodo = await prisma.todo.create({
      data: { title: todo.title, description: todo.description },
    });

    revalidatePath("/");
    return { success: true, data: newTodo };
  } catch (e) {
    return { success: false, error: "Failed to create todo: " + e };
  }
}

export async function patchTodo(data: TodoSchemaType, todoId: number) {
  const parse = todoSchema.safeParse(data);

  if (parse.error) {
    return { success: false, error: parse.error.format() };
  }

  const todo = parse.data;

  const oldTodo = await prisma.todo.findUnique({
    where: { id: todoId },
  });

  if (!oldTodo) {
    return { success: false, error: "Todo not found" }; //NOT FOUND
  }

  try {
    const newTodo = await prisma.todo.update({
      where: { id: oldTodo.id },
      data: { title: todo.title, description: todo.description },
    });
    revalidatePath("/");
    return { success: true, data: newTodo };
  } catch (e) {
    return { success: false, error: "Failed to update todo: " + e };
  }
}
