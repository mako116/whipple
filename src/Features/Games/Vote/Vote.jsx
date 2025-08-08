import React, { useContext, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
// import HeaderBet from "../../components/HeaderBet"; // Adjust import path to your setup
import { AuthContext } from "../../../context/authContext";
import { useRequest } from "../../../hooks/useRequest";

const PRIMARY_COLOR = "#1A4ED8"; // Deep Blue

const options = [
  { key: "one", label: "One Winner Takes All" },
  { key: "two", label: "Three Winners Share Rewards" },
  { key: "five", label: "Five Winners Share Rewards" },
];

export default function Vote() {
     const { userDetails } = useContext(AuthContext);

  const [value, setValue] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const {  gameLabel, range, selected, GameName } = userDetails || {};

    const {makeRequest, loading} = useRequest()
       const [searchParams] = useSearchParams();
 
const id = searchParams.get("id");
const name = searchParams.get("name");
const house = searchParams.get("house");
 const stake = Number(searchParams.get("stake"));
const odds = searchParams.get("odds");
 
console.log('GameName:', GameName); // ✅ now shows the correct value
console.table({
  id, name, house, GameName, stake, odds, gameLabel, range, selected
});

console.log("Vote screen — id:", id, "name:", name);


  const navigate = useNavigate();

  const handleSubmit = async() => {
    if (!value) {
      alert("Please select an option.");
      return;
    }

     const res = await makeRequest('/submit-vote')

    const normalizedGameName = name?.toLowerCase?.();
    setIsSubmitting(true);

    switch (normalizedGameName) {
      case "lucky number":
        navigate(`/choose-lucky-numbers?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name,house, gameLabel, GameName, range, selected },
        });
        break; 

      case "flip the coin":
        navigate(`/selected-coin-flip?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name,house, gameLabel, GameName, range, selected },
        });
        break;

      case "color roulette":
        navigate(`/choose-colorRoulette?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name, gameLabel, GameName, house, selected },
        });
        break;

      case "mystery box game":
        navigate(`/selected-mystery-box?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name,house, gameLabel, GameName, range, selected },
        });
        break;

      case "goal challenge":
        navigate(`/Selected-goal-challenge?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name,house, gameLabel, GameName, range, selected },
        });
        break;

      case "dice roll":
        navigate(`/selected-dice-roll?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name, gameLabel,house, GameName, range, selected },
        });
        break;

      case "wheel spin":
        navigate(`/selected-wheel-spin?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name,  GameName, },
        }); 
        break;

      case "spin the bottle":
        navigate(`/selected-spin-bottle?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name, gameLabel, GameName, range, selected },
        });
        break;

      case "one number spin":
        navigate(`/selected-one-number?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name, gameLabel, GameName, range, selected },
        });
        break; 

      case "color roulette2":
        navigate(`/selected-color-roulette2?id=${id}&name=${name}&house=${house}`, {
          state: { stake, odds, id,name, gameLabel, GameName, range, selected },
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
             {loading ? (
    <span className="flex justify-center items-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
           ></circle>
          <path
           className="opacity-75"
           fill="currentColor"
           d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
           ></path>
           </svg>
           <span>Publishing...</span>
           </span>
             ) : (
          "Submit Vote"
            )}
            
          </button>
        </div>
      </main>
    </>
  );
}
