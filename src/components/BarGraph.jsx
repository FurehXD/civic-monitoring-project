import React from 'react';
import { Bar } from 'react-chartjs-2';

function BarGraph({ data }) {
  const totalAmounts = data.map(item => item["TOTAL AMOUNT"]);

  // Calculate the sum of TOTAL AMOUNT for August
  const augustTotal = totalAmounts.reduce((sum, amount) => sum + (isNaN(amount) ? 0 : parseFloat(amount)), 0);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [{
      label: 'TOTAL AMOUNT',
      data: [0, 0, 0, 0, 0, 0, 0, augustTotal, 0, 0, 0, 0], 
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  const chartOptions = {
    scales: {
      x: {
        type: 'category',
      },
      y: {
        type: 'linear',
      }
    }
  };

  return (
    <div className="barGraphContainer">
      <Bar data={chartData} options={chartOptions} key={augustTotal} />
    </div>
  );
}

export default BarGraph;
