import React, { useEffect, useState } from "react";
import Recipecard from "./components/Recipe";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setDataSearch] = useState("");
  const [sortOption, setSortOption] = useState("latest");

  const handleSortChange = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/recipe/showrecipes",
          {
            withCredentials: true,
          }
        );
        setRecipes(res.data); // make sure this matches your backend response shape
      } catch (error) {
        console.error(
          "Failed to fetch recipes:",
          error.response?.data || error.message
        );
      }
    };

    fetchRecipes();
  }, []);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/filterRecipe/${sortOption}`
        );
        setRecipes(res.data);
      } catch (err) {
        console.error("Failed to fetch recipes:", err.response?.data || err);
      }
    };

    fetchRecipes();
  }, [sortOption]);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch =
      (recipe?.title?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (recipe?.createdBy?.fullname?.toLowerCase() || "").includes(
        search.toLowerCase()
      ) ||
      (recipe?.category?.toLowerCase() || "").includes(search.toLowerCase()) ||
      (recipe?.subcategory?.toLowerCase() || "").includes(search.toLowerCase());

    return matchesSearch;
  });

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
                  onChange={(e) => setDataSearch(e.target.value)}
                />
                <select
                  className="text-black px-4 py-3 rounded-full font-semibold text-sm outline-none"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option defaultValue value="latest">Sort by: Latest</option>
                  <option value="topRated">Sort by: Top Rated</option>
                </select>
              </div>
              <Recipecard recipes={filteredRecipes} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Search;
