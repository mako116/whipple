import { FiRefreshCw, FiEye, FiEyeOff } from "react-icons/fi";
import { useState } from "react";

export default function BalancePane() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [balance] = useState(0);

  return (
    <div className=" w-full items-center space-x-2 md:flex hidden">
      <span className="font-medium">{balanceVisible ? `NGN ${balance}` : "••••"}</span>
      <button className="cursor-pointer " onClick={() => setBalanceVisible(!balanceVisible)}>
        {balanceVisible ? <FiEyeOff /> : <FiEye />}
      </button>
      <button className="cursor-pointer " onClick={() => {/* fetch and update balance */}}>
        <FiRefreshCw />
      </button>
    </div>
  );
}
