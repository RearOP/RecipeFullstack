import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import MainImg from "../assets/img/signin.jpg";
import profilePicDefault from "../assets/img/header.jpg";
import { MdModeEditOutline } from "react-icons/md";
import { IoCamera } from "react-icons/io5";
import axios from "axios";

// Animation variants
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

const Profile = () => {
  const [activeTab, setActiveTab] = useState("All Recipes");
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState({ show: false, image: null });

  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [coverImage, setCoverImage] = useState(MainImg);
  const [profilePic, setProfilePic] = useState(profilePicDefault);

  const recipes = Array.from({ length: 20 }, (_, i) => ({
    title: `Recipe ${i + 1}`,
    image: MainImg,
    rateings: (Math.random() * 5.0).toFixed(1),
    totalrateings: (Math.random() * 500).toFixed(0),
  }));

  // Image Upload Handler
  const handleImageUpload = (e, type = "profile") => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "cover") setCoverImage(reader.result);
        else setProfilePic(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Debounced Name Change
  useEffect(() => {
    const timer = setTimeout(() => {
      if (name && name.length > 0 && name.length < 3) {
        setNameError("Name must be at least 3 characters");
      } else {
        setNameError("");
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [name]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Please enter a valid email");
      } else {
        setEmailError("");
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [email]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (!nameError) {
      setShowName(false);
      setUser({ ...user, fullname: name }); // Optional sync
      console.log("Updated Name:", name);
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!emailError) {
      setShowEmail(false);
      setUser({ ...user, email }); // Optional sync
      console.log("Updated Email:", email);
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile", {
        withCredentials: true,
      })
      .then((res) => {
        // console.log(res.data);
        setUser(res.data);
        setName(res.data.fullname); // Set editable name
        setEmail(res.data.email);
      })
      .catch((error) => {
        console.error("user not logged in", error);
      });
  }, []);

  const tabs = [
    "All Recipes",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Desserts",
    "Drinks",
  ];

  return (
    <motion.div
      className="min-h-screen font-[Montserrat] bg-gray-50"
      initial={{ opacity: 0 }}
      layout
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />

        {/* Cover Image */}
        <div className="relative mb-24">
          <motion.img
            layout
            src={coverImage}
            alt="Cover"
            className="w-full h-[300px] object-cover rounded-3xl shadow-lg"
            onClick={() => setShowModal({ show: true, image: coverImage })}
          />
          <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100">
            <IoCamera className="text-gray-600" />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "cover")}
              className="hidden"
            />
          </label>

          {/* Profile Picture */}
          <motion.div
            layout
            className="absolute left-8 -bottom-20 flex items-center gap-4"
          >
            <div className="relative">
              <img
                src={profilePic}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-md hover:scale-105 transition-transform cursor-pointer"
                onClick={() => setShowModal({ show: true, image: profilePic })}
              />
              <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full cursor-pointer hover:bg-gray-100">
                <IoCamera className="text-gray-600" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "profile")}
                  className="hidden"
                />
              </label>
            </div>
            <div className="mt-14 space-y-1">
              {/* Name Field */}
              <span className="flex items-center gap-2">
                <form
                  onSubmit={handleNameSubmit}
                  className="flex items-center gap-2"
                >
                  <input
                    className={`text-2xl font-bold outline-none transition-all duration-300 ${
                      showName ? "border-b-2 border-red-500" : ""
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!showName}
                  />
                  {showName && (
                    <button
                      type="submit"
                      className="text-sm text-green-600 hover:text-green-700 font-semibold"
                    >
                      Save
                    </button>
                  )}
                </form>
                {!showName && (
                  <MdModeEditOutline
                    onClick={() => setShowName(true)}
                    className="cursor-pointer"
                  />
                )}
              </span>
              {nameError && (
                <div className="text-xs text-red-500">{nameError}</div>
              )}

              {/* Email Field */}
              <span className="flex items-center gap-2">
                <form
                  onSubmit={handleEmailSubmit}
                  className="flex items-center gap-2"
                >
                  <input
                    className={`text-sm font-semibold text-gray-600 outline-none transition-all duration-300 ${
                      showEmail ? "border-b-2 border-red-500" : ""
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!showEmail}
                  />
                  {showEmail && (
                    <button
                      type="submit"
                      className="text-sm text-green-600 hover:text-green-700 font-semibold"
                    >
                      Save
                    </button>
                  )}
                </form>
                {!showEmail && (
                  <MdModeEditOutline
                    onClick={() => setShowEmail(true)}
                    className="cursor-pointer"
                  />
                )}
              </span>
              {emailError && (
                <div className="text-xs text-red-500">{emailError}</div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Modal */}
        {showModal.show && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50"
            onClick={() => setShowModal({ show: false, image: null })}
          >
            <div onClick={(e) => e.stopPropagation()}>
              <img
                src={showModal.image}
                alt="Modal"
                className="max-w-full max-h-[80vh] rounded-xl shadow-lg"
              />
            </div>
          </div>
        )}

        {/* Tabs */}
        <motion.div
          className="flex gap-4 mb-8 mt-5 flex-wrap"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          layout
        >
          {tabs.map((tab) => (
            <motion.button
              key={tab}
              layout
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm transition-all ${
                activeTab === tab
                  ? "bg-red-500 text-white"
                  : "bg-white border border-gray-300 hover:bg-red-50 hover:text-red-600"
              }`}
              variants={cardVariants}
            >
              {tab}
            </motion.button>
          ))}
        </motion.div>

        {/* Recipes Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          layout
        >
          {recipes.map((recipe, index) => (
            <motion.div
              layout
              key={index}
              className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all group"
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={recipe.image}
                alt="Recipe"
                className="w-full h-[180px] object-cover rounded-xl mb-4"
              />
              <div>
                <h3 className="text-lg font-semibold mb-2">{recipe.title}</h3>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>
                      {recipe.rateings} ({recipe.totalrateings})
                    </span>
                  </div>
                  <span className="text-gray-400">by John Doe</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <Footer />
      </div>
    </motion.div>
  );
};

export default Profile;
