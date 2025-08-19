import React, { useState } from "react";

export default function WithdrawScreen() {
  const [amount, setAmount] = useState("");
  const [bankAccount, setBankAccount] = useState("");
  const [otpMethod, setOtpMethod] = useState("sms");

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-4 text-white">
      {/* Header */}
      <h1 className="text-2xl font-bold mb-4">Withdraw</h1>

      {/* Steps */}
      <div className="bg-gray-800 p-3 rounded-lg mb-4">
        <p className="text-gray-400 mb-1">1) Enter the amount you wish to withdraw</p>
        <p className="text-gray-400 mb-1">2) Choose a registered bank account</p>
        <p className="text-gray-400">3) Verify with SMS or Email OTP</p>
      </div>

      {/* Form */}
      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <label className="block text-gray-200 mb-2">Amount</label>
        <input
          type="number"
          placeholder="₦1,000 min"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full bg-gray-900 text-white p-3 rounded-md mb-4 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <label className="block text-gray-200 mb-2">Bank Account</label>
        <select
          value={bankAccount}
          onChange={(e) => setBankAccount(e.target.value)}
          className="w-full bg-gray-900 text-white p-3 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Account</option>
          {/* Dynamically render registered accounts */}
          <option value="1234">Zenith - 1234</option>
        </select>
      </div>

      {/* OTP Selector */}
      <div className="flex space-x-2 mb-6">
        <button
          onClick={() => setOtpMethod("sms")}
          className={`flex-1 p-3 rounded-md ${
            otpMethod === "sms" ? "bg-green-500 text-black" : "bg-gray-800"
          }`}
        >
          SMS OTP
        </button>
        <button
          onClick={() => setOtpMethod("email")}
          className={`flex-1 p-3 rounded-md ${
            otpMethod === "email" ? "bg-green-500 text-black" : "bg-gray-800"
          }`}
        >
          Email OTP
        </button>
      </div>

      {/* Withdraw Button */}
      <button
        onClick={() => {
          // handle withdrawal logic
        }}
        className="bg-green-500 p-4 rounded-lg font-bold text-lg text-black hover:bg-green-600 transition"
      >
        Request Withdrawal
      </button>
    </div>
  );
}
