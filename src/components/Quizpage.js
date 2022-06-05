import React from "react";
import Quiz from "./Quiz";
import { nanoid } from "nanoid";
import "./Quizpage.css";

export default function Quizpage() {
  const [quizData, setQuizData] = React.useState([]);
  const [result, setResult] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState(0);

  function fetchQuiz() {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
      .then((res) => res.json())
      .then((quiz) =>
        setQuizData(
          quiz.results.map((item) => ({
            ...item,
            allOptions: shuffleArray([
              ...item.incorrect_answers,
              item.correct_answer,
            ]),
            id: nanoid(),
            selection: "",
          }))
        )
      );
  }
  React.useEffect(() => {
    fetchQuiz();
  }, []);
  const elements = quizData.map((quiz) => (
    <Quiz key={quiz.id} {...quiz} handleClick={handleClick} result={result} />
  ));
  function handleClick(val, id) {
    setQuizData(
      quizData.map((item) =>
        item.id === id
          ? { ...item, selection: item.selection === val ? "" : val }
          : item
      )
    );
  }
  function shuffleArray(arr) {
    const num = Math.floor(Math.random() * 4);
    if (num !== 3) {
      const tmp = arr[num];
      arr[num] = arr[3];
      arr[3] = tmp;
    }
    return arr;
  }
  function checkAnswer() {
    if (!result) {
      let correctAnswer = 0;
      quizData.map((quiz) => {
        if (quiz.selection === quiz.correct_answer) correctAnswer++;
        return true;
      });
      setResult(true);
      setCorrectAnswer(correctAnswer);
    } else {
      setResult(false);
      setCorrectAnswer(0);
      fetchQuiz();
    }
  }
  //console.log(">>>" + JSON.stringify(quizData));
  return (
    <div style={{ zIndex: 1, textAlign: "left" }}>
      {elements}
      <div className="check--answer">
        {result && (
          <span className="score">
            You scored {correctAnswer}/5 correct answers
          </span>
        )}

        {quizData.length > 0 && (
          <button onClick={checkAnswer}>
            {!result ? "Check answer" : "Play again"}
          </button>
        )}
      </div>
    </div>
  );
}
