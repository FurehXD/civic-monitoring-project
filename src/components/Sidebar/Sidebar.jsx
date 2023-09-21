import React from 'react';
import './Sidebar.css';

/**
 * Sidebar Component
 * 
 * This component represents the navigation sidebar of the application.
 * It provides links to various sections like Monitoring and Monthly Reports,
 * and their respective subsections.
 * 
 * @param {Function} handleFileChange - A handler function for file change events.
 */
const Sidebar = ({ handleFileChange }) => {
  return (
    <div className="Sidebar">
      {/* Monitoring Section */}
      <div className="menuItem parent">
        <a href="#monitoring" className="boldText">Monitoring</a>
        <div className="child">
          <a href="#lubes">Lubes</a>
          {/* Subsections for Monitoring > Lubes */}
          <div className="grandChild">
            <a href="#volvoce">VOLVO CE</a>
            <a href="#ud">UD</a>
            <a href="#sdlg">SDLG</a>
            <a href="#local">LOCAL</a>
          </div>
        </div>
      </div>

      {/* Monthly Reports Section */}
      <div className="menuItem parent">
        <a href="#monthly-reports" className="boldText">Monthly Reports</a>
        <div className="child">
          <a href="#monthly-lubes">Lubes</a>
          {/* Subsections for Monthly Reports > Lubes */}
          <div className="grandChild">
            <a href="#monthly-volvoce">Volvo CE</a>
            <a href="#monthly-volvo-trucks">Volvo Trucks</a>
            <a href="#monthly-ud">UD</a>
            <a href="#monthly-sdlg">SDLG</a>
            <a href="#monthly-local">LOCAL</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
