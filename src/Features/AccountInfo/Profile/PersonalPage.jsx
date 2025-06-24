import React, { useState } from 'react';

export default function Personal() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-6 text-gray-700">Personal Information</h2>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900"
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-600 text-sm font-medium mb-2">Phone Number</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-3 text-gray-900"
        />
      </div>

      <button
        className="w-full bg-indigo-700 text-white py-3 rounded font-semibold hover:bg-indigo-800 transition"
      >
        Save Changes
      </button>
    </div>
  );
}
