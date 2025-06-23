// src/components/SelectCategory.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import luckynumbers from "../../../../assets/images/games/categoryic.png"
const gameOptions = {
  A: [
    {
      label: 'Game A1 (1-3) - 3 Odds',
      range: 3,
      totalOdds: 3,
      selectionCount: 1,
      names: 'Lucky Number',
      route: '/select-lucky-numbers',
    },
    {
      label: 'Game A2 (1-5) - 5 Odds',
      range: 5,
      totalOdds: 5,
      selectionCount: 1,
      names: 'Lucky Number',
      route: '/select-lucky-numbers',
    },
    {
      label: 'Game B (2 from 1-5) - 2.5 Odds',
      range: 5,
      totalOdds: 2.5,
      selectionCount: 2,
      names: 'Lucky Number',
      route: '/select-lucky-numbers',
    },
  ],
  C: [
    {
      label: 'Game A - 5 numbers (1-100) - 20 Odds',
      range: 100,
      totalOdds: 20,
      selectionCount: 5,
      names: 'Lucky Number',
      route: '/select-lucky-numbers',
    },
    {
      label: 'Game B - 10 numbers (1-100) - 10 Odds',
      range: 100,
      totalOdds: 10,
      selectionCount: 10,
      names: 'Lucky Number',
      route: '/select-lucky-numbers',
    },
    {
      label: 'Game C - 1 number (1-100) - 100 Odds',
      range: 100,
      totalOdds: 100,
      selectionCount: 1,
      names: 'Lucky Number',
      route: '/select-lucky-numbers',
    },
  ],
}; 

const categories = [
  { key: 'A', name: 'Category A & B', description: 'Select from the number pool 1 to 5' },
  { key: 'C', name: 'Category C', description: 'Select from the number pool 1 to 100' },
];
export default function MainLuckyNumbers() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { setUserDetails } = useContext(AuthContext);
  const navigate = useNavigate();

  const toggleCategory = key =>
    setSelectedCategory(prev => (prev === key ? null : key));

  const selectGame = game => {
    setUserDetails({
      gameLabel: game.label,
      GameName: game.names,
      range: game.range.toString(),
      totalOdds: game.totalOdds.toString(),
      selectionCount: game.selectionCount.toString(),
    });
    navigate(game.route);
  };

      // Scroll to top on page load
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  return (
    <>
      {/* <Header title="Back to Game Selection" bgColor="#A8BFED" /> */}
      <div className="p-6 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-2">Create Lucky Number Game</h1>
        <p className="text-sm text-gray-600 mb-6">
          Set up your Lucky Number game as The House
        </p>

        {categories.map(cat => (
          <label
            key={cat.key}
            className="flex justify-between items-center bg-gray-100 p-4 rounded mb-3 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <img
                src={luckynumbers}
                alt=""
                className="w-12 h-12 rounded-md"
              />
              <div>
                <h2 className="text-lg font-semibold">{cat.name}</h2>
                <p className="text-xs text-gray-500">{cat.description}</p>
              </div>
            </div>

            <input
              type="checkbox"
              checked={selectedCategory === cat.key}
              onChange={() => toggleCategory(cat.key)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
          </label>
        ))}

        {selectedCategory && (
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Choose a Game</h3>
            {gameOptions[selectedCategory].map((game, idx) => (
              <button
                key={idx}
                className="block w-full text-left bg-blue-50 p-3 rounded mb-2 hover:bg-blue-100"
                onClick={() => selectGame(game)}
              >
                {game.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
