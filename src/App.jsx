import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BookProvider } from "./context/BookContext";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import BookTable from "./components/BookTable";
import AddBook from "./components/AddBook";
import { Toaster } from "sonner";
import EditBook from "./components/EditBook";

function App() {
  return (
    <>
     <Toaster
        position="top-center"
        richColors
        toastOptions={{
          success: {
            icon: "✅",
            style: {
              background: "#DCFCE7",
              color: "#166534",
              padding: "12px 20px",
              borderRadius: "12px",
              fontWeight: "500",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            },
          },
          error: {
            icon: "❌",
            style: {
              background: "#FEE2E2",
              color: "#991B1B",
              padding: "12px 20px",
              borderRadius: "12px",
              fontWeight: "500",
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 9999,
            },
          },
        }}
      />

    <BookProvider>
      <BrowserRouter>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-6 bg-gray-100 min-h-screen">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/books" element={<BookTable />} />
              <Route path="/add-book" element={<AddBook />} />
              <Route path="/edit/:id" element ={<EditBook/>}/>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </BookProvider>
    </>
  );
}

export default App;
