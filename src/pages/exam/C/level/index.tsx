<<<<<<< HEAD
"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { FiArrowRight } from 'react-icons/fi';
import '../../../../styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const ExamLevelsPage: React.FC = () => {
  const router = useRouter();

  const levels = [
    {
      name: 'easy',
      description: 'Start your inspiration journey.',
      time: '50s per Question',
      points: '10 Points',
      color: 'bg-teal-400',
      hoverColor: 'hover:bg-teal-500', // New hover color
    },
    {
      name: 'hard',
      description: 'You are ready to beat the world.',
      time: '25s per Question',
      points: '20 Points',
      color: 'bg-amber-400',
      hoverColor: 'hover:bg-amber-500', // New hover color
    },
    {
      name: 'expert',
      description: 'Congratulations, you made it!',
      time: '15s per Question',
      points: '30 Points',
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700', // New hover color
    },
    {
      name: 'super',
      description: 'Sorry wait, What!?!',
      time: '10s per Question',
      points: '40 Points',
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700', // New hover color
    },
  ];

  const handleLevelClick = (level: string) => {
    router.push(`/exam/C/level/${level}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-300 p-8">
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-900">Select Your Exam Level</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {levels.map((level) => (
            <div
              key={level.name}
              className={`rounded-xl shadow-xl p-8 flex flex-col justify-between items-center text-white transition-all duration-300 ease-in-out ${level.color} ${level.hoverColor} cursor-pointer border-2 border-white relative`}
              onClick={() => handleLevelClick(level.name)}
            >
              <h2 className="text-4xl font-semibold mb-4 text-center">{level.name}</h2>
              <p className="mb-6 text-lg text-center">{level.description}</p>
              <div className="mt-auto text-sm text-center">
                <p className="font-medium">{level.time}</p>
                <p className="font-medium">{level.points}</p>
              </div>
              <div className="flex items-center justify-center bg-white text-black rounded-full px-5 py-2 mt-6 transition-all duration-300 transform hover:bg-black hover:text-white hover:translate-x-2">
                <span className="font-bold">Start Exam</span>
                <FiArrowRight className="text-xl ml-2" />
              </div>

              <div className="absolute bg-gray-800 text-white text-xs rounded-md p-2 hidden group-hover:block">
                <p>{level.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExamLevelsPage;
=======
"use client";
import React from 'react';
import { useRouter } from 'next/router';
import { FiArrowRight } from 'react-icons/fi';
import '../../../../styles/globals.css';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const ExamLevelsPage: React.FC = () => {
  const router = useRouter();

  const levels = [
    {
      name: 'easy',
      description: 'Start your inspiration journey.',
      time: '50s per Question',
      points: '10 Points',
      color: 'bg-teal-400',
      hoverColor: 'hover:bg-teal-500', // New hover color
    },
    {
      name: 'hard',
      description: 'You are ready to beat the world.',
      time: '25s per Question',
      points: '20 Points',
      color: 'bg-amber-400',
      hoverColor: 'hover:bg-amber-500', // New hover color
    },
    {
      name: 'expert',
      description: 'Congratulations, you made it!',
      time: '15s per Question',
      points: '30 Points',
      color: 'bg-orange-600',
      hoverColor: 'hover:bg-orange-700', // New hover color
    },
    {
      name: 'super',
      description: 'Sorry wait, What!?!',
      time: '10s per Question',
      points: '40 Points',
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700', // New hover color
    },
  ];

  const handleLevelClick = (level: string) => {
    router.push(`/exam/C/level/${level}`);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-purple-200 to-blue-300 p-8">
        <h1 className="text-5xl font-bold mb-10 text-center text-gray-900">Select Your Exam Level</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {levels.map((level) => (
            <div
              key={level.name}
              className={`rounded-xl shadow-xl p-8 flex flex-col justify-between items-center text-white transition-all duration-300 ease-in-out ${level.color} ${level.hoverColor} cursor-pointer border-2 border-white relative`}
              onClick={() => handleLevelClick(level.name)}
            >
              <h2 className="text-4xl font-semibold mb-4 text-center">{level.name}</h2>
              <p className="mb-6 text-lg text-center">{level.description}</p>
              <div className="mt-auto text-sm text-center">
                <p className="font-medium">{level.time}</p>
                <p className="font-medium">{level.points}</p>
              </div>
              <div className="flex items-center justify-center bg-white text-black rounded-full px-5 py-2 mt-6 transition-all duration-300 transform hover:bg-black hover:text-white hover:translate-x-2">
                <span className="font-bold">Start Exam</span>
                <FiArrowRight className="text-xl ml-2" />
              </div>

              <div className="absolute bg-gray-800 text-white text-xs rounded-md p-2 hidden group-hover:block">
                <p>{level.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ExamLevelsPage;
>>>>>>> 4ef395c893db863ca4f226bcdf444f8e41d10789
