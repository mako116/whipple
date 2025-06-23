// src/components/FilterTabPanel.jsx
import React, { useState } from 'react';

const tabs = [
  'All',
  'Lucky Number',
  'Flip The Coin',
  'Dice Roll',
  'Wheel Spin',
  'Color Roulette',
  'Color Roulette2',
  'Mystery Box',
  'Goal Challenge',
];

export default function FilterTabPanel({ selectedTab, onTabChange }) {
  const [activeTab, setActiveTab] = useState(selectedTab || 'All');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="overflow-x-auto bg-blue-900 w-full">
      <div className="flex gap-2 p-2 whitespace-nowrap">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabPress(tab)}
            className={`py-2 px-1 md:px-4 rounded text-[13px] lg:text-[17px] whitespace-nowrap ${
              activeTab === tab
                ? 'bg-blue-700 text-white font-bold'
                : 'text-gray-300 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
