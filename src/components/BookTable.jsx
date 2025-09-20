import React, { useState } from "react";
import { useBooks } from "../context/BookContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const statusClasses = {
  Available: "bg-green-100 text-green-700",
  Issued: "bg-red-100 text-red-600",
};

const BookTable = () => {
  const { books, loading, setBooks  } = useBooks();
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate()
  const booksPerPage = 10;

  if (loading) {
    return <div className="m-8 p-4 text-gray-600">Loading books...</div>;
  }

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());

    const matchesGenre =
      genreFilter === "All" || book.genre === genreFilter;

    const matchesStatus =
      statusFilter === "All" || book.status === statusFilter;

    return matchesSearch && matchesGenre && matchesStatus;
  });
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage) || 1;
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
  );
 const handleDelete = (id) => {
    const confirmDelete = (
      <div className="flex flex-col gap-2">
        <p className="font-medium">Are you sure you want to delete this book?</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
            onClick={() => toast.dismiss()}
          >
            Cancel
          </button>
          <button
            className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              setBooks((prev) => prev.filter((b) => b.id !== id));
              toast.success("Book deleted successfully!");
              toast.dismiss();
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    );

    toast(customToast => confirmDelete, { duration: Infinity });
  };

  if (loading) return <p>Loading books...</p>;

  return (
    <div className="m-8 bg-white shadow-2xl rounded-xl p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <input
          type="text"
          placeholder="Search by Title or Author..."
          className="border p-2 rounded w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2 rounded"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="All">All Genres</option>
          {[...new Set(books.map((b) => b.genre))].map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="border p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Issued">Issued</option>
        </select>
      </div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm">
            <th className="py-3 px-4">Cover</th>
            <th className="py-3 px-4">Title</th>
            <th className="py-3 px-4">Author</th>
            <th className="py-3 px-4">Genre</th>
            <th className="py-3 px-4">Published Year</th>
            <th className="py-3 px-4">Status</th>
             <th className="py-3 px-4">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.map((book, idx) => (
            <tr
              key={idx}
              className="border-t hover:bg-gray-50 transition duration-200"
            >
              <td className="py-3 px-4">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-12 h-16 object-cover rounded-md shadow"
                />
              </td>
              <td className="py-3 px-4 font-medium text-gray-800">
                {book.title}
              </td>
              <td className="py-3 px-4 text-gray-600">{book.author}</td>
              <td className="py-3 px-4 text-gray-600">{book.genre}</td>
              <td className="py-3 px-4 text-gray-600">{book.publishedYear}</td>
              <td className="py-3 px-4">
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    statusClasses[book.status] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {book.status}
                </span>
              </td>
              <td className="py-3 px-4 space-x-2">
                <button
                  onClick={() => navigate(`/edit/${book.id}`)}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  <FaEdit/>
                </button>
               <button
                onClick={() => handleDelete(book.id)}
                className="px-3 py-1 bg-red-500 text-white rounded"
              >
               <MdDelete/>
              </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BookTable;
