import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Timer({
  moveToNextQuestion,
  currentQuestion,
  currentAnswer,
  handleTimeout,

  players,
}) {
  const { secondsPerQuestion } = useSelector((state) => state.game.gameOptions);
  const [timer, setTimer] = useState(secondsPerQuestion || 30);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    if (currentAnswer && players?.length === 1) {
      clearInterval(interval);
    }

    if (timer === 0) {
      clearInterval(interval);

      setTimeout(() => {
        console.log(" timeout modal");
        handleTimeout();
      }, 500);
      setTimeout(() => {
        console.log(" timeout next question");
        moveToNextQuestion();
      }, 2000);
      // if (currentAnswer) {
      //   setTimeout(() => {
      //     moveToNextQuestion();
      //   }, 1500);
      // } else {
      //   handleTimeout()
      //   moveToNextQuestion();
      // }
    }
    return () => clearInterval(interval);
  }, [timer, currentAnswer]);

  useEffect(() => {
    setTimer(secondsPerQuestion || 30);
  }, [currentQuestion]);

  return timer;
}
