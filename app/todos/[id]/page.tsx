import TodoStatusBadge from "@/app/components/TodoStatusBadge";
import { prisma } from "@/prisma/client";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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

  return (
    <>
      <Heading>{todo.title}</Heading>
      <Flex gap={"4"} my={"2"}>
        <TodoStatusBadge status={todo.status} />
        <Text>{todo.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose mt-4">
        <ReactMarkdown>{todo.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TodoDetailsPage;
