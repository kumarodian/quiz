import React from "react";
import Quiz from './Quiz'
import { nanoid } from 'nanoid';
import "./Quizpage.css";

export default function Quizpage(){
    const [quizData, setQuizData] = React.useState([])

    React.useEffect(()=>{ console.log("effect")
        fetch("https://opentdb.com/api.php?amount=5&type=multiple")
        .then(res=>res.json())
        .then(quiz=>setQuizData(quiz.results))
    },[])
    const elements = quizData.map(quiz=> <Quiz key={nanoid()} {...quiz}/>)

    return(
        <div style={{zIndex:1,textAlign:"left"}}>{elements}</div>
    )
}
