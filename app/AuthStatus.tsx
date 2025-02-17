"use client";
import { Box, DropdownMenu, Button, Text } from "@radix-ui/themes";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";
import { getClientSession, logout } from "./actions/action";
import { Session } from "./session/sessionUtils";
import { useCallback, useEffect, useState } from "react";
import { useInterval } from "react-interval-hook";
import ms from "ms";

const AuthStatus = () => {
  const [session, setSession] = useState<Session | null>(null);

  const onGetSession = useCallback(async () => {
    console.log("AuthStatus calling get session...");
    const serverSession = await getClientSession();
    console.log("AuthStatus got session: ", serverSession);
    //avoids rendering
    if (!session || !serverSession) {
      console.log("AuthStatus udating state session with: ", serverSession);
      setSession(serverSession);
    }
  }, [session]);

  useEffect(() => {
    if (!session) {
      console.log("AuthStatus fetching firs session...");
      onGetSession();
    }
  }, [session, onGetSession]);

  useInterval(onGetSession, ms("1m"));

  console.log("RENDERING AuthStatus", session);

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
            <Text>
              Expiry time:{" "}
              {session.expires
                ? new Date(session.expires).toTimeString()
                : "N/A"}
            </Text>
          </DropdownMenu.Item>
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
