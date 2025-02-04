import { prisma } from "@/prisma/client";
import { unstable_cache } from "next/cache";

const getTodos = async () => {
  console.log("Fetching TODOS from the DB...");
  return prisma.todo.findMany();
};

export const getCachedTodos = unstable_cache(getTodos, ["todos"], {
  revalidate: 3600,
  tags: ["todos"],
});
