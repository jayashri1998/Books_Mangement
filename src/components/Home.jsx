import React from "react";
import CategoryChart from "./CategoryChart";
import BookStatusSummary from "./BookStatusSummery";
import BookTable from "./BookTable";
import { useBooks } from "../context/BookContext";

const Home = () => {
  const { genreCounts, totalBooks, loading } = useBooks();

  if (loading) return <p>Loading chart...</p>;
  const data = Object.keys(genreCounts).map((genre) => ({
    name: genre,
    value: genreCounts[genre],
  }));

  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-4 lg:ml-64">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center justify-center">
          <img src="https://media.gettyimages.com/id/157482029/photo/stack-of-books.jpg?s=612x612&w=0&k=20&c=ZxSsWKNcVpEzrJ3_kxAUuhBCT3P_dfnmJ81JegPD8eE=" alt="books"/>
          <h2 className="text-lg font-semibold mb-2">Total Books</h2>
          <p className="text-3xl font-bold text-orange-500">{totalBooks}</p>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <CategoryChart data={data} />
        </div>
        <div className="bg-white shadow-lg rounded-xl p-6">
          <BookStatusSummary />
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-xl p-6">
        <BookTable />
      </div>
    </div>
  );
};

export default Home;
