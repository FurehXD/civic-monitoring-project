import React from "react";
import "./LeftSideMenu.css";

export const LeftSideMenu = ({ className }) => {
  return (
    <div className={`left-side-menu ${className}`}>
      <div className="overlap-group">
        <div className="account-selection" />
        <div className="div">
          <div className="text-wrapper">ACCOUNT</div>
          <div className="text-wrapper-2">NAP@CIVICMDSG.COM.PH</div>
        </div>
        <div className="monthly-reports">
          <div className="INSIDE-LUBES">
            <div className="text-wrapper-3">LOCAL</div>
            <div className="text-wrapper-4">SDLG</div>
            <div className="text-wrapper-5">UD</div>
            <div className="text-wrapper-6">VOLVO TRUCKS</div>
            <div className="text-wrapper-7">VOLVO CE</div>
          </div>
          <div className="text-wrapper-8">FILTERS</div>
          <div className="text-wrapper-9">DIRECT SHIPMENT</div>
          <div className="text-wrapper-10">CROSS DOCK</div>
          <div className="text-wrapper-11">LUBES</div>
          <div className="text-wrapper-12">MONTHLY REPORTS</div>
        </div>
        <div className="monitoring">
          <div className="INSIDE-LUBES">
            <div className="text-wrapper-3">LOCAL</div>
            <div className="text-wrapper-4">SDLG</div>
            <div className="text-wrapper-5">UD</div>
            <div className="text-wrapper-6">VOLVO TRUCKS</div>
            <div className="text-wrapper-7">VOLVO CE</div>
          </div>
          <div className="text-wrapper-8">FILTERS</div>
          <div className="text-wrapper-9">DIRECT SHIPMENT</div>
          <div className="text-wrapper-10">CROSS DOCK</div>
          <div className="text-wrapper-11">LUBES</div>
          <div className="text-wrapper-12">MONITORING</div>
        </div>
        <img className="BORDER" alt="Border" src="BORDER-1.svg" />
      </div>
    </div>
  );
};
