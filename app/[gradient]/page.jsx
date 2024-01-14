"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import { useRouter } from "next/navigation";
import html2canvas from "html2canvas";
import Download from "@/app/components/logos/Download";
import Share from "@/app/components/logos/Share";
import About from "@/app/components/logos/About";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

const page = ({ params }) => {
  const convertDirection = (direction) => {
    const directionMap = {
      "to-r": "to right",
      "to-l": "to left",
      "to-t": "to top",
      "to-b": "to bottom",
      "to-tr": "to top right",
      "to-tl": "to top left",
      "to-br": "to bottom right",
      "to-bl": "to bottom left",
    };
    return directionMap[direction];
  };

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [gradient, setGradient] = useState({
    color1: "fff",
    color2: "000",
    direction: "to-r",
  });

  const [currentGradient, setCurrentGradient] = useState({
    color1: params.gradient.split("-")[2].padStart(6, "0"),
    color2: params.gradient.split("-")[3].padStart(6, "0"),
    direction:
      params.gradient.split("-")[0] + "-" + params.gradient.split("-")[1],
  });
  const [direction, setDirection] = useState(
    params.gradient.split("-")[0] + "-" + params.gradient.split("-")[1]
  );
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

  useEffect(() => {
    setCurrentGradient({
      ...currentGradient,
      direction: direction,
    });
  }, [direction]);

  const downloadGradient = () => {
    const gradientDiv = document.getElementById("gradientDiv");

    html2canvas(gradientDiv).then((canvas) => {
      const link = document.createElement("a");
      const url = params.gradient;
      link.download = `gradient-${url}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const copyURL = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
  };

  const generateGradient = () => {
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
          <div
            className={`w-full h-32 gradient rounded-sm hidden sm:flex transition-all`}
            style={{
              backgroundImage: `linear-gradient(${convertDirection(
                currentGradient.direction
              )}, #${currentGradient.color1}, #${currentGradient.color2})`,
            }}
          ></div>
          <div className="w-full h-48 preview rounded-sm flex transition-all flex justify-between gap-6">
            <div className="aspect-square h-full rounded-sm hidden sm:flex transition-all flex flex-col drop-shadow-sm">
              <div
                className="w-full h-4/5 rounded-t-sm"
                style={{
                  backgroundImage: `linear-gradient(${convertDirection(
                    currentGradient.direction
                  )}, #${currentGradient.color1}, #${currentGradient.color2})`,
                }}
              ></div>
              <div className="w-full h-1/5 bg-white dark:bg-darkNotionContainer rounded-b-sm flex items-center justify-center">
                <span className="font-semibold text-text dark:text-darkNotionText ">
                  Project Title
                </span>
              </div>
            </div>
            <div className="  h-full rounded-sm sm:w-full w-full transition-all flex flex-col drop-shadow-sm">
              <div
                className="w-full h-4/5 rounded-t-sm"
                style={{
                  backgroundImage: `linear-gradient(${convertDirection(
                    currentGradient.direction
                  )}, #${currentGradient.color1}, #${currentGradient.color2})`,
                }}
              ></div>
              <div className="w-full h-1/5 bg-white dark:bg-darkNotionContainer rounded-b-sm flex items-center justify-center">
                <span className="font-semibold text-text dark:text-darkNotionText ">
                  Project Title
                </span>
              </div>
            </div>
          </div>
          <div className="w-full h-24 gradient rounded-sm flex transition-all justify-center sm:justify-start flex gap-4">
            <div
              className="aspect-square h-full bg-white dark:bg-darkNotionContainer rounded-sm drop-shadow-sm hover:scale-105 transition-transform cursor-pointer active:scale-95"
              onClick={downloadGradient}
            >
              <div className="w-full h-full flex flex-col items-center justify-center p-2 gap-1">
                <Download className="w-8 h-8" />
                <span className="font-medium text-text dark:text-darkNotionText text-sm">
                  Download
                </span>
              </div>
            </div>
            <div className="aspect-square h-full bg-white dark:bg-darkNotionContainer rounded-sm drop-shadow-sm hover:scale-105 transition-transform cursor-pointer active:scale-95">
              <div
                className="w-full h-full flex flex-col items-center justify-center p-2 gap-1"
                onClick={copyURL}
              >
                <Share className="w-6 h-6" />
                <span className="font-medium text-text dark:text-darkNotionText text-sm">
                  Share
                </span>
              </div>
            </div>
            <div className="aspect-square h-full bg-white dark:bg-darkNotionContainer rounded-sm drop-shadow-sm hover:scale-105 transition-transform cursor-pointer active:scale-95">
              <div className="w-full h-full flex flex-col items-center justify-center p-2 gap-1">
                <About className="w-6 h-6" />
                <span className="font-medium text-text dark:text-darkNotionText text-sm">
                  About
                </span>
              </div>
            </div>
          </div>
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger
              className={`w-full h-8 bg-white dark:bg-darkNotion border  gradient rounded-sm flex items-center justify-center ${
                isOpen ? "rounded-b-none" : ""
              }`}
            >
              Edit colors
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="w-full h-auto bg-white dark:bg-darkNotion border border-t-0 gradient rounded-b-sm rounded-t-none flex transition-all flex-col px-4 py-4 gap-4 transition">
                <div className="w-full flex gap-2 items-center">
                  <span className="w-1/5 hidden sm:flex ">Direction </span>
                  <Select
                    className="bg-white dark:bg-darkNotionContainer"
                    onValueChange={(value) => {
                      setDirection(value);
                    }}
                    defaultValue={currentGradient.direction}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="to-r">Right</SelectItem>
                      <SelectItem value="to-l">Left</SelectItem>
                      <SelectItem value="to-t">Top</SelectItem>
                      <SelectItem value="to-b">Bottom</SelectItem>
                      <SelectItem value="to-tr">Top Right</SelectItem>
                      <SelectItem value="to-tl">Top Left</SelectItem>
                      <SelectItem value="to-br">Bottom Right</SelectItem>
                      <SelectItem value="to-bl">Bottom Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full flex gap-2 items-center">
                  <span className="hidden sm:flex w-1/4 ">Color 1</span>{" "}
                  <div
                    className="rounded-sm w-full h-7 relative border"
                    style={{ backgroundColor: `#${currentGradient.color1}` }}
                  >
                    <input
                      type="color"
                      value={`#${currentGradient.color1}`}
                      onChange={(e) => {
                        setCurrentGradient({
                          ...currentGradient,
                          color1: e.target.value.slice(1),
                        });
                      }}
                      className="rounded-full absolute inset-0 opacity-0 cursor-pointer w-full h-full box-border"
                    />
                  </div>
                </div>
                <div className="w-full flex gap-2 items-center">
                  <span className="hidden sm:flex w-1/4">Color 1</span>{" "}
                  <div
                    className="rounded-sm w-full h-7 relative border"
                    style={{ backgroundColor: `#${currentGradient.color2}` }}
                  >
                    <input
                      type="color"
                      value={`#${currentGradient.color2}`}
                      onChange={(e) => {
                        setCurrentGradient({
                          ...currentGradient,
                          color2: e.target.value.slice(1),
                        });
                      }}
                      className="rounded-full absolute inset-0 opacity-0 cursor-pointer w-full h-full box-border"
                    />
                  </div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
          <Button className="sm:hidden flex" onClick={generateGradient}>
            Generate
          </Button>
          {/* div for downloading */}
          <div
            id="gradientDiv"
            style={{
              width: "1500px",
              height: "600px",
              backgroundImage: `linear-gradient(${convertDirection(
                currentGradient.direction
              )}, #${currentGradient.color1}, #${currentGradient.color2})`,
              position: "absolute",
              left: "-9999px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default page;
