/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import { AuthContext } from '../../../../context/authContext';

const colors = [
  { id: 'red', hex: '#EA384C', label: 'Red' },
  { id: 'blue', hex: '#0EA5E9', label: 'Blue' },
  { id: 'green', hex: '#22C55E', label: 'Green' },
  { id: 'yellow', hex: '#EAB308', label: 'Yellow' },
];

const SelectedColorRoulette2 = () => {
  const [selectedColor, setSelectedColor] = useState(null); // User's choice
  const [houseColor, setHouseColor] = useState(null); // House's choice
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState('');
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const {stake, odds,selected, gameLabel, range, GameName } = userDetails || {};

  const controls = useAnimation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const spinWheel = async () => {
    setLoading(true);
    await controls.start({ rotate: 1440, transition: { duration: 2, ease: 'easeInOut' } });
    controls.set({ rotate: 0 });

    const randomIndex = Math.floor(Math.random() * colors.length);
    const houseSelectedColor = colors[randomIndex];
    setHouseColor(houseSelectedColor);

    if (selectedColor && houseSelectedColor.id === selectedColor.id) {
      setSuccess(true);
      setResult('win');
    } else {
      setSuccess(false);
      setResult('lose');
    }

    setLoading(false);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  const getOpacity = (id) => {
    return !houseColor || houseColor.id === id ? 1 : 0.4;
  };

    const moveForward = () => {
    setUserDetails({
      stake ,
      odds ,
      gameLabel,
      GameName,
      range,
      selected ,
      isGameLost: true,
     });

    navigate('/losers-games');
  };

  return (
    <div className="min-h-screen bg-[#EEF6FF] p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-6">Color Roulette Game</h1>

      <div className="w-64 h-64 border-4 border-gray-300 rounded-full mb-10 relative overflow-hidden">
        <motion.svg animate={controls} className="w-full h-full absolute top-0 left-0" viewBox="0 0 100 100">
          <path d="M50 50L70 5L195 5Z" fill="#EA384C" opacity={getOpacity('red')} />
          <path d="M50 50L101 50L95 90Z" fill="#0EA5E9" opacity={getOpacity('blue')} />
          <path d="M50 50L48 100L5 95Z" fill="#22C55E" opacity={getOpacity('green')} />
          <path d="M50 50L0 50L5 5Z" fill="#EAB308" opacity={getOpacity('yellow')} />
        </motion.svg>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        <div className="absolute top-0 left-1/2 w-4 h-10 bg-gray-800 rounded-b transform -translate-x-1/2"></div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 justify-center">
        {colors.map((color) => (
          <button
            key={color.id}
            className={`px-6 py-3 rounded text-white font-semibold ${selectedColor?.id === color.id ? 'opacity-50 cursor-not-allowed' : ''}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => {
              if (!selectedColor) setSelectedColor(color);
            }}
            disabled={!!selectedColor}
          >
            {color.label}
          </button>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">House's Color</h2>
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {houseColor && (
          <div className="px-4 py-2 rounded text-white font-semibold" style={{ backgroundColor: houseColor.hex }}>
            {houseColor.label}
          </div>
        )}
      </div>

      {success === null && (
        <button
          className="bg-blue-600 text-white py-3 px-8 rounded mb-4"
          onClick={spinWheel}
          disabled={loading || !selectedColor}
        >
          {loading ? 'Spinning...' : 'Spin Wheel'}
        </button>
      )}

      {success === true && (
        <button
          className="bg-green-600 text-white py-3 px-8 rounded mb-4"
          onClick={() => navigate('/games')}
        >
          Go Back to Games
        </button>
      )}

      {success === false && (
        <button 
          className="bg-red-600 text-white py-3 px-8 rounded mb-4"
          onClick={moveForward}
        >
          Play Losers Game
        </button>
      )}

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mt-8">
        <h2 className="text-lg font-semibold mb-4">How To Win</h2>
        <p className="text-gray-600 text-sm">
          Select a color and spin the wheel. If your color matches the house's color, you win!
        </p>
      </div>

      {/* Modals */}
      <WinningModal visible={visible && result === 'win'} closeModal={closeModal} />
      <LosingModal visible={visible && result === 'lose'} closeModal={closeModal} />
    </div>
  );
};

export default SelectedColorRoulette2;
