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
  { name: 'Introduction to Data Structures', description: 'Overview of data structures', difficulty: 'Easy' },
  { name: 'Arrays', description: 'Basic concepts of arrays', difficulty: 'Easy' },
  { name: 'Linked Lists', description: 'Introduction to linked lists', difficulty: 'Easy' },
  { name: 'Singly Linked Lists', description: 'Understanding singly linked lists', difficulty: 'Medium' },
  { name: 'Doubly Linked Lists', description: 'Implementing doubly linked lists', difficulty: 'Medium' },
  { name: 'Circular Linked Lists', description: 'Working with circular linked lists', difficulty: 'Medium' },
  { name: 'Stacks', description: 'Understanding stack data structure', difficulty: 'Medium' },
  { name: 'Queue', description: 'Introduction to queue data structure', difficulty: 'Medium' },
  { name: 'Circular Queue', description: 'Implementing circular queues', difficulty: 'Medium' },
  { name: 'Priority Queue', description: 'Understanding priority queues', difficulty: 'Medium' },
  { name: 'Deque (Double Ended Queue)', description: 'Working with deques', difficulty: 'Medium' },
  { name: 'Hash Tables', description: 'Understanding hash table concepts', difficulty: 'Medium' },
  { name: 'Collision Resolution Techniques', description: 'Methods for resolving collisions', difficulty: 'Medium' },
  { name: 'Binary Trees', description: 'Introduction to binary trees', difficulty: 'Medium' },
  { name: 'Binary Search Trees', description: 'Implementing binary search trees', difficulty: 'Medium' },
  { name: 'Tree Traversal Techniques', description: 'Inorder, Preorder, Postorder', difficulty: 'Medium' },
  { name: 'AVL Trees', description: 'Understanding self-balancing trees', difficulty: 'Medium' },
  { name: 'Red-Black Trees', description: 'Implementing red-black trees', difficulty: 'Medium' },
  { name: 'B-Trees', description: 'Introduction to B-trees', difficulty: 'Medium' },
  { name: 'Heaps', description: 'Understanding heap data structure', difficulty: 'Medium' },
  { name: 'Min-Heap and Max-Heap', description: 'Working with min and max heaps', difficulty: 'Medium' },
  { name: 'Graphs', description: 'Introduction to graph data structures', difficulty: 'Medium' },
  { name: 'Graph Representations (Adjacency List and Matrix)', description: 'Different ways to represent graphs', difficulty: 'Medium' },
  { name: 'Graph Traversal Algorithms (BFS, DFS)', description: 'Understanding BFS and DFS', difficulty: 'Medium' },
  { name: 'Shortest Path Algorithms (Dijkstra, Bellman-Ford)', description: 'Finding shortest paths in graphs', difficulty: 'Medium' },
  { name: 'Minimum Spanning Tree (Prim’s and Kruskal’s)', description: 'Algorithms for MST', difficulty: 'Medium' },
  { name: 'Dynamic Programming', description: 'Using dynamic programming with data structures', difficulty: 'Medium' },
  { name: 'Trie (Prefix Tree)', description: 'Understanding trie data structure', difficulty: 'Medium' },
  { name: 'Segment Trees', description: 'Working with segment trees', difficulty: 'Medium' },
  { name: 'Fenwick Tree (Binary Indexed Tree)', description: 'Implementing Fenwick trees', difficulty: 'Medium' },
  { name: 'Bloom Filters', description: 'Understanding probabilistic data structures', difficulty: 'Medium' },
  { name: 'Disjoint Set (Union-Find)', description: 'Implementing union-find data structure', difficulty: 'Medium' },
  { name: 'Sparse Table', description: 'Using sparse tables for range queries', difficulty: 'Medium' },
  { name: 'K-D Trees', description: 'Understanding K-dimensional trees', difficulty: 'Medium' },
  { name: 'Data Structures for Strings', description: 'Specialized structures for string manipulation', difficulty: 'Medium' },
  { name: 'Suffix Trees and Arrays', description: 'Working with suffix structures', difficulty: 'Medium' },
  { name: 'Data Structures for Searching', description: 'Efficient searching techniques', difficulty: 'Medium' },
  { name: 'Data Structures for Sorting', description: 'Choosing appropriate structures for sorting', difficulty: 'Medium' },
  { name: 'Memory Management in Data Structures', description: 'Managing memory effectively', difficulty: 'Medium' },
  { name: 'Complexity Analysis', description: 'Analyzing time and space complexity', difficulty: 'Medium' },
  { name: 'Backtracking Techniques', description: 'Using data structures in backtracking', difficulty: 'Medium' },
  { name: 'Amortized Analysis', description: 'Understanding amortized costs', difficulty: 'Medium' },
  { name: 'Data Structures for Concurrent Programming', description: 'Thread-safe data structures', difficulty: 'Difficult' },
  { name: 'Data Structure Design Patterns', description: 'Common design patterns', difficulty: 'Medium' },
  { name: 'Advanced Tree Structures (Splay Trees, Treaps)', description: 'Understanding advanced trees', difficulty: 'Difficult' },
  { name: 'Non-Linear Data Structures', description: 'Exploring non-linear structures', difficulty: 'Medium' },
  { name: 'Data Structures in C++ Standard Library', description: 'Overview of STL containers', difficulty: 'Medium' },
  { name: 'Custom Data Structure Implementation', description: 'Building your own data structures', difficulty: 'Medium' },
  { name: 'Comparing Data Structures', description: 'Choosing the right structure for the task', difficulty: 'Medium' },
  { name: 'Data Structures for Game Development', description: 'Using data structures in games', difficulty: 'Difficult' },
  { name: 'Real-Time Data Structures', description: 'Structures for real-time systems', difficulty: 'Difficult' },
  { name: 'Geometric Data Structures', description: 'Structures for geometric applications', difficulty: 'Difficult' },
  { name: 'Network Data Structures', description: 'Using structures in network applications', difficulty: 'Difficult' },
  { name: 'Caching Data Structures', description: 'Techniques for caching data', difficulty: 'Difficult' },
  { name: 'Data Structures for Artificial Intelligence', description: 'Structures used in AI algorithms', difficulty: 'Difficult' },
  { name: 'Evaluating Data Structures', description: 'Metrics for evaluating efficiency', difficulty: 'Medium' },
  { name: 'Data Structure Visualization', description: 'Techniques for visualizing structures', difficulty: 'Medium' },
  { name: 'Data Structures in Big Data', description: 'Handling large datasets', difficulty: 'Difficult' },
  { name: 'Data Structure Optimization Techniques', description: 'Improving performance of structures', difficulty: 'Difficult' },
  { name: 'Implementing Data Structures in Different Languages', description: 'Comparing implementations in various languages', difficulty: 'Difficult' },
  { name: 'Persistent Data Structures', description: 'Understanding immutability and persistence', difficulty: 'Difficult' },
  { name: 'Data Structures for Machine Learning', description: 'Using structures in ML applications', difficulty: 'Difficult' },
  { name: 'Interfacing Data Structures with Databases', description: 'Connecting structures to databases', difficulty: 'Difficult' },
  { name: 'Data Structures for Web Development', description: 'Using structures in web applications', difficulty: 'Difficult' },
  { name: 'Future Trends in Data Structures', description: 'Emerging trends and technologies', difficulty: 'Difficult' },
  { name: 'Data Structures in Cryptography', description: 'Utilizing structures in cryptographic algorithms', difficulty: 'Difficult' },
  { name: 'Data Structures for Cybersecurity', description: 'Building secure data structures', difficulty: 'Difficult' },
  
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
