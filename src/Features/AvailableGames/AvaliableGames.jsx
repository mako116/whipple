import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterTabPanel from '../../components/FilterTab/FilterTab';
import { AuthContext } from '../../context/authContext';

export default function AvailablePublishedGame({ showFilter = true,  minHeight = 'min-h-screen',overflow = 'overflow-hidden'}) { 
  const { userDetails } = useContext(AuthContext);
  const { stake, odds, gameLabel, range, GameName } = userDetails || {};
  const normalized = GameName?.toLowerCase();

  const [selectedTab, setSelectedTab] = useState('All');
  const isAvailable = Boolean(stake && GameName && odds);
  const isGameVisible =
    selectedTab === 'All' ||
    (GameName && GameName.toLowerCase().includes(selectedTab.toLowerCase()));

  const navigate = useNavigate();
  const handlePlayNow = () => {
    const search = new URLSearchParams({
      stake,
      odds,
      gameLabel,
      GameName,
      range,
      result: gameLabel,
    }).toString();

    let path;
    if (['dice roll', 'wheel spin', 'mystery box', 'spin the bottle'].includes(normalized)) {
      path = '/vote';
    } else if (['one number spin', 'color roulette2'].includes(normalized)) {
      path = '/game-details-noVote';
    } else {
      path = '/game-details';
    }

    navigate(`${path}?${search}`);
  };

  if (!isAvailable) {
    return (
      <div className="flex flex-col items-center min-h-[200px] justify-center  px-4">
        <h1 className="text-3xl font-semibold">Available Games</h1>
        <p className="text-gray-500 mt-4">No game is currently published.</p>
      </div>
    );
  }

  return (
    <div className={`${minHeight} ${overflow} bg-gray-100 p-6`}>
      {showFilter && (
        <>
          <h1 className="text-3xl font-semibold mb-4">Available Games</h1>

          <div className="space-y-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-lg font-bold mb-2">Game Rules</h2>
              <p className="text-gray-700">Browse all available games to bet against The House.</p>
              <p className="text-gray-700">Voting rules depend on the specific game category.</p>
            </div>

            <FilterTabPanel selectedTab={selectedTab} onTabChange={setSelectedTab} />

            <h2 className="text-xl font-semibold mt-6">Recently Published Games</h2>
          </div>
        </>
      )}

      {(!showFilter || isGameVisible) ? (
        <div className='flex gap-2 '>
          <div className="bg-white w-full md:w-[350px] rounded-lg shadow border ">
            <div className="flex items-center p-4 border-b">
              <span className="text-2xl mr-3">🎲</span>
              <h3 className="text-xl font-semibold">{GameName}</h3>
            </div>

            <div className="p-4 space-y-4">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-600">Stake</p>
                  <p className="font-bold">₦{stake}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Odds</p>
                  <p className="font-bold">{odds}</p>
                </div>
              </div>

              <p className="text-gray-800">{`${GameName} — ${gameLabel}`}</p>

              <div className="flex justify-between text-gray-600 text-sm">
                <span><strong>House:</strong> @current-user</span>
                <span><strong>Status:</strong> Open</span>
              </div>

              <button
                className="w-full py-2 cursor-pointer bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                onClick={handlePlayNow}
              >
                {['dice roll', 'wheel spin'].includes(normalized) ? 'Vote Now' : 'Play Now'}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">No published game found.</p>
      )}
    </div>
  );
}
