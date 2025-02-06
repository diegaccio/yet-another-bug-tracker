import { PageProps } from "@/.next/types/app/page";
import { prisma } from "@/prisma/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditTodoButton from "./EditTodoButton";
import TodoDetails from "./TodoDetails";
import DeleteTodoButton from "./DeleteTodoButton";
import { Prisma } from "@prisma/client";

const TodoDetailsPage = async ({ params }: PageProps) => {
  const { id: idString } = await params;

  const id = parseInt(idString);

  if (isNaN(id)) notFound();

  try {
    const todo = await prisma.todo.findUnique({
      where: { id: id },
    });

    if (!todo) notFound();

    return (
      <Grid columns={{ initial: "1", md: "5" }} gap="5">
        <Box className="md:col-span-4">
          <TodoDetails todo={todo} />
        </Box>
        <Box>
          <Flex direction="column" gap="4">
            <EditTodoButton todoId={todo.id} />
            <DeleteTodoButton todoId={todo.id} />
          </Flex>
        </Box>
      </Grid>
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // The .code property can be accessed in a type-safe manner
      console.log("DB ERROR :" + error.message);
    }
    notFound();
  }
};

export default TodoDetailsPage;
