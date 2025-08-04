// src/pages/SelectedFlipCoin.jsx
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import { useRequest } from '../../../../hooks/useRequest';

const SelectedFlipCoin = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const house = searchParams.get('house');

  const { makeRequest } = useRequest();
  const { userDetails, setUserDetails } = useContext(AuthContext);

  const {
    totalOdds = '2.0',
    gameLabel,
    range,
    GameName,
    result: passedResult,
  } = userDetails || {};

  const navigate = useNavigate();

  const [flipResult, setFlipResult] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [selected, setSelected] = useState('');
  const [flippingButton, setFlippingButton] = useState(null);
  const [result, setResult] = useState(passedResult);
  const [success, setSuccess] = useState(null);
  const [visible, setModalVisible] = useState(false);
  const [alreadyPlayed, setAlreadyPlayed] = useState(false);

  const stake = 10;
  const parsedTotalOdds = parseFloat(totalOdds);
  const selectedNumbers = [1];

  // Store completed game into localStorage
  const markGameAsPlayed = (gameId, houseId, result, selected, didWin) => {
    const data = JSON.parse(localStorage.getItem('userDetails') || '{}');
    data[`${gameId}_${houseId}`] = {
      result,
      selected,
      success: didWin,
    };
    localStorage.setItem('userDetails', JSON.stringify(data));
  };

  const getPlayedGame = (gameId, houseId) => {
    const data = JSON.parse(localStorage.getItem('userDetails') || '{}');
    return data[`${gameId}_${houseId}`];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const played = getPlayedGame(id, house);
    if (played) {
      setAlreadyPlayed(true);
      setSelected(played.selected);
      setFlipResult(played.result);
      setResult(played.result);
      setSuccess(played.success);
    }
  }, [id, house]);

  const closeModal = () => setModalVisible(false);

  const handleChoice = async (choice) => {
    if (isFlipping || alreadyPlayed) return;

    setIsFlipping(true);
    setSelected(choice);
    setFlippingButton(choice);
    setResult('?');

    try {
      const res = await makeRequest('/play-game', {
        gameId: id,
        choice: choice.toLowerCase(),
        name,
      });

      const houseResult = res?.response?.result || (Math.random() < 0.5 ? 'Heads' : 'Tails');
      const didWin = res?.response?.success ?? (choice === houseResult);

      setFlipResult(houseResult);
      setResult(houseResult);
      setSuccess(didWin);
      setModalVisible(true);

      // Store result in localStorage to prevent re-play
      markGameAsPlayed(id, house, houseResult, choice, didWin);
      setAlreadyPlayed(true);
    } catch (error) {
      console.error('Game request failed:', error);
    } finally {
      setIsFlipping(false);
      setFlippingButton(null);
    }
  };

  const moveForward = () => {
    setUserDetails({
      stake: stake.toString(),
      odds: `${parsedTotalOdds}x`,
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
      <p className="text-center text-gray-600 mb-6">
        Pick Heads or Tails to match the House and win!
      </p>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-xl font-semibold mb-2">House: @{house}</h2>

        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 rounded-full bg-blue-500 flex items-center justify-center text-5xl text-white font-bold">
            {flipResult === 'Heads' ? 'H' : flipResult === 'Tails' ? 'T' : '?'}
          </div>
        </div>

        <p className="text-center text-lg font-medium mb-4">Choose Your Side</p>

        <div className="flex flex-col items-center space-y-4 w-full">
          {!alreadyPlayed && success === null ? (
            <div className="flex justify-around w-full">
              <button
                className="bg-blue-800 text-white py-3 px-6 rounded w-2/5"
                onClick={() => handleChoice('Heads')}
                disabled={isFlipping}
              >
                {isFlipping && flippingButton === 'Heads' ? 'Flipping...' : 'Heads'}
              </button>
              <button
                className="bg-blue-800 text-white py-3 px-6 rounded w-2/5"
                onClick={() => handleChoice('Tails')}
                disabled={isFlipping}
              >
                {isFlipping && flippingButton === 'Tails' ? 'Flipping...' : 'Tails'}
              </button>
            </div>
          ) : success === true ? (
            <>
              <p className="text-green-600 font-semibold text-lg">
                You selected: {selected} — You Won!
              </p>
              <button
                className="bg-green-600 text-white py-3 px-6 rounded w-4/5"
                onClick={() => navigate('/games')}
              >
                Go to Games
              </button>
            </>
          ) : (
            <>
              <p className="text-red-600 font-semibold text-lg">
                You selected: {selected} — You Lost!
              </p>
              <button
                className="bg-red-600 text-white py-3 px-6 rounded w-4/5"
                onClick={moveForward}
              >
                Go to Losers Game
              </button>
            </>
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
        <LosingModal visible={visible} closeModal={closeModal} />
      )}
    </div>
  );
};

export default SelectedFlipCoin;
