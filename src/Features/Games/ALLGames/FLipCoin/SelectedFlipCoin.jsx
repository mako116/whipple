// src/pages/SelectedFlipCoin.jsx
import React, { useState,  useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useGameContext } from '../../context/AppContext';
// import WinningModal from '../../../../components/WinningModal';
// import LosingModal from '../../../../components/LosingModal';
import { AuthContext } from '../../../../context/authContext';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';

const SelectedFlipCoin = () => {
  const { userDetails, setUserDetails } = useContext(AuthContext);
  const { totalOdds = '2.0', gameLabel, range, GameName } = userDetails || {};

  const navigate = useNavigate();
  // const rotation = useRef(0);
  const [flipResult, setFlipResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  // const [selected, setSelected] = useState('');
  const [flippingButton, setFlippingButton] = useState(null);
  // const [result, setResult] = useState(passedResult);
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisible] = useState(false);

    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
  // const correctSide = typeof passedResult === 'string' ? passedResult : 'Heads';
  const stake = 10;
   const parsedTotalOdds = parseFloat(totalOdds);
  const selectedNumbers = [1];

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleChoice = (choice) => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipResult(null);
    // setSelected(choice);
    setFlippingButton(choice);
    // setResult('?');

    setTimeout(() => {
      const randomResult = Math.random() < 0.5 ? 'Tails' : 'Heads';
      setFlipResult(randomResult);
      const didWin = choice === randomResult;

      setSuccess(didWin);
      setModalVisible(true);
      // setResult(randomResult);
      setIsFlipping(false);
      setFlippingButton(null);
    }, 1500);
  };

  const moveForward = () => {
    setUserDetails({
      stake: stake.toString(),
      odds: parsedTotalOdds + 'x',
      gameLabel,
      GameName,
      range,
      selected: selectedNumbers.join(','),
      isGameLost: true,
      flipResult,
    });

    navigate('/losers-games');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-4">{GameName}</h1>
      <p className="text-center text-gray-600 mb-6">Pick Heads or Tails to match the House and win!</p>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">House: @user</h2>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-5xl text-white font-bold">
            {flipResult === 'Heads' ? 'H' : flipResult === 'Tails' ? 'T' : '?'}
          </div>
        </div>

        <p className="text-center text-lg font-medium mb-4">Choose Your Side</p>

        <div className="flex justify-around mb-4">
          {success === null ? (
            <>
              <button
                className="bg-blue-800 cursor-pointer text-white py-3 px-6 rounded w-2/5"
                onClick={() => handleChoice('Heads')}
                disabled={isFlipping}
              >
                {isFlipping && flippingButton === 'Heads' ? 'Flipping...' : 'Heads'}
              </button>

              <button
                className="bg-blue-800 text-white cursor-pointer py-3 px-6 rounded w-2/5"
                onClick={() => handleChoice('Tails')}
                disabled={isFlipping}
              >
                {isFlipping && flippingButton === 'Tails' ? 'Flipping...' : 'Tails'}
              </button>
            </>
          ) : success === true ? (
            <button
              className="bg-green-600 text-white cursor-pointer py-3 px-6 rounded w-4/5"
              onClick={() => navigate('/games')}
            >
              Go to Games
            </button>
          ) : (
            <button
              className="bg-red-600 text-white cursor-pointer py-3 px-6 rounded w-4/5"
              onClick={moveForward}
            >
              Go to Losers Game
            </button>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">How To Win</h3>
        <p className="text-gray-600">
          Choose Heads or Tails. If your choice matches the House’s flip, you win the round!
        </p>
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

export default SelectedFlipCoin;
