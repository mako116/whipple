import React from 'react';

 

export default function BankTransfer({ selectedBank, setSelectedBank, banks }) {
  const selected = banks.find((b) => b.id === selectedBank);

  return (
    <div className="space-y-6 bg-gray-100">
      <p className="mb-2 font-semibold text-gray-800">Select a Bank</p>

      <div className="flex flex-wrap gap-4">
        {banks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => setSelectedBank(bank.id)}
            className={`w-[44%] h-24 border rounded-lg overflow-hidden ${
              selectedBank === bank.id ? 'border-blue-700' : 'border-gray-300'
            }`}
          >
            <img src={bank.logo} alt={bank.name} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {selected && (
        <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
          <h3 className="font-bold mb-3 text-lg text-gray-800">{selected.name} Transfer Instructions</h3>

          <ol className="space-y-2 text-sm text-gray-700 leading-relaxed">
            <li>1. Open the {selected.name} mobile app and log in to your account.</li>
            <li>2. From the home screen, navigate to the "Pay Bills" section.</li>
            <li>3. Choose your preferred payment category.</li>
            <li>4. Select our app as both the "Biller" and the "Product".</li>
            <li>5. Enter the amount you wish to deposit.</li>
            <li>
              6. Provide your unique Client ID: <span className="font-bold text-black">{selected.customerId}</span>
            </li>
            <li className="mt-2">
              Once the payment is confirmed, the funds will be instantly credited to your Bet9ja wallet.
            </li>
          </ol>
        </div>
      )}
    </div>
  );
}
