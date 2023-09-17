import React from 'react';
import './Sidebar.css';

const Sidebar = ({ handleFileChange }) => {
  return (
    <div className="Sidebar">
      <div className="menuItem parent">
        <a href="#monitoring" className="boldText">Monitoring</a>
        <div className="child">
          <a href="#lubes">Lubes</a>
          <div className="grandChild">
            <a href="#volvoce">VOLVO CE</a>
            <a href="#ud">UD</a>
            <a href="#sdlg">SDLG</a>
            <a href="#local">LOCAL</a>
          </div>
        </div>
      </div>
      <div className="menuItem parent">
        <a href="#monthly-reports" className="boldText">Monthly Reports</a>
        <div className="child">
          <a href="#monthly-lubes">Lubes</a>
          <div className="grandChild">
            <a href="#monthly-volvoce">Volvo CE</a>
            <a href="#monthly-volvo-trucks">Volvo Trucks</a>
            <a href="#monthly-ud">UD</a>
            <a href="#monthly-sdlg">SDLG</a>
            <a href="#monthly-local">LOCAL</a>
          </div>
        </div>
      </div>
      {/* Added Upload Section */}
      <div className="upload-section">
        <input 
          type="file" 
          accept=".xlsx" 
          id="fileInput" 
          style={{ display: 'none' }} 
          onChange={handleFileChange} 
        />
        <button className="upload-button" onClick={() => document.getElementById('fileInput').click()}>
          Upload .xlsx File
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
