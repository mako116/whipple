import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import LosingModal from '../../../../components/modals/LosersModal';
import WinningModal from '../../../../components/modals/WinningModal';

const SelectedLuckyNumbers = () => {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { odds, gameLabel, range, GameName, stake, selected } = userDetails || {};

  const correctNumber = parseInt(selected);
 
  // const [isFirstLoss, setIsFirstLoss] = useState(true);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisibled] = useState(false);

  const closeModal = () => setModalVisibled(false);

  const handleNumberSelect = (number) => {
    if (success !== null) return;
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((num) => num !== number));
    } else if (selectedNumbers.length < 1) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleSubmit = () => {
    setSuccess(selectedNumbers.includes(correctNumber));
    setModalVisibled(true);
  };

  const handleLosersRoute = () => {
    setUserDetails({
      stake: stake.toString(),
      odds,
      gameLabel,
      GameName,
      range,
      selected: selectedNumbers.join(','),
      isGameLost: true,
    });
    navigate('/losers-games');
  };

  return (
    <div className="min-h-screen bg-blue-100">
 
      <div className="p-4 max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">{GameName}</h2>
          <p className="text-gray-600">{GameName} - {gameLabel} (2 from 1-{range})</p>
        </div>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Game Details</h3>
          <p className="text-gray-600 mb-2">House: @current-user</p>
          <div className="flex justify-between mb-2">
            <div>
              <p className="text-sm">Stake</p>
              <p className="font-semibold">₦{stake}</p>
            </div>
            <div>
              <p className="text-sm">Odds</p>
              <p className="font-semibold">{odds}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Players: 9 joined</p>
        </div>

        <div className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-semibold mb-2">Select Your Lucky Number</h3>
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2 mb-2">
            {Array.from({ length: parseInt(range) }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleNumberSelect(num)}
                disabled={success !== null}
                className={`p-2 rounded border font-bold ${selectedNumbers.includes(num) ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'} ${success !== null ? 'opacity-50' : ''}`}
              >
                {num}
              </button>
            ))}
          </div>

          <p className="text-sm mb-4">{selectedNumbers.length}/1 numbers selected</p>

          {success === false ? (
            <button onClick={handleLosersRoute} className="w-full bg-red-600 text-white py-2 rounded">
              Play Losers Game
            </button>
          ) : success === true ? (
            <button onClick={() => navigate('/games/category/category-main')} className="w-full bg-green-600 text-white py-2 rounded">
              Go to Games
            </button>
          ) : (
            <button onClick={handleSubmit} className="w-full bg-blue-600 text-white py-2 rounded">
              Submit Your Numbers
            </button>
          )}
        </div>

        <div className="bg-white p-4 rounded shadow mb-4">
          <h3 className="text-lg font-bold mb-2">How To Win</h3>
          <p>
            Pick the exact <span className="text-blue-600 font-semibold">{selected} number</span> between <span className="text-blue-600 font-semibold">{gameLabel}</span> the House selected to win.
            If your selection matches exactly, <span className="text-green-600 font-bold">you win!</span>
          </p>
        </div>

        <button onClick={() => navigate(-1)} className="w-full border border-blue-600 text-blue-600 py-2 rounded">
          GO BACK
        </button>
      </div>

      {success === true && (
        <WinningModal visible={visible} closeModal={closeModal} />
      )}
      {success === false && (
        <LosingModal
          visible={visible}
          closeModal={closeModal}
          
        />
      )}
    </div>
  );
};

export default SelectedLuckyNumbers;
