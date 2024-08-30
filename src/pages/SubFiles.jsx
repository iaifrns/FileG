import React, { useState } from "react";
import Layout from "../layout/Layout";
import { Icon } from "@iconify/react/dist/iconify.js";
import { SubmitButton } from "../components/button";
import { divideFileToSubFile } from "../helper/divideFileToSubFiles";

const SubFiles = () => {
  const [colName, setColName] = useState("");
  const [file, setFile] = useState()
  const [cols, setCols] = useState([]);
  const [textErr, setTextErr] = useState(false);
  const [error, setError] = useState({file: false, cols: false});

  const handleColNameInputChange = (e) => {
    setColName(e.target.value);
  };

  const handleFileUpload = (e) => {
    const fileContent = e.target.files[0]
    if(fileContent.type == "text/csv"){
        setFile(fileContent)
        console.log(e.target.files[0])
    }else alert("sorry we take only csv files ")
  }

  const handleColsOnSubmit = () => {
    if (colName.length > 0) {
      setCols([...cols, colName]);
      setColName("");
    } else setTextErr(true);
  };

  const removeColNameFromList = (index) => {
    const newArr = cols.filter((_, ind) => ind != index);
    setCols(newArr);
  };

  const handleSubmit = () => {
    let fileE = false;
    let textE = false;
    if(file ==undefined) fileE = true;
    if(cols.length < 1) textE =true;

    setError({file: fileE, cols: textE})
    
    if(!fileE && !textE) {
        divideFileToSubFile(file, cols)
        setFile(undefined)
        setCols([])
        setColName("")
    }
  }

  return (
    <Layout>
      <div className="flex flex-col p-4 px-10 items-center w-full gap-16">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">
            Divide a File To Subfiles
          </h1>
        </div>
        <div className="md:w-[70%] flex flex-col gap-8 items-center max-md:w-full">
          <div className={`p-4 border-2 w-[600px] flex flex-col gap-2 ${error.file && 'border-secondary'}`}>
            <p className="font-semibold">Choose the File here :</p>
            <input
              type="file"accept=".csv"
              className="border-b-2 p-2 border-black focus:outline-none hidden"
              id="fileUpload"
              onChange={handleFileUpload}
            />

            <label htmlFor="fileUpload" className="p-2 border-b border-black flex gap-2 items-center">
                <button className="border-[2px] p-1 border-gray-400 bg-gray-100 cursor-auto">Choose File</button>
                <p className="text-lg">{file?.name ?? "Choose File"}</p>
            </label>
          </div>
          <div className={`p-4 border-2 w-[600px] flex flex-col gap-2 ${error.cols && 'border-secondary'}`}>
            <p className="font-semibold">
              Enter the names of the different files:
            </p>
            <div className="flex w-full gap-2">
              <input
                type="text"
                placeholder="Enter the file name"
                value={colName}
                onChange={handleColNameInputChange}
                className={`border-b-2 p-2 border-black focus:outline-none w-full ${
                  textErr && "border-secondary"
                }`}
              />
              <button
                className="bg-primary p-2 w-14 rounded-md flex items-center justify-center text-white"
                onClick={handleColsOnSubmit}
              >
                <Icon icon="fa6-solid:plus" />
              </button>
            </div>
            <div className="flex flex-wrap gap-2 w-full">
              {cols.map((col, index) => (
                <div
                  key={index}
                  className="p-1 border-2 border-gray-400 rounded-md flex gap-2 items-center"
                >
                  {col}
                  <Icon
                    icon="radix-icons:cross-2"
                    className="cursor-pointer"
                    onClick={() => removeColNameFromList(index)}
                  />
                </div>
              ))}
              {cols.length < 1 && (
                <p className="w-full text-center p-1 text-sm text-gray-500">
                  No subfile name
                </p>
              )}
            </div>
            <p>Total: {cols.length}</p>
          </div>
          <SubmitButton
            text={"Divide File"}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </Layout>
  );
};

export default SubFiles;
