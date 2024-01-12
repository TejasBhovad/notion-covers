"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const Home = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [gradient, setGradient] = useState({
    color1: "fff",
    color2: "000",
    direction: "to-r",
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === "Space") {
        generateGradient();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const generateGradient = () => {
    //  color should be valid tailwind color like red-500
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const randomColor2 = Math.floor(Math.random() * 16777215).toString(16);
    // direction should to right to left and other tailwind directions
    const directions = [
      "to-r",
      "to-l",
      "to-t",
      "to-b",
      "to-tr",
      "to-tl",
      "to-br",
      "to-bl",
    ];
    const randomDirection =
      directions[Math.floor(Math.random() * directions.length)];
    setGradient({
      color1: `${randomColor}`,
      color2: `${randomColor2}`,
      direction: `${randomDirection}`,
    });
    router.push(`/${randomDirection}-${randomColor}-${randomColor2}`);
  };
  return (
    <div className="w-full h-full bg-background dark:bg-darkNotion">
      <Navbar />
      <div className="w-full h-full pt-16 sm:px-12 px-8 flex flex-col items-center ">
        <div className="w-full h-full pt-12 gap-6 flex flex-col max-w-[875px]">
          <div className="w-full h-32  bg-gradient-to-r from-accent to-primary gradient rounded-sm hidden sm:flex transition-all"></div>
          <div className="w-full h-48 preview rounded-sm flex transition-all flex justify-between gap-6">
            <div className="aspect-square h-full rounded-sm hidden sm:flex transition-all flex flex-col drop-shadow-sm">
              <div className="w-full h-4/5 bg-gradient-to-r from-accent to-primary rounded-t-sm"></div>
              <div className="w-full h-1/5 bg-white dark:bg-darkNotionContainer rounded-b-sm flex items-center justify-center">
                <span className="font-semibold text-text dark:text-darkNotionText ">
                  Project Title
                </span>
              </div>
            </div>
            <div className="  h-full rounded-sm sm:w-full w-full transition-all flex flex-col drop-shadow-sm">
              <div className="w-full h-4/5 bg-gradient-to-r from-accent to-primary rounded-t-sm"></div>
              <div className="w-full h-1/5 bg-white dark:bg-darkNotionContainer rounded-b-sm flex items-center justify-center">
                <span className="font-semibold text-text dark:text-darkNotionText ">
                  Project Title
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-24 gradient rounded-sm flex transition-all justify-center sm:justify-start flex gap-4">
            <div className="aspect-square h-full bg-white dark:bg-darkNotionContainer rounded-sm drop-shadow-sm"></div>
            <div className="aspect-square h-full bg-white dark:bg-darkNotionContainer rounded-sm drop-shadow-sm"></div>
            <div className="aspect-square h-full bg-white dark:bg-darkNotionContainer rounded-sm drop-shadow-sm"></div>
          </div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger
              className={`w-full h-8 bg-secondary gradient rounded-sm flex transition-all flex items-center justify-center ${
                isOpen ? "rounded-b-none" : ""
              }`}
            >
              Edit colors
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="w-full h-8 bg-green-200 gradient rounded-b-sm rounded-t-none flex transition-all flex"></div>
            </CollapsibleContent>
          </Collapsible>
          <Button className="sm:hidden flex" onClick={generateGradient}>
            Generate
          </Button>
          {gradient.color1}
          {gradient.color2}
          {gradient.direction}
        </div>
      </div>
    </div>
  );
};

export default Home;
