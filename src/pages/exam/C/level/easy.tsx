"use client"; // Ensure this is included if you're using client-side state
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import '../../../../styles/globals.css';

const questions = [
  {
    question: `#include <stdio.h>\nint main() {\n    int num = 10;\n    printf("Number: %d\\n", num);\n    return 0;\n}`,
    options: [
      'No errors found',
      'Missing semicolon in printf statement',
      'Variable "num" is undeclared'
    ],
    correctAnswer: 'No errors found'
  },
  {
    question: `int main() {\n    printf("Hello World"\n    return 0;\n}`,
    options: [
      'Missing semicolon at the end of line 1',
      'Missing closing parenthesis',
      'No errors found'
    ],
    correctAnswer: 'Missing closing parenthesis'
  },
  {
    question: `int main() {\n    int x = 5;\n    printf("%d", x);\n}`,
    options: [
      'No errors found',
      'Variable "x" is undeclared',
      'Missing return statement'
    ],
    correctAnswer: 'No errors found'
  },
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
          handleNextQuestion();
          return 60;
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
      }, 50);
      return () => clearTimeout(typingTimeout);
    }
  }, [charIndex, currentQuestionIndex, isFinished]);

  const handleAnswerSelection = (answer: string) => {
    if (hasAnswered) return;

    setHasAnswered(true);
    if (answer === questions[currentQuestionIndex].correctAnswer) {
      setScore(prev => prev + 1);
    }

    setTimeout(handleNextQuestion, 1000);
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
      setTimer(60);
      setHasAnswered(false);
    }
  };

  const calculateFinalFeedback = () => {
    const percentage = ((score / questions.length) * 100).toFixed(2);
    setFinalFeedback(score === questions.length
      ? "🎉 Amazing! You got them all right! 🎉"
      : `Your Score: ${percentage}% (${score} out of ${questions.length}). Keep it up! 💪`);
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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-50 to-white p-6">
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
            <div className="celebration-message text-black">{finalFeedback}</div>
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
        }
      `}</style>
    </>
  );
};

export default SyntaxErrorChallenge;
