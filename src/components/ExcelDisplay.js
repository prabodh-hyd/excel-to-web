import React, { useState } from 'react';
import * as XLSX from 'xlsx';

function ExcelDisplay() {
  const [data, setData] = useState({}); // To store parsed Excel data by sheet
  const [selectedSheet, setSelectedSheet] = useState(null); // To track selected sheet

  // Parse Excel Data
  const parseExcel = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Parse each sheet in the workbook
      const parsedSheets = {};
      workbook.SheetNames.forEach((sheetName) => {
        const sheet = workbook.Sheets[sheetName];
        parsedSheets[sheetName] = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Convert to 2D array
      });

      setData(parsedSheets);
      setSelectedSheet(workbook.SheetNames[0]); // Default to the first sheet
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={(e) => parseExcel(e.target.files[0])} />
      <div>
        {Object.keys(data).length > 0 && (
          <div>
            <h3>Select a Sheet</h3>
            {Object.keys(data).map((sheetName, index) => (
              <button
                key={index}
                onClick={() => setSelectedSheet(sheetName)}
                className={selectedSheet === sheetName ? 'active-tab' : 'tab'}
              >
                {sheetName}
              </button>
            ))}
          </div>
        )}

        {selectedSheet && data[selectedSheet] && (
          <div>
            <h3>Sheet: {selectedSheet}</h3>
            <div className="card-container">
              {data[selectedSheet].slice(1).map((row, rowIndex) => (
                <div key={rowIndex} className="card">
                  {data[selectedSheet][0].slice(1).map((header, colIndex) => (
                    <div key={`cell-${rowIndex}-${colIndex}`} className="card-item">
                      <strong>{header}: </strong> {row[colIndex + 1] || 'N/A'}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ExcelDisplay;
