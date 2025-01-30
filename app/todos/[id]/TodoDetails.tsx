import { TodoStatusBadge } from "@/app/components";
import { Todo } from "@prisma/client";
import { Heading, Flex, Card, Text } from "@radix-ui/themes";
import React from "react";
import ReactMarkdown from "react-markdown";

const TodoDetails = ({ todo }: { todo: Todo }) => {
  return (
    <>
      <Heading>{todo.title}</Heading>
      <Flex className="space-x-3" my="2">
        <TodoStatusBadge status={todo.status} />
        <Text>{todo.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{todo.description}</ReactMarkdown>
      </Card>
    </>
  );
};

export default TodoDetails;
