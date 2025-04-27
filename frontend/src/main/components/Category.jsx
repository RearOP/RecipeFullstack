import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/category/showcategory"
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        // Handle unauthorized errors
        if (err.response && err.response.status === 401) {
          setCategories([]); // Set empty categories or a default value
          // Optionally show a message that user needs to log in to see categories
        }
      }
    };
  
    fetchCategories();
  }, []);

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setShowMobileFilter(!showMobileFilter)}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full font-[Montserrat] text-sm"
        >
          <FiFilter />
          Filter Categories
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`font-[Montserrat] ${
          showMobileFilter ? "" : "hidden"
        } md:block w-full md:w-[220px] sticky top-24`}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-20">
          Categories
        </h2>
        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={cat._id}>
              <button
                className="flex justify-between items-center w-full text-left text-[17px] font-medium"
                onClick={() => toggleAccordion(idx)}
              >
                <span>{cat.name}</span>
                {openIndex === idx ? (
                  <FaMinus className="text-sm" />
                ) : (
                  <FaPlus className="text-sm" />
                )}
              </button>
              <AnimatePresence initial={false}>
                {openIndex === idx && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="pl-4 mt-1 overflow-hidden text-gray-600"
                  >
                    {cat.subcategories && cat.subcategories.length > 0 ? (
                      cat.subcategories.map((sub, i) => (
                        <li
                          key={i}
                          className="cursor-pointer hover:text-red-600 transition duration-300 ease-in mt-2"
                        >
                          {sub.name}
                        </li>
                      ))
                    ) : (
                      <li className="text-sm italic text-gray-400">
                        No subcategories
                      </li>
                    )}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
