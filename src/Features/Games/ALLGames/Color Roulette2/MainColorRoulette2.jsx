/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';

const colors = [
  { id: 'red', hex: '#EA384C', label: 'Red' },
  { id: 'blue', hex: '#0EA5E9', label: 'Blue' },
  { id: 'green', hex: '#22C55E', label: 'Green' },
  { id: 'yellow', hex: '#EAB308', label: 'Yellow' },
];
 
const ColorRouletteGame2 = () => {
  const controls = useAnimation();
  const { setUserDetails } = useContext(AuthContext);
  const [activeColor, setActiveColor] = useState(null);  // Single string, not array
  const [loading, setLoading] = useState(false);
  const [stake, setStake] = useState('');
  const [admissionFee, setAdmissionFee] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [walletBalance] = useState(150000);
  const [isPublishEnabled, setIsPublishEnabled] = useState(false);
  const navigate = useNavigate();
    const { makeRequest } = useRequest();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleStakeChange = (value) => {
    setStake(value);
    const calculatedAdmissionFee = parseFloat(value) * 0.25;
    setAdmissionFee(calculatedAdmissionFee);
    const calculatedTotalAmount = parseFloat(value) + calculatedAdmissionFee;
    setTotalAmount(calculatedTotalAmount);
    setIsPublishEnabled(parseFloat(value) > 0);
  };

  const spinWheel = async () => {
    setLoading(true);
    await controls.start({ rotate: 360 * 4, transition: { duration: 2, ease: 'easeInOut' } });
    controls.set({ rotate: 0 });

    const randomIndex = Math.floor(Math.random() * colors.length);
    const selectedId = colors[randomIndex].id; // single string
    setActiveColor(selectedId);

    setLoading(false);
  };

  const handlePublish = async() => {
    if (!activeColor) {
      alert('Please spin the wheel and select one color.');
      return;
    }

    const selectedColorLabel = colors.find((c) => c.id === activeColor)?.label || activeColor;
     const res = await makeRequest("/create-game", {
      name: "Color Roulette2",
      colorSpun: activeColor[0],
      stake,
    });
    if (res.response) {
      setLoading(false)
      toast.success("Success Game Created Successfully");
      setTimeout(() => {
        navigate('/available-games');
      }, 2000);
    } else {
      setLoading(false)
      if (res.error) {
        return toast.error("Error", res.error);
      } else {
        return toast.error("Error", "Server Error");
      }
    }
    
    setUserDetails({
      stake,
      odds: '4x',
      gameLabel: selectedColorLabel,
      GameName: 'Color Roulette2',
      selected: selectedColorLabel,
    });
  }; 

  return (
    <div className="min-h-screen bg-[#EEF6FF] p-4 flex flex-col items-center">
      <h1 className="text-2xl font-semibold mb-6">Color Roulette</h1>

      <div className="w-64 h-64 border-4 border-gray-300 rounded-full mb-10 relative overflow-hidden">
        <motion.div animate={controls} className="w-full h-full origin-center">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <path
              d="M50 50L70 5L195 5Z"
              fill="#EA384C"
              opacity={!activeColor || activeColor === 'red' ? 1 : 0.4}
            />
            <path
              d="M50 50L101 50L95 90Z"
              fill="#0EA5E9"
              opacity={!activeColor || activeColor === 'blue' ? 1 : 0.4}
            />
            <path
              d="M50 50L48 100L5 95Z"
              fill="#22C55E"
              opacity={!activeColor || activeColor === 'green' ? 1 : 0.4}
            />
            <path
              d="M50 50L0 50L5 5Z"
              fill="#EAB308"
              opacity={!activeColor || activeColor === 'yellow' ? 1 : 0.4}
            />
          </svg>
        </motion.div>
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-gray-800 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10"></div>
        <div className="absolute top-0 left-1/2 w-4 h-10 bg-gray-800 rounded-b transform -translate-x-1/2"></div>
      </div>

      {activeColor && (
        <div className="flex items-center mb-6">
          {/* Show only the one selected color */}
          <div
            className="px-6 py-3 rounded text-white font-semibold"
            style={{ backgroundColor: colors.find((c) => c.id === activeColor)?.hex }}
          >
            {colors.find((c) => c.id === activeColor)?.label}
          </div>
        </div>
      )}

      <button
        onClick={spinWheel}
        disabled={loading}
        className="bg-blue-600 text-white py-3 px-8 rounded mb-6 disabled:bg-gray-400"
      >
        {loading ? 'Spinning...' : 'Spin Wheel'}
      </button>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md mb-6">
        <h2 className="text-lg font-semibold mb-4">Set Your Stake</h2>
        <label className="block mb-2 font-medium">Your Stake (₦)</label>
        <input
          type="number"
          className="w-full p-3 border border-gray-300 rounded mb-4"
          placeholder="Enter total amount"
          value={stake}
          onChange={(e) => handleStakeChange(e.target.value)}
        />

        <div className="flex justify-between mb-2">
          <span>Admission Fee (25%)</span>
          <span>₦{admissionFee.toLocaleString()}</span>
        </div>

        <div className="flex justify-between font-semibold mb-4">
          <span>Total Amount</span>
          <span>₦{totalAmount.toLocaleString()}</span>
        </div>

        <p className="mb-4">Your wallet balance: ₦{walletBalance.toLocaleString()}</p>

        <button
          onClick={handlePublish}
          disabled={!isPublishEnabled}
          className="w-full py-3 rounded text-white font-semibold disabled:bg-gray-400"
          style={{ backgroundColor: isPublishEnabled ? '#0A1931' : '#ccc' }}
        >
          Publish Game
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">How It Works</h2>
        <p className="text-gray-600 text-sm">
          Spin the wheel to randomly select one color. Players will bet against your selected color with odds of 4x.
          If they correctly guess your color, they win. If they guess wrong, you win.
        </p>
      </div>
    </div>
  );
};

export default ColorRouletteGame2;
