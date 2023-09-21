import React from 'react';
import './TopPref.css';

/**
 * TopPref Component
 * 
 * This component displays the top 10 items from the ABC analysis.
 * Each item includes a description, part number, and its total value.
 * 
 * @param {Array} data - The list of ABC items. Defaults to an empty array.
 */
const TopPref = ({ data = [] }) => { // Providing a default value for data
  
  // Log the data for debugging purposes
  console.log('Data received in TopPref:', data);

  // Display a loading message if data is not available
  if (!data || data.length === 0) {
    return <div className="toppref">Loading...</div>;
  }
  
  // Extract the top 10 items from the data
  const topTenItems = data.slice(0, 10);

  return (
    <div className="toppref">
      <h2>Top 10 ABC Items</h2>
      <ul>
        {/* Map over the top 10 items and display their details */}
        {topTenItems.map((item, index) => (
          <li key={index}>
            <p>{item.DESCRIPTION}</p>             {/* Item description */}
            <p>{item["PART NUMBER"]}</p>          {/* Item part number */}
            <p>{parseFloat(item['TOTAL VALUE']).toLocaleString()}</p>  {/* Item total value, formatted */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopPref;
