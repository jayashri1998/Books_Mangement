
import React, { createContext, useContext, useEffect, useState } from "react";
import { getBooks } from "../api/bookApi";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      const data = res.data || [];
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);
  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((b) => b.id !== id));
  };
  const editBook = (updatedBook) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === updatedBook.id ? updatedBook : b))
    );
  };

  const totalBooks = books.length;
  const availableCount = books.filter((b) => b.status === "Available").length;
  const issuedCount = books.filter((b) => b.status === "Issued").length;

  const genreCounts = books.reduce((acc, book) => {
    acc[book.genre] = (acc[book.genre] || 0) + 1;
    return acc;
  }, {});

  return (
    <BookContext.Provider
      value={{
        books,
        loading,
        fetchBooks,
        deleteBook,
        editBook,
        setBooks,
        totalBooks,
        availableCount,
        issuedCount,
        genreCounts,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
