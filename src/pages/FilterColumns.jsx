import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { SubmitButton } from "../components/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { mergeColumns } from "../helper/filter-col";
import { writeMergedCSV } from "../helper/merge-cvs";
import { image } from "../constants/image";

const FilterColumns = () => {
  const [colNumber, setColNumber] = useState("");
  const [colList, setColList] = useState([]);
  const [files, setFiles] = useState();
  const [error, setError] = useState({ fileUpload: false, columns: false });
  const [loading, setLoading] = useState(false);

  const handleColNumber = (event) => {
    const num = event.target.value;
    if (/^\d+$/.test(num) || num == "") {
      setColNumber(num);
    }
  };

  const handleColList = () => {
    if (colNumber.length != 0) {
      setColList([...colList, colNumber]);
      setColNumber("");
    }
  };

  const removeColNumberFromList = (index) => {
    const newArr = colList.filter((_, ind) => ind != index);
    setColList(newArr);
  };

  const handleFiles = (event) => {
    const filesList = Array.from(event.target.files);
    setFiles(filesList);
  };

  const readFileAsText = (file, colList) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = mergeColumns(e.target.result, colList);
        resolve(result);
      };
      reader.onerror = (e) => reject(e);
      reader.readAsText(file);
    });
  };

  const handleSubmit = async () => {
    setLoading(true);
    let fileError = false,
      colError = false;
    if (files == undefined) {
      fileError = true;
    }
    if (colList.length < 2) {
      colError = true;
    }

    setError({ fileUpload: fileError, columns: colError });

    const filterFileList = [];

    if (!fileError && !colError) {
      for (let i = 0; i < files.length; i++) {
        const result = await readFileAsText(files[i], colList);
        filterFileList.push(result);
      }
      downloadFile(files, filterFileList);
      setLoading(false);
    }
  };

  const downloadFile = (files, filterFileList) => {
    for (let i = 0; i < files.length; i++) {
      console.log(filterFileList[i], i, typeof filterFileList[i]);
      writeMergedCSV(files[i].name, filterFileList[i]);
    }
  };

  const [style, setStyle] = useState(false);

  useEffect(() => {
    const time = setInterval(() => {
      setStyle(!style);
    }, 1000);
    return () => setTimeout(time);
  }, [loading]);

  return (
    <Layout>
      <div className="flex flex-col p-4 px-10 w-full items-center">
        {loading ? (
          <div className="flex w-full justify-center h-full items-center">
            <img
              src={image.logo1}
              className={`transition-transform duration-300 transform w-[200px] ${
                style ? "scale-90" : "scale-[1.5]"
              }`}
            />
          </div>
        ) : (
          <div className="flex flex-col w-[70%] items-center mt-4 gap-16">
            <div className="flex flex-col items-center gap-2">
              <p className="text-3xl font-semibold text-primary text-center">
                Extraire et Conserver Certaines Colonnes d’un Fichier CSV
              </p>
              {(error.columns || error.fileUpload) && (
                <p className="text-secondary">
                  Enter all the informations please
                </p>
              )}
            </div>
            <div className="flex flex-col items-center w-[600px] gap-4">
              <div
                className={`p-4 border-2 w-full flex flex-col gap-2 ${
                  error.fileUpload && "border-secondary"
                }`}
              >
                <p className="font-semibold">Upload The File :</p>
                <input
                  type="file"
                  className="border-b-2 border-black p-2"
                  multiple
                  onChange={handleFiles}
                />
              </div>
              <div
                className={`flex w-full border-2 p-4 flex-col gap-2 ${
                  error.columns && "border-secondary"
                }`}
              >
                <p className="">How many columns should be joined :</p>
                <div className="flex w-full">
                  <input
                    type="text"
                    className="p-2 border-b-2 border-black focus:outline-none w-full"
                    placeholder="Enter the number"
                    value={colNumber}
                    onChange={handleColNumber}
                  />
                  <button
                    className="p-2 border-2 w-[50px] bg-primary rounded-md flex justify-center items-center"
                    onClick={handleColList}
                  >
                    <Icon icon="fa6-solid:plus" className="text-white" />
                  </button>
                </div>
                <div
                  className={`flex flex-wrap gap-2 w-full ${
                    colList.length > 0 && "mt-2"
                  }`}
                >
                  {colList.map((col, index) => (
                    <div
                      key={index}
                      className="p-1 border-2 border-gray-400 rounded-md flex gap-2 items-center"
                    >
                      {col}
                      <Icon
                        icon="bitcoin-icons:cross-filled"
                        className="cursor-pointer"
                        onClick={() => removeColNumberFromList(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <SubmitButton text={"Join Columns"} handleSubmit={handleSubmit} />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FilterColumns;
