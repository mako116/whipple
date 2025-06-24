import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdKeyboardArrowRight } from 'react-icons/md';
import { formatCurrency } from '../../../utlis/formatCurrency';

const presetAmounts = [100, 200, 500, 1000];

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [isFocused, setIsFocused] = useState(false);
//   const navigate = useNavigate();

  const handleClear = () => setAmount('');

  return (
    <div className="max-w-md mx-auto mt-[30px] p-6 bg-white rounded-xl shadow-lg">
      <label className="mb-3 block text-gray-700 font-semibold text-lg font-montserratMeduim">
        Withdraw Amount (₦)
      </label>

      <div
        className={`flex items-center justify-between border rounded-lg px-5 py-3 mb-6 transition-colors ${
          isFocused ? 'border-blue-600 shadow-md' : 'border-gray-300'
        }`}
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Minimum 100"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-lg font-montserratMeduim outline-none placeholder-gray-400"
          min="100"
        />
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={handleClear}
          className="flex-1 min-w-[100px] bg-red-100 text-red-700 border border-red-300 rounded-lg py-2 font-semibold font-montserratMeduim hover:bg-red-200 transition"
        >
          Clear
        </button>

        {presetAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => {
              const current = parseInt(amount || '0', 10);
              const updated = current + amt;
              setAmount(String(updated));
            }}
            className="flex-1 min-w-[100px] bg-blue-100 text-blue-700 border border-blue-300 rounded-lg py-2 font-semibold font-montserratMeduim hover:bg-blue-200 transition"
          >
            + {amt}
          </button>
        ))}
      </div>

      <button
        className={`w-full rounded-lg py-4 mb-6 font-semibold text-white text-lg font-montserratMeduim transition ${
          !amount || parseInt(amount) < 100
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-700 hover:bg-blue-800 shadow-lg'
        }`}
        disabled={!amount || parseInt(amount) < 100}
      >
        {amount ? `Withdraw ${formatCurrency(amount)}` : 'Withdraw'}
      </button>

      {/* <button
        onClick={() => navigate('/withdraw/withdraw-history')}
        className="flex items-center justify-between w-full rounded-lg px-5 py-3 border border-gray-300 bg-gray-100 text-gray-700 font-semibold font-montserratMeduim hover:bg-gray-200 transition"
      >
        <span>Withdraw History</span>
        <MdKeyboardArrowRight size={24} />
      </button> */}
    </div>
  );
}
