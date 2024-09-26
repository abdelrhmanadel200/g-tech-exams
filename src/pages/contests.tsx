"use client";

import Navbar from "@/components/Navbar";
import { useState } from 'react';
import '../styles/globals.css';

const ContestCreationPage = () => {
  const [contestName, setContestName] = useState<string>('');
  const [writer, setWriter] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [length, setLength] = useState<number | string>(''); // Allowing both number and string
  const [participants, setParticipants] = useState<number>(0);
  const [contests, setContests] = useState<Array<{ id: number; name: string; writer: string; startDate: string; length: number; category: string; status: string; results: string }>>([]);
  const [pastContests, setPastContests] = useState<Array<{ id: number; name: string; writer: string; startDate: string; length: number; results: string }>>([
    { id: 1, name: "Spring Code Sprint", writer: "Alice", startDate: "2023-03-01T10:00", length: 120, results: "Results available" },
    { id: 2, name: "Summer Algorithm Challenge", writer: "Bob", startDate: "2023-05-15T09:00", length: 180, results: "Results pending" },
    { id: 3, name: "Autumn Debugging Contest", writer: "Charlie", startDate: "2023-09-01T14:00", length: 60, results: "Results available" },
    { id: 4, name: "Winter Code Jam", writer: "Dana", startDate: "2023-12-10T11:00", length: 240, results: "Results available" },
    { id: 5, name: "New Year Hackathon", writer: "Eve", startDate: "2024-01-05T10:00", length: 360, results: "Results pending" },
  ]);
  const [category, setCategory] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  
  const categories = ['Coding', 'Algorithms', 'Data Structures'];

  const handleCreateContest = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newContest = {
      id: contests.length + pastContests.length + 1,
      name: contestName,
      writer,
      startDate,
      length: Number(length), // Ensure length is a number
      participants,
      category,
      status: new Date(startDate) < new Date() ? 'Finished' : 'Upcoming',
      results: Math.random() > 0.5 ? 'Results available' : 'Results pending',
    };

    setContests([...contests, newContest]);
    if (newContest.status === 'Finished') {
      setPastContests([...pastContests, newContest]);
    }
    resetForm();
  };

  const resetForm = () => {
    setContestName('');
    setWriter('');
    setStartDate('');
    setLength(''); // Reset length to an empty string
    setParticipants(0);
    setCategory('');
    setShowForm(false);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Upcoming':
        return 'bg-green-500 text-white';
      case 'Finished':
        return 'bg-red-500 text-white';
      case 'Pending':
        return 'bg-yellow-500 text-white';
      default:
        return '';
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-teal-100 to-white flex flex-col items-center">
        <div className="max-w-5xl w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold text-center mb-6 text-teal-700">Contest Management</h1>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setShowForm(!showForm)}
              className="p-4 bg-teal-700 text-white rounded-lg shadow hover:bg-teal-800 transition transform hover:scale-105"
            >
              {showForm ? 'Cancel Contest Creation' : 'Create Contest'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleCreateContest} className="flex flex-col space-y-4 mb-8">
              <input
                type="text"
                placeholder="Contest Name"
                value={contestName}
                onChange={(e) => setContestName(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <input
                type="text"
                placeholder="Writer Name"
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <input
                type="number"
                placeholder="Contest Length (in minutes)"
                value={length}
                onChange={(e) => setLength(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="" disabled>Select Category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              <button
                type="submit"
                className="p-4 bg-teal-700 text-white rounded-lg shadow hover:bg-teal-800 transition transform hover:scale-105"
              >
                Create Contest
              </button>
            </form>
          )}

          {/* Contests Section */}
          <h2 className="text-3xl font-bold text-center mb-4 text-teal-600">Current Contests</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-gray-100 rounded-lg shadow">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Writer</th>
                  <th className="py-3 px-4 text-left">Start</th>
                  <th className="py-3 px-4 text-left">Length</th>
                  <th className="py-3 px-4 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {contests.map((contest) => (
                  <tr key={contest.id} className="border-b hover:bg-gray-200 transition duration-200">
                    <td className="py-3 px-4">{contest.name}</td>
                    <td className="py-3 px-4">{contest.writer}</td>
                    <td className="py-3 px-4">{new Date(contest.startDate).toLocaleString()}</td>
                    <td className="py-3 px-4">{contest.length} min</td>
                    <td className={`py-3 px-4 rounded ${getStatusClass(contest.status)}`}>
                      {contest.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Past Contests Section */}
          <h2 className="text-3xl font-bold text-center mb-4 text-teal-600">Past Contests</h2>
          <div className="overflow-x-auto mb-8">
            <table className="w-full bg-gray-100 rounded-lg shadow">
              <thead className="bg-teal-600 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Writer</th>
                  <th className="py-3 px-4 text-left">Start</th>
                  <th className="py-3 px-4 text-left">Length</th>
                  <th className="py-3 px-4 text-left">Results</th>
                </tr>
              </thead>
              <tbody>
                {pastContests.map((contest) => (
                  <tr key={contest.id} className="border-b hover:bg-gray-200 transition duration-200">
                    <td className="py-3 px-4">{contest.name}</td>
                    <td className="py-3 px-4">{contest.writer}</td>
                    <td className="py-3 px-4">{new Date(contest.startDate).toLocaleString()}</td>
                    <td className="py-3 px-4">{contest.length} min</td>
                    <td className="py-3 px-4">{contest.results}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContestCreationPage;
