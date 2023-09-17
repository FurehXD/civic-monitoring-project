import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as XLSX from 'xlsx';
import './App.css';
import BgSquare from './components/boxbackground';
import Pivot from './components/pivot';
import Summary from './components/Summary';
import BarGraph from './components/BarGraph';
import Sidebar from './components/Sidebar';
import TopPref from './components/TopPref';
import DonutChart from './components/DonutChart';

function App() {
  const [selectedPivot, setSelectedPivot] = React.useState("PIVOT VALUES");
  const queryClient = useQueryClient();

  const setSelectedPivotMutation = useMutation(
    selectedPivot => fetch('http://localhost:3001/setSelectedPivot', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ selectedPivot })
    }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('getData');
      }
    }
  );

  const { data: rawData = [], isLoading, isError } = useQuery(
    'getData',
    () => fetch('http://localhost:3001/getData').then(res => res.json()),
    {
      enabled: !setSelectedPivotMutation.isLoading
    }
  );

  const handlePivotChange = async (e) => {
    await setSelectedPivotMutation.mutateAsync(e.target.value);
    setSelectedPivot(e.target.value);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        const buffer = e.target.result;
        const workbook = XLSX.read(buffer, { type: 'binary' });
        const worksheet = workbook.Sheets[selectedPivot];
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
  // Calculate Summary Data
  const summaryData = useMemo(() => {
    const groupedData = processedData.reduce((acc, item) => {
      const code = item.CODE;
      if (!acc[code]) {
        acc[code] = { ...item, "ABC ITEMS": 0, "TOTAL AMOUNT": 0 };
      }
      acc[code]["ABC ITEMS"] += isNaN(item["ABC ITEMS"]) ? 0 : parseFloat(item["ABC ITEMS"]);
      acc[code]["TOTAL AMOUNT"] += isNaN(item["TOTAL AMOUNT"]) ? 0 : parseFloat(item["TOTAL AMOUNT"]);
      return acc;
    }, {});
    return groupedData;
  }, [processedData]);

    // Create data for DonutChart components based on the Summary data
    const donutChartDataABCItems = Object.values(summaryData)
    .slice(0, 3)  // Only take the first 3 rows
    .map(item => ({ name: item.CODE, value: item['ABC ITEMS'] }));

    const donutChartDataTotalAmount = Object.values(summaryData)
    .slice(0, 3)  // Only take the first 3 rows
    .map(item => ({ name: item.CODE, value: item['TOTAL AMOUNT'] }));

    const donutChartDataPercentSales = Object.values(summaryData)
    .slice(0, 3)  // Only take the first 3 rows
    .map(item => ({ name: item.CODE, value: item['TOTAL AMOUNT'] / Object.values(summaryData).reduce((sum, i) => sum + i['TOTAL AMOUNT'], 0) * 100 }));

  return (
    <div className="App">
      <div className="Sidebar">
        <Sidebar handleFileChange={handleFileChange} /> {/* Added handleFileChange as a prop */}
      </div>
      <div className="barGraphOverlay">
        <BarGraph />
      </div>
      <BgSquare>
      <TopPref data={processedData} />
      
      <DonutChart
          data={donutChartDataABCItems}
          width={400}
          height={400}
          innerRadius={80}
          outerRadius={110}
          wrapperClass="donutChartWrapper1"
          label="ABC Items"
        />
        <DonutChart
          data={donutChartDataTotalAmount}
          width={400}
          height={400}
          innerRadius={80}
          outerRadius={110}
          wrapperClass="donutChartWrapper2"
          label="Total Amount"
        />
        <DonutChart
          data={donutChartDataPercentSales}
          width={400}
          height={400}
          innerRadius={80}
          outerRadius={110}
          wrapperClass="donutChartWrapper3"
          label="% Sales"
        />
        <div className="leftContent">
          <div className="summary-wrapper">
            <select className="pivot-dropdown" onChange={handlePivotChange}>
              <option value="PIVOT VALUES">PIVOT VALUES</option>
              <option value="PIVOT CONSUMPTION">PIVOT CONSUMPTION</option>
            </select>
            <Summary data={processedData} />
          </div>
          <div className="pivot-wrapper">
            <Pivot data={processedData} selectedPivot={selectedPivot} />
          </div>
        </div>
      </BgSquare>
    </div>
  );
}

export default App;
