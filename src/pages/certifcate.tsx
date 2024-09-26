"use client";

import Navbar from "@/components/Navbar";
import { useState } from "react";
import '../styles/globals.css';

const CertificateDownloadPage = () => {
  const [hoveredLang, setHoveredLang] = useState<string | null>(null);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [downloadedCertificates, setDownloadedCertificates] = useState<Array<{ lang: string | null; name: string }>>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const languages = [
    { name: "JavaScript", description: "Master the fundamentals and advanced concepts of JavaScript." },
    { name: "Python", description: "Achieve recognized proficiency in Python programming." },
    { name: "Java", description: "Demonstrate skill in the Java programming language." },
    { name: "C++", description: "Certified expertise in C++ programming." },
    { name: "Ruby", description: "Proficient in Ruby programming for web development." },
  ];

  const handleDownload = (lang: string) => {
    if (!userName.trim()) {
      setErrorMessage("Please enter your name before downloading the certificate.");
      return;
    }
    setErrorMessage(''); // Clear error if valid
    setSelectedLang(lang);
    setShowModal(true);
  };

  const confirmDownload = () => {
    setIsLoading(true);

    setTimeout(() => {
      setDownloadedCertificates(prev => [...prev, { lang: selectedLang, name: userName }]);
      setIsLoading(false);
      setShowModal(false);
      setUserName('');
    }, 100);
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-teal-100 to-white flex flex-col items-center p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-black mb-4 text-center">Download Your Programming Certificate</h1>
        <p className="text-lg md:text-xl text-black mb-8 text-center max-w-2xl">Select a programming language, enter your name, and click to download your personalized certificate!</p>

        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />

        {errorMessage && <div className="mt-4 text-red-500">{errorMessage}</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((lang) => (
            <div
              key={lang.name}
              onMouseEnter={() => setHoveredLang(lang.name)}
              onMouseLeave={() => setHoveredLang(null)}
              className={`transition-transform transform rounded-lg shadow-lg p-6 flex flex-col items-center bg-white border-2 
              ${hoveredLang === lang.name ? "border-teal-500 scale-105" : "border-transparent"}`}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-teal-600">{lang.name}</h2>
              <p className="text-gray-700 mb-4">{lang.description}</p>
              <button
                onClick={() => handleDownload(lang.name)}
                className="mt-auto w-full p-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
                
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>

        {isLoading && <div className="mt-6 text-white">Processing...</div>}

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Confirm Download</h3>
              <p className="mb-4">Are you sure you want to download the certificate for {userName}?</p>
              <button
                onClick={confirmDownload}
                className="mr-4 p-2 bg-teal-600 text-white rounded-lg"
              >
                Yes
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 bg-gray-300 text-black rounded-lg"
              >
                No
              </button>
            </div>
          </div>
        )}

        {downloadedCertificates.length > 0 && (
          <div className="mt-10 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Download History</h2>
            <ul className="list-disc list-inside">
              {downloadedCertificates.map((cert, index) => (
                <li key={index} className="py-2">
                  <strong>{cert.lang}</strong> certificate downloaded for <em>{cert.name}</em>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default CertificateDownloadPage;
