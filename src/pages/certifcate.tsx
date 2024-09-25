"use client"; 
import Navbar from "@/components/Navbar";
import { useState } from "react";
import '../styles/globals.css';

const CertificateDownloadPage = () => {
  const [hoveredLang, setHoveredLang] = useState(null);
  const [selectedLang, setSelectedLang] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [downloadedCertificates, setDownloadedCertificates] = useState([]);

  const languages = [
    { name: "JavaScript", description: "Master the fundamentals and advanced concepts of JavaScript.", file: "javascript_cert.pdf" },
    { name: "Python", description: "Achieve recognized proficiency in Python programming.", file: "python_cert.pdf" },
    { name: "Java", description: "Demonstrate skill in the Java programming language.", file: "java_cert.pdf" },
    { name: "C++", description: "Certified expertise in C++ programming.", file: "cpp_cert.pdf" },
    { name: "Ruby", description: "Proficient in Ruby programming for web development.", file: "ruby_cert.pdf" },
  ];

  const handleDownload = (file) => {
    setSelectedLang(file);
    setShowModal(true);
  };

  const confirmDownload = () => {
    setIsLoading(true);
   
    setTimeout(() => {
      alert(`Downloading ${selectedLang} for ${userName}`);
      setDownloadedCertificates(prev => [...prev, { lang: selectedLang, name: userName }]);
      setIsLoading(false);
      setShowModal(false);
      setUserName('');
    }, 2000); 
  };

  return (
    <>
      <Navbar />
      <div className="w-full min-h-screen bg-gradient-to-b from-teal-50 to-white flex flex-col items-center p-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 text-center">Download Your Programming Certificate</h1>
        <p className="text-lg md:text-xl text-white mb-8 text-center max-w-2xl">Select a programming language, enter your name, and click to download your personalized certificate!</p>

        <input
          type="text"
          placeholder="Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="p-4 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          required
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {languages.map((lang, index) => (
            <div
              key={lang.name}
              onMouseEnter={() => setHoveredLang(index)}
              onMouseLeave={() => setHoveredLang(null)}
              className={`transition-transform transform rounded-lg shadow-lg p-6 flex flex-col items-center bg-white border-2 
              ${hoveredLang === index ? "border-teal-500 scale-105" : "border-transparent"}`}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-teal-600">{lang.name}</h2>
              <p className="text-gray-700 mb-4">{lang.description}</p>
              <button
                onClick={() => handleDownload(lang.file)}
                className="mt-auto w-full p-3 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition"
                disabled={!userName}
              >
                Download Certificate
              </button>
            </div>
          ))}
        </div>

        {/* Loading Spinner */}
        {isLoading && <div className="mt-6 text-white">Downloading...</div>}

       
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Confirm Download</h3>
              <p className="mb-4">Are you sure you want to download this certificate for {userName}?</p>
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

        {/* Download History Section */}
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
