export const deleteColumnsInFile = (columns, lines) => {
  let newCol = columns;
  for (let i = 1; i < lines.length; i++) {
    newCol = newCol.filter((_, index) => {
      return index != lines[i];
    });
  }
  return newCol;
};
