"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classnames from "classnames";

const NavLinks = () => {
  const currentPath = usePathname();
  console.log("RENDERING NavLinks - current path: " + currentPath);

  const links = [
    { label: "Dashboard", href: "/", dataTestId: "home-link" },
    { label: "Todos", href: "/todos", dataTestId: "todos-link" },
    { label: "Users", href: "/users", dataTestId: "users-link" },
  ];

  return (
    <ul className="flex space-x-6">
      {links.map((link) => (
        <li key={link.href}>
          <Link
            className={classnames({
              "text-zinc-800": currentPath === link.href,
              "text-zinc-500": currentPath !== link.href,
              "hover:text-zinc-800 transition-colors": true,
            })}
            href={link.href}
            data-testid={link.dataTestId}
          >
            {link.label}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;
