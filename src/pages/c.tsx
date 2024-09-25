"use client"; // Ensure this is included if you're using client-side state
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import '../styles/globals.css';

const questions = [
  {
    question: `#include <stdio.h>\nint main() {\n    int num = 10;\n    printf("The character is: %c\\n", ch);\n    return 0;\n}`,
    options: [
      'Variable "ch" is undeclared',
      'Missing semicolon in printf statement',
      'No errors found'
    ],
    correctAnswer: 'Variable "ch" is undeclared'
  },
  {
    question: `int main() {\n    int a = 5\n    printf("%d", a);\n}`,
    options: [
      'Missing semicolon at the end of line 2',
      'No errors found',
      'Variable "a" is undeclared'
    ],
    correctAnswer: 'Missing semicolon at the end of line 2'
  },
  {
    question: `int main() {\n    int a = 5\n    printf("%d", a);\n}`,
    options: [
      'Missing semicolon at the end of line 2',
      'No errors found',
      'Variable "a" is undeclared'
    ],
    correctAnswer: 'No errors found'
  },
  // Add more questions here
];

const SyntaxErrorChallenge = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [isFinished, setIsFinished] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [typingEffect, setTypingEffect] = useState('');
  const [hasAnswered, setHasAnswered] = useState(false);
  const [finalFeedback, setFinalFeedback] = useState('');

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          handleNextQuestion(); // Automatically move to next question if time runs out
          return 60; // Reset the timer for the next question
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [isFinished, currentQuestionIndex]);

  useEffect(() => {
    if (isFinished) return;
    const questionText = questions[currentQuestionIndex].question;

    if (charIndex < questionText.length) {
      const typingTimeout = setTimeout(() => {
        setTypingEffect((prev) => prev + questionText[charIndex]);
        setCharIndex(charIndex + 1);
      }, 50); // Adjust typing speed here (faster)
      return () => clearTimeout(typingTimeout);
    }
  }, [charIndex, currentQuestionIndex, isFinished]);

  const handleAnswerSelection = (answer: string) => {
    if (hasAnswered) return; // Prevent multiple clicks

    setHasAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(score + 1);
    }

    // Move to the next question after a short delay
    setTimeout(handleNextQuestion, 10); // Allow a short delay before moving on
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex >= questions.length) {
      setIsFinished(true);
      calculateFinalFeedback();
    } else {
      setCurrentQuestionIndex(nextIndex);
      setCharIndex(0);
      setTypingEffect('');
      setTimer(60); // Reset timer for the new question
      setHasAnswered(false); // Reset answered state
    }
  };

  const calculateFinalFeedback = () => {
    if (score === questions.length - 1) {
      setFinalFeedback("🎉 Amazing! You got them all right! 🎉");
    } else {
      setFinalFeedback(`Your Score: ${score} out of ${questions.length}. Keep it up! You'll get them next time! 💪`);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTimer(60);
    setIsFinished(false);
    setTypingEffect('');
    setCharIndex(0);
    setHasAnswered(false); 
    setFinalFeedback(''); 
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-50 to-white  p-6">
        <div className={`bg-white rounded-lg shadow-lg p-8 w-full h-full flex ${isFinished ? 'hidden' : ''}`}>
          <div className="flex-1 p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-bold text-teal-600">Syntax Error Challenge</h1>
              <div className="w-24 h-24 rounded-full border-4 border-teal-500 flex items-center justify-center">
                <span className="text-2xl font-bold">{timer}</span>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6">
              <pre className="text-lg text-gray-800 whitespace-pre-wrap">{typingEffect}</pre>
            </div>
          </div>
          <div className="flex-1 p-4">
            <div className="text-lg text-gray-600 text-center mb-4">What is the syntax error?</div>
            <div className="flex flex-col space-y-4 mb-4">
              {questions[currentQuestionIndex]?.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelection(option)}
                  className={`bg-teal-500 rounded-lg p-4 text-lg font-medium text-white hover:bg-teal-600 transition duration-200 transform hover:scale-105 ${hasAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={hasAnswered} 
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {isFinished && (
          <div className="celebration-container">
            <div className="celebration-message">{finalFeedback}</div>
            {score === questions.length && <div className="confetti"></div>}
            <button
              onClick={restartQuiz}
              className="mt-4 bg-black text-white rounded-lg p-2 hover:bg-black transition duration-200"
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .celebration-container {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          text-align: center;
          z-index: 10;
          color: #fff;
          animation: fadeIn 0.5s ease-in-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes confetti-fall {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100%); opacity: 0; }
        }

        .confetti {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }

        .confetti div {
          position: absolute;
          width: 10px;
          height: 10px;
          background: rgba(255, 223, 0, 0.7);
          opacity: 0.8;
          animation: confetti-fall 2s linear infinite;
        }

        .confetti div:nth-child(1) { left: 10%; animation-delay: 0s; }
        .confetti div:nth-child(2) { left: 20%; animation-delay: 0.2s; }
        .confetti div:nth-child(3) { left: 30%; animation-delay: 0.4s; }
        .confetti div:nth-child(4) { left: 40%; animation-delay: 0.6s; }
        .confetti div:nth-child(5) { left: 50%; animation-delay: 0.8s; }
        .confetti div:nth-child(6) { left: 60%; animation-delay: 1s; }
        .confetti div:nth-child(7) { left: 70%; animation-delay: 1.2s; }
        .confetti div:nth-child(8) { left: 80%; animation-delay: 1.4s; }
        .confetti div:nth-child(9) { left: 90%; animation-delay: 1.6s; }
        .confetti div:nth-child(10) { left: 100%; animation-delay: 1.8s; }

        .celebration-message {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          animation: bounce 0.5s infinite alternate;
        }

        @keyframes bounce {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        @media (max-width: 768px) {
          .flex {
            flex-direction: column;
          }

          .flex-1 {
            width: 100%;
          }

          .options {
            flex-direction: column;
            align-items: center;
          }
        }
      `}</style>
    </>
  );
};

export default SyntaxErrorChallenge;
