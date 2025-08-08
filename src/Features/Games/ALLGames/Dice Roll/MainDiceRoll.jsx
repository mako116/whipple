import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDice, FaSync } from 'react-icons/fa';
import { AuthContext } from '../../../../context/authContext';
import useSound from 'use-sound';
import diceSound from '../../../../assets/sounds/dice.mp3'
import Button from '../../../../components/button/gamebutton';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';

const MainDiceRoll = () => {
  const [diceType, setDiceType] = useState('single');
  const [diceRolled, setDiceRolled] = useState(false);
  const [stake, setStake] = useState('');
  const [face1, setFace1] = useState(1);
  const [face2, setFace2] = useState(1);
  const [isRolling, setIsRolling] = useState(false);
  const { makeRequest, loading } = useRequest();
  const walletBalance = 150000;
  const admissionFee = Number(stake) * 0.25 || 0;
  const totalAmount = Number(stake) + admissionFee;

     useEffect(() => {
        window.scrollTo(0, 0);
      }, []);
  const navigate = useNavigate();
  const { setUserDetails } = useContext(AuthContext);

  // Use the sound hook
  const [playDiceSound] = useSound(diceSound);

  const dotLayouts = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [1, 0], [2, 0], [0, 2], [1, 2], [2, 2]],
  };

  const getDiceDots = (face) => (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 3 }).map((_, rowIdx) =>
        Array.from({ length: 3 }).map((_, colIdx) => {
          const isDot = dotLayouts[face].some(
            (dot) => dot[0] === rowIdx && dot[1] === colIdx
          );
          return (
            <div
              key={`${rowIdx}-${colIdx}`}
              className={`w-3 h-3 rounded-full ${isDot ? 'bg-black' : ''}`}
            />
          );
        })
      )}
    </div>
  );

  const rollDice = () => {
    setIsRolling(true);
    playDiceSound();

    setTimeout(() => {
      const newFace1 = Math.floor(Math.random() * 6) + 1;
      const newFace2 = Math.floor(Math.random() * 6) + 1;

      setFace1(newFace1);
      setFace2(newFace2);
      setDiceRolled(true);
      setIsRolling(false);
    }, 700);
  };

  const getOdds = () => {
    if (diceType === 'single') return 5.988;

    const sum = face1 + face2;
    switch (sum) {
      case 12: return 35.714;
      case 11: return 17.857;
      case 10: return 12.048;
      case 9: return 9.009;
      case 8: return 7.194;
      case 7: return 5.988;
      case 6: return 7.194;
      case 5: return 9.009;
      case 4: return 12.048;
      case 3: return 17.857;
      case 2: return 35.714;
      default: return 0;
    }
  };

  const isStakeValid = !isNaN(Number(stake)) && Number(stake) > 0;
  const isPublishEnabled = isStakeValid && diceRolled;

  const handlePublish = async() => {
    const odds = getOdds();
    const gameLabel = diceType === 'double' ? `${face1 + face2}` : `${face1}`;
     const res = await makeRequest("/create-game", {
      name: "Dice Roll",
      odds: getOdds(),
      stake,
      diceRolled: gameLabel,
    });
    
     if(res.response){
      toast.success('Game Created Successfully')
      setTimeout(()=>{
        navigate("/available-games");
      }, 1000)
    }else if(res.error){
      return toast.error( 'Error', res.error)
    }
   };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto p-4 space-y-8">
        <h1 className="text-3xl font-bold text-center mb-2">Create Dice Roll Game</h1>
        <p className="text-center text-gray-600 mb-6">Set up your Dice Game and stake</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Roll Dice Section */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold mb-4">Roll the Dice</h2>

            {/* Dice Type Selection */}
            <div className="flex space-x-6 mb-4">
              <button
                className={`flex items-center space-x-2 px-4 py-2 border rounded ${diceType === 'single' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setDiceType('single')}
              >
                <FaDice /> <span>Single Dice</span>
              </button>
              <button
                className={`flex items-center space-x-2 px-4 py-2 border rounded ${diceType === 'double' ? 'bg-blue-600 text-white' : ''}`}
                onClick={() => setDiceType('double')}
              >
                <FaDice /> <span>Double Dice</span>
              </button>
            </div>

            {/* Dice Display */}
            <div className="flex space-x-6 justify-center">
              <div className={`w-20 h-20 bg-white border rounded flex items-center justify-center ${isRolling ? 'animate-spin' : ''}`}>
                {getDiceDots(face1)}
              </div>
              {diceType === 'double' && (
                <div className={`w-20 h-20 bg-white border rounded flex items-center justify-center ${isRolling ? 'animate-spin' : ''}`}>
                  {getDiceDots(face2)}
                </div>
              )}
            </div>

            {/* Result */}
            <div className="mt-4 text-center space-y-2">
              <p className="font-semibold text-lg">
                Result: {face1}
                {diceType === 'double' && ` and ${face2}`}
              </p>
              <p className="font-semibold text-lg">
                Total: {diceType === 'double' ? face1 + face2 : face1}
              </p>
              <p className="text-blue-600 font-medium">Odds: {getOdds()}x</p>
            </div>

            {/* Roll Button */}
            {/* <button
              className="mt-4 w-full flex items-center justify-center space-x-2 bg-blue-700 text-white py-3 rounded hover:bg-blue-800"
              onClick={rollDice}
            >
              <FaSync /> <span>Roll Dice</span>
            </button> */}

            <Button 
             onClick={rollDice}
            text="Roll Dice"
            icon
            />
          </div>

          {/* Stake Section */}
          <div className="bg-white p-6 rounded-lg shadow space-y-4">
            <h2 className="text-xl font-semibold mb-4">Set Your Stake</h2>

            <label className="block mb-2">Your Stake (₦)</label>
            <input
              type="number"
              className="w-full p-3 border rounded mb-4"
              placeholder="Enter total amount"
              value={stake}
              onChange={(e) => setStake(e.target.value)}
            />

            <div className="flex justify-between mb-2">
              <span>Admission Fee (25%)</span>
              <span>₦{admissionFee.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>

            <div className="flex justify-between font-bold mb-4">
              <span>Total Amount</span>
              <span>₦{totalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
            </div>

            <p className="mb-4">Your wallet balance: ₦{walletBalance.toLocaleString()}</p>

            {/* <button
              onClick={handlePublish}
              className={`w-full py-3 rounded ${isPublishEnabled ? 'bg-green-700 text-white hover:bg-green-800' : 'bg-gray-400 text-gray-700 cursor-not-allowed'}`}
              disabled={!isPublishEnabled}
            >
              Publish Game
            </button> */}

              <Button 
             onClick={handlePublish}
            text="Publish Game"
            isDisabled={!isPublishEnabled}
            icon
            />
          </div>
        </div>

        {/* How it Works */}
        <div className="bg-white p-6 rounded-lg shadow mt-6">
          <h3 className="text-lg font-semibold mb-2">How It Works</h3>
          <p className="text-gray-600">
            Roll the dice and set your stake. Players will bet against your result with odds of {getOdds()}x.
            If they correctly guess your roll, they win. If they guess wrong, you win.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainDiceRoll;
