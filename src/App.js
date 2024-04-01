import React, { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [colorIndex, setColorIndex] = useState(0);
  const [number, setNumber] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [colors, setColors] = useState(["red", "black"]);
  const [currentColor, setCurrentColor] = useState(colors[0]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const handleButtonClick = () => {
    setShowResult(false);
    setIsButtonDisabled(true);

    let colorChangeInterval = setInterval(() => {
      setCurrentColor((prevColor) => (prevColor === "red" ? "black" : "red"));
    }, 100);

    setTimeout(() => {
      clearInterval(colorChangeInterval);
      const nextColorIndex =
        colorIndex === colors.length - 1 ? 0 : colorIndex + 1;
      setColorIndex(nextColorIndex);
    }, 2000);
  };

  useEffect(() => {
    if (colorIndex !== null) {
      const timer = setTimeout(() => {
        setCurrentColor(colors[colorIndex]);
        const randomNumber = Math.floor(Math.random() * 30) + 1;
        setNumber(randomNumber);
        setShowResult(true);
        setIsButtonDisabled(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [colorIndex, colors]);

  return (
    <div>
      <link rel="shortcut icon" href="../public/pavicon.ico" />
      <link rel="icon" href="../public/pavicon.ico" />
      <style>{`body { background-color: ${currentColor} }`}</style>
      <div className="button-wrapper">
        <button
          onClick={handleButtonClick}
          style={{
            fontSize: "40px",
            padding: "10px 20px",
          }}
          disabled={isButtonDisabled}
        >
          {isButtonDisabled ? "뽑는 중..." : "뽑기 버튼"}
        </button>
      </div>
      {showResult && (
        <div className="bead" style={{ backgroundColor: currentColor }}>
          <div
            className="color"
            style={{ backgroundColor: currentColor }}
          ></div>
          <div className="number">{number}</div>
        </div>
      )}
    </div>
  );
};

export default App;
