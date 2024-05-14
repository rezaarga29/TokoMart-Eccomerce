"use client";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Lakukan sesuatu dengan nilai searchTerm, misalnya kirim ke API pencarian
    console.log("Search Term:", searchTerm);
  };

  return (
    <div className="flex items-center justify-end">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="px-4 py-2 rounded-l-full border outline-none focus:border-green-500 mr-2 mb-10"
        placeholder="Search..."
      />
      <button
        className="px-4 py-2 bg-green-500 text-white rounded-r-full flex items-center mr-20 mb-10"
        onClick={handleSearch}
      >
        <FaSearch />
      </button>
    </div>
  );
}
