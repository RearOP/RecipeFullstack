import React from "react";
import Mainimg from "../../assets/img/header.jpg";
import { FaStar } from "react-icons/fa";

const Recipe = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 font-[Montserrat]">
      {[...Array(9)].map((_, index) => (
        <a
          href="/recipeDetails"
          key={index}
          className="card rounded-2xl p-4 transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
        >
          {/* Image */}
          <img
            src={Mainimg}
            alt="Recipe"
            className="w-full h-[180px] object-cover rounded-xl mb-4"
          />

          {/* Recipe Info */}
          <div>
            <h3 className="text-lg font-semibold mb-2 leading-tight">
              Sample Recipe Name
            </h3>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500" />
                <span>4.5 (123)</span>
              </div>
              <span className="text-gray-400">by John Doe</span>
            </div>
          </div>
        </a>
      ))}
    </div>
  );
};

export default Recipe;
