import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { Container, Flex } from "@radix-ui/themes";
import AuthStatus from "./AuthStatus";
import NavLinks from "./NavLinks";
import { getSession } from "./session/sessionUtils";

const NavBar = async () => {
  const session = await getSession();

  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
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
