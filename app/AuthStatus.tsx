"use client";
import { Box, DropdownMenu, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AiOutlineUser } from "react-icons/ai";
import { logout } from "./actions/action";
import { Session } from "./session/sessionUtils";

interface AuthStatusProps {
  session: Session | null;
}

const AuthStatus = ({ session }: AuthStatusProps) => {
  //const session = await getSession();

  const router = useRouter();

  if (!session)
    return (
      <Link className="nav-link" href="/login">
        Login
      </Link>
    );

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <AiOutlineUser />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">User id: {session.userName}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Button
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              Log Out
            </Button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};

export default AuthStatus;
