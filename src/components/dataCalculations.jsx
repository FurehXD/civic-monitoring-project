export function processRawData(rawData, selectedPivot) {
    let combinedData = [...rawData];
  
    const sortField = selectedPivot === 'PIVOT VALUES' ? 'TOTAL VALUE' : 'TOTAL QTY';
    combinedData.sort((a, b) => {
      const aValue = isNaN(Number(a[sortField])) ? -Infinity : Number(a[sortField]);
      const bValue = isNaN(Number(b[sortField])) ? -Infinity : Number(b[sortField]);
      return bValue - aValue;
    });
  
    combinedData.forEach((item, index) => {
      item.RANK = index + 1;
    });
  
    return combinedData;
  }
  
  export function calculateSummaryData(processedData) {
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
  }
  