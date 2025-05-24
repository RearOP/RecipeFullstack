/**
 * Search component that displays and filters recipes
 * @component
 * @description A component that fetches recipes from an API, allows searching through them,
 * and provides sorting functionality. It includes a search input and a sorting dropdown.
 * 
 * @state {Array} recipes - Stores all fetched recipes
 * @state {string} search - Stores the current search query
 * @state {string} sortOption - Stores the current sorting option ('latest' or 'topRated')
 * 
 * @function handleSortChange - Updates the sorting option state
 * @function filteredRecipes - Filters recipes based on search query matching title, creator name, category, or subcategory
 * 
 * @returns {JSX.Element} A page with search functionality, recipe cards, header and footer
 * 
 * @requires React
 * @requires axios
 * @requires ./components/Recipe
 * @requires ./components/Footer
 * @requires ./components/Header
 */
import React, { useEffect, useState } from "react";
import Recipecard from "./components/Recipe";
import Footer from "./components/Footer";
import Header from "./components/Header";
import axios from "axios";

const Search = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setDataSearch] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const API_URL = "http://localhost:3000";
  const handleSortChange = (option) => {
    setSortOption(option);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipe/showrecipes`, {
          withCredentials: true,
        });
        setRecipes(res.data);
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
        const res = await axios.get(`${API_URL}/filterRecipe/${sortOption}`);
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
                  <option defaultValue value="latest">
                    Sort by: Latest
                  </option>
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
