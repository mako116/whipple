 import React, { useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import HeaderBet from "../../components/HeaderBet"; // Adjust import path to your setup
import { AuthContext } from "../../../context/authContext";
import { useRequest } from "../../../hooks/useRequest";

const PRIMARY_COLOR = "#1A4ED8";

export default function VoteColorRouletteScreen() {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

  const { makeRequest, loading } = useRequest();
  const { userDetails } = useContext(AuthContext);
  const { gameLabel, range, selected, GameName } = userDetails || {};

  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const losersGame = searchParams.get("losersGame");
  const stake = searchParams.get("stake");
  const odds = searchParams.get("odds");

  const navigate = useNavigate();

const options = [
  { key: "one", label: "One Winner Takes All", voteValue: 1 },
  { key: "two", label: "Three Winners Share Rewards", voteValue: 3 },
  { key: "five", label: "Five Winners Share Rewards", voteValue: 5 },
];


  const handleSubmit = async () => {
    if (!value) {
      alert("Please select an option.");
      return;
    }

    const normalizedGameName = name?.toLowerCase?.();

    const selectedOption = options.find((o) => o.key === value);

    if (losersGame) {
      await makeRequest("/submit-vote", { gameId: id, vote: selectedOption.key });

      navigate(`/choose-lucky-numbers?id=${gameId}&name=${name}&losersGame=${losersGame}`, {
        state: { stake, odds, gameLabel, GameName, range, selected, id, name, losersGame: true },
      });
      return;
    }

await makeRequest("/submit-vote", { gameId: id, vote: selectedOption.key });

    switch (normalizedGameName) {
      case "lucky number":
        navigate(`/choose-lucky-numbers?id=${id}&name=${name} `, {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "flip the coin":
        navigate("/games/availablegames/CoinFLip/confirmFlipCoin", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "color roulette":
        navigate("/games/category/becomethehouse/colorRoulette/selectedColor", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "mystery box game":
        navigate("/games/category/becomethehouse/mysteryGame/mysterySelect", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "goal challenge":
        navigate("/games/category/becomethehouse/goal/selectedGoal", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "dice roll":
        navigate("/games/category/becomethehouse/DiceRoll/selectedDice", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "wheel spin":
        navigate("/games/category/becomethehouse/spinwheel/selectedSpin", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "spin the bottle":
        navigate("/games/category/becomethehouse/spindabottle/selectedSpins", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "one number spin":
        navigate("/games/category/becomethehouse/one-number-spin/number-spin-selected", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      case "color roulette2":
        navigate("/games/category/becomethehouse/colorRoulette2/selectedColor2", {
          state: { stake, odds, gameLabel, GameName, range, selected, id, name },
        });
        break;

      default:
        console.warn(`[Navigation Error]: Unknown game "${GameName}" selected.`);
        alert("An error occurred: Unknown game selected. Please try again.");
    }
  };

  const handleCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setValue("");
      setIsCancelling(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
 
      <div className="max-w-xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Vote on Winning Distribution</h1>
        <h2 className="text-xl font-semibold text-center text-gray-700">Make Your Choice</h2>
        <p className="text-gray-600 text-center">
          Choose how the winners should be rewarded. Select between one, two, or three winners to
          receive the prize.
        </p>

        <div className="space-y-3">
          {options.map((item) => (
            <button
              key={item.key}
              className={`w-full flex items-center p-3 rounded-lg border
                ${value === item.key ? "bg-blue-500 text-white border-blue-500" : "bg-white border-gray-300"}
                focus:outline-none`}
              onClick={() => setValue(item.key)}
            >
              <div
                className={`w-5 h-5 rounded-full mr-3 border flex-shrink-0
                  ${value === item.key ? "bg-white border-white" : "border-gray-400"}`}
              />
              <span>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className="flex-1 py-2 px-4 border rounded-lg text-blue-700 font-semibold flex justify-center items-center"
          >
            {isCancelling ? <span className="loader border-t-2 border-b-2 border-blue-700 w-4 h-4 rounded-full animate-spin" /> : "Cancel"}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg flex justify-center items-center"
          >
            {loading ? <span className="loader border-t-2 border-b-2 border-white w-4 h-4 rounded-full animate-spin" /> : "Submit Vote"}
          </button>
        </div>
      </div>
    </div>
  );
}
