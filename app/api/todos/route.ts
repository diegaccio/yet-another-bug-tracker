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

export async function GET() {
  try {
    const todos = await prisma.todo.findMany();
    return NextResponse.json(todos, {
      status: 200, //BAD REQUEST
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch todos: " + error },
      {
        status: 500, //BAD REQUEST
      }
    );
  }
}
