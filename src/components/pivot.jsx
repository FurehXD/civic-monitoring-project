import React from 'react';
import './Pivot.css';

function Pivot({ data }) {
    return (
        <div className="Pivot">
            <div className="scrollable-container">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>Total Value</th>
                            <th>Part Number</th>
                            <th>Description</th>
                            <th>Rank %</th>
                            <th>Cum Value</th>
                            {/* <th>Cum %</th> */}
                            <th>ABC</th>
                            <th>C Qty</th>
                            {/* <th>C ABC</th> */}
                            {/* <th>Final Cat</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.RANK}</td>
                                <td>{parseFloat(item['TOTAL VALUE']).toLocaleString()}</td>
                                <td>{item['PART NUMBER']}</td>
                                <td>{item.DESCRIPTION}</td>
                                <td>{(item['RANK %'] * 100).toFixed(2)}%</td>
                                <td>{parseFloat(item['CUM VALUE']).toLocaleString()}</td>
                                {/* <td>{(item['CUM %'] * 100).toFixed(2)}%</td> */}
                                <td>{item.ABC}</td>
                                <td>{parseFloat(item['C QTY']).toLocaleString()}</td>
                                {/* <td>{item['C ABC']}</td> */}
                                {/* <td>{item['FINAL CAT']}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Pivot;
