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
    { name: 'Basics of C', description: 'Introduction to C programming language', difficulty: 'Easy' },
    { name: 'Data Types', description: 'Understanding data types in C', difficulty: 'Easy' },
    { name: 'Variables and Constants', description: 'Using variables and constants', difficulty: 'Easy' },
    { name: 'Operators', description: 'Various operators in C', difficulty: 'Easy' },
    { name: 'Control Structures', description: 'Flow control statements', difficulty: 'Medium' },
    { name: 'Conditional Statements (if, else)', description: 'Using if-else statements', difficulty: 'Medium' },
    { name: 'Switch Case', description: 'Multi-way branching with switch', difficulty: 'Medium' },
    { name: 'Loops (for, while, do-while)', description: 'Looping constructs in C', difficulty: 'Medium' },
    { name: 'Arrays', description: 'Working with arrays', difficulty: 'Medium' },
    { name: 'Multidimensional Arrays', description: 'Using multidimensional arrays', difficulty: 'Medium' },
    { name: 'Strings', description: 'String manipulation in C', difficulty: 'Medium' },
    { name: 'String Functions', description: 'Common string functions', difficulty: 'Medium' },
    { name: 'Pointers', description: 'Understanding pointers', difficulty: 'Medium' },
    { name: 'Pointer Arithmetic', description: 'Operations on pointers', difficulty: 'Medium' },
    { name: 'Functions', description: 'Defining and using functions', difficulty: 'Medium' },
    { name: 'Function Overloading', description: 'Using function overloading concepts', difficulty: 'Medium' },
    { name: 'Recursion', description: 'Recursive functions in C', difficulty: 'Medium' },
    { name: 'Pass by Value vs. Pass by Reference', description: 'Understanding argument passing', difficulty: 'Medium' },
    { name: 'Structures', description: 'Defining and using structures', difficulty: 'Medium' },
    { name: 'Unions', description: 'Using unions for memory efficiency', difficulty: 'Medium' },
    { name: 'Enumerations', description: 'Creating enumerated types', difficulty: 'Medium' },
    { name: 'Typedef', description: 'Creating type aliases', difficulty: 'Medium' },
    { name: 'Dynamic Memory Allocation', description: 'Managing memory dynamically', difficulty: 'Medium' },
    { name: 'malloc() and free()', description: 'Allocating and freeing memory', difficulty: 'Medium' },
    { name: 'Calloc() and realloc()', description: 'Memory management functions', difficulty: 'Medium' },
    { name: 'File I/O', description: 'Reading and writing files', difficulty: 'Medium' },
    { name: 'Reading and Writing Files', description: 'File handling in C', difficulty: 'Medium' },
    { name: 'Error Handling in Files', description: 'Handling file errors', difficulty: 'Medium' },
    { name: 'Command Line Arguments', description: 'Using command line inputs', difficulty: 'Medium' },
    { name: 'Preprocessor Directives', description: 'Using preprocessor directives', difficulty: 'Medium' },
    { name: 'Macros', description: 'Creating and using macros', difficulty: 'Medium' },
    { name: 'Inline Functions', description: 'Optimizing with inline functions', difficulty: 'Medium' },
    { name: 'Variable Arguments (va_list)', description: 'Handling variable arguments', difficulty: 'Medium' },
    { name: 'Bit Manipulation', description: 'Manipulating bits and bytes', difficulty: 'Medium' },
    { name: 'Structures and Pointers', description: 'Combining structures with pointers', difficulty: 'Medium' },
    { name: 'Function Pointers', description: 'Using pointers to functions', difficulty: 'Medium' },
    { name: 'Array of Pointers', description: 'Working with arrays of pointers', difficulty: 'Medium' },
    { name: 'Strings and Pointers', description: 'Using pointers with strings', difficulty: 'Medium' },
    { name: 'C Standard Library', description: 'Overview of standard library functions', difficulty: 'Medium' },
    { name: 'Memory Management', description: 'Managing memory in C', difficulty: 'Medium' },
    { name: 'Linked Lists (Singly)', description: 'Implementing singly linked lists', difficulty: 'Medium' },
    { name: 'Linked Lists (Doubly)', description: 'Implementing doubly linked lists', difficulty: 'Medium' },
    { name: 'Stacks', description: 'Understanding stack data structure', difficulty: 'Medium' },
    { name: 'Queues', description: 'Understanding queue data structure', difficulty: 'Medium' },
    { name: 'Trees (Binary Trees)', description: 'Implementing binary trees', difficulty: 'Medium' },
    { name: 'Binary Search Trees', description: 'Working with binary search trees', difficulty: 'Medium' },
    { name: 'Graphs (Adjacency List)', description: 'Graph representation using adjacency lists', difficulty: 'Medium' },
    { name: 'Sorting Algorithms (Bubble Sort)', description: 'Implementing bubble sort', difficulty: 'Medium' },
    { name: 'Sorting Algorithms (Selection Sort)', description: 'Implementing selection sort', difficulty: 'Medium' },
    { name: 'Sorting Algorithms (Insertion Sort)', description: 'Implementing insertion sort', difficulty: 'Medium' },
    { name: 'Sorting Algorithms (Merge Sort)', description: 'Implementing merge sort', difficulty: 'Medium' },
    { name: 'Sorting Algorithms (Quick Sort)', description: 'Implementing quick sort', difficulty: 'Medium' },
    { name: 'Searching Algorithms (Linear Search)', description: 'Implementing linear search', difficulty: 'Medium' },
    { name: 'Searching Algorithms (Binary Search)', description: 'Implementing binary search', difficulty: 'Medium' },
    { name: 'Hashing', description: 'Understanding hashing techniques', difficulty: 'Medium' },
    { name: 'Hash Tables', description: 'Implementing hash tables', difficulty: 'Medium' },
    { name: 'C Debugging Techniques', description: 'Common debugging methods', difficulty: 'Medium' },
    { name: 'Assertions', description: 'Using assertions for debugging', difficulty: 'Medium' },
    { name: 'Valgrind for Memory Leak Detection', description: 'Using Valgrind tools', difficulty: 'Medium' },
    { name: 'C Makefile Basics', description: 'Creating and using Makefiles', difficulty: 'Medium' },
    { name: 'C Modular Programming', description: 'Understanding modular design', difficulty: 'Medium' },
    { name: 'Multithreading in C', description: 'Working with threads', difficulty: 'Medium' },
    { name: 'Synchronization Techniques', description: 'Techniques for thread safety', difficulty: 'Medium' },
    { name: 'Mutexes and Semaphores', description: 'Using mutexes and semaphores', difficulty: 'Medium' },
    { name: 'Signals', description: 'Handling signals in C', difficulty: 'Medium' },
    { name: 'Process Management', description: 'Managing processes in C', difficulty: 'Medium' },
    { name: 'Inter-process Communication (IPC)', description: 'Techniques for IPC', difficulty: 'Medium' },
    { name: 'Sockets Programming', description: 'Understanding socket programming', difficulty: 'Medium' },
    { name: 'Network Programming', description: 'Basics of network programming', difficulty: 'Medium' },
    { name: 'C and GUI Programming', description: 'Creating GUI applications', difficulty: 'Medium' },
    { name: 'C Libraries (e.g., ncurses)', description: 'Using libraries for UI', difficulty: 'Medium' },
    { name: 'C with Assembly Language', description: 'Integrating assembly with C', difficulty: 'Medium' },
    { name: 'Cross-Compilation', description: 'Compiling for different architectures', difficulty: 'Medium' },
    { name: 'C and Embedded Systems', description: 'Programming embedded systems', difficulty: 'Medium' },
    { name: 'C for System Programming', description: 'Understanding system-level programming', difficulty: 'Medium' },
    { name: 'C for Game Development', description: 'Using C for game development', difficulty: 'Medium' },
    { name: 'Error Handling (errno)', description: 'Using errno for error checking', difficulty: 'Medium' },
    { name: 'C Style Guidelines', description: 'Best practices for coding style', difficulty: 'Medium' },
    { name: 'Best Practices in C', description: 'Common best practices', difficulty: 'Medium' },
    { name: 'C Standards (C89, C99, C11)', description: 'Understanding C standards', difficulty: 'Medium' },
    { name: 'Portability in C', description: 'Writing portable C code', difficulty: 'Medium' },
    { name: 'Concurrency and Parallelism', description: 'Implementing concurrent programming paradigms in C', difficulty: 'Difficult' },
    { name: 'Memory Management Techniques', description: 'Advanced strategies for managing memory in C', difficulty: 'Difficult' },
    { name: 'Advanced Pointer Concepts', description: 'Deep dive into function pointers and pointer arrays', difficulty: 'Difficult' },
    { name: 'Thread Synchronization', description: 'Techniques for synchronizing threads in C', difficulty: 'Difficult' },
    { name: 'Mutexes and Semaphores', description: 'Using mutexes and semaphores for thread safety', difficulty: 'Difficult' },
    { name: 'C with POSIX Threads', description: 'Implementing multi-threaded applications with pthreads', difficulty: 'Difficult' },
    { name: 'Inter-process Communication (IPC)', description: 'Methods for communication between processes in C', difficulty: 'Difficult' },
    { name: 'Signals in C', description: 'Handling asynchronous events using signals', difficulty: 'Difficult' },
    { name: 'Dynamic Linking and Loading', description: 'Understanding dynamic libraries and runtime linking', difficulty: 'Difficult' },
    { name: 'C Makefile Advanced Techniques', description: 'Mastering Makefile for complex C projects', difficulty: 'Difficult' },
    { name: 'C and System Calls', description: 'Interfacing directly with the operating system via system calls', difficulty: 'Difficult' },
    { name: 'Advanced Data Structures', description: 'Implementing complex data structures in C', difficulty: 'Difficult' },
    { name: 'C and Networking', description: 'Building networked applications using sockets in C', difficulty: 'Difficult' },
    { name: 'C with Assembly Language', description: 'Integrating assembly language for performance-critical code', difficulty: 'Difficult' },
    { name: 'Memory Leak Detection', description: 'Using tools to identify and fix memory leaks in C', difficulty: 'Difficult' },
    { name: 'Advanced File I/O Techniques', description: 'Techniques for efficient file handling in C', difficulty: 'Difficult' },
    { name: 'Debugging with GDB', description: 'Mastering the GNU debugger for C applications', difficulty: 'Difficult' },
    { name: 'C and Low-level Hardware Interaction', description: 'Programming directly with hardware interfaces', difficulty: 'Difficult' },
    { name: 'C Compiler Optimization', description: 'Techniques for optimizing C code during compilation', difficulty: 'Difficult' },
    { name: 'Using C with Python/C Extensions', description: 'Creating Python extensions in C for performance', difficulty: 'Difficult' },
    { name: 'Profiling C Applications', description: 'Techniques for profiling and optimizing C code performance', difficulty: 'Difficult' },
    { name: 'Creating C Libraries', description: 'Designing and building reusable libraries in C', difficulty: 'Difficult' },
    { name: 'Understanding ABI (Application Binary Interface)', description: 'Insights into C ABI for compatibility', difficulty: 'Difficult' },
    { name: 'Code Generation with C', description: 'Generating code dynamically in C applications', difficulty: 'Difficult' },
    { name: 'Advanced Recursion Techniques', description: 'Exploring complex recursive algorithms in C', difficulty: 'Difficult' },
    { name: 'C and Embedded Systems Programming', description: 'Programming techniques for embedded systems', difficulty: 'Difficult' },
    { name: 'C and Real-Time Systems', description: 'Concepts for real-time programming in C', difficulty: 'Difficult' },
    { name: 'Building a Custom Allocator', description: 'Implementing a custom memory allocator in C', difficulty: 'Difficult' },
    { name: 'C and Cryptography', description: 'Implementing cryptographic algorithms in C', difficulty: 'Difficult' },
    { name: 'Using Valgrind for Memory Management', description: 'Employing Valgrind to monitor memory usage', difficulty: 'Difficult' },
    { name: 'C and RESTful API Development', description: 'Creating REST APIs using C', difficulty: 'Difficult' },
    { name: 'C and GUI Programming', description: 'Developing graphical user interfaces in C', difficulty: 'Difficult' },
    { name: 'Understanding C Preprocessor Directives', description: 'Advanced usage of preprocessor features', difficulty: 'Difficult' },
    { name: 'Building C Applications for Microcontrollers', description: 'Techniques for microcontroller programming', difficulty: 'Difficult' },
    { name: 'C for Game Development', description: 'Using C for developing game engines and applications', difficulty: 'Difficult' },
    { name: 'Code Refactoring in C', description: 'Best practices for refactoring and improving C code', difficulty: 'Difficult' },
    { name: 'Building Multithreaded Servers', description: 'Techniques for creating servers using threads in C', difficulty: 'Difficult' },
    { name: 'Error Handling Best Practices', description: 'Advanced strategies for error handling in C', difficulty: 'Difficult' },
    { name: 'Using C with SQL Databases', description: 'Interfacing C applications with SQL databases', difficulty: 'Difficult' },
    { name: 'Advanced C Standard Library Usage', description: 'Exploring lesser-known functions in the C standard library', difficulty: 'Difficult' },
 
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
