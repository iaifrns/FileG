import { deleteColumnsInFile } from "./deleteColumsInFile";

const occurance = (str, char) => str.split(char).length - 1;

export function mergeColumns(csvData, colList) {
  const rows = csvData.split("\n");
  let r= colList.map(num => parseInt(num-1))
  console.log(r.sort((a,b) => a-b))
  const colSortList = r.sort((a,b) => a-b);
  const spliter = occurance(rows[0], ";") > 2 ? ";" : ",";
  
  const mergedRows = rows.map((row) => {
    const columns = row.split(spliter);
    let colContent = columns[colSortList[0]];
    for (let i = 0; i < colList.length; i++) {
      colContent =
        (colContent ?? "").toString().length > 5
          ? colContent
          : columns[colSortList[i]];
    }
    columns[colSortList[0]] = colContent;
    // Remove the last column (assuming it's not needed)
    const newCol = deleteColumnsInFile(columns, colSortList)
    return newCol.join(";");
  });

  const array = mergedRows.join("\n");

  return array;
}
