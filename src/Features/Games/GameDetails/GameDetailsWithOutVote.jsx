 import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
// import { useGameContext } from '../../../context/AppContext';
// import HeaderBet from '../../Header/HeaderBet';

const GameDetailsWithOutVote = () => {
  const navigate = useNavigate();
  const { userDetails } = useContext(AuthContext);
  const { stake, odds, gameLabel, range, selected, GameName } = userDetails || {};

  // Normalize GameName
  const normalizedGameName = GameName?.toLowerCase?.();

  const handleContinue = () => {
    switch (normalizedGameName) {
      case 'color roulette2':
        navigate('/selected-color-roulette2', {
          state: {
            stake: stake?.toString(),
            odds,
            gameLabel,
            GameName,
            range,
            selected,
          },
        });
        break;

      case 'one number spin':
        navigate('/selected-one-number', {
          state: {
            stake: stake?.toString(),
            odds,
            gameLabel,
            GameName,
            range,
            selected,
          },
        });
        break;

      default:
        console.warn(`[Navigation Error]: Unknown game "${GameName}" selected.`);
        alert('An error occurred: Unknown game selected. Please try again.');
    }
  };

  return (
    <>
       <div className='bg-white min-h-screen pt-5'>
      <div className="p-4 space-y-3 max-w-lg mx-auto bg-gray-100 h-auto">
        <div>
          <h1 className="text-[14px] font-bold">{GameName}</h1>
          <p className="text-gray-600 text-[14px] font-medium">{`${GameName} - ${gameLabel} (2 from 1-${range})`}</p>
        </div>

        <div className="p-4 bg-white rounded-lg">
          <h2 className="md:text-[14px] font-semibold">Game Details</h2>
          <p className="text-gray-700 mb-1 text-[14px]">House: @current-user</p>
          <div className="flex justify-between mb-1">
            <div>
              <p className="text-[14px] text-gray-500">Stake</p>
              <p className="font-bold">₦{stake}</p>
            </div>
            <div>
              <p className="text-[14px] text-gray-500">Odds</p>
              <p className="font-bold">{odds}</p>
            </div>
          </div>
          <p className="text-[14px] text-gray-700 mb-1">Players</p>
          <p className="font-bold text-[14px]">9 joined</p>
        </div>

        <div className="p-2 bg-white rounded-lg shadow">
          <h2 className="text-[14px] font-semibold mb-1">Place Your Bet</h2>
          <p className="text-gray-700 mb-2 text-[14px]">Betting against The House</p>

          <div className="flex justify-between mb-2">
            <div>
              <p className="text-[14px] text-gray-500">House Stake</p>
              <p className="font-bold text-[14px]">₦{stake}</p>
            </div>
            <div>
              <p className="text-[14px] text-gray-500">Required Stake</p>
              <p className="font-bold text-[14px]">₦800</p>
            </div>
          </div>

          <p className="text-[14px] text-gray-500">Potential Win</p>
          <p className="font-bold mb-2 text-[14px]">₦{stake}</p>

          <p className="text-[14px] text-gray-500">Your Balance</p>
          <p className="font-bold mb-2 text-[14px]">₦100,000</p>

          <div className="flex justify-between">
            <button
              className="py-2 text-[13px] px-4 border rounded hover:bg-gray-100"
              onClick={() => navigate(-1)} 
            >
              GO BACK
            </button>
            <button
              className="py-2 px-4 cursor-pointer text-[13px] bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleContinue}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default GameDetailsWithOutVote;
