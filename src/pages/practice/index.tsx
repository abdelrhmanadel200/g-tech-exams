import Link from 'next/link';
import Navbar from '@/components/Navbar';
import '../../styles/globals.css';

const PracticePage = () => {
  const courses = [
    { id: 1, title: 'C Programming', slug: 'C' },
    { id: 2, title: 'C++ Programming', slug: 'CPP' },
    { id: 3, title: 'Data Struture ', slug: 'Data_Structure' },
    { id: 4, title: 'Algorithms ', slug: 'Algorithms' },
    { id: 5, title: 'OOP ', slug: 'OOP' },
    
  ];

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-b from-teal-50 to-white flex flex-col items-center justify-center min-h-screen p-6">
        <h1 className="text-black text-4xl font-bold mb-8 text-center">Core Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
          {courses.map((course) => (
            <Link key={course.id} href={`/practice/${course.slug}`} passHref>
              <div className="relative bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:translate-y-[-10px] cursor-pointer">
                <div className="absolute inset-0 opacity-80 bg-[#186f65] transition-opacity duration-300" />
                <div className="relative z-10 p-6 flex flex-col items-center">
                  <h2 className="text-black text-2xl font-semibold">{course.title}</h2>
                  <p className="text-gray-700 mt-2 text-center">Click to learn more</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-600 transform transition-transform duration-300 group-hover:h-2" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .hover\\:translate-y-\\[-10px]:hover {
          transform: translateY(-10px);
        }

        @media (prefers-reduced-motion: no-preference) {
          .transition-transform {
            transition: transform 0.3s ease;
          }
        }
      `}</style>
    </>
  );
};

export default PracticePage;
