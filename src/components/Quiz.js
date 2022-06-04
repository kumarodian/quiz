import React from "react";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import "./Quiz.css";
export default function Quiz(props) {
  const {
    incorrect_answers,
    correct_answer,
    question,
    selection,
    result,
    handleClick,
    id,
  } = props;
  const allOptions = [...incorrect_answers, correct_answer];

  /* function shuffleArray(arr) {
    const newArr = [];
    while (newArr.length < 4) {
      const num = Math.floor(Math.random() * 4);
      if (!newArr.indexOf(num)) newArr.push(num);
    }
    return newArr
  } */
  const answerOptions = allOptions.map((ans) => (
    <button
      key={nanoid()}
      className={`answer--button ${
        result
          ? selection === ans
            ? selection === correct_answer
              ? "correct--answer"
              : "wrong--answer"
            : ""
          : selection === ans
          ? "answer--selected"
          : ""
      }`}
      onClick={() => handleClick(ans, id)}
    >
      {parse(ans)}
    </button>
  ));

  return (
    <div className="question--box">
      <h3>{parse(question)}</h3>
      <div className="answer--option">{answerOptions}</div>
    </div>
  );
}
