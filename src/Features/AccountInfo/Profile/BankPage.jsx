import React, { useState, useEffect } from "react";
import axiosClient from "../../../utlis/Axios";
import toast from "react-hot-toast";
import Select from "react-select";
import { useRequest } from '../../../hooks/useRequest';

export default function BankInfoScreen() {
  const [accountNumber, setAccountNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [banks, setBanks] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const { loading: loader, makeRequest } = useRequest();

  // Fetch banks from Laravel API
  const fetchBank = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/paystack/getbank");
      const bankOptions = res.data.banks.map((bank) => ({
        value: bank.code, // Bank code
        label: bank.name, // Bank name
        name: bank.name,
        code: bank.code,
      }));
      setBanks(bankOptions);
    } catch (error) {
      toast.error("Error fetching bank list");
      console.error("Error fetching bank:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch banks from Laravel API
  const fetchBankList = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/bank-list");
      setBankAccounts(res.data.data ?? []);
    } catch (error) {
      toast.error("Error fetching Account list");
      console.error("Error fetching account:", error);
    } finally {
      setLoading(false);
    }
  };

  

  useEffect(() => {
    fetchBank();
    fetchBankList();
  }, []);

  // Add new bank account to saved list
  const handleAddBankAccount = async () => {
    if (selectedOption && accountNumber) {
      try {
        const { error }  = await makeRequest("/bank-save", {   
          bank_name: selectedOption.name,
          bank_code: selectedOption.code,
          account_number: accountNumber,
        });
        if (error) {
          console.error(error);
          toast.error("Error saving bank account");
          return;
        }
        fetchBankList()
        toast.success("Bank Saved!");
        setSelectedOption()
        setAccountNumber()
        return;
      } catch (err) {
        console.error(err);
        toast.error("Unable to resolve bank account");
        return;
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🏦 Bank Information</h1>

      {/* Saved Bank Accounts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Bank Accounts</h2>
        {bankAccounts.length === 0 ? (
          <p className="text-gray-500">No saved bank accounts yet.</p>
        ) : (
          bankAccounts.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-300 p-4 rounded-lg mb-4 shadow-sm"
            >
              <p className="font-semibold text-gray-900">{item.bank_name}</p>
              <p className="text-gray-500 mt-1">Acct No: {item.account_number}</p>
            </div>
          ))
        )}
      </div>

      {/* Add New Bank */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Bank</h2>

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

        <label className="block text-gray-600 text-sm font-medium mb-1 mt-4">
          Account Number
        </label>
        <input
          type="text"
          placeholder="e.g. 1234567890"
          maxLength={10}
          className="w-full border border-gray-300 rounded px-4 py-3 mb-3 text-gray-900"
          value={accountNumber}
          onChange={(e) => setAccountNumber(e.target.value)}
        />

        <button
          className="w-full bg-indigo-700 text-white py-3 rounded mt-4 shadow hover:bg-indigo-800"
          onClick={handleAddBankAccount}
          disabled={loading}
        >
          {loader ? "Saving..." : "+ Add Bank Account"}
        </button>
      </div>
    </div>
  );
}
