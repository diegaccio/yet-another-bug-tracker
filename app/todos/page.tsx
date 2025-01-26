import { Button } from "@radix-ui/themes";
import Link from "next/link";

const page = () => {
  return (
    <Button>
      <Link href={"/todos/new"}>New Todo</Link>{" "}
    </Button>
  );
};

export default page;
