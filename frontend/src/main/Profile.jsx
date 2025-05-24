/**
 * Profile component for user dashboard
 * @component
 * 
 * @animation containerVariants - Controls staggered animation of child elements
 * @animation cardVariants - Controls individual card animations
 * 
 * @state {string} activeTab - Currently selected recipe category tab
 * @state {Object} user - Logged in user data
 * @state {Array} showRecipe - User's recipes to display
 * @state {string} name - Editable user name
 * @state {boolean} showName - Controls name edit mode
 * @state {string} nameError - Validation error for name field
 * @state {string} email - Editable user email
 * @state {boolean} showEmail - Controls email edit mode
 * @state {string} emailError - Validation error for email field
 * @state {string} coverImage - Cover image preview URL
 * @state {string} profilePic - Profile image preview URL
 * 
 * @function handleImageUpload - Handles profile and cover image uploads
 * @function handleNameSubmit - Processes name update submission
 * @function handleEmailSubmit - Processes email update submission
 * 
 * @returns {JSX.Element} Profile page with user info, image upload capabilities and recipe grid
 */
import React, { useState, useEffect } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Modal from "./components/ShowModal";
import ProfileRecipeCard from "./components/ProfileRecipeCard";
import { motion } from "framer-motion";
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
  const [showRecipe, setShowRecipe] = useState([]);

  const [name, setName] = useState("");
  const [showName, setShowName] = useState(false);
  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");
  const [showEmail, setShowEmail] = useState(false);
  const [emailError, setEmailError] = useState("");

  const [coverImage, setCoverImage] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
 const API_URL = "http://localhost:3000";
  // Image Upload Handler
  const handleImageUpload = async (e, type = "profile") => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Image = reader.result;

        // Update UI
        if (type === "cover") {
          setCoverImage(base64Image);
          setUser((prevUser) => ({
            ...prevUser,
            backgroundImage: base64Image,
          }));
        } else {
          setProfilePic(base64Image);
          setUser((prevUser) => ({
            ...prevUser,
            profileImage: base64Image,
          }));
        }

        // Build fresh FormData for each request
        const formData = new FormData();
        formData.append("image", file);
        formData.append("type", type);
        // formData.append("fullname", user.fullname || name);
        // formData.append("email", user.email || email);

        try {
          await axios.post(
            `${API_URL}/profile/updateProfile`,
            formData,
            {
              withCredentials: true,
            }
          );
          // console.log("Image uploaded and saved successfully");
        } catch (err) {
          console.error("Error saving image to backend:", err.message);
        }
      };
      reader.readAsDataURL(file); // Just for preview
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
  // Debounced Email Change
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

  const handleNameSubmit = async () => {
    try {
      if (!nameError) {
        setShowName(false);
      }

      const payload = {
        fullname: name,
        // email: email,
      };

      await axios.post(`${API_URL}/profile/updateName`, payload, {
        withCredentials: true,
      });

      console.log("data submitted name");
    } catch (err) {
      console.error("Error saving Input data to backend:", err.message);
    }
  };

  const handleEmailSubmit = async () => {
    try {
      if (!emailError) {
        setShowEmail(false);
      }

      const payload = {
        // fullname: name,
        email: email,
      };

      await axios.post(`${API_URL}/profile/updateEmail`, payload, {
        withCredentials: true,
      });

      console.log("data submitted email");
    } catch (err) {
      console.error("Error saving Input data to backend:", err.message);
    }
  };

  // show dynamic data of logged in user
  useEffect(() => {
    axios
      .get(`${API_URL}/profile/users`, {
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
  });
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/profile/profilerecipes`,
          {
            withCredentials: true,
          }
        );
        setShowRecipe(res.data); //  Now it's the actual data
      } catch (error) {
        console.log("Your recipes not found", error);
      }
    };

    fetchRecipes();
  });

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
            src={coverImage || user.backgroundImage} // Show uploaded image or default
            alt="Cover"
            className="w-full h-[300px] object-cover rounded-3xl shadow-lg"
            onClick={() =>
              setShowModal({
                show: true,
                image: coverImage || user.backgroundImage,
              })
            }
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
                src={profilePic || user.profilePic}
                alt="Profile"
                className="w-36 h-36 rounded-full border-4 border-white object-cover shadow-md hover:scale-105 transition-transform cursor-pointer"
                onClick={() =>
                  setShowModal({
                    show: true,
                    image: profilePic || user.profilePic,
                  })
                }
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleNameSubmit(); // No need to pass `e` or `values`
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    className={`text-xl uppercase font-bold outline-none transition-all duration-300 ${
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
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleEmailSubmit(); // No need to pass `e` or `values`
                  }}
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
        <Modal />

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
        <ProfileRecipeCard showRecipes={showRecipe} />

        <Footer />
      </div>
    </motion.div>
  );
};

export default Profile;
