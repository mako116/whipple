import React, { useState } from "react";

const referralsData = [
  { id: "1", name: "John Doe", email: "john@example.com", points: 120 },
  { id: "2", name: "Jane Smith", email: "jane@example.com", points: 95 },
  { id: "3", name: "Michael Lee", email: "michael@example.com", points: 150 },
  { id: "4", name: "Emily Brown", email: "emily@example.com", points: 80 },
  { id: "5", name: "Chris Johnson", email: "chris@example.com", points: 70 },
  { id: "6", name: "Sophia Taylor", email: "sophia@example.com", points: 110 },
  { id: "7", name: "Daniel Wilson", email: "daniel@example.com", points: 200 },
  { id: "8", name: "Olivia Martinez", email: "olivia@example.com", points: 130 },
  { id: "9", name: "Liam White", email: "liam@example.com", points: 65 },
  { id: "10", name: "Emma Davis", email: "emma@example.com", points: 90 },
];

const ITEMS_PER_PAGE = 5;

export default function ReferralTable() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(referralsData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentData = referralsData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className=" bg-gray-400 min-h-screen pt-20">
      <div className="max-w-4xl mx-auto  py-8 border border-gray-200 rounded-lg bg-white shadow">

     
      {/* Table Header */}
      <div className="grid grid-cols-4 bg-gray-100 px-4 py-3 font-semibold text-gray-700 text-sm">
        <div className="col-span-1.5">Name</div>
        <div className="col-span-2">Email</div>
        <div className="text-right">Referral Points</div>
      </div>

      {/* Table Rows */}
      {currentData.map((item) => (
        <div
          key={item.id}
          className="grid grid-cols-4 items-center border-t border-gray-100 px-4 py-3 text-sm text-gray-600"
        >
          <div className="col-span-1.5">{item.name}</div>
          <div className="col-span-2">{item.email}</div>
          <div className="text-right font-medium">{item.points}</div>
        </div>
      ))}

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 p-4 bg-gray-50 border-t border-gray-100">
        {/* Prev Button */}
        <button
          onClick={() => setCurrentPage((prev) => prev - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:underline"
          }`}
        >
          Prev
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === i + 1
                ? "font-bold text-black underline"
                : "text-blue-600 hover:underline"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={() => setCurrentPage((prev) => prev + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 text-sm rounded ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:underline"
          }`}
        >
          Next
        </button>
         </div>
      </div>
    </div>
  );
}
