import React from "react";
import styles from "./index.module.scss";

function PlayButton({ color, handleButtonclick }) {
  const defaultColor = color ? color : "rgba(255, 175, 21, 0.5";
  const playIconColor = color ? color : "#ffaf15";
  return (
    <div
      style={{ "--accentColor": defaultColor, "--iconColor": playIconColor }}
      className={styles.video_play_button}
      onClick={handleButtonclick}
    >
      <span></span>
    </div>
  );
}

export default PlayButton;
