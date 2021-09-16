import React from "react";
import { useState, useEffect } from "react";
import { DISAPPEAR_TIME_MINUTES } from "../static";

const Timer = ({ propmin, propsec, fetchRace }) => {
  const [minutes, setMinutes] = useState(propmin);
  const [seconds, setSeconds] = useState(propsec);
  useEffect(() => {
    let timerInterval = setInterval(() => {
      if (seconds < 0) {
        // console.log(
        //   `Seconds is ${seconds} Minutes ${minutes} ${Math.abs(seconds)}`
        // );
        setSeconds(60 - Math.abs(seconds));
        // setMinutes(0);
      } else {
        // console.log(
        //   `@@ Seconds is ${seconds} Minutes ${minutes} ${Math.abs(seconds)}`
        // );
      }

      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes <= 0 - DISAPPEAR_TIME_MINUTES) {
          // if (minutes <= -1) {
          clearInterval(timerInterval);
          fetchRace();
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(timerInterval);
    };
  });

  return (
    <div>
      {minutes === 0 && seconds === 0 ? (
        <h1>
          {minutes}:{seconds}
        </h1>
      ) : minutes === -1 ? (
        <h1>
          {/* {minutes}  */}
          {"-"}
          {seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      ) : (
        <h1>
          {" "}
          {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
        </h1>
      )}
    </div>
  );
};

export default Timer;
