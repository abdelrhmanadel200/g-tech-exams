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
{name: 'Introduction to Algorithms', description: 'Overview of algorithm design and analysis', difficulty: 'Easy' },
{ name: 'Big O Notation', description: 'Understanding time and space complexity', difficulty: 'Easy' },
{ name: 'Sorting Algorithms', description: 'Basic sorting techniques', difficulty: 'Easy' },
{ name: 'Bubble Sort', description: 'Implementing bubble sort', difficulty: 'Easy' },
{ name: 'Selection Sort', description: 'Understanding selection sort', difficulty: 'Easy' },
{ name: 'Insertion Sort', description: 'Implementing insertion sort', difficulty: 'Easy' },
{ name: 'Merge Sort', description: 'Understanding merge sort algorithm', difficulty: 'Medium' },
{ name: 'Quick Sort', description: 'Implementing quick sort', difficulty: 'Medium' },
{ name: 'Heap Sort', description: 'Understanding heap sort', difficulty: 'Medium' },
{ name: 'Counting Sort', description: 'Using counting sort for integers', difficulty: 'Medium' },
{ name: 'Radix Sort', description: 'Implementing radix sort', difficulty: 'Medium' },
{ name: 'Bucket Sort', description: 'Understanding bucket sort', difficulty: 'Medium' },
{ name: 'Search Algorithms', description: 'Basic search techniques', difficulty: 'Easy' },
{ name: 'Linear Search', description: 'Implementing linear search', difficulty: 'Easy' },
{ name: 'Binary Search', description: 'Understanding binary search', difficulty: 'Medium' },
{ name: 'Ternary Search', description: 'Implementing ternary search', difficulty: 'Medium' },
{ name: 'Depth-First Search (DFS)', description: 'Graph traversal using DFS', difficulty: 'Medium' },
{ name: 'Breadth-First Search (BFS)', description: 'Graph traversal using BFS', difficulty: 'Medium' },
{ name: 'Backtracking Algorithms', description: 'Understanding backtracking techniques', difficulty: 'Medium' },
{ name: 'Dynamic Programming', description: 'Introduction to dynamic programming', difficulty: 'Medium' },
{ name: 'Memoization Techniques', description: 'Using memoization in DP', difficulty: 'Medium' },
{ name: 'Greedy Algorithms', description: 'Understanding greedy approach', difficulty: 'Medium' },
{ name: 'Divide and Conquer', description: 'Implementing divide and conquer strategies', difficulty: 'Medium' },
{ name: 'Graph Algorithms', description: 'Advanced algorithms for graph processing', difficulty: 'Medium' },
{ name: 'Dijkstra’s Algorithm', description: 'Finding the shortest path in a graph', difficulty: 'Medium' },
{ name: 'Bellman-Ford Algorithm', description: 'Another shortest path algorithm', difficulty: 'Medium' },
{ name: 'Floyd-Warshall Algorithm', description: 'Finding shortest paths between all pairs', difficulty: 'Medium' },
{ name: 'Prim’s Algorithm', description: 'Minimum spanning tree using Prim’s', difficulty: 'Medium' },
{ name: 'Kruskal’s Algorithm', description: 'Minimum spanning tree using Kruskal’s', difficulty: 'Medium' },
{ name: 'Topological Sorting', description: 'Sorting vertices in a directed acyclic graph', difficulty: 'Medium' },
{ name: 'String Algorithms', description: 'Techniques for processing strings', difficulty: 'Medium' },
{ name: 'String Matching Algorithms', description: 'Searching substrings within strings', difficulty: 'Medium' },
{ name: 'Knuth-Morris-Pratt (KMP)', description: 'Efficient string searching with KMP', difficulty: 'Medium' },
{ name: 'Rabin-Karp Algorithm', description: 'Hashing approach for string matching', difficulty: 'Medium' },
{ name: 'Dynamic String Matching', description: 'Using dynamic programming for matching', difficulty: 'Medium' },
{ name: 'Computational Geometry', description: 'Algorithms for geometric problems', difficulty: 'Difficult' },
{ name: 'Convex Hull Algorithms', description: 'Finding the convex hull of a set of points', difficulty: 'Difficult' },
{ name: 'Line Intersection Algorithms', description: 'Determining intersection points', difficulty: 'Difficult' },
{ name: 'Graph Theory Concepts', description: 'Basic principles of graph theory', difficulty: 'Medium' },
{ name: 'Network Flow Algorithms', description: 'Understanding flow in networks', difficulty: 'Difficult' },
{ name: 'Ford-Fulkerson Method', description: 'Finding max flow in a flow network', difficulty: 'Difficult' },
{ name: 'Bipartite Matching', description: 'Finding matches in bipartite graphs', difficulty: 'Difficult' },
{ name: 'Advanced Data Structures', description: 'Using structures in algorithms', difficulty: 'Difficult' },
{ name: 'Segment Trees', description: 'Efficient range query handling', difficulty: 'Difficult' },
{ name: 'Fenwick Trees (Binary Indexed Trees)', description: 'Implementing Fenwick trees', difficulty: 'Medium' },
{ name: 'Trie Algorithms', description: 'Using trie for prefix searches', difficulty: 'Medium' },
{ name: 'Bit Manipulation Techniques', description: 'Efficiently using bits in algorithms', difficulty: 'Medium' },
{ name: 'Number Theory Algorithms', description: 'Mathematical algorithms and their applications', difficulty: 'Medium' },
{ name: 'Greatest Common Divisor (GCD)', description: 'Finding GCD using Euclidean algorithm', difficulty: 'Medium' },
{ name: 'Sieve of Eratosthenes', description: 'Finding prime numbers efficiently', difficulty: 'Medium' },
{ name: 'Mathematical Algorithms', description: 'Understanding mathematical techniques in algorithms', difficulty: 'Medium' },
{ name: 'Randomized Algorithms', description: 'Using randomness in algorithms', difficulty: 'Difficult' },
{ name: 'Approximation Algorithms', description: 'Finding near-optimal solutions', difficulty: 'Difficult' },
{ name: 'Machine Learning Algorithms', description: 'Basic algorithms in ML', difficulty: 'Difficult' },
{ name: 'Cryptography Algorithms', description: 'Algorithms for secure communications', difficulty: 'Difficult' },
{ name: 'Sorting Algorithms Comparison', description: 'Analyzing the efficiency of sorting techniques', difficulty: 'Medium' },
{ name: 'Algorithm Design Techniques', description: 'Common techniques for algorithm design', difficulty: 'Medium' },
{ name: 'Complexity Classes', description: 'Understanding P, NP, and NP-complete problems', difficulty: 'Difficult' },
{ name: 'NP-Complete Problems', description: 'Identifying and solving NP-complete problems', difficulty: 'Difficult' },
{ name: 'Greedy vs. Dynamic Programming', description: 'Comparing two algorithmic approaches', difficulty: 'Medium' },
{ name: 'Algorithm Efficiency', description: 'Measuring algorithm performance', difficulty: 'Medium' },
{ name: 'Benchmarking Algorithms', description: 'Techniques for algorithm benchmarking', difficulty: 'Medium' },
{ name: 'Optimization Algorithms', description: 'Improving algorithm performance', difficulty: 'Difficult' },
{ name: 'Implementing Algorithms in C++', description: 'Best practices for coding algorithms', difficulty: 'Medium' },
{ name: 'Real-Time Algorithms', description: 'Techniques for real-time processing', difficulty: 'Difficult' },
{ name: 'Algorithms in Practice', description: 'Applying algorithms in real-world scenarios', difficulty: 'Difficult' },
{ name: 'Future Trends in Algorithms', description: 'Emerging trends in algorithm development', difficulty: 'Difficult' },
{ name: 'Parallel Algorithms', description: 'Using parallel processing in algorithms', difficulty: 'Difficult' },
{ name: 'Distributed Algorithms', description: 'Understanding algorithms in distributed systems', difficulty: 'Difficult' },
{ name: 'Algorithm Debugging Techniques', description: 'Strategies for debugging algorithms', difficulty: 'Medium' },
{ name: 'Algorithm Visualization', description: 'Techniques for visualizing algorithms', difficulty: 'Medium' },
{ name: 'Advanced Search Algorithms', description: 'Exploring complex search techniques', difficulty: 'Difficult' },
{ name: 'Data Structures and Algorithms Integration', description: 'Combining structures with algorithms', difficulty: 'Difficult' },
{ name: 'Custom Algorithms for Specific Problems', description: 'Tailoring algorithms for unique challenges', difficulty: 'Difficult' },

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
