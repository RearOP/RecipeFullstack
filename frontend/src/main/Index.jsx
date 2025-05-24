/**
 * @component Index
 * @description Main component that displays the recipe website's homepage including header, hero section,
 * recipe filtering, categories, videos, newsletter subscription, and footer.
 * 
 * @state {Array} recipes - Stores all recipes fetched from the API
 * @state {string} search - Stores the current search query
 * @state {string} selectedCategory - Stores the currently selected category filter
 * @state {string} sortOption - Stores the current sort option ('latest' or 'topRated')
 * 
 * @constant {string} API_URL - Base URL for API endpoints
 * 
 * @function handleSortChange - Updates the sort option state
 * @param {string} option - The sorting option to apply
 * 
 * @function filteredRecipes - Filters recipes based on search query and selected category
 * @returns {Array} - Filtered array of recipes
 * 
 * @returns {JSX.Element} Renders the complete homepage with all components and functionality
 */
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import Videos from "./components/Videos";
import Recipecard from "./components/Recipe";
import Footer from "./components/Footer";
import axios from "axios";

const Index = () => {
  const [recipes, setRecipes] = useState([]);
  const [search, setDataSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOption, setSortOption] = useState("latest");
  const API_URL = "http://localhost:3000";
  const handleSortChange = (option) => {
    setSortOption(option);
  };

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

    const matchesCategory = selectedCategory
      ? recipe.category === selectedCategory ||
        recipe.subcategory === selectedCategory
      : true;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen font-[Montserrat]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />
        <Hero />

        <div className="py-10">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-[220px]">
              <Category onSelectCategory={setSelectedCategory} />
            </div>

            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <input
                  type="text"
                  placeholder="Search for recipes..."
                  className="px-5 py-2 w-full sm:w-[70%] rounded-md border border-gray-200 bg-[#f9f5f4] outline-none"
                  onChange={(e) => setDataSearch(e.target.value)}
                />
                <select
                  className="bg-red-700 text-white px-4 py-3 rounded-full font-semibold text-sm outline-none"
                  value={sortOption}
                  onChange={(e) => handleSortChange(e.target.value)}
                >
                  <option value="latest">Sort by: Latest</option>
                  <option value="topRated">Sort by: Top Rated</option>
                </select>
              </div>
              <Recipecard recipes={filteredRecipes} />
            </div>
          </div>
        </div>

        <div className="py-10">
          <Videos />
        </div>

        <div className="w-full py-10">
          <div className="w-full rounded-[30px] bg-red-700 shadow-lg p-8 sm:p-10 text-center text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-4">
              Be the first to know about the latest deals, receive new trending
              recipes & more!
            </h3>
            <p className="text-white/80 mb-6">
              Join our newsletter and never miss out on exclusive content
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
              <input
                type="email"
                className="py-3 px-6 w-full outline-none border-2 border-white rounded-full bg-white/10 placeholder-white/70 text-white"
                placeholder="Enter your email address"
              />
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-full transition-all duration-300 w-full sm:w-auto">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="py-10">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Index;
