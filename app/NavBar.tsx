import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { Container, Flex } from "@radix-ui/themes";
import AuthStatus from "./AuthStatus";
import NavLinks from "./NavLinks";
import { getSession } from "./session/sessionUtils";

export const dynamic = "force-dynamic";

const NavBar = async () => {
  //using cookies in layout does not invalitate the Router Cache
  const session = await getSession();
  if (session) {
    console.log("RENDERING NAVBAR for users: " + session?.userName);
  } else {
    console.log("RENDERING NAVBAR without user session");
  }

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link data-testid="logo" href="/">
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus session={session} />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
