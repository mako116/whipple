import React, { useState, useEffect } from "react";
import { FaPiggyBank } from "react-icons/fa";       // FontAwesome
import { IoTrendingDown } from "react-icons/io5";   // Ionicons
import { MdPayments } from "react-icons/md";        // Material Icons
import { formatCurrency } from "../../../utlis/FormatAmount";
import { formatDate } from "../../../utlis/formatDate";
import axiosClient from "../../../utlis/Axios";

const TABS = [
  { label: "All", key: "all" },
  { label: "Deposits", key: "deposit" },
  { label: "Stakes", key: "game" },
  { label: "Payouts", key: "withdrawal" },
];

export default function TransactionsHistory() {
  const [activeTab, setActiveTab] = useState("all");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example API fetch (uncomment if needed)
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get("/transaction-list");
      setTransactions(res.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const getFilteredTransactions = () => {
    if (activeTab === "all") return transactions;
    return transactions.filter(
      (t) => t.type && t.type.toLowerCase() === activeTab.toLowerCase()
    );
  };

  const iconMap = {
    deposit: <FaPiggyBank className="text-green-500 text-lg" />,
    game: <IoTrendingDown className="text-orange-500 text-lg" />,
    withdrawal: <MdPayments className="text-blue-500 text-lg" />,
  };

  const renderTransaction = (item) => (
    <div className="bg-white p-4 rounded-xl mb-3 shadow-md">
      <div className="flex items-center">
        {iconMap[item.type?.toLowerCase()]}
        <div className="ml-3">
          <p
            className={`text-lg font-semibold ${
              item.type?.toLowerCase() === "deposit"
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {item.type?.toLowerCase() === "deposit" ? "+" : "-"}{" "}
            {formatCurrency(item.amount)}
          </p>
          <p className="text-sm text-slate-600 mt-1 capitalize">{item.type}</p>
        </div>
      </div>
      <p className="text-xs text-slate-400 mt-3">
        {formatDate(item.created_at)}
      </p>
    </div>
  );

  return (
    <div className="bg-slate-50 p-4">
      {/* Tabs */}
      <div className="flex bg-slate-200 rounded-full p-1 mb-5">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab.key
                ? "bg-blue-500 text-white"
                : "text-slate-600 hover:bg-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Transactions */}
      {loading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin border-4 border-blue-500 border-t-transparent rounded-full w-8 h-8"></div>
        </div>
      ) : getFilteredTransactions().length > 0 ? (
        <div className="pb-40">
          {getFilteredTransactions().map((item) => (
            <div key={item.id}>{renderTransaction(item)}</div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-10 text-slate-400">
          No Transactions found.
        </p>
      )}
    </div>
  );
}
