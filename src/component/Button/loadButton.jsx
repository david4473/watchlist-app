import React from "react";
import { InfinitySpin } from "react-loader-spinner";

function LoadButton({ func, load }) {
  return (
    <div className="load_more">
      {load ? (
        <InfinitySpin width="200" color="#4fa94d" />
      ) : (
        <button onClick={func}>LoadButton</button>
      )}
    </div>
  );
}

export default LoadButton;
