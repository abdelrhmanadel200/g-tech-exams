
import React from 'react';
import Navbar from '@/components/Navbar';
import '../styles/globals.css';
const LeaderboardPage = () => {
  const coders = [
    { rank: 1, name: "Abdelrhman Adel", country: "Egypt", city: "Dakahlia", score: 10450 },
    { rank: 2, name: "Yousef Refaei", country: "Egypt", city: "Damietta", score: 5155 },
    { rank: 3, name: "Youssef Ghozal", country: "Egypt", city: "Damietta", score: 4120 },
    { rank: 4, name: "Abdelrhman Mansour", country: "Egypt", city: "Sohag", score: 4085 },
    { rank: 5, name: "Ahmed Mohamed", country: "Egypt", city: "Alexandria", score: 3060 },
    { rank: 6, name: "Mohamed Awan", country: "Germany", city: "Bavaria", score: 2890 },
    { rank: 7, name: "Mo Mortada", country: "Sudan", city: "Khartoum", score: 2580 },
  ];

  return (
    <><Navbar /><div className="w-[1280px] h-[832px] bg-gradient-to-b from-teal-50 to-white relative p-8 mx-auto">
      <div className="bg-[#fce09b] rounded-[40px] w-[258px] h-[66px] mx-auto mb-8 flex items-center justify-center">
        <h1 className="text-black text-[40px] font-normal font-['Patrick Hand']">Top Coders</h1>
      </div>
      <div className="grid grid-cols-5 gap-4 text-black text-[40px] font-normal font-['Patrick Hand'] mb-4">
        <div>Rank</div>
        <div>Name</div>
        <div>Country</div>
        <div>City</div>
        <div>Score</div>
      </div>
      <div className="border-t border-[#a02334] mb-4" />

      {coders.map(coder => (
        <div key={coder.rank} className="grid grid-cols-5 gap-4 items-center border-b border-[#a02334] py-2">
          <div className="text-[#111010]">{coder.rank}</div>
          <div className="text-[#ffad60]">{coder.name}</div>
          <div className={`text-[${coder.country === 'Egypt' ? '#a02334' : '#ffb22c'}]`}>{coder.country}</div>
          <div className="text-black">{coder.city}</div>
          <div className="text-[#7c00fe]">{coder.score}</div>
        </div>
      ))}
    </div></>
     
  );
};

export default LeaderboardPage;
