import { PageProps } from "@/.next/types/app/page";
import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import TodoForm from "../../_components/TodoForm";

const EditTodoPage = async ({ params }: PageProps) => {
  const { id: idString } = await params;

  const id = parseInt(idString);

  if (isNaN(id)) notFound();

  const todo = await prisma.todo.findUnique({
    where: { id: id },
  });

  if (!todo) notFound();

  return <TodoForm todo={todo} />;
};

export default EditTodoPage;
