import React, { useState } from 'react';
 import { FaStar } from 'react-icons/fa';
import BankTransfer from '../BankTrsf/BankTransfer';
import NormalDeposit from './NormalDeposit';
import { Banknote } from 'lucide-react';
import access from '../../../assets/images/access-bank-plc-logo-png_seeklogo-492413.png'
import FirstBnk from '../../../assets/images/first-bank.png'

const banks = [
  { id: '1', name: 'Access Bank', logo: access, customerId: '1234567890' },
  { id: '2', name: 'FirstBank', logo:FirstBnk, customerId: '9876543210' },
];

export default function DepositPage() {
  const [activeTab, setActiveTab] = useState('normal');
  const [amount, setAmount] = useState('');
  const [selectedBank, setSelectedBank] = useState(null);

  return (
    <>
 
      <div className="p-5 mt-[20px] max-w-3xl mx-auto bg-gray-100">
        <div className="flex mb-5  rounded-lg">
          <button
            onClick={() => setActiveTab('normal')}
            className={`flex-1 py-5 mx-1 rounded-lg flex flex-col items-center ${
              activeTab === 'normal'
                ? 'bg-blue-200 border border-blue-600'
                : 'bg-gray-300'
            }`}
          >
            <div className="flex gap-1 mb-1 text-black">
              <FaStar size={24} />
              <FaStar size={24} />
              <FaStar size={24} />
            </div>
            <span
              className={`${
                activeTab === 'normal' ? 'text-gray-900 font-bold' : 'text-gray-600'
              } font-sans`}
            >
              Popular
            </span>
          </button>

          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 py-5 mx-1 rounded-lg flex flex-col items-center ${
              activeTab === 'bank'
                ? 'bg-blue-200 border border-blue-600'
                : 'bg-gray-300'
            }`}
          >
            <Banknote  size={24} className="mb-1 text-black" />
            <span
              className={`${
                activeTab === 'bank' ? 'text-gray-900 font-bold' : 'text-gray-600'
              } font-sans`}
            >
              Bank Transfer
            </span>
          </button>
        </div>

        {activeTab === 'normal' ? (
          <NormalDeposit amount={amount} setAmount={setAmount} />
        ) : (
          <BankTransfer selectedBank={selectedBank} setSelectedBank={setSelectedBank} banks={banks} />
        )}
      </div>
    </>
  );
}
