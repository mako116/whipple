import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { useRequest } from '../../../../hooks/useRequest';
import axiosClient from '../../../../utlis/Axios';
import toast from 'react-hot-toast';
import WinningModal from '../../../../components/modals/WinningModal';
import LosingModal from '../../../../components/modals/LosersModal';
import { AuthContext } from '../../../../context/authContext';

const SelectedLuckyNumbers = () => {
    const { userDetails, setUserDetails } = useContext(AuthContext);
  const {stake, odds,selected, gameLabel, GameName,  totalOdds, range  } = userDetails || {};

  const { loading, makeRequest } = useRequest();
     const [searchParams] = useSearchParams();
 
     const id = searchParams.get('id'); 
   const name = searchParams.get('name');
   const house = searchParams.get('house');
   const losersGame = searchParams.get('losersGame');

  const location = useLocation();
  const navigate = useNavigate();

  // const {  stake, odds, gameLabel, GameName,  totalOdds, range } =
  //   location.state || {};

  // Context with user details


  // Local game state
  const [game, setGame] = useState(null);
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [success, setSuccess] = useState(null);
  const [visible, setVisible] = useState(false);
        const [isLosersGame, setIsLosersGame] = useState(false);

  // 👇 if you want to track losers modal separately
  const [modalVisibled, setModalVisibled] = useState(false);

  useEffect(()=>{
 if(losersGame){
  setIsLosersGame(true);
 }
}, [losersGame])

  useEffect(() => {
    if (!id) {
      toast.error('Missing game ID');
      return;
    }

    const fetchGame = async () => {
      try {
        const res = await axiosClient.get(`/get-game/${id}`);
        setGame(res.data.game);
      } catch (err) {
        toast.error('Failed to fetch game');
      }
    };

    fetchGame();
  }, [id]);

  const correctNumber = parseInt(selected, 10);
  const parsedTotalOdds = parseFloat(totalOdds);

  const closeModal = () => {
    setVisible(false);
    setModalVisibled(false);
  };

  const handleNumberSelect = (number) => {
    if (success !== null) return;
    if (selectedNumbers.includes(number)) return;

    setSelectedNumbers([number]); // Only allow one number
  };

    function getRandomNumber() {
  return Math.floor(Math.random() * 3) + 1;
}

const losersGameNumber = getRandomNumber(); 

const handleSubmit = async () => {
  if (selectedNumbers.length === 0) {
    toast.error('Please select a number before submitting');
    return;
  }

  if (!game?.id) {
    toast.error('Game information missing');
    return;
  }

  let res; // ✅ declare outside so it’s always defined

  // First request
  if (!losersGame) {
    res = await makeRequest('/play-game', {
      gameId: game.id,
      choiceNumber: selectedNumbers[0],
      name,
    });
  }

  if (res?.error) {
    toast.error(res.error);
    return;
  }

  // If success from first request
  if (res?.response?.success) {
    setSuccess(res.response.success);
    setVisible(true);
  } else {
    // Otherwise → run losers game request
    try {
      const loserRes = await makeRequest('/play-losers-game', {
        gameId: game.id,
        choiceNumber: selectedNumbers[0],
        name,
      });

      if (loserRes.error) {
        toast.error(loserRes.error);
        return;
      }

      if (loserRes.response?.error) {
        toast.error(loserRes.response.error);
        return;
      }

      if (loserRes.response?.status) {
        if (selectedNumbers[0] === losersGameNumber) {
          setSuccess(true);
        } else {
          setSuccess(false);
        }
        setModalVisibled(true);
      }
    } catch (error) {
      console.error(error);
      toast.error('Server Error');
    }
  }
};


  const handleLosers = () => {
    navigate('/losers-games');
    setUserDetails({
      stake: stake?.toString() || '',
      odds,
      gameLabel,
      GameName,
      range,
      selected: selectedNumbers.join(','),
      isGameLost: true,
    });
  };

  return (
    <div className="p-4 pb-10">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-xl font-semibold">{game?.name || 'Loading...'}</h1>
        <p className="text-sm text-gray-500">
          {game?.name || '-'} - {game?.subcategory || '-'} (2 from 1-{range || '-'})
        </p>
      </div>

      {/* Game Card */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">Game Details</h2>
        <p className="text-sm text-gray-500 mb-3">
          House: @{game?.creator?.name || 'N/A'}
        </p>
        <div className="flex justify-between mb-4">
          <div>
            <p className="text-xs text-gray-500">Stake</p>
            <p className="text-base font-bold">₦{game?.stake || '0'}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Odds</p>
            <p className="text-base font-bold">{game?.odds || '0'}</p>
          </div>
        </div>
        <p className="text-xs text-gray-500">Players</p>
        <p className="text-base font-bold mb-2">9 joined</p>
      </div>

      {/* Number Selection */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Select Your Lucky Numbers</h2>
        <p className="text-sm text-gray-500 mb-4">House: @current-user</p>

        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {range > 0 ? (
            Array.from({ length: range }, (_, i) => i + 1).map((num) => (
              <button
                key={num}
                onClick={() => handleNumberSelect(num)}
                disabled={success !== null}
                className={`w-12 h-12 rounded flex items-center justify-center font-bold ${
                  selectedNumbers.includes(num)
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                } ${success !== null ? 'opacity-50' : ''}`}
              >
                {num}
              </button>
            ))
          ) : (
            <p className="text-gray-500">Loading numbers...</p>
          )}
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {selectedNumbers.length}/1 numbers selected
        </p>

        {/* Action Buttons */}
        {success === false ? (
          <button
            onClick={handleLosers}
            className="bg-indigo-600 w-full text-white py-3 rounded mb-2"
          >
            Play Losers Game
          </button>
        ) : success === true ? (
          <button
            onClick={() => navigate('/games')}
            className="bg-indigo-600 w-full text-white py-3 rounded mb-2"
          >
            Go to Games
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-indigo-600 w-full text-white py-3 rounded mb-2"
          >
            {loading ? <span>Submitting...</span> : 'Submit Your Number'}
          </button>
        )}
      </div>

      {/* How to Win */}
      <div className="bg-white p-4 rounded-lg mb-6">
        <h3 className="text-base font-semibold text-gray-800 mb-2">How To Win</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          Pick the exact{' '}
          <span className="font-semibold text-indigo-600">{selected}</span> number between{' '}
          <span className="font-semibold text-indigo-600">{gameLabel}</span> the House selected to
          win. If your selection matches exactly,{' '}
          <span className="text-green-600 font-semibold">you win!</span>
        </p>
      </div>

      <div className="flex justify-start">
        <button
          onClick={() => navigate(-1)}
          className="border border-gray-300 py-2 px-6 rounded text-sm font-semibold"
        >
          GO BACK
        </button>
      </div>

      {/* Modals */}
      {success === true && <WinningModal visible={visible} closeModal={closeModal} />}
      {success === false && (
        <LosingModal
          visible={visible || modalVisibled}
          closeModal={closeModal}
          correctNumber={correctNumber}
          stake={stake}
          odds={odds}
          GameName={GameName}
          gameLabel={gameLabel}
          range={range}
          selected={selected}
          parsedTotalOdds={parsedTotalOdds}
          selectedNumbers={selectedNumbers}
        />
      )}
    </div>
  );
};

export default SelectedLuckyNumbers;
