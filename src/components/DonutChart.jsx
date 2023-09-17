import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import './DonutChart.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const name = payload[0].payload.name;
    let value = payload[0].value;

    // Format the value to include commas and limit to 2 decimal places
    value = parseFloat(value).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    return (
      <div className="custom-tooltip">
        <p className="label">{`${name} : ${value}`}</p>
      </div>
    );
  }
  return null;
};





const DonutChart = ({ data, width, height, innerRadius, outerRadius, wrapperClass, label }) => {
  const COLORS = ['#3A43E0', '#00C49F', '#FFBB28'];

  return (
    <div className={wrapperClass}>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={width / 2}
          cy={height / 2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
          startAngle={90} // New
          endAngle={-270} // New
        >
          <Label value={label} position="center" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </div>
  );
};

export default DonutChart;
