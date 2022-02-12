import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const router = useRouter();
  return (
    <div>
      <header className="flex items-center p-4 bg-stone-100/70 border-b border-stone-200/30">
        <nav className="flex items-center justify-between w-full max-w-5xl mx-auto">
          <Link href="/">
            <a className="text-2xl font-thin">PDF TOOL</a>
          </Link>
          <ul className="flex flex-wrap items-center space-x-4">
            {menu.map((li, key) => {
              return (
                <li
                  key={key}
                  className={`hover:underline decoration-stone-300 underline-offset-[25px] ${
                    router.pathname == li.route
                      ? "font-bold underline decoration-stone-600 underline-offset-[25px]"
                      : ""
                  }`}
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
    </div>
  );
}

const menu = [
  { title: "Kyero", route: "/" },
  // { title: "Casafari", route: "/casafari" },
  { title: "Idealista", route: "/idealista" },
  { title: "Manual Generator", route: "/generate" },
];
