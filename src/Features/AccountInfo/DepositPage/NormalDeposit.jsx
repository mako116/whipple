import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { formatCurrency } from '../../../utlis/formatCurrency';
// import { formatCurrency } from '../../utlils';
import { usePaystackPayment } from 'react-paystack';
import { useRequest } from '../../../hooks/useRequest';
import { AuthContext } from '../../../context/authContext';
import toast from 'react-hot-toast';


const presetAmounts = [100, 200, 500, 1000];

export default function NormalDeposit({ amount, setAmount }) {

  const { loading, makeRequest } = useRequest();
  const { userDetails, setUserBalance } = useContext(AuthContext);
  const [isFocused, setIsFocused] = useState(false);
  const [paymentRef, setPaymentRef] = useState((new Date()).getTime().toString());
  const navigate = useNavigate();

  const handleClear = () => setAmount('');

  const handlePayment = async () => {
    if (!amount || parseFloat(amount) < 100) {
      toast.error('Please enter a valid amount (min. 100)');
      return;
    }
    try {
      const { error, response }  = await makeRequest("/deposit/initialize", {   
        amount: parseFloat(amount), // Paystack expects amount in kobo
        reference: "",
        gateway: "paystack",
        meta: "",
        ref: paymentRef
      }
      );  
      if (error) {
        toast.error(error);
        return;
      }
      setPaymentRef(response?.data?.ref)
    } catch (error) {
      toast.error(error);
      return;
    } 
  };  

 const config = {
      reference: paymentRef,
      email: userDetails?.email,
      amount: amount * 100, //Amount is in the country's lowest currency.
      publicKey: "pk_live_dbd3a64ec324e53eeedf20e282446b860dafaa94",
      channels: ["card", "bank", "ussd", "mobile_money", "bank_transfer"]
  };
  
  // you can call this function anything
  const onSuccess = async (res) => {
    // Implementation for whatever you want to do with reference and after success call.
    try {
      const { error, response }  = await makeRequest("/deposit/verified", {   
        ref: paymentRef,
        reference: res?.trans || res?.transaction,
        meta: res
      });
      if (error) {
        toast.error("Error verifying payment");
        return;
      }
      setUserBalance(response?.data)
      toast.success('Payment Verified!');
      return;
    } catch (err) {
      console.log(err)
      toast.error("Unable to verify payment");
      return;
    }
  };

  // you can call this function anything
  const onClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    toast.error("This deposit was cancel.");
    return;
  }

  const PaystackHookButton = () => {
      const initializePayment = usePaystackPayment(config);
      return (
        <div>
          <button onClick={() => {
              handlePayment()
              initializePayment({onSuccess, onClose})
            }}
            className="bg-gray-900 text-white rounded-xl py-5 w-full mb-4 font-bold font-montserratMeduim cursor-pointer"
            disabled={!amount || parseInt(amount) < 100}
          >
            {loading ? "Processing..." : `Deposit ${formatCurrency(amount)}`}
          </button>
        </div>
      );
  };

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

      <PaystackHookButton />

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
