import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import axios from "axios";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setisProfileOpen] = useState(false);
  const [IsLoggedIn, setIsLoggedIn] = useState(false);
  const [Admin, setAdmin] = useState(false);
  const API_URL = "http://localhost:3000";

  const toggleDrawer = () => setIsOpen(!isOpen);
  const toggleProfile = () => setisProfileOpen(!isProfileOpen);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(`${API_URL}/check`, {
          withCredentials: true,
        });
        setIsLoggedIn(res.data.loggedIn);
        // console.log(res.data);
        setAdmin(res.data.role === "admin");
      } catch (err) {
        console.error("Auth check failed:", err.message);
      }
    };

    checkAuth();
  }, []);

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/logout`, {
        withCredentials: true,
      });
      // console.log("Logout response:", res.status, res.data);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed", error.response?.data || error.message);
    }
  };

  return (
    <header className="py-4 px-4 md:px-8 top-0 z-50 relative">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="text-[24px] font-bold font-[Leckerli_One] text-red-700"
        >
          Kocina
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10 font-[Montserrat] text-sm font-semibold text-[#4a4a4a]">
          <a
            href="/"
            className="hover:text-red-700 transition duration-300 ease-in"
          >
            Home
          </a>
          <a
            href="/search"
            className="hover:text-red-700 transition duration-300 ease-in"
          >
            Search
          </a>
          <a
            href="/contact"
            className="hover:text-red-700 transition duration-300 ease-in"
          >
            Contact
          </a>
          {Admin && (
            <a
              href="/admin"
              className="hover:text-red-700 transition duration-300 ease-in"
            >
              Admin
            </a>
          )}
        </nav>

        {/* Desktop Auth */}

        <div className="hidden md:flex items-center gap-6 font-[Montserrat] font-bold text-sm">
          {!IsLoggedIn ? (
            <>
              <a
                href="/signin"
                className="text-[#4a4a4a] hover:text-red-700 transition duration-300 ease-in"
              >
                Sign In
              </a>
              <a
                href="/signup"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full transition duration-300 ease-in"
              >
                Sign Up
              </a>
            </>
          ) : (
            <div className="relative hidden md:block">
              <button
                onClick={toggleProfile}
                className="flex items-center hover:text-red-700"
              >
                <IoPersonOutline size={20} />
              </button>
              {isProfileOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="/addrecipe"
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Add Recipe
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm hover:text-red-700 transition duration-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Mobile Hamburger */}
        <div className="md:hidden">
          <button onClick={toggleDrawer}>
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed top-[72px] left-0 w-full h-screen bg-white shadow-lg z-50">
          <div className="px-6 py-4">
            <nav className="flex flex-col text-center gap-4 font-[Montserrat] text-sm font-semibold text-[#4a4a4a]">
              <a
                href="/"
                className="hover:text-red-700 transition duration-300 ease-in"
              >
                Home
              </a>
              <a
                href="/about"
                className="hover:text-red-700 transition duration-300 ease-in"
              >
                Recipe
              </a>
              <a
                href="/search"
                className="hover:text-red-700 transition duration-300 ease-in"
              >
                Search
              </a>
              <a
                href="/contact"
                className="hover:text-red-700 transition duration-300 ease-in"
              >
                Contact
              </a>
              {Admin && (
                <a
                  href="/admin"
                  className="hover:text-red-700 transition duration-300 ease-in"
                >
                  Admin
                </a>
              )}
              {IsLoggedIn && (
                <div className="border-t border-gray-200 pt-4">
                  <a
                    href="/profile"
                    className="block py-2 hover:text-red-700 transition duration-300 ease-in"
                  >
                    Profile
                  </a>
                  <a
                    href="/addrecipe"
                    className="block py-2 hover:text-red-700 transition duration-300 ease-in"
                  >
                    Add Recipe
                  </a>
                  <button
                    onClick={handleLogout}
                    className="block py-2 hover:text-red-700 transition duration-300 ease-in"
                  >
                    Logout
                  </button>
                </div>
              )}
            </nav>
            {!isLoggedIn && (
              <div className="mt-4 flex flex-col text-center gap-2 font-[Montserrat] font-bold text-sm">
                <a
                  href="/signin"
                  className="text-[#4a4a4a] hover:text-red-700 transition duration-300 ease-in"
                >
                  Sign In
                </a>
                <a
                  href="/signup"
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-3 py-2 rounded-full text-center transition duration-300 ease-in"
                >
                  Sign Up
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
