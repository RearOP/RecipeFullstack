import React from "react";
import Recipecard from "./components/Recipe";
import Footer from "./components/Footer";
import Header from "./components/Header";

const Search = () => {
  return (
    <div className="min-h-screen font-[Montserrat]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />
        <div className="py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Recipes & Top Bar */}
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  className="px-5 py-2 w-full sm:w-[70%] rounded-md border border-gray-200 bg-[#f9f5f4] outline-none"
                />
                <select className="text-black px-4 py-3 rounded-full font-semibold text-sm outline-none">
                  <option defaultValue>Sort by: Latest</option>
                  <option>Sort by: Top Rated</option>
                  <option>Sort by: Trending</option>
                </select>
              </div>
              <Recipecard />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Search;
