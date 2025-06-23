import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// import HeaderBet from "../../components/HeaderBet"; // Adjust import path to your setup
import { AuthContext } from "../../../context/authContext";

const PRIMARY_COLOR = "#1A4ED8"; // Deep Blue

const options = [
  { key: "one", label: "One Winner Takes All" },
  { key: "two", label: "Three Winners Share Rewards" },
  { key: "five", label: "Five Winners Share Rewards" },
];

export default function Vote() {
  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);

     const { userDetails } = useContext(AuthContext);
   
  const { stake, odds, gameLabel, range, selected, GameName } = userDetails || {};

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!value) {
      alert("Please select an option.");
      return;
    }

    const normalizedGameName = GameName?.toLowerCase?.();
    setIsSubmitting(true);

    switch (normalizedGameName) {
      case "lucky number":
        navigate("/choose-lucky-numbers", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "flip the coin":
        navigate("/Selected-coin-flip", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "color roulette":
        navigate("/choose-colorRoulette", {
          state: { stake, odds, gameLabel, GameName,  selected },
        });
        break;

      case "mystery box":
        navigate("/selected-mystery-box", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "goal challenge":
        navigate("/Selected-goal-challenge", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "dice roll":
        navigate("/selected-dice-roll", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "wheel spin":
        navigate("/selected-wheel-spin", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "spin the bottle":
        navigate("/selected-spin-bottle", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "one number spin":
        navigate("/selected-one-number", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

      case "color roulette2":
        navigate("/selected-color-roulette2", {
          state: { stake, odds, gameLabel, GameName, range, selected },
        });
        break;

        
      default:
        console.warn(`[Navigation Error]: Unknown game "${GameName}" selected.`);
        alert("An error occurred: Unknown game selected. Please try again.");
        setIsSubmitting(false);
        return (
          console.log('userDetails:', userDetails),
          console.log('GameName:', GameName)

        );
        
    }

    setIsSubmitting(false);
  };

  const handleCancel = () => {
    setIsCancelling(true);
    setTimeout(() => {
      setValue("");
      setIsCancelling(false);
    }, 1000);
  };

  return (
    <>
      {/* <HeaderBet arrow amount="200" backgroundColor="#E0EBFF" /> */}
      <main className="max-w-xl mx-auto p-4 mt-6 space-y-3 bg-white rounded-[10px]">
        <h1 className="text-[18px] font-semibold text-gray-900">Vote on Winning Distribution</h1>
        <p className="text-[13px] text-gray-700">Make Your Choice</p>
        <p className="text-gray-600 text-[13px]">
          Choose how the winners should be rewarded. Select between one, two, or three winners to receive the prize.
        </p>

        <div className="space-y-4">
          {options.map((item) => (
            <label
              key={item.key}
              className={`flex items-center p-4 border rounded cursor-pointer
                ${
                  value === item.key
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
            >
              <input
                type="radio"
                name="winnerDistribution"
                value={item.key}
                checked={value === item.key}
                onChange={() => setValue(item.key)}
                className="mr-4"
              />
              <span className="text-gray-900">{item.label}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-between space-x-4">
          <button
            onClick={handleCancel}
            disabled={isCancelling}
            className={`flex-1 py-3 rounded cursor-pointer border-2 border-blue-700 font-semibold
              ${isCancelling ? "text-blue-500 cursor-not-allowed" : "text-blue-700 hover:bg-blue-100"}`}
          >
            {isCancelling ? (
              <span className="inline-block animate-spin border-4 border-blue-600 border-t-transparent rounded-full w-5 h-5 mx-auto"></span>
            ) : (
              "Cancel"
            )}
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex-1 py-3 cursor-pointer rounded bg-blue-700 text-white font-semibold
              ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-800"}`}
          >
            {isSubmitting ? (
              <span className="inline-block animate-spin border-4 border-white border-t-transparent rounded-full w-5 h-5 mx-auto"></span>
            ) : (
              "Submit Vote"
            )}
          </button>
        </div>
      </main>
    </>
  );
}
