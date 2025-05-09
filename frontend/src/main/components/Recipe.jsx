import React from "react";
import { FaStar } from "react-icons/fa";

const Recipe = ({ recipes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 font-[Montserrat]">
      {recipes.map((recipe, index) => (
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
            <h3 className="text-lg font-semibold mb-2 leading-tight">
              {recipe.title}
            </h3>
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
      ))}
    </div>
  );
};

export default Recipe;
