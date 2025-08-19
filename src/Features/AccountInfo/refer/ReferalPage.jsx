import React, { useState, useMemo, useCallback } from "react";

export default function ReferralListScreen({ referrals: initialReferrals = [], onRefresh }) {
  // Example data fallback
  const example = [
    { id: "1", name: "Ada Lovelace", email: "ada@example.com" },
    { id: "2", name: "Alan Turing", email: "alan@example.com" },
    { id: "3", name: "Grace Hopper", email: "grace@example.com" },
    { id: "4", name: "Katherine Johnson", email: "katherine@example.com" },
    { id: "5", name: "Margaret Hamilton", email: "margaret@example.com" },
    { id: "6", name: "Linus Torvalds", email: "linus@example.com" },
    { id: "7", name: "Dennis Ritchie", email: "dennis@example.com" },
    { id: "8", name: "Tim Berners-Lee", email: "tim@example.com" },
    { id: "9", name: "Guido van Rossum", email: "guido@example.com" },
    { id: "10", name: "James Gosling", email: "james@example.com" },
  ];

  const [query, setQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 5;

  const referrals = initialReferrals.length ? initialReferrals : example;

  // Filtered list
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return referrals;
    return referrals.filter(
      (r) =>
        (r.name && r.name.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q))
    );
  }, [referrals, query]);

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleRefresh = useCallback(async () => {
    if (!onRefresh) return;
    try {
      setRefreshing(true);
      await onRefresh();
    } finally {
      setRefreshing(false);
    }
  }, [onRefresh]);

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleShare = async (name, email) => {
    const message = `Referral: ${name} — ${email}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: `Referral: ${name}`, text: message });
      } catch {
        // ignore
      }
    } else {
      alert(message);
    }
  };

  const renderAvatar = (name) => {
    const initials = (name || "U")
      .split(" ")
      .map((p) => p[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center mr-3">
        <span className="text-lg font-bold text-blue-700">{initials}</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white flex items-center justify-between border-b border-gray-200 px-5 py-4">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Referrals</h1>
          <p className="text-sm text-gray-500 mt-1">
            Total referred — {referrals.length}
          </p>
        </div>
        <button
          onClick={() => (window.location.href = "/view-points")}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          View Referral Points
        </button>
      </header>

      {/* Search bar */}
      <div className="px-5 py-3">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setCurrentPage(1); // reset page on search
          }}
          placeholder="Search by name or email"
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-5 py-2">
        {currentData.length > 0 ? (
          <ul className="space-y-3">
            {currentData.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm"
              >
                <div className="flex items-center flex-1 mr-3">
                  {renderAvatar(item.name)}
                  <div className="flex flex-col truncate">
                    <span className="text-base font-semibold text-gray-900 truncate">
                      {item.name || "No name"}
                    </span>
                    <span className="text-sm text-gray-500 truncate">
                      {item.email || "No email"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEmail(item.email)}
                    className="px-3 py-2 text-xs font-semibold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50"
                  >
                    Email
                  </button>
                  <button
                    onClick={() => handleShare(item.name, item.email)}
                    className="px-3 py-2 text-xs font-semibold text-gray-800 border border-gray-200 bg-blue-50 rounded-lg hover:bg-gray-100"
                  >
                    Share
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-20 px-6">
            <h2 className="text-lg font-bold text-gray-900 mb-2">
              No referrals found
            </h2>
            <p className="text-sm text-gray-500 leading-6">
              Try inviting friends — they will appear here once they sign up.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 py-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm border rounded ${
                currentPage === i + 1
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-blue-600 border-gray-300 hover:bg-blue-50"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Refresh button */}
      {onRefresh && (
        <div className="p-4">
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 disabled:opacity-50 transition"
          >
            {refreshing ? "Refreshing..." : "Refresh"}
          </button>
        </div>
      )}
    </div>
  );
}
