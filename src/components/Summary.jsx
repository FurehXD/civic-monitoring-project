import React from 'react';
import './Summary.css';

function Summary({ data }) {

    // Group data by CODE and sum ABC ITEMS and TOTAL AMOUNT
    const groupedData = data.reduce((acc, item) => {
        const code = item.CODE;
        if (!acc[code]) {
            acc[code] = { ...item, "ABC ITEMS": 0, "TOTAL AMOUNT": 0 };
        }
        acc[code]["ABC ITEMS"] += isNaN(item["ABC ITEMS"]) ? 0 : parseFloat(item["ABC ITEMS"]);
        acc[code]["TOTAL AMOUNT"] += isNaN(item["TOTAL AMOUNT"]) ? 0 : parseFloat(item["TOTAL AMOUNT"]);
        return acc;
    }, {});

    const totalABCItems = Object.values(groupedData).reduce((sum, item) => sum + item["ABC ITEMS"], 0);
    const totalAmount = Object.values(groupedData).reduce((sum, item) => sum + item["TOTAL AMOUNT"], 0);

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
                    {Object.values(groupedData).map((item, idx) => {
                      const percentItems = totalABCItems !== 0 ? (item["ABC ITEMS"] / totalABCItems) * 100 : 0;
                      const percentSales = totalAmount !== 0 ? (item["TOTAL AMOUNT"] / totalAmount) * 100 : 0;

                      // Debug information
                      console.log(`Code: ${item.CODE}, ABC ITEMS: ${item["ABC ITEMS"]}, % Items: ${percentItems.toFixed(2)}%, TOTAL AMOUNT: ${item["TOTAL AMOUNT"]}, % Sales: ${percentSales.toFixed(2)}%`);

                      return (
                          <tr key={idx}>
                              <td>{item.CODE}</td>
                              <td>{item["RANGE %"]}</td>
                              <td>{item["ABC ITEMS"].toLocaleString()}</td>
                              <td>{percentItems.toFixed(2)}%</td>
                              <td>{item["TOTAL AMOUNT"].toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
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
