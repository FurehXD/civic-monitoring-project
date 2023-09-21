import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Label } from 'recharts';
import './DonutChart.css';

/**
 * Custom Tooltip Component for the DonutChart.
 * It displays the name and value of the hovered segment.
 * If `isPercent` prop is true, then the value will be formatted with 2 decimal places and a '%' sign.
 * Otherwise, the value will be rounded up to a whole number.
 * 
 * @param {boolean} active - Whether the tooltip is active.
 * @param {Array} payload - Data for the active tooltip.
 * @param {boolean} isPercent - Whether to format the value as a percentage.
 */
const CustomTooltip = ({ active, payload, isPercent }) => {
  if (active && payload && payload.length) {
    const name = payload[0].payload.name;
    let value = payload[0].value;

    if (isPercent) {
      value = value.toFixed(2) + "%";
    } else {
      value = Math.ceil(value).toLocaleString();
    }

    return (
      <div className="custom-tooltip">
        <p className="label">{`${name} : ${value}`}</p>
      </div>
    );
  }
  return null;
};

/**
 * DonutChart Component.
 * This component renders a customizable donut chart using the provided data.
 * It also supports a custom tooltip based on the `isPercent` prop.
 * 
 * @param {Array} data - The data array for the donut chart.
 * @param {number} width - Width of the chart.
 * @param {number} height - Height of the chart.
 * @param {number} innerRadius - Inner radius of the donut.
 * @param {number} outerRadius - Outer radius of the donut.
 * @param {string} wrapperClass - CSS class for the wrapper div.
 * @param {string} label - Label to be displayed at the center of the donut.
 * @param {boolean} isPercent - Determines the format for the tooltip.
 */
const DonutChart = ({ data, width, height, innerRadius, outerRadius, wrapperClass, label, isPercent }) => {
  // Calculate the total for the data series here
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const COLORS = ['#061a40', '#b9d6f2', '#006daa'];

  return (
    <div className={wrapperClass}>
      <PieChart width={width} height={height}>
        <Pie
          data={data}
          cx={width / 2}
          cy={height / 2}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          fill="#061a40"
          paddingAngle={0}
          dataKey="value"
          startAngle={90} 
          endAngle={-270} 
        >
          <Label value={label} position="center" />
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip isPercent={isPercent} />} />
      </PieChart>
    </div>
  );
};

export default DonutChart;
