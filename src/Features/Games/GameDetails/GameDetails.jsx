import React, { useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
 
import { AuthContext } from '../../../context/authContext';

const GameDetails = () => {
  const navigate = useNavigate();
    const { userDetails } = useContext(AuthContext);

   const { gameLabel, range, selected, GameName } = userDetails|| {};
  const [searchParams] = useSearchParams();

  const name = searchParams.get('name');
  const stake = Number(searchParams.get('stake'));
  const odds = searchParams.get('odds');
  const house = searchParams.get('house');
  const subcategory = searchParams.get('subcategory');
  const id = searchParams.get('id');

  const normalizedGameName = name?.toLowerCase?.();

  const handleContinue = () => {
    const params = {
      stake: stake?.toString(),
      odds,
      gameLabel,
      GameName,
      range,
      selected,
      id,
      house,
      name,
    };

    switch (normalizedGameName) {
      case 'lucky number':
      case 'flip the coin':
      case 'spin the bottle':
      case 'color roulette':
      case 'mystery box game':
      case 'goal challenge':
      case 'dice roll':
      case 'wheel spin':
      case 'one number spin':
      case 'color roulette2':
        navigate(`/vote?${new URLSearchParams(params).toString()}`);
        break;
      default:
        console.warn(`[Navigation Error]: Unknown game "${name}" selected.`);
        alert('An error occurred: Unknown game selected. Please try again.');
    }
  };

  return (
    <>
       <div className="p-4 pb-10">
        <div className="mb-5">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-sm text-gray-600">
            {name} - {subcategory} (2 from 1-{range})
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow mb-5">
          <h2 className="text-lg font-semibold mb-2">Game Details</h2>
          <p className="text-sm text-gray-600 mb-3">House: @{house}</p>
          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">Stake</p>
              <p className="text-base font-bold">₦{stake}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Odds</p>
              <p className="text-base font-bold">{odds}</p>
            </div>
          </div>
          <p className="text-sm text-gray-500">Players</p>
          <p className="text-base font-bold mb-2">9 joined</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Place Your Bet</h2>
          <p className="text-sm text-gray-600 mb-3">Betting against The House</p>

          <div className="flex justify-between mb-4">
            <div>
              <p className="text-sm text-gray-500">House Stake</p>
              <p className="text-base font-bold">₦{stake}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Required Stake</p>
              <p className="text-base font-bold">₦{Math.floor(stake / 3)}</p>
            </div>
          </div>

          <p className="text-sm text-gray-500">Potential Win</p>
          <p className="text-base font-bold mb-3">₦{stake}</p>

          <p className="text-sm text-gray-500">Your Balance</p>
          <p className="text-base font-bold mb-5">₦100,000</p>

          <div className="flex justify-between mt-4">
            <button
              className="border border-gray-300 px-6 py-3 rounded font-semibold text-gray-700"
              onClick={() => navigate(-1)}
            >
              GO BACK
            </button>
            <button
              className="bg-blue-500 text-white px-6 py-3 rounded font-semibold"
              onClick={handleContinue}
            >
              CONTINUE
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetails;
