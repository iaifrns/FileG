import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Icon } from "@iconify/react/dist/iconify.js";

const SubFiles = () => {
  const [colName, setColName] = useState("");
  const [cols, setCols] = useState([]);
  const [textErr, setTextErr] = useState(false);

  const handleColNameInputChange = (e) => {
    setColName(e.target.value);
  };

  const handleColsOnSubmit = () => {
    if (colName.length > 0) {
      setCols([...cols, colName]);
      setColName("")
    } else setTextErr(true);
  };
  return (
    <Layout>
      <div className="flex flex-col p-4 px-10 items-center w-full gap-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">
            Divide a File To Subfiles
          </h1>
        </div>
        <div className="w-[70%] flex flex-col gap-8 items-center max-md:w-full">
          <div className="p-4 border-2 w-[50%] flex flex-col gap-2">
            <p className="font-semibold">Choose the File here :</p>
            <input
              type="file"
              className="border-b-2 p-2 border-black focus:outline-none"
            />
          </div>
          <div className="p-4 border-2 w-[50%] flex flex-col gap-2">
            <p className="font-semibold">
              Enter the names of the different files:
            </p>
            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder="Enter the file name"
                value={colName}
                onChange={handleColNameInputChange}
                className={`border-b-2 p-2 border-black focus:outline-none w-full ${textErr && 'border-secondary'}`}
              />
              <button className="bg-primary p-2 w-14 rounded-md flex items-center justify-center text-white" onClick={handleColsOnSubmit}><Icon icon="fa6-solid:plus" /></button>
            </div>
            <div className="flex flex-wrap gap-2 w-full">
                {cols.map((col, index) => (
                    <div key={index} className="p-2 border rounded-md">{col}</div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SubFiles;
