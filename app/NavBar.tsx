"use client";

import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiBugBold } from "react-icons/pi";

const NavBar = () => {
  const links = [
    { href: "/", label: "Dashboard", dataTestId: "home-link" },
    { href: "/todos", label: "Todos", dataTestId: "todos-link" },
  ];

  //this requieres a client component
  const currentPage = usePathname();
  //console.log(currentPage);

  return (
    <nav className="flex space-x-6 border-b mb-5 px-4 h-14 items-center">
      <Link data-testid="logo" href="/">
        <PiBugBold className="text-xl" />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({ href, label, dataTestId }) => (
          <li key={`${href}${label}`}>
            <Link
              //better conditional class names with classnames function
              className={classNames({
                "text-zinc-800": currentPage === href,
                "text-zinc-500": currentPage !== href,
                "hover:text-zinc-800 transition-colors": true,
              })}
              href={href}
              data-testid={dataTestId}
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
