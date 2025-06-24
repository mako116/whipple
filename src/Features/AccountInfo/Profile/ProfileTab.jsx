import React, { useState } from 'react';
import Personal from './PersonalPage';
import BankInfoScreen from './BankPage';
 
export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState('Personal');

  return (
    <div className="min-h-screen pt-[20px] bg-gray-50">
 
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">Profile</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          {['Personal', 'Bank'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded font-medium ${
                activeTab === tab
                  ? 'bg-blue-700 text-white'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {tab} Info
            </button>
          ))}
        </div>

        {/* Content Sections */}
        <div>
          {activeTab === 'Personal' && <Personal />}
          {activeTab === 'Bank' && <BankInfoScreen />}
        </div>
      </div>
    </div>
  );
}
