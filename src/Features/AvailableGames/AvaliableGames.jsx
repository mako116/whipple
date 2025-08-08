import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterTabPanel from '../../components/FilterTab/FilterTab';
import { AuthContext } from '../../context/authContext';
import axiosClient from '../../utlis/Axios';

const AvailablePublishedGame = ({showFilter = true, limit}) => {
  const { userDetails } = useContext(AuthContext);
  const { stake, totalOdds, gameLabel, range, selected, GameName } = userDetails || {};
  const [games, setGames] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    const getAllGames = async () => {
      try {
        const res = await axiosClient.get("/get-all-games");
        setGames(res.data.games);
      } catch (error) {
        console.log(error);
      }
    };
    getAllGames();
  }, []);

  const normalizedGameName = (game) => game?.toLowerCase();


  const filteredGames = games?.filter((game) => {
    if (selectedTab !== "All") {
      return game.name.trim().toLowerCase() === selectedTab.trim().toLowerCase();
    }
    return true;
  });

      const displayedGames = limit ? filteredGames.slice(0, limit) : filteredGames;

  const handlePlayNow = (game) => {
  const gameName = normalizedGameName(game.name);

  const commonParams = {
    stake: stake,
    odds: game.odds,
    gameLabel,
    GameName,
    house: game.creator.name,
    result: gameLabel,
    id: game.id,
    name: game.name,
    subcategory: game.subcategory,
    range,
    selected,
  };

  if (
    gameName === "dice roll" ||
    gameName === "wheel spin" ||
    gameName === "mystery box game" ||
    gameName === "spin the bottle"
  ) {
    navigate({
      pathname: "/vote",
      search: new URLSearchParams({
      stake: game.stake.toString(),
        odds: game.odds,
        gameLabel,
        name: game.name,
        id: game.id,
        result: game.result,
        house: game.creator.name,
        subcategory: game.subcategory,
      }).toString(), 
    });
  } else if (gameName === "one number spin" || gameName === "color roulette2") {
    navigate({
      pathname: "/game-details-noVote",
      search: new URLSearchParams({
        stake: game.stake.toString(),
        odds: game.odds,
        gameLabel,
        name: game.name, 
        id: game.id,
        result: game.result,
        house: game.creator.name,
        subcategory: game.subcategory,
      }).toString(),
    });
  } else {
    // Default route: GameDetails
    navigate({
      pathname: "/game-details",
      search: new URLSearchParams({
        stake: game.stake.toString(),
        odds: game.odds,
        gameLabel,
        name: game.name,
        id: game.id,
        result: game.result,
        house: game.creator.name,
        subcategory: game.subcategory,
      }).toString(),
    });
  }
};


  return (
    <div className=" bg-[#EEF6FF]">
      {/* <Header name="Available Games" /> */}
      <div className="px-4 py-6">
        <div className="bg-white p-4 rounded-md shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">Game Rules</h2>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>Browse all available games to play and bet against The House</li>
            <li>Voting Rules:</li>
            <li>Voting rules depend on the specific game category.</li>
          </ul>
        </div>

        {showFilter && <FilterTabPanel onTabChange={setSelectedTab} />}

        <h3 className="text-lg font-semibold mt-6 mb-4">Recently Published Games</h3>

          <div className="md:flex flex-wrap">
          {displayedGames?.length > 0 ? (
          displayedGames.map((game) => {
            const gameName = normalizedGameName(game.name);
            return (
              <div
                key={game.id} 
               className="bg-white border border-gray-200 rounded-md shadow mb-6 mx-2 w-full md:w-[30%]"
              >
                <div className="flex items-center border-b border-gray-100 px-4 py-2">
                  <span className="text-lg mr-2">🔢</span>
                  <span className="font-semibold">{game.name}</span>
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <div>
                      <p className="text-xs">Stake</p>
                      <p className="text-base font-bold">₦{game.stake}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs">Odds</p>
                      <p className="text-base font-bold">{game.odds}</p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-800">
                    {game.name} - {game.subcategory}
                  </p>

                  <div className="flex justify-between text-xs text-gray-600">
                    <p>
                      <span className="font-medium text-gray-500">House:</span>{" "}
                      {game?.creator?.name}
                    </p>
                    <p>
                      <span className="font-medium text-gray-500">Status:</span> Open
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayNow(game)}
                    className="mt-2 w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
                  >
                    {["dice roll", "wheel spin"].includes(gameName)
                      ? "Vote Now"
                      : "Play Now"}
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 text-sm mt-4">
            No published game found.
          </p>
        )}
        </div>
      </div>
    </div>
  );
};

export default AvailablePublishedGame;
 