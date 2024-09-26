"use client";
import Image from "next/image";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import { FiPlus, FiEdit, FiSave, FiX, FiBell } from 'react-icons/fi'; 
import '../styles/globals.css';

const UserProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [name, setName] = useState<string>("Abdelrhman Adel");
  const [jobTitle, setJobTitle] = useState<string>("Software Developer");
  const [bio, setBio] = useState<string>("A passionate developer.");
  const [location, setLocation] = useState<string>("New York, USA");
  const [skills, setSkills] = useState<string[]>(["C#", "JavaScript", "Python"]);
  const [newSkill, setNewSkill] = useState<string>("");
  const [profilePicture, setProfilePicture] = useState<string>("");
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    const initialProfilePicture = localStorage.getItem('profilePicture') || "";
    setProfilePicture(initialProfilePicture);
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
    addNotification("Editing profile...");
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    localStorage.setItem('profilePicture', profilePicture);
    addNotification("Profile updated successfully!");
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      addNotification(`Skill "${newSkill.trim()}" added!`);
    }
  };

  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
    addNotification(`Skill "${skill}" removed!`);
  };

  const handlePictureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePictureClick = () => {
    document.getElementById('fileInput')?.click();
  };

  const addNotification = (message: string) => {
    setNotifications([...notifications, message]);
    setTimeout(() => {
      setNotifications(notifications => notifications.filter(n => n !== message));
    }, 3000);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-b from-teal-100 to-white p-6">
        
        {/* Notifications */}
        <div className="w-full max-w-lg mb-6">
          {notifications.map((notification, index) => (
            <div key={index} className="bg-teal-500 text-white p-2 rounded mb-2">
              <FiBell className="inline mr-2" /> {notification}
            </div>
          ))}
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-lg p-8 mb-6 flex items-center transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <div className="flex-shrink-0 relative">
            {profilePicture && (
              <button 
                onClick={() => setProfilePicture("")} 
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md transition-transform transform hover:scale-110"
                title="Delete image"
              >
                &#10005; {/* Close icon */}
              </button>
            )}
            <div 
              className="relative w-28 h-28 cursor-pointer rounded-full border-4 border-teal-500 shadow-lg transition-all duration-200 ease-in-out hover:border-blue-500 hover:shadow-2xl hover:scale-105" 
              onClick={handlePictureClick}
            >
              {profilePicture ? (
                <Image
                  src={profilePicture}
                  alt=""
                  className="rounded-full"
                  style={{ width: '100%', height: '100%' }}
                  width={100}
                  height={100}
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-200 rounded-full">
                  <FiPlus className="text-teal-500 text-3xl" />
                </div>
              )}
            </div>
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
                  className="text-3xl font-bold border-b-2 border-gray-300 focus:outline-none transition duration-300" 
                />
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="text-lg text-gray-600 mt-2 border-b-2 border-gray-300 focus:outline-none transition duration-300" 
                />
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="mt-2 w-full border-b-2 border-gray-300 focus:outline-none transition duration-300"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Location"
                  className="mt-2 w-full border-b-2 border-gray-300 focus:outline-none transition duration-300"
                />
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold">{name}</h2>
                <h3 className="text-lg text-gray-600">{jobTitle}</h3>
                <p className="text-sm text-gray-500 mt-2">{bio}</p>
                <p className="text-sm text-gray-500">{location}</p>
              </>
            )}
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6 w-full max-w-lg transition-transform transform hover:scale-105 duration-300 ease-in-out">
          <h2 className="text-xl font-bold mb-4">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-teal-500 text-white text-lg font-semibold rounded-full py-2 text-center transition-transform transform hover:scale-105 duration-300 ease-in-out relative">
                {skill}
                <button onClick={() => handleRemoveSkill(skill)} className="absolute top-0 right-0 p-1 text-red-300 hover:text-red-500">
                  <FiX />
                </button>
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
                className="border p-2 rounded w-full" 
              />
              <button onClick={handleAddSkill} className="mt-2 bg-teal-600 text-white rounded-full px-4 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                Add Skill
              </button>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mb-6">
          {isEditing ? (
            <>
              <button onClick={handleSaveProfile} className="bg-teal-600 text-white text-lg font-semibold rounded-full px-6 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <FiSave className="inline mr-2" /> Save Changes
              </button>
              <button onClick={() => setIsEditing(false)} className="bg-gray-500 text-white text-lg font-semibold rounded-full px-6 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
                <FiX className="inline mr-2" /> Cancel
              </button>
            </>
          ) : (
            <button onClick={handleEditProfile} className="bg-teal-600 text-white text-lg font-semibold rounded-full px-6 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              <FiEdit className="inline mr-2" /> Edit Profile
            </button>
          )}
          <Link href="/exam">
            <button className="bg-gray-300 text-black text-lg font-semibold rounded-full px-6 py-2 transition-transform transform hover:scale-105 duration-300 ease-in-out">
              View Exams
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
