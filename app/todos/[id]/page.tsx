import { PageProps } from "@/.next/types/app/page";
import TodoStatusBadge from "@/app/components/TodoStatusBadge";
import { prisma } from "@/prisma/client";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

const TodoDetailsPage = async ({ params }: PageProps) => {
  const { id: idString } = await params;

  const id = parseInt(idString);

  if (isNaN(id)) notFound();

  const todo = await prisma.todo.findUnique({
    where: { id: id },
  });

  if (!todo) notFound();

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <Heading>{todo.title}</Heading>
        <Flex gap={"4"} my={"2"}>
          <TodoStatusBadge status={todo.status} />
          <Text>{todo.createdAt.toDateString()}</Text>
        </Flex>
        <Card className="prose mt-4">
          <ReactMarkdown>{todo.description}</ReactMarkdown>
        </Card>
      </Box>
      <Box>
        <Button>
          <Pencil2Icon /> Edit Todo
        </Button>
      </Box>
    </Grid>
  );
};

export default TodoDetailsPage;
