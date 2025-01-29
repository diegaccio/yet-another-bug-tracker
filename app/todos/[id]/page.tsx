import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";

interface TodoDetailsPageProps {
  params: { id: string };
}
const TodoDetailsPage = async ({ params }: TodoDetailsPageProps) => {
  const { id } = await params;
  const todo = await prisma.todo.findUnique({
    where: { id: parseInt(id) },
  });

  if (!todo) notFound();

  return <div>{todo.title}</div>;
};

export default TodoDetailsPage;
