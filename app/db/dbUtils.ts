import { prisma } from "@/prisma/client";
import { unstable_cache } from "next/cache";

export const getUsers = async () => {
  console.log("Fetching USERs from the DB...");
  return prisma.user.findMany();
};

export const getLastUsersUpdateTime = async () => {
  console.log("Fetching LAST USER UPDATE from the DB...");
  const lastUserUpdate = await prisma.user.findFirst({
    orderBy: {
      updatedAt: "desc",
    },
    select: {
      updatedAt: true,
    },
  });
  return lastUserUpdate?.updatedAt;
};

const getTodos = async () => {
  console.log("Fetching TODOS from the DB...");
  return prisma.todo.findMany();
};

export const getCachedTodos = unstable_cache(getTodos, ["todos"], {
  revalidate: 3600,
  tags: ["todos"],
});
