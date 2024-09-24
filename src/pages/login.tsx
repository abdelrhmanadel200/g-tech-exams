// app/login/page.js

"use client"; // Ensure this is included if you're using client-side state

import Image from 'next/image';
import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../firebaseConfig'; // Adjust the path as necessary
import Layout from '../app/layout'; // Adjust the path as necessary
import { useRouter } from 'next/router'; // Import useRouter

const LoginPage = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/'); // Redirect to home page on successful login
    } catch (err) {
      setError('Error logging in. Please try again.');
    }
  };

  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-4">
        {/* Login Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
          {/* Branding Section */}
          <div className="flex flex-col items-center mb-6">
            
            <h1 className="text-3xl font-bold text-center text-teal-600 uppercase">Gammal Tech</h1>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full h-12 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full h-12 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full h-12 bg-teal-600 rounded-md text-white text-lg font-semibold hover:bg-teal-700 transition duration-200"
            >
              Login
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account? </span>
            <button 
              className="text-teal-600 underline"
              onClick={() => router.push('/signup')}
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default LoginPage;
