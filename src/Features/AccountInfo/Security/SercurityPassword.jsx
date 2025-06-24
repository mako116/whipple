import React from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function Security() {
  const navigate = useNavigate();

  const handlePasswordUpdate = () => {
    toast.success('Password updated successfully!');
  };

  const handleChangePin = () => {
    navigate('/set-pin'); // You can update this route to your PIN page
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 space-y-6">
      <header className="bg-blue-600 text-white py-4 px-6 rounded mb-4">
        <h1 className="text-xl font-semibold">Security</h1>
      </header>

      {/* Change Password Section */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md mx-auto">
        <h2 className="text-lg font-semibold">Security Settings</h2>

        <div className="space-y-3">
          <label className="block text-sm font-medium">Change Password</label>
          <input
            type="password"
            placeholder="Current password"
            className="w-full border border-gray-300 p-3 rounded bg-gray-50"
          />
          <input
            type="password"
            placeholder="New password"
            className="w-full border border-gray-300 p-3 rounded bg-gray-50"
          />
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full border border-gray-300 p-3 rounded bg-gray-50"
          />

          <button
            onClick={handlePasswordUpdate}
            className="bg-blue-700 text-white w-full py-3 rounded hover:bg-blue-800"
          >
            Update Password
          </button>
        </div>
      </div>

      {/* Transaction PIN Section */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md mx-auto">
        <h2 className="text-lg font-semibold">Transaction PIN</h2>
        <p className="text-gray-700 text-sm">
          Your transaction PIN is required for all withdrawals and staking games.
        </p>

        <button
          onClick={handleChangePin}
          className="w-full border border-gray-300 bg-gray-100 py-3 rounded hover:bg-gray-200"
        >
          Set/Change Transaction PIN
        </button>
      </div>
    </div>
  );
}
