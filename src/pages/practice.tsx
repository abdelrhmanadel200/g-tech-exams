import Link from 'next/link';
import Layout from '@/app/layout'; // Adjust the path as necessary

const PracticePage = () => {
  const courses = [
    { id: 1, title: 'C Programming', slug: 'c-programming' },
    { id: 2, title: 'Java Programming', slug: 'java-programming' },
    { id: 3, title: 'Python Programming', slug: 'python-programming' },
    { id: 4, title: 'JavaScript Programming', slug: 'javascript-programming' },
    { id: 5, title: 'Ruby Programming', slug: 'ruby-programming' },
    { id: 6, title: 'Go Programming', slug: 'go-programming' },
  ];

  return (
    <Layout>
      <div className="bg-white flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-purple-200 min-h-screen p-4">
        <h1 className="text-black text-4xl font-bold mb-8 text-center">Core Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl w-full">
          {courses.map((course) => (
            <Link key={course.id} href={`/courses/${course.slug}`} passHref>
              <div className="relative bg-gray-200 rounded-[200px] shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer">
                <div className="absolute inset-0 opacity-80 bg-[#186f65] transition-opacity duration-300" />
                <div className="relative z-10 p-6 flex flex-col items-center">
                  <h2 className="text-black text-2xl font-semibold">{course.title}</h2>
                  <p className="text-gray-700 mt-2 text-center">Click to learn more</p>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-600 transform translate-y-[50%] transition-transform duration-300 group-hover:translate-y-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PracticePage;
