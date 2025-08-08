import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import useSound from 'use-sound';
import diceSound from '../../../../assets/sounds/dice.mp3';
import { AuthContext } from '../../../../context/authContext';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import { useRequest } from '../../../../hooks/useRequest';

const SelectedDiceRoll = () => {
  const { setUserDetails, userDetails } = useContext(AuthContext);
  const { stake, odds, gameLabel, GameName = 'Dice Roll' } = userDetails || {};

  const { makeRequest } = useRequest();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const [diceType, setDiceType] = useState('single');
  const [face1, setFace1] = useState(1);
  const [face2, setFace2] = useState(1);
  const [houseRoll, setHouseRoll] = useState(null);
  const [userRoll, setUserRoll] = useState(null);
  const [rolling, setRolling] = useState(false);
  const [result, setResult] = useState(null);
  const [visible, setModalVisible] = useState(false);
  const [diceRolled, setDiceRolled] = useState(false);

  const [playDiceSound] = useSound(diceSound);

  const closeModal = () => setModalVisible(false);

  const rollDice = async () => {
    setRolling(true);
    setDiceRolled(false);
    setResult(null);

    const newFace1 = Math.floor(Math.random() * 6) + 1;
    const newFace2 = Math.floor(Math.random() * 6) + 1;
    const houseFace1 = Math.floor(Math.random() * 6) + 1;
    const houseFace2 = Math.floor(Math.random() * 6) + 1;

    playDiceSound();

    setTimeout(async () => {
      const userTotal = diceType === 'single' ? newFace1 : newFace1 + newFace2;
      const houseTotal = diceType === 'single' ? houseFace1 : houseFace1 + houseFace2;

      setFace1(newFace1);
      setFace2(newFace2);
      setUserRoll(userTotal);
      setHouseRoll(houseTotal);

      try {
        const res = await makeRequest('/play-game', {
          name: name || GameName,
          numberRolled: userTotal,
          gameId: id,
        });

        const isSuccess = res?.response?.success;

        if (isSuccess) {
          setResult('win');
        } else {
          setResult('lose');
        }

        setModalVisible(true);
        setDiceRolled(true);
      } catch (error) {
        alert('Error submitting game. Please try again.');
      } finally {
        setRolling(false);
      }
    }, 1000);
  };

  const handleGoGames = () => {
    setUserDetails({
      stake,
      odds,
      gameLabel,
      GameName,
      isGameLost: true,
    });
    navigate('/losers-games');
  };

  const dotLayouts = {
    1: [[1, 1]],
    2: [[0, 0], [2, 2]],
    3: [[0, 0], [1, 1], [2, 2]],
    4: [[0, 0], [0, 2], [2, 0], [2, 2]],
    5: [[0, 0], [0, 2], [1, 1], [2, 0], [2, 2]],
    6: [[0, 0], [1, 0], [2, 0], [0, 2], [1, 2], [2, 2]],
  };

  const getDots = (face) => (
    <div className="grid grid-cols-3 gap-1">
      {Array.from({ length: 3 }).map((_, rowIdx) =>
        Array.from({ length: 3 }).map((_, colIdx) => {
          const isDot = dotLayouts[face]?.some(dot => dot[0] === rowIdx && dot[1] === colIdx);
          return (
            <div key={`${rowIdx}-${colIdx}`} className={`w-3 h-3 rounded-full ${isDot ? 'bg-black' : ''}`} />
          );
        })
      )}
    </div>
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-blue-50 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-2 text-center">{GameName} Game</h1>
      <p className="text-lg text-blue-600 mb-6 text-center">Roll the dice and try to match the House's outcome</p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-xl font-semibold mb-4">{GameName}</h2>

        <div className="flex justify-center mb-4 space-x-4">
          <button onClick={() => setDiceType('single')} className={`px-4 py-2 border rounded ${diceType === 'single' ? 'bg-blue-700 text-white' : 'bg-white'}`}>Single Dice</button>
          <button onClick={() => setDiceType('double')} className={`px-4 py-2 border rounded ${diceType === 'double' ? 'bg-blue-700 text-white' : 'bg-white'}`}>Double Dice</button>
        </div>

        <div className="flex justify-center mb-6 space-x-6">
          <div className="w-20 h-20 border rounded-lg flex items-center justify-center bg-gray-100">
            {getDots(face1)}
          </div>
          {diceType === 'double' && (
            <div className="w-20 h-20 border rounded-lg flex items-center justify-center bg-gray-100">
              {getDots(face2)}
            </div>
          )}
        </div>

        {diceRolled && (
          <div className="text-center mb-4">
            <p className="text-lg font-semibold mb-1">Your Roll: {userRoll}</p>
            <p className="text-lg font-semibold mb-1">House Roll: {houseRoll}</p>
            <p className={`font-bold ${result === 'win' ? 'text-green-600' : 'text-red-600'}`}>
              {result === 'win' ? 'You Win!' : 'You Lose!'}
            </p>
          </div>
        )}

        {rolling ? (
          <button disabled className="w-full py-3 bg-gray-400 text-white rounded">Rolling...</button>
        ) : result === 'win' ? (
          <button onClick={() => navigate('/games')} className="w-full py-3 bg-green-700 text-white rounded">Go Back to Games</button>
        ) : result === 'lose' ? (
          <button onClick={handleGoGames} className="w-full py-3 bg-red-700 text-white rounded">Go to Loser’s Game</button>
        ) : (
          <button onClick={rollDice} className="w-full py-3 bg-blue-700 text-white rounded hover:bg-blue-800">Roll Dice</button>
        )}
      </div>

      {/* Modals */}
      <WinningModal visible={visible && result === 'win'} closeModal={closeModal} />
      <LosingModal visible={visible && result === 'lose'} closeModal={closeModal} />
    </div>
  );
};

export default SelectedDiceRoll;
