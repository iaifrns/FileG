import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

const BigMenuBox = ({ icon, title, desc, onClick }) => {
  return (
    <div
      className="border-2 p-4 flex flex-col justify-between cursor-pointer transition-transform duration-300 transform hover:scale-[95%]"
      onClick={onClick}
    >
      <Icon icon={icon} className="text-[100px]" />
      <p className="font-semibold text-primary text-3xl">{title}</p>
      <p>{desc}</p>
      <div className="flex justify-end">
        <Icon icon="maki:arrow" className="text-xl text-secondary" />
      </div>
    </div>
  );
};

export default BigMenuBox;
