import React from 'react';
import './Summary.css';

/**
 * Summary Component
 * 
 * This component displays the summary table data including:
 * - Code (e.g., A, B, C, or TOTAL)
 * - Range %
 * - ABC Items count
 * - % Items (percentage of total ABC items)
 * - Total Amount
 * - % Sales (percentage of total sales amount)
 * 
 * @param {Object} data - The processed data to be displayed in the summary table.
 */
function Summary({ data }) {
    const groupedData = data;

    // Define the relevant categories to be included in the summary calculations
    const relevantCategories = ['A', 'B', 'C'];

    // Calculate the total ABC items and the total amount only for the relevant categories
    const totalABCItems = Object.values(groupedData).reduce((sum, item) => relevantCategories.includes(item.CODE) ? sum + item["ABC ITEMS"] : sum, 0);
    const totalAmount = Object.values(groupedData).reduce((sum, item) => relevantCategories.includes(item.CODE) ? sum + item["TOTAL AMOUNT"] : sum, 0);

    // Preprocess the data to replace undefined or blank 'CODE' values with 'TOTAL'
    const processedGroupedData = Object.values(groupedData).map(item => {
        if (!item.CODE || item.CODE.trim() === '') {
            return { ...item, CODE: 'TOTAL' };
        }
        return item;
    });

    // Sort the data by 'CODE' in the order 'A', 'B', 'C', and keep 'Total' at the end
    const sortedData = processedGroupedData.sort((a, b) => {
        if (a.CODE === 'TOTAL') return 1;
        if (b.CODE === 'TOTAL') return -1;
        return relevantCategories.indexOf(a.CODE) - relevantCategories.indexOf(b.CODE);
    });

    return (
        <div className="Summary">
            <div className="scrollable-container">
                <table>
                    <thead>
                        <tr>
                            <th>Code</th>
                            <th>Range %</th>
                            <th>ABC Items</th>
                            <th>% Items</th>
                            <th>Total Amount</th>
                            <th>% Sales</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item, idx) => {
                            const percentItems = totalABCItems !== 0 ? (item["ABC ITEMS"] / totalABCItems) * 100 : 0;
                            const percentSales = totalAmount !== 0 ? (item["TOTAL AMOUNT"] / totalAmount) * 100 : 0;

                            // Round up "Total Amount" to the nearest whole number
                            const roundedTotalAmount = Math.ceil(item["TOTAL AMOUNT"]);

                            return (
                                <tr key={idx}>
                                    <td>{item.CODE}</td>
                                    <td>{item["RANGE %"]}</td>
                                    <td>{item["ABC ITEMS"].toLocaleString()}</td>
                                    <td>{percentItems.toFixed(2)}%</td>
                                    <td>{roundedTotalAmount.toLocaleString()}</td> {/* Display the rounded value */}
                                    <td>{percentSales.toFixed(2)}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );    
}

export default Summary;
