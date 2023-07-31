// create interface for:
// starting game
// choosing number of mines (level of difficulty)
// establish a theme
import React from 'react';
import { useState, useEffect ,useRef } from "react";

export default function Interface(props) {
  const buttonRef = useRef();
  
  useEffect(() => {
    buttonRef.current.click();
  }, []);

  return (
        <button 
        className="btn"
        ref={buttonRef} 
        onClick={props.handleClick}
      >
        play
      </button>
    )
}