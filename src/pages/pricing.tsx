// app/pricing/page.js

import React from 'react';
import Layout from '@/app/layout';

const PricingPage = () => {
  return (
    <Layout>
      <div className="bg-gradient-to-r from-blue-200 to-purple-200 py-20 text-white text-center">
        <h1 className="text-6xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-xl">Find the perfect plan for your needs</p>
      </div>

      <div className="max-w-6xl mx-auto p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Economy Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-center text-teal-500 mb-2">Economy</h2>
          <p className="text-2xl text-center text-gray-800 mb-4">50 EGP</p>
          <ul className="mb-4">
            <li className="text-lg text-gray-700">✔ 10 Attempts</li>
            <li className="text-lg text-gray-700">✔ Access to all features</li>
          </ul>
          <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600">Buy Now</button>
        </div>

        {/* Gold Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-center text-teal-500 mb-2">Gold</h2>
          <p className="text-2xl text-center text-gray-800 mb-4">150 EGP</p>
          <ul className="mb-4">
            <li className="text-lg text-gray-700">✔ 40 Attempts</li>
            <li className="text-lg text-gray-700">✔ Premium Support</li>
          </ul>
          <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600">Buy Now</button>
        </div>

        {/* Premium Plan */}
        <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105">
          <h2 className="text-3xl font-semibold text-center text-teal-500 mb-2">Premium</h2>
          <p className="text-2xl text-center text-gray-800 mb-4">299 EGP</p>
          <ul className="mb-4">
            <li className="text-lg text-gray-700">✔ 100 Attempts</li>
            <li className="text-lg text-gray-700">✔ VIP Support</li>
          </ul>
          <button className="w-full bg-teal-500 text-white py-2 rounded-md hover:bg-teal-600">Buy Now</button>
        </div>
      </div>

      <div className="bg-gray-100 py-10">
        <h2 className="text-4xl font-bold text-center mb-4">What Our Users Say</h2>
        <div className="max-w-3xl mx-auto text-center">
          <p className="italic mb-4">"This service has transformed the way I work. Highly recommend!"</p>
          <p className="text-gray-600">— Happy Customer</p>
        </div>
      </div>

      <div className="py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="max-w-2xl mx-auto text-left">
          <div className="mb-4">
            <h3 className="font-semibold">Can I change my plan later?</h3>
            <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time.</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">What payment methods do you accept?</h3>
            <p className="text-gray-600">We accept all major credit cards and PayPal.</p>
          </div>
        </div>
      </div>

      <div className="bg-teal-500 text-white py-10 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
        <button className="bg-white text-teal-500 py-2 px-4 rounded-md hover:bg-gray-200">Sign Up Now</button>
      </div>
    </Layout>
  );
};

export default PricingPage;
