import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addBook } from "../api/bookApi";

const BookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  author: Yup.string().required("Author is required"),
  genre: Yup.string().required("Genre is required"),
  publishedYear: Yup.number()
    .typeError("Published Year must be a number")
    .required("Published Year is required")
    .min(1000, "Enter a valid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  status: Yup.string().oneOf(["Available", "Issued"]).required(),
});

const AddBook = () => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add Book</h2>

      <Formik
        initialValues={{
          title: "",
          author: "",
          genre: "",
          publishedYear: "",
          status: "Available",
          image: "",
        }}
        validationSchema={BookSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            await addBook(values);
            alert("Book added successfully!");
            resetForm();
          } catch (error) {
            console.error("Error adding book:", error);
            alert("Failed to add book");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <Field
                name="title"
                placeholder="Book Title"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="author"
                placeholder="Author"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="genre"
                placeholder="Genre"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="genre"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="publishedYear"
                type="number"
                placeholder="Published Year"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="publishedYear"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                as="select"
                name="status"
                className="w-full border p-2 rounded"
              >
                <option value="Available">Available</option>
                <option value="Issued">Issued</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <div>
              <Field
                name="image"
                placeholder="Image URL"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 disabled:opacity-50"
            >
              {isSubmitting ? "Adding..." : "Add Book"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBook;
