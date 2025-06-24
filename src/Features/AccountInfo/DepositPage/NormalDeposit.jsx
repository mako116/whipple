import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { formatCurrency } from '../../../utlis/formatCurrency';
// import { formatCurrency } from '../../utlils';

const presetAmounts = [100, 200, 500, 1000];

export default function NormalDeposit({ amount, setAmount }) {
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();

  const handleClear = () => setAmount('');

  return (
    <div>
      <label className="mb-2 font-semibold font-montserratMeduim block">Deposit Amount(₦)</label>
      <div
        className={`flex items-center justify-between border rounded-xl px-4 py-3 mb-4 ${
          isFocused ? 'border-blue-600' : 'border-gray-300'
        }`}
      >
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Min. 100"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-base font-montserratMeduim outline-none"
        />
      </div>

      <div className="flex justify-between mb-5 gap-2 flex-wrap">
        <button
          onClick={handleClear}
          className="bg-blue-200 border border-blue-200 rounded-lg py-2 px-4 font-bold font-montserratMeduim"
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
            className="bg-blue-200 border border-blue-200 rounded-lg py-2 px-4 font-bold font-montserratMeduim"
          >
            + {amt}
          </button>
        ))}
      </div>

      <button
        className="bg-gray-900 text-white rounded-xl py-5 w-full mb-4 font-bold font-montserratMeduim"
        disabled={!amount || parseInt(amount) < 100}
      >
        {amount ? `Deposit ${formatCurrency(amount)}` : 'Deposit'}
      </button>

      <button
        onClick={() => navigate('/deposit/deposit-history')}
        className="flex items-center justify-between bg-gray-300 border border-gray-300 rounded-lg px-4 py-3 w-full font-bold font-montserratMeduim"
      >
        <span>Deposit History</span>
        <MdKeyboardArrowRight size={24} color="#212121" />
      </button>
    </div>
  );
}
