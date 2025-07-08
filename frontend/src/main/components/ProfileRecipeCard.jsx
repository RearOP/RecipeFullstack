import React from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};
const ProfileRecipeCard = ({ showRecipes }) => {
  return (
    <>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        layout
      >
        {showRecipes?.length > 0 ? (
          showRecipes.map((recipe, index) => (
            <motion.div
              key={index}
              className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all group"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <Link to={`/recipeDetails/${recipe._id}`}>
                <img
                  src={recipe.imageUrl}
                  alt={recipe.title || "Recipe"}
                  className="w-full h-[180px] object-cover rounded-xl mb-4"
                />
                <div>
                  <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span>
                        {recipe.averageRating?.toFixed(1) || 0} (
                        {recipe.totalRatings || 0})
                      </span>
                    </div>
                    <span className="text-gray-400">
                      by {recipe.createdBy?.fullname || "Unknown"}
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No recipes found.</p>
        )}
      </motion.div>
    </>
  );
};

export default ProfileRecipeCard;
