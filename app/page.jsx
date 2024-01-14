"use client";
import { useToast } from "@/components/ui/use-toast";
import AI from "@/app/components/logos/AI";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const Home = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [gradient, setGradient] = useState({
    color1: "fff",
    color2: "000",
    direction: "to-r",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const firstVisit = sessionStorage.getItem("firstVisit");

    if (!firstVisit && isMounted) {
      // Show the toast message
      toast({
        title: "💡 Tip",
        description: "Use the spacebar to generate new gradients",
        status: "info",
        duration: 7500,
        isClosable: true,
      });

      // Set the flag in sessionStorage
      sessionStorage.setItem("firstVisit", "true");
    }
  }, [isMounted, toast]);
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
          <div className="w-full h-32  bg-gradient-to-r from-accent to-primary gradient rounded-sm hidden sm:flex transition-all px-4 py-4 text-4xl font-extrabold text-text text-opacity-25 flex items-center justify-center">
            Create Notion Covers Easily
          </div>
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
          <Button
            className=" flex bg-darkNotion bg-opacity-85 transition-color hover:bg-darkNotion dark:bg-background dark:hover:bg-opacity-20 dark:bg-opacity-10 border transition-color text-white font-medium gap-3 text-md font-semibold p-2 items-center justify-center rounded-sm w-full"
            onClick={generateGradient}
          >
            <AI className="w-6 h-6" />
            Create Gradient
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
