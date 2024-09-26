"use client";

import { useState, FormEvent } from "react";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../firebaseConfig"; 
import Navbar from "@/components/Navbar";
import '../styles/globals.css';

const ResetPasswordPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const auth = getAuth(app);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent! Please check your inbox.");
    } catch (error: any) { // Disable ESLint for this line
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setMessage(error.message);
    } finally {
      setIsLoading(false);
      resetForm();
    }
  };

  const resetForm = () => {
    setEmail("");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-teal-50 to-white p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-teal-600">Reset Your Password</h1>
          <p className="text-gray-600 text-center mb-4">Enter your email to receive a password reset link.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              required 
            />
            <button
              type="submit"
              className={`w-full p-4 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && <p className="text-center text-red-500 mt-4">{message}</p>}
        </div>
      </div>
    </>
  );
};

export default ResetPasswordPage;
