import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Category from "./components/Category";
import Recipe from "./components/Recipe";
import Videos from "./components/Videos";
import Footer from "./components/Footer";

const Index = () => {
  return (
    <>
      <div className="min-h-screen font-[Montserrat]">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
          <Header />
          <Hero />

          {/* Main Content: Search, Category & Recipe */}
          <div className="py-10">
            <div className="flex flex-col lg:flex-row gap-10">
              {/* Sidebar */}
              <div className="w-full lg:w-[220px]">
                <Category />
              </div>

              {/* Recipes & Top Bar */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Search for recipes..."
                    className="px-5 py-2 w-full sm:w-[70%] rounded-md border border-gray-200 bg-[#f9f5f4] outline-none"
                  />
                  <select className="bg-red-700 text-white px-4 py-3 rounded-full font-semibold text-sm outline-none">
                    <option defaultValue>Sort by: Latest</option>
                    <option>Sort by: Top Rated</option>
                    <option>Sort by: Trending</option>
                  </select>
                </div>
                <Recipe />
              </div>
            </div>
          </div>

          {/* Videos */}
          <div className="py-10">
            <Videos />
          </div>

          {/* Newsletter Section */}
          <div className="w-full py-10">
            <div className="w-full rounded-[30px] bg-red-700 shadow-lg p-8 sm:p-10 text-center text-white">
              <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                Be the first to know about the latest deals, receive new trending recipes & more!
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

          {/* Footer */}
          <div className="py-10">
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
