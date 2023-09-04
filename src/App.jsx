import React, { useState, useEffect, useMemo } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import BgSquare from './components/boxbackground';
import Pivot from './components/pivot';
import Summary from './components/Summary';
import BarGraph from './components/BarGraph';

function App() {
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    // List of all XLSX files in the public folder.
    const files = ['Sany.xlsx', 'SDLG.xlsx', 'trucks.xlsx', 'UD.xlsx', 'Volvo_CE.xlsx'];

    let combinedData = [];

    Promise.all(
      files.map(file => 
        fetch(`${file}`)
          .then(response => response.arrayBuffer())
          .then(buffer => {
            const workbook = XLSX.read(buffer, { type: 'buffer' });
            const worksheet = workbook.Sheets["PIVOT VALUES"];
            if (worksheet) {
              const jsonData = XLSX.utils.sheet_to_json(worksheet);
              combinedData.push(...jsonData);
            }
          })
      )
    ).then(() => setRawData(combinedData));

  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const buffer = e.target.result;
        const workbook = XLSX.read(buffer, { type: 'binary' });
        const worksheet = workbook.Sheets["PIVOT VALUES"];
        if (worksheet) {
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setRawData(prevData => [...prevData, ...jsonData]);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const processedData = useMemo(() => {
    let combinedData = [...rawData];
    // Sort the combined data by "TOTAL VALUE" in descending order
    combinedData.sort((a, b) => {
      const aValue = isNaN(Number(a["TOTAL VALUE"])) ? -Infinity : Number(a["TOTAL VALUE"]);
      const bValue = isNaN(Number(b["TOTAL VALUE"])) ? -Infinity : Number(b["TOTAL VALUE"]);
      return bValue - aValue;
    });

    // Assign new ranks based on the sorted order
    combinedData.forEach((item, index) => {
      item.RANK = index + 1;
    });

    return combinedData;

  }, [rawData]);

  return (
    <div className="App">
      <input 
        type="file" 
        accept=".xlsx" 
        id="fileInput" 
        style={{ display: 'none' }} 
        onChange={handleFileChange} 
      />
      <button onClick={() => document.getElementById('fileInput').click()}>
        Upload .xlsx File
      </button>
      <BgSquare>
        <div className="leftContent">
          <div className="summary-wrapper">
            <Summary data={processedData} />
          </div>
          <div className="pivot-wrapper">
            <Pivot data={processedData} />
          </div>
          <div className="toppref"></div>

        </div>

      </BgSquare>

    </div>
  );
}

export default App;
