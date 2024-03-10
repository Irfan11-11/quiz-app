import React, { useState } from 'react'
import { resultInitialState } from './Questions'


function Quiz({ questions }) {
    const [currentQuestion, setcurrentQuestion] = useState(0)
    const [answerindex, setanswerindex] = useState(null)
    const [answer, setanswer] = useState(null)
    const [result, setresult] = useState(resultInitialState)
    const [showResult, setshowResult] = useState(false)


    const { question, choices, correctAnswer } = questions[currentQuestion]

    const handleAnswer = (answer, index) => {
        setanswerindex(index)
        if (answer === correctAnswer) {
            setanswer(true)
        } else {
            setanswer(false)
        }
    }

    const handleNext = () => {
        setanswerindex(null)
        setresult((prev) =>
            answer ? {
                ...prev,
                score: prev.score + 5,
                correctAnswers: prev.correctAnswers + 1,
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1,
            }
        )

        if (currentQuestion !== questions.length - 1) {
            setcurrentQuestion((prev) => prev + 1)
        } else {
            setcurrentQuestion(0)
            setshowResult(true)
        }
    }

    const handlePlayAgain =()=>{
        setresult(resultInitialState)
        setshowResult(false)
    }

    return (
        <div className='quiz-container'>
            {!showResult ? (<>
                <span className='question-no'>{currentQuestion + 1}</span>
                <span className='total-question'>/{questions.length}</span>
                <h2>{question}</h2>
                <ul>
                    {
                        choices.map((answer, index) => (
                            <li
                                onClick={() => handleAnswer(answer, index)}
                                key={answer}
                                id={answerindex === index ? 'selected-answer' : null}
                            >
                                {answer}
                            </li>
                        ))
                    }
                </ul>
                <div className='bottom'>
                    <button onClick={handleNext} disabled={answerindex === null}>{currentQuestion === questions.length - 1 ? "Finish" : "Next"}</button>
                </div>

            </>
            ) : <div className='result text-center'>
                <h3>Result</h3>
                <p>Total Questions: <span>{questions.length}</span></p>
                <p>Total Score:  <span className='question-no'>{result.score}</span> /<span className='total-question'>{questions.length * 5}</span></p>
                <p>Correct Answers: <span>{result.correctAnswers}</span></p>
                <p>Wrong Answers: <span>{result.wrongAnswers}</span></p>
                <button onClick={handlePlayAgain}>Play Again</button>
            </div>}
        </div>
    )
}

export default Quiz