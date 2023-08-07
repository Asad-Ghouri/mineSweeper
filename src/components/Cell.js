import React, { useEffect } from "react";
import win from "./mp3/win.mp3";
import lose from "./mp3/lose.mp3";

export default function Cell(props) {
  const styles = {
    backgroundColor: props.clicked ? "blue" : "#1A2C38",
    boxShadow: props.flagPlaced ? "inset 0 0 18px 3px red" : "",
  };

  useEffect(() => {
    if (props.clicked && props.isMine) {
      const sound = new Audio(lose);
      sound.play();
    }
    if (props.clicked) {
      const sound = new Audio(win);
      sound.play();
    }
  }, [props.clicked]);
  const playSound = (isWin) => {
    const sound = new Audio(isWin ? win : lose);
    sound.play();
  };
  return (
    <section
      onClick={props.handleClick}
      data-id={props.cellNum}
      className="cell"
      style={styles}
    >
      {props.clicked && props.isMine ? "💥" : props.clicked && "💎"}
    </section>
  );
}
