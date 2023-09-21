import React from 'react';
import './Summary.css';

function Summary({ data }) {
    const groupedData = data;

    // Only sum up the totals for categories 'A', 'B', and 'C'
    const relevantCategories = ['A', 'B', 'C'];
    const totalABCItems = Object.values(groupedData).reduce((sum, item) => relevantCategories.includes(item.CODE) ? sum + item["ABC ITEMS"] : sum, 0);
    const totalAmount = Object.values(groupedData).reduce((sum, item) => relevantCategories.includes(item.CODE) ? sum + item["TOTAL AMOUNT"] : sum, 0);

    // Preprocess the groupedData to set 'CODE' as 'Total' if it's undefined or blank
    const processedGroupedData = Object.values(groupedData).map(item => {
        if (!item.CODE || item.CODE.trim() === '') {
        return { ...item, CODE: 'TOTAL' };
        }
        return item;
    });
    
    // Sort the data by 'CODE' in the order 'A', 'B', 'C' and keep 'Total' at the end
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
                              <td>{roundedTotalAmount.toLocaleString()}</td> {/* Use the rounded value */}
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
