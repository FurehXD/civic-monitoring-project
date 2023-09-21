import React from 'react';
import './Pivot.css';

function Pivot({ data, selectedPivot }) {

  const renderTableHeaders = () => {
    if (selectedPivot === "PIVOT VALUES") {
      return (
        <tr>
          <th>Rank</th>
          <th>Total Value</th>
          <th>Part Number</th>
          <th>Description</th>
          <th>Cum Value</th>
          <th>C Qty</th>
          <th>ABC</th>
        </tr>
      );
    } else if (selectedPivot === "PIVOT CONSUMPTION") {
      return (
        <tr>
          <th>Rank</th>
          <th>Total Qty</th>
          <th>Part Number</th>
          <th>Description</th>
          <th>Total Value</th>
          <th>Cum Qty</th>
          <th>ABC</th>
        </tr>
      );
    }
  };

  const renderTableRows = () => {
    if (selectedPivot === "PIVOT VALUES") {
      return data.map((item, idx) => {
        // Round up "Total Value" and "Cum Value" to the nearest whole number
        const roundedTotalValue = Math.ceil(item['TOTAL VALUE']);
        const roundedCumValue = Math.ceil(item['CUM VALUE']);
  
        return (
          <tr key={idx}>
            <td>{item.RANK}</td>
            <td>{roundedTotalValue.toLocaleString()}</td> {/* Use the rounded value */}
            <td>{item['PART NUMBER']}</td>
            <td className="truncate-text">{item.DESCRIPTION}</td>
            <td>{roundedCumValue.toLocaleString()}</td> {/* Use the rounded value */}
            <td>{parseFloat(item['C QTY']).toLocaleString()}</td>
            <td>{item.ABC}</td>
          </tr>
        );
      });
    } else if (selectedPivot === "PIVOT CONSUMPTION") {
      return data.map((item, idx) => {
        // Round up "Total Value" to the nearest whole number for "PIVOT CONSUMPTION"
        const roundedTotalValueConsumption = Math.ceil(item['TOTAL VALUE']);
        const roundedCumValueConsumption = Math.ceil(item['CUM QTY']);
  
        return (
          <tr key={idx}>
            <td>{item.RANK}</td>
            <td>{parseFloat(item['TOTAL QTY']).toLocaleString()}</td>
            <td>{item['PART NUMBER']}</td>
            <td className="truncate-text">{item.DESCRIPTION}</td>
            <td>{roundedTotalValueConsumption.toLocaleString()}</td> {/* Use the rounded value for "PIVOT CONSUMPTION" */}
            <td>{roundedCumValueConsumption.toLocaleString()}</td> {/* Use the rounded value for "CUM QTY" */}
            <td>{item.ABC}</td>
          </tr>
        );
      });
    }
  };
  

  return (
    <div className="Pivot">
      <div className="scrollable-container">
        <table>
          {/* Add colgroup here to set column widths */}
          <colgroup>
            <col style={{width: "5%"}} />
            <col style={{width: "15%"}} />
            <col style={{width: "15%"}} />
            <col style={{width: "35%"}} />
            <col style={{width: "15%"}} />
            <col style={{width: "10%"}} />
            <col style={{width: "10%"}} />
          </colgroup>
          <thead>
            {renderTableHeaders()}
          </thead>
          <tbody>
            {renderTableRows()}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pivot;
