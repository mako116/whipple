import React, { useRef, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import { AuthContext } from '../../../../context/authContext';
// import { AuthContext } from '../../../../context/authContext';
// import WinningModal from '../../../../components/modals/WinningModal';
// import LosingModal from '../../../../components/modals/LosingModal';

const SelectedWheelSpin = () => {
  const spinValue = useAnimation();
  const lastResultWasWin = useRef(null);

  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { odds = '3.333', GameName = 'Wheel Spin' } = userDetails || {};

  const navigate = useNavigate();

  const [totalInput, setTotalInput] = useState('');
  // const [loading, setLoading] = useState(false);
  const [winningNumbers, setWinningNumbers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisible] = useState(false);
  const [selectedNumbers, setSelectedNumbers] = useState([]);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  const toggleNumber = (num) => {
    if (selectedNumbers.includes(num)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== num));
    } else {
      if (selectedNumbers.length < 1) {
        setSelectedNumbers([...selectedNumbers, num]);
      }
    }
  };

  const spinWheel = async () => {
    if (selectedNumbers.length !== 1) {
      alert('Please select exactly 1 number before spinning.');
      return;
    }

    setShowResult(false);
    await spinValue.start({ rotate: 1080 + Math.floor(Math.random() * 360), transition: { duration: 3, ease: 'easeOut' } });

    const result = [];
    while (result.length < 1) {
      const num = Math.floor(Math.random() * 10) + 1;
      if (!result.includes(num)) {
        result.push(num);
      }
    }
    setWinningNumbers(result);
    checkResult(result);
  };

  const checkResult = (result) => {
    const isWin = selectedNumbers[0] === result[0];
    lastResultWasWin.current = isWin;
    setSuccess(isWin);
    setModalVisible(true);
    setShowResult(true);
  };

  const handleSpinButtonPress = () => {
    if (showResult) {
      if (lastResultWasWin.current) {
        navigate('/games');
      } else {
        setUserDetails({
          stake: totalInput,
          odds,
          gameLabel: winningNumbers.join(', '),
          GameName,
          isGameLost: true,
        });
        navigate('/losers-games');
      }
    } else {
      spinWheel();
    }
  };

  const closeModal = () => {
    setModalVisible(false);
    setSuccess(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className='mx-auto max-w-full md:max-w-[500px]'>
      <h1 className="text-2xl font-bold mb-2">{GameName}</h1>
      <p className="text-gray-600 mb-4">Spin the wheel</p>

      <div className="flex justify-center mb-6">
        <motion.div animate={spinValue} className="w-48 h-48 rounded-full border-8 border-blue-600 flex items-center justify-center">
          <div className="text-center">
            {showResult ? (
              <div>
                <p className="font-bold mb-2">Winning Number</p>
                <div className="flex justify-center space-x-4">
                  {winningNumbers.map((num, idx) => (
                    <div key={idx} className="w-10 h-10 bg-purple-700 text-white flex items-center justify-center rounded-full font-bold">
                      {num}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Spin to reveal winning numbers</p>
            )}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
          const isSelected = selectedNumbers.includes(num);
          return (
            <button
              key={num}
              onClick={() => toggleNumber(num)}
              className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                isSelected ? 'bg-purple-700 text-white border-2 border-green-400' : 'bg-gray-300 text-gray-800 border border-gray-400'
              }`}
            >
              {num}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleSpinButtonPress}
        className={`w-full py-3 rounded font-semibold mb-6 ${
          selectedNumbers.length !== 1 && !showResult ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 text-white'
        }`}
        disabled={selectedNumbers.length !== 1 && !showResult}
      >
        {showResult
          ? lastResultWasWin.current
            ? 'Go to Games'
            : "Go to Loser's Game"
          : 'Spin Wheel'}
      </button>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">How It Works</h2>
        <p className="text-gray-700">
          Spin the wheel to randomly select one winning number from 1–10. Players bet against your result with odds of {odds}. If they guess the number, they win. If not, you win.
        </p>
      </div>
      </div>

      {success === true && <WinningModal visible={visible} closeModal={closeModal} />}
      {success === false && <LosingModal visible={visible} closeModal={closeModal} />}
    </div>
  );
};

export default SelectedWheelSpin;
