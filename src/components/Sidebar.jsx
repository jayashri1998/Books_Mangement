import React, { useState } from "react";
import {
  FaBook,
  FaNewspaper,
  FaList,
  FaChartBar,
  FaCog,
  FaBars,
  FaTimes,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Overview", icon: <FaHome />, path: "/" },
    { name: "Books", icon: <FaBook />, path: "/books" },
    { name: "Add Book", icon: <FaBook />, path: "/add-book" },
    { name: "Magazine", icon: <FaNewspaper />, path: "/magazine" },
    { name: "Setting", icon: <FaCog />, path: "/setting" },
  ];

  return (
    <>
      <div className="lg:hidden flex items-center p-4 bg-white shadow-md fixed w-[25%] top-0 left-0 z-20">
        <button
          className="text-2xl text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <h1 className="ml-3 font-bold text-xl">Lib.Manager</h1>
      </div>
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#06192f] shadow-md p-6 z-30
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <h2 className="text-xl font-bold mb-6 text-white">📚 Book Manager</h2>
        <nav className="space-y-4">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-md transition ${
                  isActive
                    ? "bg-orange-500 text-white"
                    : "text-white hover:bg-gray-100"
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0  bg-opacity-40 lg:hidden z-20"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
