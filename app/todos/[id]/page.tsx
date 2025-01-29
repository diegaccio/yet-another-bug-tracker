import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface TodoDetailsPageProps {
  params: { id: string };
}
const TodoDetailsPage = async ({ params }: TodoDetailsPageProps) => {
  const { id: idString } = await params;

  const id = parseInt(idString);

  if (isNaN(id)) notFound();

  const todo = await prisma.todo.findUnique({
    where: { id: id },
  });

  if (!todo) notFound();

  return <div>{todo.title}</div>;
};

export default TodoDetailsPage;
