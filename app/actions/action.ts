"use server";

import { prisma } from "@/prisma/client";
import {
  loginSchema,
  LoginSchemaType,
  todoSchema,
  TodoSchemaType,
} from "../validationSchemas";
import { revalidatePath, revalidateTag } from "next/cache";
import {
  createNewSession,
  deleteSession,
  getSession,
} from "../session/sessionUtils";
import { redirect } from "next/navigation";

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

    revalidateTag("todos");
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
    revalidateTag("todos");
    revalidatePath("/");
    return { success: true, data: newTodo };
  } catch (e) {
    return { success: false, error: "Failed to update todo: " + e };
  }
}

export async function toggleUserAdmin(userId: number) {
  console.log("Toggle User Admin Id: " + userId);
  const oldUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!oldUser) {
    return false; //NOT FOUND
  }

  try {
    await prisma.user.update({
      where: { id: oldUser.id },
      data: { admin: !oldUser.admin },
    });
    //revalidateTag("users");
    revalidatePath("/users");
    //redirect("/users");
    return true;
  } catch {
    return false;
  }
}

export async function login(data: LoginSchemaType) {
  const parse = loginSchema.safeParse(data);

  if (parse.error) {
    return { success: false, error: parse.error.format() };
  }

  const loginData = parse.data;

  const user = await prisma.user.findFirst({
    where: { userName: loginData.username },
  });

  console.log(user);

  if (!user) {
    return { success: false, error: "Invalid user" };
  }

  if (user.password !== loginData.password) {
    return { success: false, error: "Invalid password" };
  }

  console.log(loginData);

  await createNewSession({ userId: 1, userName: loginData.username });

  redirect("/");
}

export async function logout() {
  const session = await getSession();
  console.log("ACTION LOGOUT - user:" + session?.userName);
  await deleteSession();
  //revalidatePath("/");
  redirect("/login");
}
