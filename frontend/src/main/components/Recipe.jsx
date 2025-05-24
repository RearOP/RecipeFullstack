/**
 * Recipe component that displays a grid of recipe cards with pagination
 * 
 * @component
 * @param {Object} props
 * @param {Array} props.recipes - Array of recipe objects containing recipe information
 * @param {string} props.recipes[].title - Title of the recipe
 * @param {string} props.recipes[].imageUrl - URL of the recipe image
 * @param {string} props.recipes[]._id - Unique identifier of the recipe
 * @param {string} props.recipes[].createdAt - Creation date and time of the recipe
 * @param {number} props.recipes[].averageRating - Average rating of the recipe
 * @param {number} props.recipes[].totalRatings - Total number of ratings for the recipe
 * @param {Object} props.recipes[].createdBy - Creator information
 * @param {string} props.recipes[].createdBy.fullname - Full name of recipe creator
 * 
 * @returns {JSX.Element} Grid of recipe cards with pagination controls
 * 
 * @example
 * <Recipe recipes={recipesArray} />
 */
import { React, useState } from "react";
import { FaStar } from "react-icons/fa";

const Recipe = ({ recipes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 12;
  // Updated to show all recipes without flattening
  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const paginatedRecipes = recipes.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}-${month}-${year}`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // convert 0 to 12
    return `${String(hours).padStart(2, "0")}:${minutes} ${ampm}`;
  };
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 font-[Montserrat]">
        <>
          {paginatedRecipes.map((recipe, index) => {
            const hasRecipes = recipe.title && recipe.title.length > 0;

            return (
              <a
                href={`/recipeDetails/${recipe._id}`}
                key={index}
                className="card rounded-2xl p-4 transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title || "Recipe"}
                  className="w-full h-[180px] object-cover rounded-xl mb-4"
                />
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold leading-tight">
                      {recipe.title}
                    </h3>
                    <p className="text-gray-500 text-xs">
                      {formatDate(recipe.createdAt) || "Unknown Date"}
                    </p>
                  </div>
                  <div className="flex items-center justify-end mb-2">
                    <p className="text-gray-500 text-xs">
                      {formatTime(recipe.createdAt) || "Unknown Time"}
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span>
                        {recipe.averageRating ? recipe.averageRating : 0}(
                        {recipe.totalRatings ? recipe.totalRatings : 0})
                      </span>
                    </div>
                    <span className="text-gray-400">
                      by {recipe.createdBy?.fullname || "Unknown"}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </>
      </div>
      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 rounded ${
                currentPage === i + 1 ? "bg-red-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
};

export default Recipe;
