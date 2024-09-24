// app/challenge/page.js

"use client"; // Ensure this is included if you're using client-side state

import { useState } from 'react';
import Layout from '../app/layout'; // Adjust the path as necessary

const ChallengeAIPage = () => {
  const [question, setQuestion] = useState("What is computer language?");
  const [userAnswer, setUserAnswer] = useState('');
  const [aiAnswer, setAiAnswer] = useState(' zeros and ones');
  const [score, setScore] = useState({ user: 0, ai: 0 });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple comparison (could be expanded with more complex logic)
    if (userAnswer.trim().toLowerCase() === aiAnswer.trim().toLowerCase()) {
      setScore({ ...score, user: score.user + 1 });
    } else {
      setScore({ ...score, ai: score.ai + 1 });
    }

    // Logic for generating a new question can be added here
    // For now, we'll just reset the answer field
    setUserAnswer('');
  };

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200  p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Challenge AI: Programming Questions</h1>
          
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-700">Question:</h2>
            <p className="text-lg text-gray-600">{question}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows="3"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Your answer..."
              className="w-full h-24 bg-gray-50 border border-gray-300 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="w-full h-12 bg-blue-600 rounded-md text-white text-lg font-semibold hover:bg-blue-700 transition duration-200"
            >
              Submit Answer
            </button>
          </form>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-gray-700">AI's Answer:</h2>
            <p className="text-lg text-gray-600">{aiAnswer}</p>
          </div>

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
    </Layout>
  );
};

export default ChallengeAIPage;
