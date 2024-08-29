import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const StatMenuBox = ({ title, number, lastly, icon }) => {
  return (
    <div className="border-2 p-4 flex overflow-hidden justify-between cursor-default">
      <div className="flex flex-col gap-2">
        <p className="font-bold text-primary">{title}</p>
        <div className="flex items-end">
          <p className="text-3xl font-semibold">{number}</p>
          <div className="flex items-center">
            <p className="text-sm text-secondary">100%</p>
            <p className="text-xs text-gray-400">{lastly}</p>
          </div>
        </div>
      </div>
      <Icon icon={icon} className="text-[50px]" />
    </div>
  );
};

export default StatMenuBox;
