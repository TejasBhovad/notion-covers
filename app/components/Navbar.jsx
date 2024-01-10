import React from "react";

const Navbar = () => {
  return (
    <div className="absolute w-full h-16 bg-red-400 flex">
      <div className="w-1/3 h-full w-full bg-green-300 flex items-center justify-start px-4">
        logo
      </div>
      <div className="w-1/3 h-full w-full bg-blue-300 flex items-center justify-center px-4">
        space
      </div>
      <div className="w-1/3 h-full w-full bg-green-300 flex items-center justify-end px-4">
        mode
      </div>
    </div>
  );
};

export default Navbar;
