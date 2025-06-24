import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import LosingModal from '../../../../components/modals/LosersModal';
import WinningModal from '../../../../components/modals/WinningModal';

export default function SelectedLuckyNumbers() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { stake, gameLabel, range, GameName, odds } = userDetails || {};

  const parsedRange = parseInt(range, 10);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Simulate a winning number
  const correctNumber = Math.floor(Math.random() * parsedRange) + 1;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNumberSelect = (num) => {
    if (hasSpun) return; // Stop further selection if already spun

    setSelectedNumber(num);
    setHasSpun(true);

    if (num === correctNumber) {
      setSuccess(true); // Win
    } else {
      setSuccess(false); // Lose
    }

    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleLosersGame = () => {
    setUserDetails({
      stake,
      odds,
      gameLabel,
      GameName,
      isGameLost: true,
    });
    navigate('/losers-games');
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <header className="bg-blue-300 p-4">
        <h1 className="text-xl font-bold">{GameName}</h1>
      </header>

      <div className="p-2 space-y-6 m-auto md:w-[600px]">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Select 1 Lucky Number</h2>
          <p className="text-gray-700 mb-4">{gameLabel} (1–{parsedRange})</p>

          {selectedNumber && (
            <p className="mb-2">Selected Number: {selectedNumber}</p>
          )}

          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: parsedRange }).map((_, i) => {
              const num = i + 1;
              const isSel = selectedNumber === num;
              return (
                <button
                  key={num}
                  onClick={() => handleNumberSelect(num)}
                  className={`p-2 border rounded ${isSel ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
                  disabled={hasSpun} // Prevent further selections after spin
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        {!success && hasSpun && (
          <button
            onClick={handleLosersGame}
            className="bg-[#0A1931] text-white font-semibold rounded-lg px-8 py-3 mx-auto block"
          >
            Play Losers Game
          </button>
        )}

        {success && (
          <button
            onClick={() => navigate('/games')}
            className="bg-[#0A1931] text-white cursor-pointer font-semibold rounded-lg px-8 py-3 mx-auto block"
          >
            Go Back to Games
          </button>
        )}
      </div>

      {/* Modals */}
      {success === true && <WinningModal visible={modalVisible} closeModal={closeModal} />}
      {success === false && <LosingModal visible={modalVisible} closeModal={closeModal} />}
    </div>
  );
}
