import React from "react";
import parse from "html-react-parser";
import { nanoid } from "nanoid";
import "./Quiz.css";
export default function Quiz(props) {
  const {
    allOptions,
    correct_answer,
    question,
    selection,
    result,
    handleClick,
    id,
  } = props;
  const answerOptions = allOptions.map((ans) => (
    <button
      key={nanoid()}
      className={`answer--button ${
        result
          ? correct_answer === ans
            ? "correct--answer"
            : selection === ans
            ? "wrong--answer"
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
