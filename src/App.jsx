import React, { useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import * as XLSX from 'xlsx';
import './App.css';
import BgSquare from './components/boxbackground';
import Pivot from './components/pivot';
import Summary from './components/Summary';
import BarGraph from './components/BarGraph';
import Sidebar from './components/Sidebar';
import DonutChart from './components/DonutChart';
import { processRawData, calculateSummaryData } from './components/dataCalculations'; // Import the utility functions

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
        queryClient.invalidateQueries(['getData', selectedPivot]);
      }
    }
  );

  const { data: rawData = [], isLoading, isError } = useQuery(
    ['getData', selectedPivot],  
    () => fetch(`http://localhost:3001/getData?pivotType=${selectedPivot}`).then(res => res.json()),
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
    return processRawData(rawData, selectedPivot);  // Use the utility function
  }, [rawData, selectedPivot]);
  
  const summaryData = useMemo(() => {
    return calculateSummaryData(processedData);  // Use the utility function
  }, [processedData]);

  const filterABC = data => data.filter(item => ['A', 'B', 'C'].includes(item.CODE));

  // Create data for DonutChart components based on the Summary data
  const donutChartDataABCItems = filterABC(Object.values(summaryData))
    .map(item => ({ name: item.CODE, value: item['ABC ITEMS'] }));
  
  const totalABCItems = filterABC(Object.values(summaryData))
    .reduce((sum, item) => sum + item['ABC ITEMS'], 0);
  
  const donutChartDataPercentItems = filterABC(Object.values(summaryData))
    .map(item => ({ name: item.CODE, value: (item['ABC ITEMS'] / totalABCItems) * 100 }));
  
  const donutChartDataTotalAmount = filterABC(Object.values(summaryData))
    .map(item => ({ name: item.CODE, value: item['TOTAL AMOUNT'] }));
  
  const totalAmount = filterABC(Object.values(summaryData))
    .reduce((sum, item) => sum + item['TOTAL AMOUNT'], 0);
  
  const donutChartDataPercentSales = filterABC(Object.values(summaryData))
    .map(item => ({ name: item.CODE, value: (item['TOTAL AMOUNT'] / totalAmount) * 100 }));
  

  return (
    <div className="App">
      <div className="Sidebar">
        <Sidebar handleFileChange={handleFileChange} /> {/* Added handleFileChange as a prop */}
      </div>
      <div className="barGraphOverlay">
      </div>
      <BgSquare>
      <div className="donutChartsContainer">
      <DonutChart
        data={donutChartDataABCItems}
        width={500}  
        height={500} 
        innerRadius={100} 
        outerRadius={130} 
        wrapperClass="donutChartWrapper1"
        label="ABC Items"
        isPercent={false} /* If this value is a percent value */
      />
      <DonutChart
        data={donutChartDataPercentItems}
        width={500}  
        height={500} 
        innerRadius={100} 
        outerRadius={130} 
        wrapperClass="donutChartWrapper2"
        label="% Items"
        isPercent={true}
      />
      <DonutChart
        data={donutChartDataTotalAmount}
        width={500}  
        height={500}
        innerRadius={100}
        outerRadius={130}
        wrapperClass="donutChartWrapper3"
        label="Total Amount"
        isPercent={false}
      />
      <DonutChart
        data={donutChartDataPercentSales}
        width={500}  
        height={500} 
        innerRadius={100} 
        outerRadius={130}
        wrapperClass="donutChartWrapper4"
        label="% Sales"
        isPercent={true}
      />
        </div>
        <div className="leftContent">
          <div className="summary-wrapper">
            <select className="pivot-dropdown" onChange={handlePivotChange}>
              <option value="PIVOT VALUES">PIVOT VALUES</option>
              <option value="PIVOT CONSUMPTION">PIVOT CONSUMPTION</option>
            </select>
            <Summary data={summaryData} />
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
