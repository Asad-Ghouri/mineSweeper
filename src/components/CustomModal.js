// CustomModal.js
import React from "react";

const CustomModal = ({ isOpen, onClose, onPlayAgain }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {/* <span className="close" onClick={onClose}>
          &times;
        </span> */}
        <p>Oh no! You lost! Play again?</p>
        <button className="btn" onClick={onPlayAgain}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default CustomModal;
