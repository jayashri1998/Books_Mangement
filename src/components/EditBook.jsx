
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useBooks } from "../context/BookContext";
import { toast } from "sonner";

const InputField = ({ label, name, value, onChange, type = "text", placeholder }) => (
  <div className="flex flex-col">
    <label className="mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      required
    />
  </div>
);

const EditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, setBooks } = useBooks();

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    publishedYear: "",
    status: "Available",
    image: "",
  });

  useEffect(() => {
    const book = books.find((b) => b.id === id);
    if (!book) {
      toast.error("Book not found");
      navigate("/books");
      return;
    }
    setFormData(book);
  }, [books, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setBooks((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...formData } : b))
    );

    toast.success("Book updated successfully!");
    navigate("/books");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Book</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Book Title"
        />

        <InputField
          label="Author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          placeholder="Book Author"
        />

        <InputField
          label="Genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          placeholder="Genre"
        />

        <InputField
          label="Published Year"
          name="publishedYear"
          type="number"
          value={formData.publishedYear}
          onChange={handleChange}
          placeholder="2023"
        />

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Cover Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/book.jpg"
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {formData.image && (
            <img
              src={formData.image}
              alt={formData.title}
              className="w-24 h-32 object-cover mt-2 rounded shadow"
            />
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Available">Available</option>
            <option value="Issued">Issued</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditBook;
