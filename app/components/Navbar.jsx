import React, { useEffect } from "react";
import Logo from "@/app/components/logos/Icon";
import Moon from "@/app/components/logos/Moon";
import Sun from "@/app/components/logos/Sun";
import Link from "next/link";

const Navbar = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const handleToggle = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      setDarkMode(true);
      // set class
      document.querySelector("html").classList.add("dark");
    }

    if (localStorage.getItem("darkMode") === "false") {
      setDarkMode(false);
      // remove class
      document.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);
  return (
    <div className="absolute w-full h-16 bg-background dark:bg-darkNotion border-b-2 flex">
      <Link
        href="/"
        className="sm:w-1/2 w-3/4 h-full flex items-center justify-start px-4 gap-1 flex"
      >
        <Logo />
        <span className=" font-semibold text-lg text-secondary opacity-85 dark:opacity-100">
          Notion Gradients
        </span>
      </Link>
      <div className="sm:w-1/2 w-1/4 h-full flex items-center justify-end px-4">
        <button
          onClick={handleToggle}
          onKeyDown={(e) => {
            if (e.key === " ") {
              e.preventDefault();
            }
          }}
          className="w-8 h-8 rounded-full flex items-center justify-center"
        >
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
