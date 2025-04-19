import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { FiFilter } from "react-icons/fi";

const Category = () => {
  const categories = [
    {
      name: "Dish Type",
      sub: ["Pasta", "Salad", "Pizza"]
    },
    {
      name: "Meal Type",
      sub: ["Breakfast", "Lunch", "Dinner"]
    },
    {
      name: "Diet and Health",
      sub: ["Low Carb", "Gluten Free", "Vegan"]
    },
    {
      name: "World Cuisine",
      sub: ["Italian", "Mexican", "Indian"]
    },
    {
      name: "Seasonal",
      sub: ["Summer", "Winter", "Spring"]
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  const toggleAccordion = (index) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

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

      {/* Sidebar for desktop & collapsible panel for mobile */}
      <div className={`font-[Montserrat] ${showMobileFilter ? '' : 'hidden'} md:block w-full md:w-[220px] sticky top-24`}>
        <h2 className="text-3xl md:text-4xl font-bold mb-10 md:mb-20">Recipes</h2>
        <div className="space-y-4">
          {categories.map((cat, idx) => (
            <div key={idx}>
              <button
                className="flex justify-between items-center w-full text-left text-[17px] font-medium"
                onClick={() => toggleAccordion(idx)}
              >
                <span>{cat.name}</span>
                {openIndex === idx ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm" />}
              </button>
              {openIndex === idx && (
                <ul className="pl-4 mt-1 space-y-1  text-gray-600">
                  {cat.sub.map((item, subIdx) => (
                    <li key={subIdx} className="cursor-pointer text-md hover:text-red-600 transition duration-300 ease-in">{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Category;
