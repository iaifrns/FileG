import Papa from "papaparse";
const columnsToStay = [
  "bi-denomination",
  "pj-lb",
  "bi-description",
  "annonceur",
  "number-contact 2",
  "annonceur 2",
  "number-contact",
];
const mergedData = [];
let headers = null;

export default function mergeCSVFiles(files, fileName) {
  let result = false;
  if (files.length === 0) return;
  const len = files.length;
  let filesProcessed = 0;

  for (let i = 0; i < len; i++) {
    const file = files[i];
    Papa.parse(file, {
      header: true,
      complete: function (results) {
        if (!headers) {
          headers = columnsToStay;
          mergedData.push(headers);
        }

        results.data.forEach((row) => {
          const filteredRow = columnsToStay.map((column) => row[column] || "");
          mergedData.push(filteredRow);
        });

        filesProcessed++;
        if (filesProcessed === files.length) {
          result = writeMergedCSV(fileName, mergedData);
        }
      },
    });
  }
  return result;
}

export function writeMergedCSV(outputFile, mergedData) {
  let csvContent;
  console.log(typeof mergedData)
  if (typeof mergedData != "string") {
    csvContent = mergedData
      .map((e) => e.join(";"))
      .join("\n")
      .replaceAll('"', "");
  } else {
    csvContent = mergedData;
  }

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a link element to trigger the download
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", outputFile);

  // Append the link to the document, click it to trigger download, then remove it
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Release the object URL after the download
  URL.revokeObjectURL(url);

  if (typeof mergedData != "string") alert("CSV files merged successfully");
  return true;
}
