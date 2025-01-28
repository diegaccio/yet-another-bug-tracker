import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { todoSchema } from "../../validationSchemas";

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
    console.error(validation.error.format);
    return NextResponse.json(validation.error.format(), {
      status: 400, //BAD REQUEST
    });
  }

  const newTodo = await prisma.todo.create({
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newTodo, { status: 201 }); //CREATED
}
