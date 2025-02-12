"use client";
import { Box, DropdownMenu, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { logout } from "./actions/action";
import { Session } from "./session/sessionUtils";
import { usePathname } from "next/navigation";

interface AuthStatusProps {
  session: Session | null;
}

const AuthStatus = ({ session }: AuthStatusProps) => {
  console.log("RENDERING AuthStatus", session);

  const currentPath = usePathname();

  console.log("RENDERING AuthStatus", session, currentPath);

  if (!session || currentPath === "/login")
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
            <Text>{Date.now().toString()}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Button
              onClick={() => {
                logout();
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
