import Link from "next/link";
import { PiBugBold } from "react-icons/pi";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/todos", label: "Todos" },
  ];
  return (
    <nav className="flex space-x-6 border-b mb-5 px-4 h-14 items-center">
      <Link href="/">
        <PiBugBold className="text-xl" />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label }) => (
          <li key={`${href}${label}`}>
            <Link
              className="text-zinc-500 hover:text-zinc-800 transition-colors"
              href={href}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
