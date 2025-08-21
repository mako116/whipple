import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
 import FilterTabPanel from '../../components/FilterTab/FilterTab';
import axiosClient from '../../utlis/Axios';
// Example Header component (you can replace with your own)
const Header = ({ name, backgroundColor }) => (
  <div
    className="py-4 px-6 shadow-md"
    style={{ backgroundColor: backgroundColor || "#EEF6FF" }}
  >
    <h1 className="text-lg font-bold text-gray-800">{name}</h1>
  </div>
);

const LosersGames = () => {
  const navigate = useNavigate();
   

  const [selectedTab, setSelectedTab] = useState("All");
  const { userDetails } = useContext(AuthContext);
    const { stake, odds, gameLabel, range, selected, GameName, isGameLost } =
    userDetails || {};
  const [lostGames, setLostGames] = useState(null);

  const handlePlayNow = (name, id, odds, stake) => {
    const normalizedGameName = name?.toLowerCase?.();

    const params = {
      stake: stake?.toString(),
      odds,
      gameLabel,
      GameName,
      range,
      selected,
      id,
      name,
      losersGame: true,
    };

    switch (normalizedGameName) {
      case "lucky number":
      case "flip the coin":
      case "spin the bottle":
      case "color roulette":
      case "mystery box game":
      case "goal challenge":
      case "dice roll":
      case "wheel spin":
      case "one number spin":
      case "color roulette2":
        navigate("/vote", { state: params });
        break;

      default:
        console.warn(`[Navigation Error]: Unknown game "${name}" selected.`);
        alert("An error occurred: Unknown game selected. Please try again.");
    }
  };

  useEffect(() => {
    const getLostGames = async () => {
      if (userDetails) {
        const res = await axiosClient.get("/get-losers-game");
        setLostGames(res.data.games);
      }
    };
    getLostGames();
  }, [userDetails]);

  return (
    <div className="h-full w-full overflow-y-auto">
      <Header name="Loser's Game" backgroundColor="#EEF6FF" />

      <div className="p-6">
        {/* Rules Card */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-2">🎯 Losers' Game Rules</h2>
          <p className="text-gray-600 mb-4">
            Your second chance at games you previously lost.
          </p>

          <h3 className="font-semibold mb-2">Benefits:</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>1.5x your original stake</li>
            <li>1.2x better odds</li>
            <li>Same gameplay rules</li>
            <li>Fresh, randomly drawn numbers</li>
          </ul>
        </div>

        {/* Filter Tabs */}
        <FilterTabPanel onTabChange={setSelectedTab} />

        {/* Games List */}
        <div className="space-y-4 mt-4">
          {lostGames ? (
            lostGames.map((game) => (
              <div
                key={game.id}
                className="bg-white shadow-md rounded-xl p-4 flex flex-col"
              >
                {/* Card Header */}
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-2xl">🎲</span>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {game.name} - Lost Games
                  </h3>
                </div>

                {/* Card Body */}
                <div className="flex justify-between mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Stake</p>
                    <p className="font-bold text-gray-800">₦{game.stake}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Odds</p>
                    <p className="font-bold text-gray-800">{game.odds}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-3">{range}</p>

                <div className="flex justify-between text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-semibold">House:</span> @current-user
                  </p>
                  <p>
                    <span className="font-semibold">Status:</span> Open
                  </p>
                </div>

                <button
                  onClick={() =>
                    handlePlayNow(game.name, game.id, game.odds, game.stake)
                  }
                  className="bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition"
                >
                  Play Now
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 text-sm">
              No game is currently published.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LosersGames;
