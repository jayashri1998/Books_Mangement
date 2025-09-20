import React from "react";
import { useBooks } from "../context/BookContext";
import { useNavigate } from "react-router-dom";

const BookStatusSummary = () => {
  const { availableCount, issuedCount } = useBooks();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Book Status Summary
      </h2>

      <ul className="space-y-3">
        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-green-500 text-white text-sm font-bold">
              A
            </div>
            <span>Available</span>
          </div>
          <span className="text-gray-600">{availableCount} books</span>
        </li>

        <li className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 flex items-center justify-center rounded-full bg-red-500 text-white text-sm font-bold">
              I
            </div>
            <span>Issued</span>
          </div>
          <span className="text-gray-600">{issuedCount} books</span>
        </li>
      </ul>

      <button  onClick= {()=>navigate('/add-book')}className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition mt-auto">
        Add Book
      </button>
    </div>
  );
};

export default BookStatusSummary;
