/**
 * This utility function processes the raw data based on the selected pivot.
 * 
 * @param {Array} rawData - The original data array fetched from the server.
 * @param {string} selectedPivot - The selected pivot type (either 'PIVOT VALUES' or 'PIVOT CONSUMPTION').
 * @returns {Array} - Returns the processed data array.
 */
export function processRawData(rawData, selectedPivot) {
  let combinedData = [...rawData];

  // Decide the sort field based on the selected pivot
  const sortField = selectedPivot === 'PIVOT VALUES' ? 'TOTAL VALUE' : 'TOTAL QTY';

  // Sort the data based on the determined sort field
  combinedData.sort((a, b) => {
    const aValue = isNaN(Number(a[sortField])) ? -Infinity : Number(a[sortField]);
    const bValue = isNaN(Number(b[sortField])) ? -Infinity : Number(b[sortField]);
    return bValue - aValue;
  });

  // Assign rank based on the sorted order
  combinedData.forEach((item, index) => {
    item.RANK = index + 1;
  });

  return combinedData;
}

/**
* This utility function calculates the summary data from the processed data.
* 
* @param {Array} processedData - The processed data array.
* @returns {Object} - Returns an object containing the summary data grouped by 'CODE'.
*/
export function calculateSummaryData(processedData) {
  const groupedData = processedData.reduce((acc, item) => {
    const code = item.CODE;

    // Initialize the accumulator for each unique code
    if (!acc[code]) {
      acc[code] = { ...item, "ABC ITEMS": 0, "TOTAL AMOUNT": 0 };
    }

    // Accumulate 'ABC ITEMS' and 'TOTAL AMOUNT' for each unique code
    acc[code]["ABC ITEMS"] += isNaN(item["ABC ITEMS"]) ? 0 : parseFloat(item["ABC ITEMS"]);
    acc[code]["TOTAL AMOUNT"] += isNaN(item["TOTAL AMOUNT"]) ? 0 : parseFloat(item["TOTAL AMOUNT"]);
    
    return acc;
  }, {});

  return groupedData;
}