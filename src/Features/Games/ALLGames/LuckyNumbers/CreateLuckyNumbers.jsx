// ===================== CreateLuckyNumbers.jsx =====================
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/authContext';
import { useRequest } from '../../../../hooks/useRequest';
import toast from 'react-hot-toast';

const formatCurrency = value => {
  if (!value) return '';
  const num = parseInt(value.toString(), 10);
  return `₦${num.toLocaleString()}`;
};

export default function CreateLuckyNumbers() {
  const navigate = useNavigate();
  const { userDetails, setUserDetails } = useContext(AuthContext);
    const { loading, makeRequest, success, error, response } = useRequest();

  const { totalOdds, subcategory,gameLabel, range, GameName, selectionCount } = userDetails || {};

  const parsedRange = parseInt(range, 10);
  const parsedSelectionCount = parseInt(selectionCount, 10);
  const parsedTotalOdds = parseFloat(totalOdds);

  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [stakeAmount, setStakeAmount] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleNumberSelect = num => {
    setSelectedNumbers(prev =>
      prev.includes(num) ? prev.filter(n => n !== num) :
      prev.length < parsedSelectionCount ? [...prev, num] : prev
    );
  };

  const stake = parseInt(stakeAmount || '0', 10);
  const admissionFee = Math.round(stake * 0.25);
  const totalAmount = stake + admissionFee;

  const isPublishDisabled = (
    selectedNumbers.length !== parsedSelectionCount || isNaN(stake) || stake <= 0
  );

  const handlePublish = async () => {
  if (isPublishDisabled) {
    alert(`Select exactly ${parsedSelectionCount} number(s) and enter a valid stake.`);
    return;
  }

  try {
    const { error, response } = await makeRequest("/create-game", {
      name: 'Lucky Number',
      category: userDetails.category,
      subcategory: subcategory,
      result: selectedNumbers[0],
      odds: userDetails.totalOdds,
      stake: stakeAmount,
    });

    if (error) {
      toast.error(typeof error === 'string' ? error : 'Error creating game');
      return;
    }
    const gameId = response?.game?.id || response?.id;


    if (response) {
      toast.success('Game Created Successfully');
      // Update user details state here if needed
      setUserDetails({
        stake: totalAmount.toString(),
        odds: parsedTotalOdds + 'x',
        gameLabel,
        GameName,
        range,
        selected: selectedNumbers.join(','),
        selectionCount: parsedSelectionCount,
      });
      navigate('/available-games',{
        state:{
          id:gameId
        }
      });
    }
  } catch (err) {
    console.error(err);
    toast.error('An unexpected error occurred');
  }
};


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-blue-100">
      <header className="bg-blue-300 p-4">
        <h1 className="text-xl font-bold">{GameName}</h1>
      </header>

      <div className="p-2 space-y-6 m-auto md:w-[600px]">
        <div>
          <h2 className="text-2xl font-semibold mb-1">Select exactly {parsedSelectionCount}</h2>
          <p className="text-gray-700 mb-4">{gameLabel} (1–{parsedRange})</p>
          {selectedNumbers.length > 0 && (
            <p className="mb-2">Selectedsd: {selectedNumbers.join(', ')}</p>
          )}
          <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
            {Array.from({ length: parsedRange }).map((_, i) => {
              const num = i + 1;
              const isSel = selectedNumbers.includes(num);
              return (
                <button
                  key={num}
                  onClick={() => handleNumberSelect(num)}
                  className={`
                    p-2 border rounded text-[14px]
                    ${isSel ? 'bg-blue-600 text-white' : 'bg-white text-gray-800'}
                  `}
                >
                  {num}
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white p-4 rounded shadow-md">
          <h3 className="font-semibold mb-2">Set Stake Amount</h3>
          <input
            type="text"
            value={isInputFocused ? stakeAmount : formatCurrency(stakeAmount)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChange={e => {
              const raw = e.target.value.replace(/[\u20a6,]/g, '');
              if (!isNaN(Number(raw))) setStakeAmount(raw);
            }}
            placeholder="Enter total amount"
            className="w-full p-2 border rounded mb-4"
          />

          <div className="bg-gray-100 p-3 rounded">
            <div className="flex justify-between mb-1">
              <span>Stake Amount:</span>
              <span>{formatCurrency(stake)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Admission Fee (25%):</span>
              <span>{formatCurrency(admissionFee)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>{formatCurrency(totalAmount)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={handlePublish}
          disabled={isPublishDisabled}
          className={`
            w-full py-3 font-semibold text-white rounded
            ${isPublishDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}
          `}
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
    "Publish Game"
  )}
        </button>
      </div>
    </div>
  );
}
