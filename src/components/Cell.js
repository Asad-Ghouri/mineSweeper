import React from "react";

export default function Cell(props) {
  const styles = {
    backgroundColor: props.clicked ? "blue" : "#1A2C38",
    boxShadow: props.flagPlaced ? "inset 0 0 18px 3px red" : "",
  };
  return (
    <section
      onClick={props.handleClick}
      data-id={props.cellNum}
      className="cell"
      style={styles}
    >
      {props.clicked && props.isMine
        ? "💥"
        : props.clicked && props.adjacentMines}
    </section>
  );
}
