"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import '../styles/globals.css';

const questions = [
  {
    question: "What is a programming language?",
    choices: [
      "A set of instructions for a computer.",
      "A type of software.",
      "A web framework.",
      "A database system."
    ],
    answer: "A set of instructions for a computer."
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlink and Text Markup Language",
      "None of the above"
    ],
    answer: "HyperText Markup Language"
  },
  {
    question: "What is the purpose of CSS?",
    choices: [
      "To style web pages",
      "To create databases",
      "To program server-side logic",
      "To manage user authentication"
    ],
    answer: "To style web pages"
  },
  {
    question: "What is JavaScript used for?",
    choices: [
      "To create interactive web content",
      "To style web pages",
      "To manage databases",
      "To optimize server performance"
    ],
    answer: "To create interactive web content"
  },
  {
    question: "What is a variable?",
    choices: [
      "A storage location paired with an associated symbolic name",
      "A fixed value",
      "A type of function",
      "An error in the code"
    ],
    answer: "A storage location paired with an associated symbolic name"
  },
];

const ChallengeAIPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState('');
  const [score, setScore] = useState({ user: 0, ai: 0 });
  const [aiAnswer, setAIAnswer] = useState('');
  const [showAIAnswer, setShowAIAnswer] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedChoice.trim() === correctAnswer.trim()) {
      setScore((prev) => ({
        user: prev.user + 1,
        ai: prev.ai + 1,
      }));
    } else {
      setScore((prev) => ({
        ...prev,
        ai: prev.ai + 1,
      }));
    }

    setAIAnswer(correctAnswer);
    setShowAIAnswer(true);
    setHasAnswered(true);

    
    setTimeout(() => {
      setCurrentQuestionIndex((currentQuestionIndex + 1) % questions.length);
      setSelectedChoice('');
      setShowAIAnswer(false);
      setHasAnswered(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-100 to-white p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
          <h1 className="text-3xl font-bold text-center text-teal-600 mb-6">AI Challenge: Programming Quiz</h1>

          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-700">Question {currentQuestionIndex + 1} of {questions.length}:</h2>
            <div className="p-4 border border-teal-300 rounded-lg bg-teal-50">
              <p className="text-lg text-gray-800">{questions[currentQuestionIndex].question}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col space-y-4 mb-4">
              {questions[currentQuestionIndex].choices.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedChoice(choice)}
                  className={`bg-teal-500 rounded-lg p-4 text-lg font-medium text-white hover:bg-teal-600 transition duration-200 transform ${hasAnswered ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={hasAnswered} 
                >
                  {choice}
                </button>
              ))}
            </div>
            
          </form>

          {showAIAnswer && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-700">AI Answer:</h2>
              <div className="p-4 border border-teal-300 rounded-lg bg-teal-50">
                <p className="text-lg text-gray-800">{aiAnswer}</p>
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-between text-lg text-gray-800">
            <div>
              <h3 className="font-semibold">Your Score: {score.user}</h3>
            </div>
            <div>
              <h3 className="font-semibold">AI Score: {score.ai}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChallengeAIPage;
