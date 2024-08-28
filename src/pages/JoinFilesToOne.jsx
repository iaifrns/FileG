import React, { useEffect, useState } from "react";
import Layout from "../layout/Layout";
import { Icon } from "@iconify/react/dist/iconify.js";
import mergeCSVFiles from "../helper/merge-cvs";
import { SubmitButton } from "../components/button";

const JoinFilesToOne = () => {
  const [files, setFiles] = useState();
  const [filtedFiles, setFiltedFiles] = useState();
  const [filterText, setFilterText] = useState("");
  const [fileName, setFileName] = useState("");
  const [finished, setFinished] = useState(false);

  const [error, setError] = useState({ fileName: false, files: false });

  const handleFileUpload = (event) => {
    const fileList = event.target.files;
    const fileArray = Array.from(fileList).filter(file => file.type == 'text/csv')
    setFiles(fileArray);
    setFiltedFiles(fileArray);
  };

  const handleSearchInputChanges = (event) => {
    setFilterText(event.target.value);
  };

  const handleFileNameChanges = (event) => {
    setFileName(event.target.value);
  };

  useEffect(() => {
    if (filtedFiles) {
      const newArray = [];
      files.forEach((file) => {
        if (file.name.includes(filterText)) {
          newArray.push(file);
        }
      });
      setFiltedFiles(newArray);
    }
  }, [filterText]);

  useEffect(() => {
    setFilterText("");
  }, [files]);

  useEffect(() => {
    console.log("in here")
    setFiles(undefined);
    setFiltedFiles(undefined);
    setFileName("");
    setError({ fileName: false, files: false });
  }, [finished==true]);

  const removeAFile = (index) => {
    const newArray = files.filter((_, i) => i != index);
    setFiles(newArray);
    setFiltedFiles(newArray);
  };

  const handleSubmit = () => {
    let errFiles = false;
    let errFileName = false;
    if (files == undefined) {
      errFiles = true;
    }
    if (fileName.length < 1) {
      errFileName = true;
    }

    if (!errFileName && !errFiles) {
      setError({ fileName: false, files: false });
      setFinished(mergeCSVFiles(files, fileName));
    }

    setError({ fileName: errFileName, files: errFiles });
  };

  return (
    <Layout>
      <div className="p-4 px-10 flex flex-col items-center w-full gap-8 mb-4">
        <div className="flex flex-col gap-2 items-center">
          <p className="text-3xl font-semibold text-primary">
            Fusionner des Fichiers CSV en un Seul
          </p>
          {(error.fileName || error.files) && (
            <p className="text-secondary">Enter the missing informations</p>
          )}
        </div>
        <div className="flex flex-col gap-4 p-2 w-[50%]">
          <div
            className={`flex flex-col border-2 p-4 w-full ${
              error.fileName && "border-secondary"
            }`}
          >
            <p>Finale File Name:</p>
            <input
              type="text"
              value={fileName}
              onChange={handleFileNameChanges}
              className="w-full border-b-2 border-black focus:outline-none"
            />
          </div>
          <div
            className={`flex flex-col border-2 p-4 w-full ${
              error.files && "border-secondary"
            }`}
          >
            <p>Upload Files Here:</p>
            <input
              type="file"
              className="w-full border-b-2 border-black focus:outline-none py-2 cursor-pointer"
              webkitdirectory="true"
              directory="true"
              onChange={handleFileUpload}
            />
          </div>
        </div>
        <SubmitButton handleSubmit={handleSubmit} text ={'Join Files'} />
        {files && (
          <div className="flex flex-col items-end w-[80%] gap-2">
            <div className="border w-[350px] p-3 border-gray-600 rounded-md flex justify-between items-center">
              <input
                type="text"
                placeholder="Search ...."
                className="w-[90%] focus:outline-none"
                value={filterText}
                onChange={handleSearchInputChanges}
              />
              <Icon icon="icon-park:search" className="text-lg" />
            </div>
            {filtedFiles.length > 0 ? (
              <div className="p-4 w-full flex gap-2 flex-wrap h-[200px] overflow-auto">
                {filtedFiles.map((file, index) => (
                  <div
                    key={index}
                    className="flex gap-2 p-2 border items-center"
                  >
                    <p className="text-gray-600">{file.name}</p>
                    <Icon
                      icon="bitcoin-icons:cross-filled"
                      className="cursor-pointer"
                      onClick={() => removeAFile(index)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex w-full justify-center items-center gap-2 h-[100px]">
                <Icon
                  icon="hugeicons:file-not-found"
                  className="text-2xl text-secondary"
                />
                <p className="font-bold text-2xl text-secondary">No File</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default JoinFilesToOne;
