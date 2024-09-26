import Link from 'next/link';
import Navbar from '@/components/Navbar';
import "../styles/globals.css"
const HomePage = () => {
  return (
    <><Navbar /><div className="min-h-screen flex flex-col items-center justify-start bg-gradient-to-b from-teal-50 to-white p-10">

      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-teal-700 mb-4">Welcome to Gammal Tech Exams!</h1>
        <p className="text-lg text-gray-600 mb-6">
          Join our community of coders, participate in contests, and enhance your programming skills!
        </p>
        <Link href="/signup">
          <button className="bg-teal-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-teal-700 transition duration-300">
            Get Started
          </button>
        </Link>
      </div>

      {/* Navigation Links Section */}
      <div className="flex justify-center space-x-4 mb-10">
        <Link href="/exam">
          <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300">
            Take an Exam
          </button>
        </Link>
        <Link href="/practice">
          <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300">
            Practice Challenges
          </button>
        </Link>
        <Link href="/contests">
          <button className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition duration-300">
            View Contests
          </button>
        </Link>
      </div>

      {/* Announcements Section */}
      <div className="bg-white p-6 text-black rounded-lg shadow-lg w-full lg:w-3/4 mb-10">
        <h2 className="text-3xl font-bold text-teal-600 mb-4">Latest Announcements</h2>
        <ul className="space-y-4">
          {[
            "New Winter Hackathon coming soon! Stay tuned for details.",
            "Join our upcoming webinar on algorithms next Friday.",
            "Check out our updated coding resources and tutorials!"
          ].map((announcement, index) => (
            <li key={index} className="bg-teal-100 p-4 rounded-md shadow hover:bg-teal-200 transition duration-300">
              {announcement}
            </li>
          ))}
        </ul>
      </div>

      {/* Resources Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full lg:w-3/4 mb-10">
        <h2 className="text-3xl font-bold text-teal-600 mb-4">Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { title: "Coding Tutorials", link: "https://gamma.tech", description: "Step-by-step guides for various programming languages." },
            { title: "Practice Challenges", link: "/practice", description: "Engage in interactive coding challenges." },
            { title: "Discussion Forum", link: "https://gamma.tech", description: "Join discussions and ask questions about coding." },
          ].map((resource) => (
            <div key={resource.title} className="border rounded-lg p-4 shadow hover:shadow-lg transition duration-300">
              <h3 className="font-semibold text-teal-600">{resource.title}</h3>
              <p className="text-gray-600 mb-2">{resource.description}</p>
              {resource.link.startsWith('http') ? (
                <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-teal-600 underline">Explore</a>
              ) : (
                <Link href={resource.link}>
                  <h2 className="text-teal-600 underline">Explore</h2>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* User Testimonials Section */}
      <div className="bg-teal-600 text-white p-6 rounded-lg shadow-lg w-full lg:w-3/4 mb-10">
        <h2 className="text-3xl font-bold text-center mb-4">What Our Users Say</h2>
        <div className="space-y-4">
          {[
            { name: "Alice", testimonial: "CodeChallenge helped me improve my coding skills and land a job!" },
            { name: "Bob", testimonial: "The contests are fun and really push me to learn more." },
            { name: "Charlie", testimonial: "I love the community support and resources available." }
          ].map((test) => (
            <div key={test.name} className="border-l-4 border-white p-4">
              <p className="italic">{test.testimonial}</p>
              <p className="font-bold text-right">- {test.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="text-center mt-10">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Ready to Take the Next Step?</h3>
        <Link href="/signup">
          <button className="bg-teal-600 text-white py-3 px-6 rounded-full shadow-lg hover:bg-teal-700 transition duration-300">
            Sign Up Now
          </button>
        </Link>
      </div>

    </div>
    </>
  );
};

export default HomePage;
