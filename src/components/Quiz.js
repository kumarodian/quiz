import React from 'react';
import parse from "html-react-parser";
import { nanoid } from 'nanoid';
import './Quiz.css'
export default function Quiz(props){
   const {incorrect_answers,question} = props;
   const answerOptions = incorrect_answers.map(ans=>(<button key={nanoid()} className='answer--button'>{parse(ans)}</button>))


    return(
        <div className='question--box'>
             <h3>{parse(question)}</h3>
             <div className='answer--option'>{answerOptions}</div>
        </div>

    )
}