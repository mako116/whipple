import React, { useState } from 'react';

export default function BankInfoScreen() {
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [bankAccounts, setBankAccounts] = useState([
    { id: '1', bankName: 'GTBank', accountNumber: '1234567890' },
    { id: '2', bankName: 'Access Bank', accountNumber: '0987654321' },
  ]);

  const handleAddBankAccount = () => {
    if (bankName && accountNumber) {
      const newAccount = {
        id: Date.now().toString(),
        bankName,
        accountNumber,
      };
      setBankAccounts([...bankAccounts, newAccount]);
      setBankName('');
      setAccountNumber('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-5 overflow-y-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🏦 Bank Information</h1>

      {/* Saved Bank Accounts */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Saved Bank Accounts</h2>
        {bankAccounts.map((item) => (
          <div
            key={item.id}
            className="bg-white border border-gray-300 p-4 rounded-lg mb-4 shadow-sm"
          >
            <p className="font-semibold text-gray-900">{item.bankName}</p>
            <p className="text-gray-500 mt-1">{item.accountNumber}</p>
          </div>
        ))}
      </div>

      {/* Add New Bank */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add New Bank</h2>

        <label className="block text-gray-600 text-sm font-medium mb-1 mt-4">Bank Name</label>
        <input
          type="text"
          placeholder="e.g. Zenith Bank"
          className="w-full border border-gray-300 rounded px-4 py-3 mb-3 text-gray-900"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
        />

        <label className="block text-gray-600 text-sm font-medium mb-1 mt-4">Account Number</label>
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
        >
          + Add Bank Account
        </button>
      </div>
    </div>
  );
}
