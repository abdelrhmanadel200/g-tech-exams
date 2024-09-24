// app/challenge/page.js

"use client"; // Ensure this is included if you're using client-side state

import { useState } from 'react';
import Layout from '../app/layout'; // Adjust the path as necessary

const SyntaxErrorChallenge = () => {
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);

  const handleAnswerSelection = (answer) => {
    if (answer === 'undeclared_variable') {
      setFeedback('Correct! Variable "ch" is undeclared.');
      setScore(score + 1);
    } else {
      setFeedback('Incorrect. Try again!');
    }
    setUserAnswer(answer);
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-3xl">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">Syntax Error Challenge</h1>
          <p className="text-lg text-center text-gray-600 mb-6">Identify the syntax error in the following C code:</p>

          <div className="bg-gray-100 p-4 rounded-lg border border-gray-300 mb-6">
            <pre className="text-sm text-gray-800 whitespace-pre-wrap">
              {`#include <stdio.h>
int main() {
    int num = 10;
    printf("The character is: %c\\n", ch);
    return 0;
}`}
            </pre>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <div className="text-2xl text-gray-700 text-center mb-2">Question 1</div>
            <div className="text-lg text-gray-600 text-center">What is the syntax error?</div>
          </div>

          <div className="flex flex-col space-y-4">
            <button
              onClick={() => handleAnswerSelection('undeclared_variable')}
              className="bg-yellow-300 rounded-lg p-4 text-lg font-medium hover:bg-yellow-400 transition duration-200"
            >
              1. Variable 'ch' is undeclared
            </button>
            <button
              onClick={() => handleAnswerSelection('missing_semicolon')}
              className="bg-yellow-300 rounded-lg p-4 text-lg font-medium hover:bg-yellow-400 transition duration-200"
            >
              2. Missing semicolon in printf statement
            </button>
            <button
              onClick={() => handleAnswerSelection('no_errors')}
              className="bg-green-300 rounded-lg p-4 text-lg font-medium hover:bg-green-400 transition duration-200"
            >
              3. No errors found
            </button>
          </div>

          {feedback && (
            <div className={`mt-4 text-lg text-center ${feedback.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
              {feedback}
            </div>
          )}
          <div className="mt-4 text-center text-gray-700">
            <strong>Your Score: {score}</strong>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SyntaxErrorChallenge;
