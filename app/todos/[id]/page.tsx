import { PageProps } from "@/.next/types/app/page";
import { prisma } from "@/prisma/client";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTodoButton from "./EditTodoButton";
import TodoDetails from "./TodoDetails";

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
        <TodoDetails todo={todo} />
      </Box>
      <Box>
        <EditTodoButton todoId={todo.id} />
      </Box>
    </Grid>
  );
};

export default TodoDetailsPage;
