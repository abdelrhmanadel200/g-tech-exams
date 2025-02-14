

"use client";

import { useState } from 'react';
import Link from "next/link"
import Navbar from '@/components/Navbar';
import '../styles/globals.css';
import { useRouter } from 'next/router';

const SignUpPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        
    };

    return (
        <><Navbar /><div className="flex items-center bg-gradient-to-b from-teal-50 to-white justify-center min-h-screen  p-4">
            {/* Sign Up Card */}
            <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
                {/* Branding Section */}
                <div className="flex flex-col items-center mb-6">
                    <h1 className="text-3xl font-bold text-center text-teal-600 uppercase">Gammal Tech</h1>
                </div>

                {/* Sign Up Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="mt-1 block w-full h-12 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="mt-1 block w-full h-12 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="mt-1 block w-full h-12 bg-gray-50 border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500" />
                    </div>
                    {error && <p className="text-red-600 text-sm">{error}</p>}
                   
                    <Link href="/">
                    <button
                        type="submit"
                        className="mt-4 w-full h-12 bg-teal-600 rounded-md text-white text-lg font-semibold hover:bg-teal-700 transition duration-200"
                    >
                       
                        Sign Up
                    </button>
                    </Link>
                    <div className="mt-4 text-center">
          <span className="text-gray-600">Already have an account? </span>
          <button
            className="text-teal-600 underline"
            onClick={() => router.push('/login')}
          >
            Login
          </button>
        </div>
                </form>
            </div>
        </div></>

    );
};

export default SignUpPage;
