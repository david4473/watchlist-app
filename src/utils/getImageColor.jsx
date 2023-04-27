import React, { useRef, useEffect } from "react";

function GetImageColor({ detectedColor, url }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = url;
    image.onload = function () {
      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0);
      const pixelData = context.getImageData(
        0,
        0,
        image.width,
        image.height
      ).data;
      const red = pixelData[0];
      const green = pixelData[1];
      const blue = pixelData[2];
      const color = `RGB(${red}, ${green}, ${blue})`;
      detectedColor(color);
    };
  }, [detectedColor]);

  return <canvas ref={canvasRef} style={{ display: "none" }}></canvas>;
}

export default GetImageColor;
