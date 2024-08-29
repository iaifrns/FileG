import React from 'react';

const generateCSVContent = () => {
  // Data for the three pages (or sheets)
  const pages = {
    "Page 1": [
      ["Name", "Age", "City"],
      ["Alice", "25", "New York"],
      ["Bob", "30", "Los Angeles"],
    ],
    "Page 2": [
      ["Product", "Price", "Quantity"],
      ["Apple", "1.20", "10"],
      ["Orange", "0.80", "20"],
    ],
    "Page 3": [
      ["Course", "Duration", "Instructor"],
      ["Math", "3 months", "John Doe"],
      ["Science", "4 months", "Jane Smith"],
    ]
  };

  // Generate CSV content
  let csvContent = '';
  for (const [pageName, rows] of Object.entries(pages)) {
    csvContent += `--- ${pageName} ---\n`;
    rows.forEach(row => {
      csvContent += row.join(",") + "\n";
    });
    csvContent += "\n"; // Add a blank line between pages
  }

  return csvContent;
};

const downloadCSV = () => {
  const csvContent = generateCSVContent();
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'multi-page-csv.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const CSVDownloadComponent = () => {
  return (
    <div>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default CSVDownloadComponent;
