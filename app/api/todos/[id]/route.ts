import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { todoSchema } from "../../../validationSchemas";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

  const { id } = await params;

  const oldTodo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  });

  if (!oldTodo) {
    return NextResponse.json({ error: "Todo not found" }, { status: 404 }); //NOT FOUND
  }

  const newTodo = await prisma.todo.update({
    where: { id: oldTodo.id },
    data: { title: body.title, description: body.description },
  });

  return NextResponse.json(newTodo); //CREATED
}
