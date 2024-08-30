import React from "react";
import TopBar from "../components/TopBar";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col justify-between h-screen">
      <TopBar />
      <div className="w-full mt-2 flex-1">{children}</div>
      <div className="flex p-2 border">
        <p className="text-gray-500 text-sm text-center w-full">
          copyright@2024 nsini franc
        </p>
      </div>
    </div>
  );
};

export default Layout;
