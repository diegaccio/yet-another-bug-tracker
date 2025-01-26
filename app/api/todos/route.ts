import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const todoSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const validation = todoSchema.safeParse(body);

  if (!validation.success) {
    console.error(validation.error.errors);
    return NextResponse.json(validation.error.errors, {
      status: 400, //BAD REQUEST
    });
  }

  const newTodo = await prisma.todo.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newTodo, { status: 201 }); //CREATED
}
