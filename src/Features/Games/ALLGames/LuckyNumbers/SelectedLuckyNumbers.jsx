import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import LosingModal from '../../../../components/modals/LosersModal';
import WinningModal from '../../../../components/modals/WinningModal';

export default function SelectedLuckyNumbers() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { stake, gameLabel, range, GameName = 'Lucky Number', odds = '3.333' } = userDetails || {};

  // Safely parse the range and provide fallback default (e.g., 10)
  const parsedRange = Number.isFinite(Number(range)) ? parseInt(range, 10) : 10;

  const [selectedNumber, setSelectedNumber] = useState(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Generate winning number on spin
  const [correctNumber, setCorrectNumber] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set winning number once when component mounts
    setCorrectNumber(Math.floor(Math.random() * parsedRange) + 1);
  }, [parsedRange]);

  const handleNumberSelect = (num) => {
    if (hasSpun) return;

    setSelectedNumber(num);
    setHasSpun(true);

    if (num === correctNumber) {
      setSuccess(true);
    } else {
      setSuccess(false);
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
          <p className="text-gray-700 mb-4">{gameLabel || `Choose from 1–${parsedRange}`}</p>

          {selectedNumber && (
            <p className="mb-2 text-lg font-medium">
              Selected Number: <span className="font-bold">{selectedNumber}</span>
            </p>
          )}

          {parsedRange > 0 ? (
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {Array.from({ length: parsedRange }).map((_, i) => {
                const num = i + 1;
                const isSel = selectedNumber === num;
                return (
                  <button
                    key={num}
                    onClick={() => handleNumberSelect(num)}
                    className={`p-2 border rounded font-semibold ${
                      isSel ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'
                    }`}
                    disabled={hasSpun}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
          ) : (
            <p className="text-red-500 font-medium">Invalid range specified. Please set a valid range.</p>
          )}
        </div>

        {/* Buttons */}
        {hasSpun && success === false && (
          <button
            onClick={handleLosersGame}
            className="bg-[#0A1931] text-white font-semibold rounded-lg px-8 py-3 mx-auto block"
          >
            Play Losers Game
          </button>
        )}

        {hasSpun && success === true && (
          <button
            onClick={() => navigate('/games')}
            className="bg-[#0A1931] text-white font-semibold rounded-lg px-8 py-3 mx-auto block"
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
