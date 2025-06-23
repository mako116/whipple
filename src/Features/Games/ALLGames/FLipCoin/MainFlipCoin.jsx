import React, { useState, useRef, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoins } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../../context/authContext';
import Button from '../../../../components/button/gamebutton';
// import { useGameContext } from '../../../../context/AppContext';

const MIN_STAKE = 200;
const MAX_STAKE = 100000;

const MainFlipCoin = () => {
  const { setUserDetails } = useContext(AuthContext);
  const GameName = 'Flip The Coin';
  const navigate = useNavigate();

  const [flipResult, setFlipResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [stake, setStake] = useState('');
  const [walletBalance] = useState(150000);
  const [quickAmounts] = useState([200, 500, 1000, 2000, 5000, 10000]);

  const rotationRef = useRef(null);

  const handleFlip = () => {
    if (isFlipping) return;

    const numericStake = parseInt(stake);
    if (isNaN(numericStake) || numericStake < MIN_STAKE) {
      window.alert(`Minimum stake is ₦${MIN_STAKE}`);
      return;
    }

    setIsFlipping(true);
    setFlipResult(null);

    if (rotationRef.current) {
      rotationRef.current.classList.add('animate-spin');
    }

    setTimeout(() => {
      const newResult = Math.random() < 0.5 ? 'heads' : 'tails';
      setFlipResult(newResult);
      setIsFlipping(false);
      if (rotationRef.current) {
        rotationRef.current.classList.remove('animate-spin');
      }
    }, 1500);
  };

  const handleStakeChange = (amount) => {
    let current = parseInt(stake) || 0;
    let updated = current + amount;
    if (updated < MIN_STAKE) updated = MIN_STAKE;
    if (updated > MAX_STAKE) updated = MAX_STAKE;
    setStake(String(updated));
  };

  const setQuickAmount = (amt) => {
    const value = Math.min(Math.max(amt, MIN_STAKE), MAX_STAKE);
    setStake(String(value));
  };

  const stakeValue = parseInt(stake) || 0;
  const admissionFee = Math.round(stakeValue * 0.25);
  const totalAmount = stakeValue + admissionFee;

  const handlePublish = () => {
    if (!stake || !flipResult) {
      window.alert('Flip the coin and enter a stake first.');
      return;
    }

    const parsedTotalOdds = '2.0';
    const gameLabel = flipResult;

    setUserDetails({
      stake: stake.toString(),
      odds: parsedTotalOdds + 'x',
      gameLabel,
      GameName,
      range: '',
      selected: [],
      result: flipResult,
    });

    navigate('/available-games');
  };

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto bg-blue-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">{GameName}</h1>

      <div className="flex justify-center mb-4">
        <div ref={rotationRef} className="w-32 h-32 rounded-full bg-yellow-400 flex items-center justify-center text-5xl font-bold">
          {flipResult === 'heads' ? 'H' : flipResult === 'tails' ? 'T' : 'H'}
        </div>
      </div>

      <div className="flex justify-center mb-4">
        <button
          className="bg-blue-800 text-white px-6 py-3 rounded flex items-center"
          onClick={handleFlip}
          disabled={isFlipping}
        >
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          {GameName}
        </button>
      </div>

      {flipResult && (
        <div className="text-center mb-6">
          <p className="text-xl font-semibold mb-1">Result: <span className="uppercase">{flipResult}</span></p>
          <p className="text-lg font-medium">Odds: 2.0</p>
        </div>
      )}

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => handleStakeChange(-100)}>-</button>
          <span className="font-semibold text-lg">Bet</span>
          <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => handleStakeChange(100)}>+</button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {quickAmounts.map((amt) => (
            <button key={amt} className="bg-gray-200 px-4 py-2 rounded" onClick={() => setQuickAmount(amt)}>
              ₦{amt.toLocaleString()}
            </button>
          ))}
        </div>

        <input
          className="w-full p-3 border rounded mb-4"
          type="number"
          placeholder="Enter stake amount"
          value={stake}
          onChange={(e) => setStake(e.target.value)}
        />

        {/* <button
          className="w-full bg-green-600 text-white py-3 rounded mb-4"
          onClick={handlePublish}
        >
          Publish Game
        </button> */}

        <Button
            // isDisabled={isButtonDisabled}
          //  isLoading={loading}
           onClick={handlePublish}
           text="Publish Game"
           />

        <div className="space-y-2">
          <p className="flex justify-between">
            <span>Admission Fee (25%):</span>
            <span>₦{admissionFee.toLocaleString()}</span>
          </p>
          <p className="flex justify-between font-semibold">
            <span>Total Amount:</span>
            <span>₦{totalAmount.toLocaleString()}</span>
          </p>
          <p className="flex justify-between">
            <span>Your wallet balance:</span>
            <span className="font-semibold">₦{walletBalance.toLocaleString()}</span>
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="font-bold mb-2 text-lg">How It Works</h3>
        <p>
          Flip the coin and set your stake. Players will bet against your result with odds of 2.0. If they guess right, they win. If they’re wrong, you win.
        </p>
      </div>
    </div>
  );
};

export default MainFlipCoin; 
