"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FiSearch } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import '../../../styles/globals.css';

type Difficulty = 'Easy' | 'Medium' | 'Difficult';

const difficultyStyles: Record<Difficulty, { character: string; hover: string; indicatorHover: string }> = {
  Easy: { character: '😊', hover: 'bg-green-300', indicatorHover: 'bg-green-500' },
  Medium: { character: '😐', hover: 'bg-yellow-300', indicatorHover: 'bg-yellow-500' },
  Difficult: { character: '😓', hover: 'bg-red-300', indicatorHover: 'bg-red-500' },
};

const difficultyOrder: Difficulty[] = ['Easy', 'Medium', 'Difficult'];

const sortByDifficulty = (a: { difficulty: Difficulty }, b: { difficulty: Difficulty }) => {
  return difficultyOrder.indexOf(a.difficulty) - difficultyOrder.indexOf(b.difficulty);
};

const topics: { name: string; description: string; difficulty: Difficulty }[] = [
   { name: 'Basics of C++', description: 'Introduction to C++ programming language', difficulty: 'Easy' },
{ name: 'Data Types', description: 'Understanding data types in C++', difficulty: 'Easy' },
{ name: 'Variables and Constants', description: 'Using variables and constants', difficulty: 'Easy' },
{ name: 'Operators', description: 'Various operators in C++', difficulty: 'Easy' },
{ name: 'Control Structures', description: 'Flow control statements', difficulty: 'Medium' },
{ name: 'Conditional Statements (if, else)', description: 'Using if-else statements', difficulty: 'Medium' },
{ name: 'Switch Case', description: 'Multi-way branching with switch', difficulty: 'Medium' },
{ name: 'Loops (for, while, do-while)', description: 'Looping constructs in C++', difficulty: 'Medium' },
{ name: 'Arrays', description: 'Working with arrays', difficulty: 'Medium' },
{ name: 'Multidimensional Arrays', description: 'Using multidimensional arrays', difficulty: 'Medium' },
{ name: 'Strings', description: 'String manipulation in C++', difficulty: 'Medium' },
{ name: 'String Functions', description: 'Common string functions', difficulty: 'Medium' },
{ name: 'Pointers', description: 'Understanding pointers', difficulty: 'Medium' },
{ name: 'Pointer Arithmetic', description: 'Operations on pointers', difficulty: 'Medium' },
{ name: 'Functions', description: 'Defining and using functions', difficulty: 'Medium' },
{ name: 'Function Overloading', description: 'Using function overloading concepts', difficulty: 'Medium' },
{ name: 'Recursion', description: 'Recursive functions in C++', difficulty: 'Medium' },
{ name: 'Pass by Value vs. Pass by Reference', description: 'Understanding argument passing', difficulty: 'Medium' },
{ name: 'Classes and Objects', description: 'Introduction to classes and objects', difficulty: 'Medium' },
{ name: 'Constructors and Destructors', description: 'Managing object lifecycle', difficulty: 'Medium' },
{ name: 'Inheritance', description: 'Understanding inheritance in C++', difficulty: 'Medium' },
{ name: 'Polymorphism', description: 'Using polymorphism in C++', difficulty: 'Medium' },
{ name: 'Abstraction', description: 'Implementing abstraction in C++', difficulty: 'Medium' },
{ name: 'Encapsulation', description: 'Understanding encapsulation in C++', difficulty: 'Medium' },
{ name: 'Templates', description: 'Creating and using templates', difficulty: 'Medium' },
{ name: 'Exception Handling', description: 'Managing exceptions in C++', difficulty: 'Medium' },
{ name: 'Standard Template Library (STL)', description: 'Overview of STL features', difficulty: 'Medium' },
{ name: 'Vectors', description: 'Using vectors from STL', difficulty: 'Medium' },
{ name: 'Maps', description: 'Using maps in C++', difficulty: 'Medium' },
{ name: 'Sets', description: 'Understanding sets in C++', difficulty: 'Medium' },
{ name: 'Iterators', description: 'Using iterators with STL containers', difficulty: 'Medium' },
{ name: 'Lambda Expressions', description: 'Using lambda expressions in C++', difficulty: 'Medium' },
{ name: 'Smart Pointers', description: 'Managing memory with smart pointers', difficulty: 'Medium' },
{ name: 'File I/O', description: 'Reading and writing files', difficulty: 'Medium' },
{ name: 'Reading and Writing Files', description: 'File handling in C++', difficulty: 'Medium' },
{ name: 'Error Handling in Files', description: 'Handling file errors', difficulty: 'Medium' },
{ name: 'Command Line Arguments', description: 'Using command line inputs', difficulty: 'Medium' },
{ name: 'Preprocessor Directives', description: 'Using preprocessor directives', difficulty: 'Medium' },
{ name: 'Namespaces', description: 'Using namespaces to organize code', difficulty: 'Medium' },
{ name: 'Multithreading in C++', description: 'Working with threads in C++', difficulty: 'Medium' },
{ name: 'Synchronization Techniques', description: 'Techniques for thread safety', difficulty: 'Medium' },
{ name: 'Design Patterns', description: 'Common design patterns in C++', difficulty: 'Medium' },
{ name: 'C++11 Features', description: 'Overview of C++11 new features', difficulty: 'Medium' },
{ name: 'C++14 Features', description: 'Overview of C++14 new features', difficulty: 'Medium' },
{ name: 'C++17 Features', description: 'Overview of C++17 new features', difficulty: 'Medium' },
{ name: 'C++20 Features', description: 'Overview of C++20 new features', difficulty: 'Medium' },
{ name: 'Networking in C++', description: 'Basics of networking in C++', difficulty: 'Medium' },
{ name: 'C++ and GUI Programming', description: 'Creating GUI applications with C++', difficulty: 'Medium' },
{ name: 'C++ Libraries (e.g., Qt)', description: 'Using libraries for UI in C++', difficulty: 'Medium' },
{ name: 'C++ and Assembly Language', description: 'Integrating assembly with C++', difficulty: 'Medium' },
{ name: 'Cross-Platform Development', description: 'Building cross-platform applications', difficulty: 'Medium' },
{ name: 'Error Handling Best Practices', description: 'Advanced strategies for error handling in C++', difficulty: 'Medium' },
{ name: 'Code Refactoring in C++', description: 'Best practices for refactoring C++ code', difficulty: 'Medium' },
{ name: 'Profiling C++ Applications', description: 'Techniques for profiling and optimizing C++ code', difficulty: 'Difficult' },
{ name: 'Memory Management Techniques', description: 'Advanced strategies for managing memory in C++', difficulty: 'Difficult' },
{ name: 'C++ and Low-level Hardware Interaction', description: 'Programming directly with hardware interfaces', difficulty: 'Difficult' },
{ name: 'C++ Compiler Optimization', description: 'Techniques for optimizing C++ code during compilation', difficulty: 'Difficult' },
{ name: 'Creating C++ Libraries', description: 'Designing and building reusable libraries in C++', difficulty: 'Difficult' },
{ name: 'Building Multithreaded Servers', description: 'Techniques for creating servers using threads in C++', difficulty: 'Difficult' },
{ name: 'Using C++ with Python Extensions', description: 'Creating Python extensions in C++ for performance', difficulty: 'Difficult' },
{ name: 'C++ and Cryptography', description: 'Implementing cryptographic algorithms in C++', difficulty: 'Difficult' },
{ name: 'Advanced File I/O Techniques', description: 'Techniques for efficient file handling in C++', difficulty: 'Difficult' },
{ name: 'Debugging with GDB', description: 'Mastering the GNU debugger for C++ applications', difficulty: 'Difficult' },
{ name: 'Understanding C++ Preprocessor Directives', description: 'Advanced usage of preprocessor features', difficulty: 'Difficult' },
{ name: 'Dynamic Memory Management', description: 'Advanced techniques for dynamic memory', difficulty: 'Difficult' },
{ name: 'C++ and Game Development', description: 'Using C++ for game development', difficulty: 'Difficult' },
{ name: 'Building Real-time Systems in C++', description: 'Techniques for real-time programming', difficulty: 'Difficult' },
{ name: 'C++ and Robotics', description: 'Using C++ in robotics programming', difficulty: 'Difficult' },
{ name: 'C++ for Embedded Systems', description: 'Programming techniques for embedded systems', difficulty: 'Difficult' },
{ name: 'Building Custom Allocators', description: 'Implementing custom memory allocators', difficulty: 'Difficult' },
{ name: 'C++ and RESTful API Development', description: 'Creating REST APIs using C++', difficulty: 'Difficult' },
{ name: 'Advanced C++ Data Structures', description: 'Implementing complex data structures in C++', difficulty: 'Difficult' },
{ name: 'Concurrency in C++', description: 'Techniques for concurrent programming in C++', difficulty: 'Difficult' },
{ name: 'C++ and Cryptography Basics', description: 'Implementing basic cryptographic algorithms', difficulty: 'Difficult' },
{ name: 'Using C++ for Cloud Computing', description: 'Building cloud applications with C++', difficulty: 'Difficult' },
{ name: 'Advanced C++ Standards', description: 'In-depth look at modern C++ standards', difficulty: 'Difficult' },
{ name: 'C++ and Artificial Intelligence', description: 'Using C++ in AI development', difficulty: 'Difficult' },
{ name: 'Integrating C++ with Other Languages', description: 'Interfacing C++ with languages like Python or Java', difficulty: 'Difficult' },
{ name: 'C++ for Scientific Computing', description: 'Using C++ in scientific applications', difficulty: 'Difficult' },
{ name: 'Memory Leak Detection in C++', description: 'Techniques for detecting memory leaks', difficulty: 'Difficult' },

];

const PracticeTopicsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const router = useRouter();

  const handleTopicClick = (_topicName: string) => {
    router.push(`/exam/C/level/easy`);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      if (searchTerm) {
        const lowerCaseTerm = searchTerm.toLowerCase();
        const results = topics.filter(topic =>
          topic.name.toLowerCase().includes(lowerCaseTerm)
        );
        setFilteredTopics(results.length > 0 ? results : topics);
      } else {
        // Reset to all topics when search term is cleared
        setFilteredTopics(topics);
      }
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-r from-[#54C392] to-white flex flex-col items-center p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center">Practice Topics</h1>
        <p className="text-lg md:text-xl text-black mb-8 text-center max-w-2xl">
          Search for topics to enhance your learning!
        </p>

        <div className="relative mb-6">
        <input
  type="text"
  placeholder="Search topics..."
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  aria-label="Search topics"
  className="p-4 pl-10 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-400 w-full shadow-md transition-shadow duration-300"
/>
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {searchTerm && filteredTopics.length === 0 && (
          <div className="text-center text-red-600 mb-4">
            <p>No topics found matching your search.</p>
            <p>Try different keywords or check out the topics list.</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTopics.sort(sortByDifficulty).map((topic) => (
            <div
              key={topic.name}
              className={`rounded-xl shadow-lg p-6 flex flex-col justify-between items-center bg-white transition-all duration-300 hover:shadow-xl cursor-pointer border-2 border-gray-300 hover:${difficultyStyles[topic.difficulty].hover}`}
              onClick={() => handleTopicClick(topic.name)}
            >
              <h2 className="text-2xl font-semibold mb-2 text-gray-800">{topic.name}</h2>
              <p className="text-center mb-4 text-gray-600">{topic.description}</p>
              <span className={`text-sm px-3 py-1 rounded-full bg-black transition-all duration-300 ${difficultyStyles[topic.difficulty].indicatorHover} text-gray-800`}>
                {topic.difficulty} {difficultyStyles[topic.difficulty].character}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PracticeTopicsPage;
