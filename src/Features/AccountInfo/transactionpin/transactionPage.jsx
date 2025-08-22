import React, { useState } from "react";
import toast from 'react-hot-toast';
import { useRequest } from '../../../hooks/useRequest';
import { AuthContext } from '../../../context/authContext';

export default function TransactionPinScreen({ mode = "set" }) {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const { loading, makeRequest } = useRequest();

  const handleSubmit = async () => {
    if (mode === "change" && currentPin.length !== 4) {
      toast.error("Please enter your current 4-digit PIN.");
      return;
    }
    if (newPin.length !== 4) {
      toast.error("New PIN must be exactly 4 digits.");
      return;
    }
    if (newPin !== confirmPin) {
      toast.error("PIN confirmation does not match.");
      return;
    }

    const { error } = await makeRequest("/transaction-pin", {
      pin: newPin,
    });
  
      if(error){
        toast.error('Error', error)
        return;
      }

    toast.success("Transaction PIN changed successfully!");

    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    return;
  };

  const renderPinInput = (value, onChange, placeholder) => (
    <input
      type="password"
      placeholder={placeholder}
      maxLength={4}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-gray-50 border border-gray-300 rounded-xl py-3 px-5 text-lg text-center tracking-widest mb-4 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );

  return (
    <div className="flex min-h-screen bg-gray-100 justify-center items-center p-5">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {mode === "set" ? "Set Transaction PIN" : "Change Transaction PIN"}
        </h1>
        <p className="text-gray-600 text-center mb-6">
          {mode === "set"
            ? "Create a secure 4-digit PIN for your transactions."
            : "Update your 4-digit PIN to keep your account secure."}
        </p>

        {mode === "change" &&
          renderPinInput(currentPin, setCurrentPin, "Current PIN")}
        {renderPinInput(newPin, setNewPin, "New PIN")}
        {renderPinInput(confirmPin, setConfirmPin, "Confirm New PIN")}

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold shadow-md transition"
        >
          {loading ? "Saving..." : "Change PIN"}
        </button>
      </div>
    </div>
  );
}
