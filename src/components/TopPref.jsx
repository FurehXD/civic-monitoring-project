import React from 'react';
import './TopPref.css';

const TopPref = ({ data = [] }) => { // Providing a default value for data
  
  // Log the data to debug
  console.log('Data received in TopPref:', data);

  // Only proceed if data is available
  if (!data || data.length === 0) {
    return <div className="toppref">Loading...</div>;
  }
  
  // Take the top 10 items from the data
  const topTenItems = data.slice(0, 10);

  return (
    <div className="toppref">
      <h2>Top 10 ABC Items</h2>
      <ul>
        {topTenItems.map((item, index) => (
          <li key={index}>
            <p>{item.DESCRIPTION}</p>
            <p>{item["PART NUMBER"]}</p>
            <p>{parseFloat(item['TOTAL VALUE']).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPref;
