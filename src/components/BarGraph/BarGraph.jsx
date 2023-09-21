import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import './BarGraph.css';

// Custom tooltip for the bar chart. Displays the name and formatted value.
const CustomBarTooltip = ({ active, payload }) => {
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

// Custom bar shape with rounded corners
function RoundedBar(props) {
  const { fill, x, y, width, height } = props;
  return <rect x={x} y={y} rx={15} ry={15} width={width} height={height} style={{ fill }} />;
}

// Custom cursor for the bar chart. A rectangle with rounded corners and a gray, semi-transparent fill.
function CustomCursor(props) {
  const { x, y, width, height } = props;
  return <rect x={x} y={y} rx={15} ry={15} width={width} height={height} style={{ fill: 'gray', opacity: 0.3 }} />;
}

// Custom X-Axis tick. Only displays the month for the first week of each month.
function CustomTick(props) {
  const { x, y, payload } = props;
  const month = payload.value.split(' ')[0];
  if (payload.value.includes('Week 1')) {
    return <text x={x + 30} y={y + 15} fill="#666" textAnchor="middle">{month}</text>
  }
  return null;
}

// Colors assigned to each month for the bars
const MONTH_COLORS = {
  January: '#3A43E0',
  February: '#00C49F',
  March: '#FFBB28',
  April: '#3A43E0',
  May: '#00C49F',
  June: '#FFBB28',
  July: '#3A43E0',
  August: '#00C49F',
  September: '#FFBB28',
  October: '#3A43E0',
  November: '#00C49F',
  December: '#FFBB28'
};

function BarGraph() {
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];

  // Generate labels for each week of each month
  const labels = months.flatMap(month => weeks.map(week => `${month} - ${week}`));

  // Generate random data for demonstration purposes
  const data = labels.map((label, index) => ({ name: label, value: Math.floor(Math.random() * 1000000) }));

  return (
    <div className="barGraphContainer" style={{ backgroundColor: '#ddd' }}>
      <BarChart 
        width={1335} 
        height={300} 
        data={data}
      >
        <XAxis dataKey="name" tick={<CustomTick />} interval={0} />
        <YAxis hide={false} tick={{ fontSize: 12 }} />
        <Tooltip cursor={<CustomCursor />} content={<CustomBarTooltip />} />
        <Bar dataKey="value" shape={<RoundedBar />} barSize={20}>
          {
            data.map((entry, index) => {
              const month = entry.name.split(' ')[0];
              return <Cell key={index} fill={MONTH_COLORS[month]} />;
            })
          }
        </Bar>
      </BarChart>
    </div>
  );
}

export default BarGraph;
