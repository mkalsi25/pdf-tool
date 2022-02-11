import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <>
      <header className="flex items-center justify-center p-4">
        <nav>
          <ul className="flex flex-wrap items-center space-x-4">
            {menu.map((li, key) => {
              return (
                <li
                  key={key}
                  className={router.pathname == li.route ? "font-bold" : ""}
                >
                  <Link href={li.route}>
                    <a href={li.route}>{li.title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </header>
      <main className="min-h-screen">{children}</main>
      <footer>
        <div className="bg-black p-6 mt-24 text-center uppercase text-xs tracking-[0.2em] text-white">
          <strong>Tool Developed by: Danny Waite & Team.</strong>
        </div>
      </footer>
    </>
  );
}

const menu = [
  { title: "Kyero", route: "/" },
  // { title: "Casafari", route: "/casafari" },
  { title: "Idealista", route: "/idealista" },
  { title: "Manual Generator", route: "/generate" },
];
