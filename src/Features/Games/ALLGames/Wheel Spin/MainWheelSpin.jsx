/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { AuthContext } from '../../../../context/authContext';
import FormInput from '../../../../components/Input/FormInput';

const MainWheelSpin = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { odds = '3.333', gameLabel, range, GameName = 'Wheel Spin' } = userDetails || {};

  const [totalInput, setTotalInput] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [rotationCount, setRotationCount] = useState(0);

  const controls = useAnimation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalAmount = parseFloat(totalInput) || 0;
  const admissionFee = totalAmount * 0.25;
  const stake = totalAmount + admissionFee;

  const spinWheel = async () => {
    setShowResult(false);

    const nextRotation = (rotationCount + 1) * 1080; // Always rotate a full 1080° more

    setRotationCount((prev) => prev + 1);

    await controls.start({
      rotate: nextRotation,
      transition: {
        duration: 3,
        ease: 'easeOut',
      },
    });

    const generatedNumbers = [];
    while (generatedNumbers.length < 3) {
      const num = Math.floor(Math.random() * 10) + 1;
      if (!generatedNumbers.includes(num)) {
        generatedNumbers.push(num);
      }
    }

    setWinningNumbers(generatedNumbers);
    setShowResult(true);
    setIsButtonDisabled(totalAmount === 0);
  };

  const handlePublishGame = () => {
    setLoading(true);
    const formattedOdds = `${odds}x`;

    setTimeout(() => {
      navigate('/available-games');
      setUserDetails({
        stake: stake.toFixed(2),
        odds: formattedOdds,
        gameLabel: `${winningNumbers.join(', ')}`,
        GameName,
        range,
        result: gameLabel,
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Create Your Game</h1>
        <p className="text-gray-600 mb-6">
          Spin the wheel and set your total stake as The House
        </p>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={controls}
            initial={{ rotate: 0 }}
            className="w-[255px] h-[255px] rounded-full border-8 border-blue-600 flex items-center justify-center relative overflow-hidden"
          >
            <div className="w-32 h-32 rounded-full flex items-center justify-center select-none text-center">
              {showResult ? (
                <div className="flex flex-col items-center justify-center">
                  <p className="text-md font-bold mb-2">Winning Numbers</p>
                  <div className="flex space-x-4">
                    {winningNumbers.map((num, idx) => (
                      <div
                        key={idx}
                        className="w-10 h-10 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold text-lg"
                      >
                        {num}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                    <div
                      key={number}
                      className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center font-semibold"
                    >
                      {number}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          <button
            onClick={spinWheel}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Spin Wheel
          </button>

          <div className="mt-4 text-lg font-semibold">Odds: 3.33x</div>

          <div className="mt-8 w-full">
            <label className="block mb-2 font-medium">Enter Total Amount (₦)</label>
            <FormInput
              placeholder="Enter total amount"
              type="number"
              value={totalInput}
              onChange={(e) => {
                setTotalInput(e.target.value);
                setIsButtonDisabled(!e.target.value || !showResult || isNaN(Number(e.target.value)));
              }}
            />
          </div>

          <div className="mt-6 w-full">
            <div className="flex justify-between mb-2">
              <span>Admission Fee (25%)</span>
              <span>₦{admissionFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4 font-bold">
              <span>Your Stake</span>
              <span>₦{stake.toFixed(2)}</span>
            </div>

            <button
              onClick={handlePublishGame}
              disabled={isButtonDisabled}
              className={`w-full py-3 rounded text-white ${
                isButtonDisabled
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-purple-700 hover:bg-purple-800'
              }`}
            >
              {loading ? 'Publishing...' : 'Publish Game'}
            </button>
          </div>

          <div className="mt-8 bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-2">How It Works</h2>
            <p className="text-gray-700">
              Spin the wheel to randomly select three winning numbers from 1–10. Players will bet
              against your result with odds of 3.333. If they guess any of the winning numbers, they
              win. If not, you win.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWheelSpin;
