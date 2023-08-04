import React from "react";

function CustomAlert({ text, onButtonClick }) {
  return (
    <div className="cm-alert-container">
      <div className="cm-alert-content">
        <p className="cm-alert-text">{text}</p>
        <button className="cm-alert-button" onClick={onButtonClick}>
          Close
        </button>
      </div>
    </div>
  );
}

export default CustomAlert;
