import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/authContext';
import FilterTabPanel from '../../components/FilterTab/FilterTab';
import axiosClient from '../../utlis/Axios';

const LosersGames = ({ showFilter = true,showFilterTop= true, limit }) => {
  const navigate = useNavigate();
  const { userDetails } = useContext(AuthContext);
  const { stake, odds, gameLabel, range, selected, GameName ,isGameLost} = userDetails || {};
  const [lostGames, setLostGames] = useState([]);
  const [selectedTab, setSelectedTab] = useState('All');
   const isLostAvailable = stake && isGameLost;
 
useEffect(()=>{
    const getLostGames =async()=>{

      if(userDetails){
 const res = await axiosClient.get("/get-losers-game");
setLostGames(res.data.games);

            

      }
     
      

    }
    getLostGames();
  }, [])
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Navigate to Vote page
  const handlePlayNow = (name, id, odds, stake) => {
    if (!name) {
      alert('Unknown game selected');
      return;
    }

    navigate('/vote', {
      state: {
        stake: stake?.toString(),
        odds,
        gameLabel,
        GameName,
        range,
        selected,
        id,
        name,
        losersGame: true,
      },
    });
  };

  // Filtering logic
  const filteredGames = lostGames.filter((game) => {
    if (selectedTab !== "All") {
      return game.name.trim().toLowerCase() === selectedTab.trim().toLowerCase();
    }
    return true;
  });

  // Apply optional limit
  const displayedGames = limit ? filteredGames.slice(0, limit) : filteredGames;

  return (
    <div className={` bg-gray-100 p-4`}>
       {showFilterTop &&<>
      {/* Rules Card */}
      <div className="bg-white mb-5 rounded-xl border border-gray-300 p-4 w-[90%] mx-auto">
        <p className="text-lg font-bold mb-1 text-black">🎯 Losers' Game Rules</p>
        <p className="text-sm text-gray-600 mb-3 font-normal">
          Your second chance at games you previously lost.
        </p>

        <p className="text-sm font-semibold mb-2">Benefits:</p>
        <p className="mb-1 pl-2">• 1.5x your original stake</p>
        <p className="mb-1 pl-2">• 1.2x better odds</p>
        <p className="mb-1 pl-2">• Same gameplay rules</p>
        <p className="mb-1 pl-2">• Fresh, randomly drawn numbers</p>
      </div>
      </>
      }

      {/* Filter Tabs */}
      {showFilter && <FilterTabPanel onTabChange={setSelectedTab} />}

      {/* Game Cards */}
      <div className="flex flex-wrap gap-3 py-2 overflow-y-auto">
        {displayedGames?.length > 0 ? (
          displayedGames.map((game) => (
            <div className="flex gap-2 mb-4" key={game.id}>
              <div className="bg-white md:w-[350px] rounded-lg shadow border">
                <div className="flex items-center p-4 border-b border-gray-100 bg-gray-100 rounded-t-xl">
                  <span className="text-base mr-2">🎲</span>
                  <p className="text-base font-semibold">{game.name} - Lost Game</p>
                </div>

                <div className="p-4">
                  <div className="flex justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-600 font-normal">Stake</p>
                      <p className="text-base font-bold text-gray-900">₦{game.stake || stake}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-600 font-normal">Odds</p>
                      <p className="text-base font-bold text-gray-900">{game.odds || odds}</p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-700 my-2 font-normal">
                    {game.name} - {gameLabel} {range}
                  </p>

                  <div className="flex justify-between mb-4">
                    <p className="text-xs text-gray-700 font-normal">
                      <span className="font-medium text-gray-500">House:</span> @current-user
                    </p>
                    <p className="text-xs text-gray-700 font-normal">
                      <span className="font-medium text-gray-500">Status:</span> {game.status || 'Open'}
                    </p>
                  </div>

                  <button
                    className="mt-4 cursor-pointer bg-blue-600 py-3 rounded-lg w-full text-white font-semibold hover:bg-blue-700 transition"
                    onClick={() => handlePlayNow(game.name, game.id, game.odds, game.stake)}
                  >
                    Play Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-base text-center px-5 font-medium">
            No game is currently published.
          </p>
        )}
      </div>
    </div>
  );
};

export default LosersGames;
