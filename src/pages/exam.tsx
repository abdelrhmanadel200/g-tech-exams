import React from 'react';
import Layout from "@/app/layout"
const ExamPage = () => {
  const languages = [
    "C", "PHP", "Ruby", "C#", "Ocean", "SQL", "C++", "Dart", "Rust",
    "VisualBasic", "Cirq", "Perl", "Python", "HTML", "Swift",
    "CoffeeScript", "Elixir", "A+", "Java", "CSS", "TypeScript",
    "Haskell", "Verilog", "Julia", "JavaScript", "Kotlin", "Go",
    "Qiskit", "R", "Bash"
  ];

  return (
    <Layout>
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200">
      <h1 className="text-4xl sm:text-5xl font-normal font-['Roboto'] text-center mt-10 px-4">
        Select the Exam Language
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8 w-full max-w-4xl px-4">
        {languages.map((language, index) => (
          <div key={index} className="flex justify-center">
            <div className="w-32 sm:w-44 h-16 bg-[#fce09b] rounded-full flex items-center justify-center shadow-md transition-transform transform hover:scale-105 cursor-pointer">
              <span className="text-black text-lg sm:text-[32px] font-normal font-['Patrick Hand'] leading-7">
                {language}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Layout>
  );
};

export default ExamPage;
