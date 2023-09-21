import React from 'react';
import './boxbackground.css';

/**
 * BgSquare Component
 * 
 * A simple square background container for wrapping child components.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - Child components to be wrapped by the square background.
 * 
 * @returns {React.Component} The BgSquare component.
 */
function BgSquare(props) {
    return <div className="BgSquare">{props.children}</div>;
}

export default BgSquare;
