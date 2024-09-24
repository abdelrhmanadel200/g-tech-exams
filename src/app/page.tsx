import Image from 'next/image';
import Layout from './layout'; // This should point to the layout.tsx

const HomePage = () => {
  const data = [
    { rank: 1, name: 'Alice', state: 'CA', score: 95 },
    { rank: 2, name: 'Bob', state: 'NY', score: 88 },
    { rank: 3, name: 'Charlie', state: 'TX', score: 85 },
  ];

  return (
   
      <div className="flex flex-col lg:flex-row items-center justify-between p-10 min-h-screen">
        {/* Left Side - Image */}
        <div className="flex-1 lg:w-1 mb-10 lg:mb-0">
          <Image
            src="/images/home.png" // Corrected image path
            alt="Descriptive Alt Text"
            width={500} // Adjust as necessary
            height={500} // Adjust as necessary
            className="object-cover rounded-lg "
          />
        </div>

        {/* Right Side - Card */}
        <div className="flex-1 lg:w-1/2 bg-[#FF6500] p-5 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-white text-center mb-4">Leaderboard</h2>
          <div className="grid grid-cols-4 text-white font-semibold">
            <div className="p-2 border-b border-white">Rank</div>
            <div className="p-2 border-b border-white">Name</div>
            <div className="p-2 border-b border-white">State</div>
            <div className="p-2 border-b border-white">Score</div>
          </div>
          {data.map((item) => (
            <div key={item.rank} className="grid grid-cols-4 text-white p-2 border-b border-opacity-50 border-white hover:bg-opacity-80 transition duration-300">
              <div>{item.rank}</div>
              <div>{item.name}</div>
              <div>{item.state}</div>
              <div>{item.score}</div>
            </div>
          ))}
        </div>
      </div>
    
  );
};

export default HomePage;
