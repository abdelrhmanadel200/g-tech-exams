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
  { name: 'Introduction to OOP', description: 'Overview of Object-Oriented Programming concepts', difficulty: 'Easy' },
  { name: 'Classes and Objects', description: 'Defining and using classes and objects', difficulty: 'Easy' },
  { name: 'Encapsulation', description: 'Data hiding and encapsulation principles', difficulty: 'Easy' },
  { name: 'Abstraction', description: 'Simplifying complex systems through abstraction', difficulty: 'Easy' },
  { name: 'Inheritance', description: 'Understanding inheritance and its benefits', difficulty: 'Easy' },
  { name: 'Polymorphism', description: 'Using polymorphism for flexible code', difficulty: 'Easy' },
  { name: 'Method Overloading', description: 'Overloading methods for different parameters', difficulty: 'Medium' },
  { name: 'Operator Overloading', description: 'Customizing operator behavior', difficulty: 'Medium' },
  { name: 'Constructor and Destructor', description: 'Creating and destroying objects', difficulty: 'Medium' },
  { name: 'Copy Constructor', description: 'Understanding copy constructors', difficulty: 'Medium' },
  { name: 'Static Members', description: 'Using static members in classes', difficulty: 'Medium' },
  { name: 'Friend Functions', description: 'Using friend functions for access', difficulty: 'Medium' },
  { name: 'Abstract Classes', description: 'Creating and using abstract classes', difficulty: 'Medium' },
  { name: 'Interfaces in C++', description: 'Defining and implementing interfaces', difficulty: 'Medium' },
  { name: 'Multiple Inheritance', description: 'Understanding multiple inheritance', difficulty: 'Medium' },
  { name: 'Virtual Functions', description: 'Using virtual functions for dynamic binding', difficulty: 'Medium' },
  { name: 'Pure Virtual Functions', description: 'Creating abstract base classes with pure virtual functions', difficulty: 'Medium' },
  { name: 'Dynamic Binding', description: 'Understanding dynamic vs. static binding', difficulty: 'Medium' },
  { name: 'Composition vs. Inheritance', description: 'When to use composition over inheritance', difficulty: 'Medium' },
  { name: 'Design Patterns', description: 'Common design patterns in OOP', difficulty: 'Medium' },
  { name: 'Singleton Pattern', description: 'Implementing the Singleton design pattern', difficulty: 'Medium' },
  { name: 'Factory Pattern', description: 'Using the Factory design pattern', difficulty: 'Medium' },
  { name: 'Observer Pattern', description: 'Implementing the Observer design pattern', difficulty: 'Medium' },
  { name: 'Decorator Pattern', description: 'Using the Decorator design pattern', difficulty: 'Medium' },
  { name: 'Strategy Pattern', description: 'Implementing the Strategy design pattern', difficulty: 'Medium' },
  { name: 'Command Pattern', description: 'Using the Command design pattern', difficulty: 'Medium' },
  { name: 'Template Classes', description: 'Creating and using template classes', difficulty: 'Medium' },
  { name: 'Exception Handling in OOP', description: 'Using exceptions for error handling', difficulty: 'Medium' },
  { name: 'Namespaces', description: 'Organizing code with namespaces', difficulty: 'Medium' },
  { name: 'Lambda Expressions', description: 'Using lambda expressions in C++', difficulty: 'Medium' },
  { name: 'Smart Pointers', description: 'Using smart pointers for memory management', difficulty: 'Medium' },
  { name: 'RAII (Resource Acquisition Is Initialization)', description: 'Managing resources with RAII', difficulty: 'Medium' },
  { name: 'Dynamic Memory Allocation', description: 'Allocating memory dynamically in C++', difficulty: 'Medium' },
  { name: 'Memory Leaks and Debugging', description: 'Identifying and fixing memory leaks', difficulty: 'Medium' },
  { name: 'C++ Standard Library and OOP', description: 'Using STL with OOP concepts', difficulty: 'Medium' },
  { name: 'Advanced Inheritance Techniques', description: 'Understanding virtual inheritance', difficulty: 'Medium' },
  { name: 'Mixin Classes', description: 'Using mixins for code reuse', difficulty: 'Medium' },
  { name: 'Operator Overloading Best Practices', description: 'Best practices for operator overloading', difficulty: 'Medium' },
  { name: 'Access Modifiers', description: 'Understanding public, private, and protected', difficulty: 'Easy' },
  { name: 'Constructor Delegation', description: 'Delegating constructor calls', difficulty: 'Medium' },
  { name: 'Move Semantics', description: 'Understanding move semantics in C++11', difficulty: 'Medium' },
  { name: 'Copy Elision', description: 'Optimizing performance with copy elision', difficulty: 'Medium' },
  { name: 'Object Slicing', description: 'Understanding object slicing in inheritance', difficulty: 'Medium' },
  { name: 'Reflection in C++', description: 'Implementing reflection capabilities', difficulty: 'Difficult' },
  { name: 'Compile-time Polymorphism', description: 'Using templates for compile-time polymorphism', difficulty: 'Medium' },
  { name: 'Run-time Polymorphism', description: 'Using virtual functions for run-time polymorphism', difficulty: 'Medium' },
  { name: 'Encapsulation Techniques', description: 'Best practices for encapsulation', difficulty: 'Medium' },
  { name: 'Design by Contract', description: 'Using contracts in class design', difficulty: 'Medium' },
  { name: 'State Design Pattern', description: 'Implementing the State design pattern', difficulty: 'Medium' },
  { name: 'Adapter Design Pattern', description: 'Using the Adapter design pattern', difficulty: 'Medium' },
  { name: 'Builder Design Pattern', description: 'Implementing the Builder design pattern', difficulty: 'Medium' },
  { name: 'Prototype Pattern', description: 'Using the Prototype design pattern', difficulty: 'Medium' },
  { name: 'Concurrency in OOP', description: 'Handling concurrency in object-oriented designs', difficulty: 'Difficult' },
  { name: 'Multi-threading in C++', description: 'Using threads in object-oriented programming', difficulty: 'Difficult' },
  { name: 'Event-Driven Programming', description: 'Implementing event-driven design in C++', difficulty: 'Medium' },
  { name: 'C++11 Features for OOP', description: 'New OOP features in C++11', difficulty: 'Medium' },
  { name: 'C++14 and C++17 OOP Enhancements', description: 'Updates in later C++ standards', difficulty: 'Medium' },
  { name: 'Best Practices in OOP', description: 'Common best practices for OOP design', difficulty: 'Medium' },
  { name: 'Testing OOP Designs', description: 'Unit testing object-oriented code', difficulty: 'Medium' },
  { name: 'Refactoring Object-Oriented Code', description: 'Improving code structure in OOP', difficulty: 'Medium' },
  { name: 'Code Review Techniques for OOP', description: 'Best practices for reviewing OOP code', difficulty: 'Medium' },
  { name: 'Interfacing OOP with Functional Programming', description: 'Combining OOP and functional paradigms', difficulty: 'Difficult' },
  { name: 'Performance Optimization in OOP', description: 'Techniques for optimizing OOP code', difficulty: 'Difficult' },
  { name: 'Real-world Applications of OOP', description: 'Case studies of OOP in industry', difficulty: 'Difficult' },
  { name: 'Understanding Class Design Principles', description: 'Best practices for class design', difficulty: 'Medium' },
  { name: 'C++ and Object-Oriented Design', description: 'Combining C++ features with OOP', difficulty: 'Medium' },
  { name: 'OOP and Software Engineering', description: 'Role of OOP in software engineering practices', difficulty: 'Medium' },
  { name: 'Handling Errors in OOP', description: 'Best practices for error handling', difficulty: 'Medium' },
  { name: 'User-defined Types in OOP', description: 'Creating custom types and their uses', difficulty: 'Medium' },
  
];

const PracticeTopicsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const router = useRouter();

  const handleTopicClick = () => {
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
              onClick={() => handleTopicClick()}
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
