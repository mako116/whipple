import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function ReferAndEarn() {
  const navigate = useNavigate();
  const referralCode = 'WHIPPLE123';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success('Referral code copied!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <header className="bg-blue-600 text-white py-4 px-6 rounded mb-6">
        <h1 className="text-xl font-semibold">Refer And Earn</h1>
      </header>

      <div className="bg-white p-6 rounded-lg shadow space-y-4 max-w-md mx-auto">
        <h2 className="text-lg font-semibold">Refer & Earn</h2>
        <p className="text-gray-700">
          Share your referral code with friends and earn bonuses when they join and play!
        </p>

        <div className="flex items-center justify-between bg-gray-100 p-3 rounded">
          <span className="font-mono text-gray-900">{referralCode}</span>
          <button
            onClick={handleCopy}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Copy
          </button>
        </div>

        <div className="flex justify-between gap-4">
          <button className="flex-1 bg-blue-500 text-white py-3 rounded hover:bg-blue-600">
            Share Link
          </button>
          <button
            onClick={() => navigate('/view-referrals')}
            className="flex-1 bg-blue-500 text-white py-3 rounded hover:bg-blue-600"
          >
            View Referrals
          </button>
        </div>
      </div>
    </div>
  );
}
