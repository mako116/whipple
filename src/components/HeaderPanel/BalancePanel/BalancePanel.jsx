import { FiRefreshCw, FiEye, FiEyeOff } from "react-icons/fi";
import { useState, useContext } from "react";
import { AuthContext } from "../../../context/authContext";

export default function BalancePane() {
  const [balanceVisible, setBalanceVisible] = useState(true);
  const { userBalance } = useContext(AuthContext);

  return (
    <div className=" w-full items-center space-x-2 md:flex ">
      <span className="font-medium text-xs md:text-sm">
        {balanceVisible ? `NGN ${userBalance}` : "••••••••"}
      </span>
      <button
        className="cursor-pointer "
        onClick={() => setBalanceVisible(!balanceVisible)}
      >
        {balanceVisible ? (
          <FiEyeOff className="text-xs md:text-sm" />
        ) : (
          <FiEye className="text-xs md:text-sm" />
        )}
      </button>
    </div>
  );
}
