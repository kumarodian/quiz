import React from "react";
import Quiz from "./Quiz";
import { nanoid } from "nanoid";
import "./Quizpage.css";

export default function Quizpage() {
  const [quizData, setQuizData] = React.useState([]);
  const [result, setResult] = React.useState(false);
  const [correctAnswer, setCorrectAnswer] = React.useState(0);

function fetchQuiz(){
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then((res) => res.json())
    .then((quiz) =>
      setQuizData(
        quiz.results.map((item) => ({ ...item, id: nanoid(), selection: "" }))
      )
    );
}
  React.useEffect(() => {
    console.log("effect");
    fetchQuiz()
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
  function checkAnswer() {
    if (!result) {
      let correctAnswer = 0;
      quizData.map((quiz) => {
        if (quiz.selection === quiz.correct_answer) correctAnswer++;
        return true;
      });
      setResult(true);
      setCorrectAnswer(correctAnswer);
    }
    else{
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

        <button onClick={checkAnswer}>
          {!result ? "Check answer" : "Play again"}
        </button>
      </div>
    </div>
  );
}
