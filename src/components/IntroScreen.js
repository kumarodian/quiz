import React from "react";
import "./IntroScreen.css";

export default function IntroScreen(props) {
  return (


      <div className="intro--text">
        <h2>Quizzical</h2>
        <h4>5 random trivial questions</h4>
        <button className="start--quiz" onClick={props.handleQuizStart}>
          Start Quiz
        </button>
      </div>

  );
}
