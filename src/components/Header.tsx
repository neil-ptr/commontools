"use client";
import Link from "next/link";
import Search from "./Search";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <header>
      <nav className="grid grid-cols-3 p-6 sticky top-0 bg-background z-10">
        <div className="justify-self-start">
          <Link href="/" className="font-bold">
            CommonTools
          </Link>
        </div>

        <Search />

        <div className="justify-self-end flex items-center gap-1">
          <ToggleTheme />
        </div>
      </nav>
    </header>
  );
};

export default Header;
