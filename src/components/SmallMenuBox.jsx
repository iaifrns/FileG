import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const SmallMenuBox = ({ title, desc, icon, onClick }) => {
  return (
    <div
      className="border-2 p-4 flex overflow-hidden justify-between items-center cursor-pointer transition-transform duration-300 transform hover:scale-[95%]"
      onClick={onClick}
    >
      <div className="flex flex-col gap-2 w-4/5">
        <p className="text-2xl font-bold text-primary">{title}</p>
        <p className="text-sm">{desc}</p>
      </div>
      <Icon icon={icon} className="text-[100px] ml-20" />
    </div>
  );
};

export default SmallMenuBox;
