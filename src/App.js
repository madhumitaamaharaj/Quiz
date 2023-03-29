import React from "react";
import "./style.css";
import React, { useState, useRef } from 'react';

const QuizApp = () => {
  const questions = [
    {
      question: 'Today is Monday,After 63 days,it will be-',
      options: ['Tuesday', 'Monday', 'Thrusday ', 'Sunday'],
      answer: 'Monday'
    },
   
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const radioGroupRef = useRef(null);

  const handleAnswerOptionClick = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const handleRestartClick = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    radioGroupRef.current.reset();
  };

  return (
    <div>
      {showScore ? (
        <div>
          <p>You scored {score} out of {questions.length}.</p>
          <button onClick={handleRestartClick}>Restart Quiz</button>
        </div>
      ) : (
        <div>
          <h2>{questions[currentQuestion].question}</h2>
          <form ref={radioGroupRef} onSubmit={handleSubmit}>
            {questions[currentQuestion].options.map((option) => (
              <div key={option}>
                <label>
                  <input type="radio" name="option" value={option} onClick={handleAnswerOptionClick} />
                  {option}
                </label>
              </div>
            ))}
            <button type="submit">Next</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default QuizApp;