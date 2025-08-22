import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { MdKeyboardArrowRight } from 'react-icons/md';
import { formatCurrency } from '../../../utlis/formatCurrency';
import axiosClient from "../../../utlis/Axios";
import toast from "react-hot-toast";
import Select from "react-select";
import { useRequest } from '../../../hooks/useRequest';

const presetAmounts = [100, 200, 500, 1000];

export default function WithdrawPage() {
  const [amount, setAmount] = useState('');
  const [pin, setPin] = useState('');
  const [isFocused, setIsFocused] = useState(false);
//   const navigate = useNavigate();
const [banks, setBanks] = useState([]);
const [selectedOption, setSelectedOption] = useState(null);
const { loading: loader, makeRequest } = useRequest();
const [loading, setLoading] = useState(false);

  const handleClear = () =>{
   setAmount('');
   setPin('');
  }

  const fetchBank = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/bank-list");
      const bankOptions = res.data.data.map((bank) => ({
        value: bank.bank_id, // Bank code
        label: bank.bank_name + " - " +bank.account_number, // Bank name
        name: bank.bank_name,
        code: bank.bank_id,
      }));
      setBanks(bankOptions);
    } catch (error) {
      toast.error("Error fetching bank list");
      console.error("Error fetching bank:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
      fetchBank();
    }, []);

  const handleWithdrawalRequest = async () => {
    if (!amount || parseFloat(amount) < 100) {
        toast.error("Please enter a valid amount (min. 100)");
        return;
    }
    if (!selectedOption) {
      toast.error("Please select a bank account");
      return;
    }

    try {
      const { error }  = await makeRequest("/withdraw/request", {   
        bank_id: selectedOption.code,
        amount: amount,
        pin: pin
      });
      if (error) {
        toast.error(error?.message);
        return;
      }
      toast.success("Withdrawal request sent successfully!");
    } catch (err) {
      console.log(err)
      toast.error("Unable to withdrawal request");
      return;
    }
  };

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

      <div
        className={`flex items-center justify-between border rounded-lg px-5 py-3 mb-6 transition-colors ${
          isFocused ? 'border-blue-600 shadow-md' : 'border-gray-300'
        }`}
      >
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="***"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="flex-1 text-lg font-montserratMeduim outline-none placeholder-gray-400"
          min="100"
        />
      </div>
      <div className="mb-8">
        <label className="block text-gray-600 text-sm font-medium mb-1 mt-4">
          Bank Name
        </label>
        <Select
          options={banks}
          value={selectedOption}
          onChange={setSelectedOption}
          placeholder="Search & Select Bank"
          isSearchable={true}
        />
      </div>

      <button onClick={() => handleWithdrawalRequest() }
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
