import React, { useState, useEffect } from 'react';
import Layout from '@/app/layout';

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("John Doe");
  const [jobTitle, setJobTitle] = useState("Software Developer");
  const [skills, setSkills] = useState(["C#", "JavaScript", "Python"]);
  const [newSkill, setNewSkill] = useState("");
  const [profilePicture, setProfilePicture] = useState("https://via.placeholder.com/100");

  // Set initial state for the profile picture only on the client
  useEffect(() => {
    // This runs only on the client
    const initialProfilePicture = localStorage.getItem('profilePicture') || "https://via.placeholder.com/100";
    setProfilePicture(initialProfilePicture);
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert('Profile updated!');
    // Save to localStorage or server
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

  return (
    <Layout>
      <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
        {/* Profile Summary */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 flex items-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="rounded-full mr-4 w-24 h-24"
          />
          <div>
            {isEditing ? (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePictureChange}
                  className="mb-2"
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="text-2xl font-bold border-b-2 border-gray-300 focus:outline-none"
                />
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="text-gray-600 mt-2 border-b-2 border-gray-300 focus:outline-none"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">{name}</h2>
                <h3 className="text-gray-600">{jobTitle}</h3>
              </>
            )}
          </div>
        </div>

        {/* Achievements Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4" id="achievements">Achievements</h2>
          <ul className="list-disc pl-5">
            <li>1st at contest #6</li>
            <li>2nd at contest #4</li>
            <li>3rd at contest #5</li>
          </ul>
        </div>

        {/* Skills Section */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6 w-full max-w-lg">
          <h2 className="text-xl font-bold mb-4" id="skills">Skills</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-[#e8b86d] text-white text-lg font-bold rounded-full py-2 text-center">
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
                className="border p-2 rounded w-full"
              />
              <button onClick={handleAddSkill} className="mt-2 bg-[#e8b86d] text-white rounded-full px-4 py-2">
                Add Skill
              </button>
            </>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          {isEditing ? (
            <button onClick={handleSaveProfile} className="bg-[#e8b86d] text-black text-lg font-semibold rounded-full px-6 py-2">
              Save Changes
            </button>
          ) : (
            <button onClick={handleEditProfile} className="bg-[#e8b86d] text-black text-lg font-semibold rounded-full px-6 py-2">
              Edit Profile
            </button>
          )}
          <button className="bg-[#d9d9d9] text-black text-lg font-semibold rounded-full px-6 py-2">
            View Exams
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default UserProfilePage;
