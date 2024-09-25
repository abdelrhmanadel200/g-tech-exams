"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { FiPlus } from 'react-icons/fi'; 
import '../styles/globals.css';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Software Developer");
  const [skills, setSkills] = useState(["C#", "JavaScript", "Python"]);
  const [newSkill, setNewSkill] = useState("");
  const [profilePicture, setProfilePicture] = useState("");

  useEffect(() => {
    const initialProfilePicture = localStorage.getItem('profilePicture') || "";
    setProfilePicture(initialProfilePicture);
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    localStorage.setItem('profilePicture', profilePicture);
  };

  const handleAddSkill = () => {
    if (newSkill) {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePictureClick = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-teal-100 to-white p-6">
        
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6 flex items-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <div className="flex-shrink-0 relative">
            <img
              src={profilePicture || "https://via.placeholder.com/100"}
              alt="Profile"
              className="rounded-full border-4 border-teal-500 w-28 h-28 cursor-pointer shadow-lg transition-all duration-200 ease-in-out hover:shadow-xl"
              onClick={handlePictureClick}
            />
            {!profilePicture && (
              <div className="absolute inset-0 flex items-center justify-center">
                <FiPlus className="text-teal-500 text-3xl" />
              </div>
            )}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={handlePictureChange}
              className="hidden"
            />
          </div>
          <div className="ml-6">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-3xl font-bold border-b-2 border-gray-300 focus:outline-none transition duration-300" />
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="text-lg text-gray-600 mt-2 border-b-2 border-gray-300 focus:outline-none transition duration-300" />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold">{name}</h2>
                <h3 className="text-lg text-gray-600">{jobTitle}</h3>
              </>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 w-full max-w-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-teal-500 text-white text-lg font-semibold rounded-full py-2 text-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
                {skill}
              </div>
            ))}
          </div>
          {isEditing && (
            <>
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill"
                className="border p-2 rounded w-full" />
              <button onClick={handleAddSkill} className="mt-2 bg-teal-600 text-white rounded-full px-4 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                Add Skill
              </button>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {isEditing ? (
            <button onClick={handleSaveProfile} className="bg-teal-600 text-white text-lg font-semibold rounded-full px-6 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              Save Changes
            </button>
          ) : (
            <button onClick={handleEditProfile} className="bg-teal-600 text-white text-lg font-semibold rounded-full px-6 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              Edit Profile
            </button>
          )}
          <button className="bg-gray-300 text-black text-lg font-semibold rounded-full px-6 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <Link href="/exam">
            View Exams
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
