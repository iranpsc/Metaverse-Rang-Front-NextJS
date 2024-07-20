import React, { useState, useEffect } from "react";

interface TimerProps {
  duration: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ duration, onTimeout }) => {
  const [timeRemaining, setTimeRemaining] = useState<number>(duration);

  useEffect(() => {
    const timerId = setTimeout(() => {
      onTimeout();
    }, duration);

    return () => clearTimeout(timerId);
  }, [duration, onTimeout]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prev) => Math.max(0, prev - 1000));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const minutes: number = Math.floor(timeRemaining / 60000);
  const seconds: number = Math.floor((timeRemaining % 60000) / 1000);

  return (
    <div>
      <p>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}{" "}
        
      </p>
    </div>
  );
};

export default Timer;
