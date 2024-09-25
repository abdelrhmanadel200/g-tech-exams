"use client"; 

import React, { useState } from 'react';
import { useRouter } from 'next/router'; 
import Navbar from '@/components/Navbar';
import '../styles/globals.css';
import { FaSpinner } from 'react-icons/fa'; 

const ExamPage = () => {
  const router = useRouter(); 
  const [loading, setLoading] = useState(false); 
  const [searchTerm, setSearchTerm] = useState(""); 

  const languages = [
    "C", "PHP", "Ruby", "C#", "Ocean", "SQL", "C++", "Dart", "Rust",
    "VisualBasic", "Cirq", "Perl", "Python", "HTML", "Swift",
    "CoffeeScript", "Elixir", "A+", "Java", "CSS", "TypeScript",
    "Haskell", "Verilog", "Julia", "JavaScript", "Kotlin", "Go",
    "Qiskit", "R", "Bash"
  ];

  const handleLanguageClick = (language) => {
    setLoading(true);
    setTimeout(() => { 
      router.push(`/${language.toLowerCase()}`);
    }, 500); 
  };

  const filteredLanguages = languages.filter(lang =>
    lang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-teal-50 to-white p-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mt-10 mb-6 text-teal-700">
          Select Your Exam Language
        </h1>

        <input
          type="text"
          placeholder="Search for a language..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-md p-2 mb-4 w-full max-w-lg"
        />

        {loading && (
          <div className="flex justify-center items-center mt-4">
            <FaSpinner className="animate-spin text-teal-500" size={24} />
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-5xl px-4">
          {filteredLanguages.map((language, index) => (
            <div key={index} className="flex justify-center">
              <div
                className="w-32 sm:w-44 h-16 bg-gradient-to-r from-teal-300 to-teal-500 rounded-full flex items-center justify-center shadow-lg transition-transform transform hover:scale-105 cursor-pointer relative"
                onClick={() => handleLanguageClick(language)}
                title={`Start exam for ${language}`} 
              >
                <span className="text-white text-lg sm:text-2xl font-semibold font-['Patrick Hand'] leading-7">
                  {language}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-600 mt-4">
          Click on a language to start your exam.
        </p>
      </div>
    </>
  );
};

export default ExamPage;
