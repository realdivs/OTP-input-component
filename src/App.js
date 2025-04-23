import "./styles.css";
import { useState, useRef, useEffect } from "react";
//OTP input, only numbers
const OTP_DIGITS_COUNT = 5;

export default function App() {
  const [inputArr, setInputArr] = useState(
    new Array(OTP_DIGITS_COUNT).fill("")
  );

  const refArray = useRef([]);

  const handleOnChange = (value, index) => {
    if (isNaN(value)) {
      return;
    }
    const newArray = [...inputArr];
    const newValue = value.trim();
    newArray[index] = newValue.slice(-1);
    setInputArr(newArray);
    newValue && refArray.current[index + 1]?.focus();
  };

  const handleOnKeyDown = (e, index) => {
    if (!e.target.value && e.key === "Backspace") {
      refArray.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    refArray.current[0]?.focus();
  }, []);

  return (
    <div className="App">
      <h1>Validate OTP</h1>
      {inputArr.map((input, index) => {
        return (
          <input
            className="otp-input"
            key={index}
            type="text"
            value={inputArr[index]}
            ref={(input) => (refArray.current[index] = input)}
            onChange={(e) => handleOnChange(e.target.value, index)}
            onKeyDown={(e) => handleOnKeyDown(e, index)}
          />
        );
      })}
    </div>
  );
}
