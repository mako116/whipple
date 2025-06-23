import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '../../../../utlis/FormatAmount';
import { AuthContext } from '../../../../context/authContext';
import LosingModal from '../../../../components/modals/LosersModal';
import WinningModal from '../../../../components/modals/WinningModal';
// import LosingModal from '../../../../components/modals/LosingModal';
// import WinningModal from '../../../../components/modals/WinningModal';

export default function SelectedLuckyNumbers() {
  const navigate = useNavigate();
  const { userDetails ,setUserDetails} = useContext(AuthContext);
  const {  gameLabel, range, GameName, selected,odds } = userDetails || {};

  const parsedRange = parseInt(range, 10);
  // const parsedTotalOdds = parseFloat(totalOdds);
  const parsedSelectedCount = selected ? selected.split(',').length : 0;

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [hasSpun, setHasSpun] = useState(false);
  const [success, setSuccess] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Simulate a winning number
  const correctNumber = Math.floor(Math.random() * parsedRange) + 1;

  const handleNumberSelect = num => {
    setSelectedNumbers(prev =>
      prev.includes(num)
        ? prev.filter(n => n !== num)
        : prev.length < parsedSelectedCount
        ? [...prev, num]
        : prev
    );
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stake = parseInt(stakeAmount || '0', 10);
  const admissionFee = Math.round(stake * 0.25);
  const totalAmount = stake + admissionFee;

  const isPublishDisabled =
    selectedNumbers.length !== parsedSelectedCount || isNaN(stake) || stake <= 0;

  const handlePublish = () => {
    if (isPublishDisabled) {
      alert(`Select exactly ${parsedSelectedCount} number(s) and enter a valid stake.`);
      return;
    }

    // Simulate win/lose by checking if the selected numbers contain the correctNumber
    if (selectedNumbers.includes(correctNumber)) {
      setSuccess(true); // Win
    } else {
      setSuccess(false); // Lose
    }

    setHasSpun(true);
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
    navigate("/losers-games");
  };

  return (
    <div className="min-h-screen bg-blue-100">
      <header className="bg-blue-300 p-4">
        <h1 className="text-xl font-bold">{GameName}</h1>
      </header>

      <div className="p-2 space-y-6 m-auto md:w-[600px]">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Select exactly {parsedSelectedCount}</h2>
          <p className="text-gray-700 mb-4">{gameLabel} (1–{parsedRange})</p>
          {selectedNumbers.length > 0 && (
            <p className="mb-2">Selected: {selectedNumbers.join(', ')}</p>
          )}
          <div className="grid grid-cols-10 gap-2">
            {Array.from({ length: parsedRange }).map((_, i) => {
              const num = i + 1;
              const isSel = selectedNumbers.includes(num);
              return (
                <button
                  key={num}
                  onClick={() => handleNumberSelect(num)}
                  className={`p-2 border rounded ${isSel ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}`}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="font-semibold mb-2">Set Stake Amount</h3>
          <input
            type="text"
            value={isInputFocused ? stakeAmount : formatCurrency(stakeAmount)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={e => {
              const raw = e.target.value.replace(/[₦,]/g, '');
              if (!isNaN(Number(raw))) setStakeAmount(raw);
            }}
            placeholder="Enter total amount"
            className="w-full p-2 border rounded mb-4"
          />

          {(isInputFocused || stakeAmount) && (
            <div className="bg-gray-100 p-3 rounded">
              <div className="flex justify-between mb-1">
                <span>Stake Amount:</span>
                <span>{formatCurrency(stake)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Admission Fee (25%):</span>
                <span>{formatCurrency(admissionFee)}</span>
              </div>
              <div className="flex justify-between font-semibold">
                <span>Total:</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
            </div>
          )}
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

        {!hasSpun && (
          <button
            onClick={handlePublish}
            disabled={isPublishDisabled}
            className={`w-full py-3 font-semibold text-white rounded ${isPublishDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
          >
            Publish Game
          </button>
        )}
      </div>

      {/* Modals */}
      {success === true && <WinningModal visible={modalVisible} closeModal={closeModal} />}
      {success === false && <LosingModal visible={modalVisible} closeModal={closeModal} />}
    </div>
  );
}
