import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { motion } from "framer-motion";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaRegPaperPlane } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { FiClock, FiRefreshCw, FiUsers } from "react-icons/fi";
import MainImg from "../assets/img/header.jpg";
import StarRatings from "react-star-ratings";

const comments = [
  {
    name: "Alice Thorman",
    rating: 5,
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor.",
    replies: [
      {
        name: "Tom Splander",
        rating: 4,
        text: "Thanks Alice! Looks delicious indeed.",
      },
    ],
  },
  {
    name: "Alice Thorman",
    rating: 5,
    text: "Can't wait to try this again. My family loved it!",
  },
];

const otherRecipes = [
  { name: "Beef Teriyaki Chicken", rating: 5, by: "John Doe" },
  { name: "Zesty Slow Cooker Chicken", rating: 2.5, by: "Mohsin" },
  { name: "Rosemary Ranch Chicken", rating: 1.5, by: "Rear" },
  { name: "Slow Cooker Pulled Pork", rating: 3.5, by: "John" },
  { name: "Awesome Slow Cooker Pot Roast", rating: 4.5, by: "Doe" },
];

const RecipeDetails = () => {
  const [rating, setRating] = useState(0);
  return (
    <div className="min-h-screen font-[Montserrat] bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />

        {/* Recipe Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Left: Image */}
          <div>
            <img
              src={MainImg}
              alt="Recipe"
              className="rounded-xl object-cover w-full max-h-[400px]"
            />
          </div>

          {/* Right: Title and Info */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-semibold leading-14 mb-2">
              White Calzones with Marinara Sauce
            </h1>

            <p className="text-sm text-gray-500">
              Supermarket brands of ricotta contain stabilizers, which can give
              the cheese a gummy texture when baked. Choose the best ricotta you
              can find.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 text-center mt-8 border-t border-gray-200 pt-6 gap-y-6 sm:gap-y-0">
              {/* Active Time */}
              <div className="flex flex-col items-center gap-1">
                <FiClock size={24} className="text-gray-700" />
                <span className="font-semibold">Active Time</span>
                <span className="text-gray-500 text-sm">20 mins</span>
              </div>

              {/* Total Time */}
              <div className="flex flex-col items-center gap-1 border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200 sm:px-4">
                <FiRefreshCw size={24} className="text-gray-700" />
                <span className="font-semibold">Total Time</span>
                <span className="text-gray-500 text-sm">50 mins</span>
              </div>

              {/* Yield */}
              <div className="flex flex-col items-center gap-1">
                <FiUsers size={24} className="text-gray-700" />
                <span className="font-semibold">Yield</span>
                <span className="text-gray-500 text-sm">Serves 4</span>
              </div>
            </div>
            <div className="createdby flex items-center justify-between">
              <p className="text-md text-gray-600 mt-5">
                Created By <span className="text-red-600">Alex Williams</span>
              </p>
              <a href="/" className="" title="Save Recipe">
                <CiBookmark className="h-6 w-6" />
              </a>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">2 recipes</p>

              {/* Rating Component */}
              <div className="flex items-center gap-1">
                <StarRatings
                  rating={rating}
                  starRatedColor="#FFD700"
                  changeRating={setRating}
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Instructions & Ingredients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">How to Make It</h2>
            {[1, 2, 3].map((step) => (
              <div key={step} className="mb-6">
                <h4 className="text-md font-bold text-red-600">Step {step}</h4>
                <p className="text-sm text-gray-700 mt-1">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Minima beatae fugiat, perspiciatis quos.
                </p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>1 pound fresh pizza dough</li>
              <li>2 cups shredded mozzarella</li>
              <li>1/4 cup ricotta cheese</li>
              <li>1 egg yolk</li>
              <li>1 clove minced garlic</li>
              <li>1 tsp black pepper</li>
              <li>1 tsp Italian seasoning</li>
            </ul>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-4">Comments</h2>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {comments.map((comment, index) => (
              <div key={index} className="bg-white shadow-md p-4 rounded-xl">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-gray-800">{comment.name}</h4>
                  {/* <div className="flex text-yellow-400">
                    {[...Array(comment.rating)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div> */}
                </div>
                <p className="text-sm text-gray-600">{comment.text}</p>
                {comment.replies &&
                  comment.replies.map((reply, rIdx) => (
                    <div
                      key={rIdx}
                      className="ml-6 mt-4 border-l-2 border-gray-500 pl-4"
                    >
                      <div className="flex items-center justify-between">
                        <h5 className="font-semibold text-gray-700">
                          {reply.name}
                        </h5>
                        {/* <div className="flex text-yellow-400">
                          {[...Array(reply.rating)].map((_, i) => (
                            <FaStar key={i} size={14} />
                          ))}
                        </div> */}
                      </div>
                      <p className="text-sm text-gray-500">{reply.text}</p>
                    </div>
                  ))}
              </div>
            ))}
            <form method="post">
              <div className="flex items-center justify-between">
                <textarea
                  className="px-5 py-2 w-[70%] rounded-md border-2 border-gray-400 outline-none resize-none"
                  placeholder="Write a comment"
                ></textarea>
                <button className="flex items-center px-4 py-1 border bg-black text-white rounded-full hover:bg-red-700 transition-all duration-500">
                  <span className="mr-2">
                    <FaRegPaperPlane />
                  </span>
                  Send
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Other Recipes Section */}
        <div className="mt-20">
          <h2 className="text-xl font-bold mb-6">Other Recipes You May Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {otherRecipes.map((recipe, index) => (
              <motion.a
                key={index}
                // href={recipe.link}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="card rounded-2xl p-4 bg-white transition-transform hover:-translate-y-1 hover:shadow-lg duration-300"
              >
                {/* Image */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/5/5a/%22Hyderabadi_Dum_Biryani%22.jpg"
                  alt={recipe.name}
                  className="w-full h-[180px] object-cover rounded-xl mb-4"
                />

                {/* Recipe Info */}
                <div>
                  <h3 className="text-lg font-semibold mb-2 leading-tight">
                    {recipe.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <span>{recipe.rating}</span>
                    </div>
                    <span className="text-gray-400">by {recipe.by}</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default RecipeDetails;
