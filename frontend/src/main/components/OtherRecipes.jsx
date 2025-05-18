import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const OtherRecipes = () => {
  const [otherRecipes, setotherRecipes] = useState([]);
  const API_URL = "http://localhost:3000";
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`${API_URL}/recipe/showrecipesDetailpage`, {
          withCredentials: true,
        });
        setotherRecipes(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch recipe:",
          err.response?.data || err.message
        );
      }
    };

    fetchRecipe();
  }, []);
  return (
    <>
      <div className="mt-20">
        <h2 className="text-xl font-bold mb-6">Other Recipes You May Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {otherRecipes.map((recipe, index) => (
            <motion.a
              key={index}
              href={`/recipeDetails/${recipe._id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="card rounded-2xl p-4 bg-white transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
            >
              {/* Image */}
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-[180px] object-cover rounded-xl mb-4"
              />

              {/* Recipe Info */}
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
            </motion.a>
          ))}
        </div>
      </div>
    </>
  );
};

export default OtherRecipes;
