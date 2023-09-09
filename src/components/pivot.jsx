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
          <th>ABC</th>
          <th>C Qty</th>
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
      return data.map((item, idx) => (
        <tr key={idx}>
          <td>{item.RANK}</td>
          <td>{parseFloat(item['TOTAL VALUE']).toLocaleString()}</td>
          <td>{item['PART NUMBER']}</td>
          <td>{item.DESCRIPTION}</td>
          <td>{parseFloat(item['CUM VALUE']).toLocaleString()}</td>
          <td>{item.ABC}</td>
          <td>{parseFloat(item['C QTY']).toLocaleString()}</td>
        </tr>
      ));
    } else if (selectedPivot === "PIVOT CONSUMPTION") {
      return data.map((item, idx) => (
        <tr key={idx}>
          <td>{item.RANK}</td>
          <td>{parseFloat(item['TOTAL QTY']).toLocaleString()}</td>
          <td>{item['PART NUMBER']}</td>
          <td>{item.DESCRIPTION}</td>
          <td>{parseFloat(item['TOTAL VALUE']).toLocaleString()}</td>
          <td>{parseFloat(item['CUM QTY']).toLocaleString()}</td>
          <td>{item.ABC}</td>
        </tr>
      ));
    }
  };

  return (
    <div className="Pivot">
      <div className="scrollable-container">
        <table>
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
