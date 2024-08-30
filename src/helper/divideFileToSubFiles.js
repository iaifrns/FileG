import * as XLSX from "xlsx";

export const divideFileToSubFile = (file, cols) => {
  fileReader(file).then((result) => {
    const len = result.length;
    if (len < 1) return alert("sorry the file is empty");
    const eachFileSize = Math.ceil(len / cols.length) + 1;
    const data = fileDifferentData(result, cols, eachFileSize);
    console.log(data);
    joinFilesAndDownload(data, file.name, cols);
  });
};

const fileReader = (file) => {
  return new Promise((result) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n");
      result(rows);
    };
    reader.readAsText(file);
  });
};

const fileDifferentData = (rows, cols, size) => {
  const data = {};
  let colIndex = 0;
  for (let i = 1; i < rows.length; i++) {
    if (!data[cols[colIndex]]) {
      data[cols[colIndex]] = [[rows[0]]];
    }
    console.log(typeof([rows[i]]))
    data[cols[colIndex]].push([rows[i]]);
    if (i % size == 0) colIndex++;
  }

  return data;
};

const joinFilesAndDownload = (data, fileName, cols) => {
  // Create a new workbook
  const wb = XLSX.utils.book_new();

  // Add sheets to the workbook
  Object.keys(data).forEach((sheetName) => {
    const wsData = data[sheetName];
    if (Array.isArray(wsData) && wsData.every((row) => Array.isArray(row))) {
      const ws = XLSX.utils.aoa_to_sheet(wsData);
      XLSX.utils.book_append_sheet(wb, ws, sheetName);
    } else {
      console.error(`Data for ${sheetName} is not an array of arrays`);
    }
  });
  // Write the workbook to a binary string
  const wbout = XLSX.write(wb, { bookType: "xlsx", type: "binary" });

  // Convert the binary string to a Blob
  const blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", fileName + ".xlsx");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
};
