import { React, useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { motion } from "framer-motion";
import { FaReply, FaTrash } from "react-icons/fa";
import { FaPencil, FaRegPaperPlane } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { FiClock, FiRefreshCw, FiUsers } from "react-icons/fi";
import StarRatings from "react-star-ratings";
import axios from "axios";
import { useParams } from "react-router";
import OtherRecipes from "./components/OtherRecipes";

const RecipeDetails = () => {
  const { id } = useParams();
  const [rating, setRating] = useState();
  const [result, setResult] = useState({});
  const [showcomments, setShowcomments] = useState([]);
  const [replyingTo, setReplyingTo] = useState(null); // holds index or ID of comment being replied to
  const [replyText, setReplyText] = useState("");
  const [CommentEditId, setCommentEditId] = useState(null);
  const [editingReplyId, setEditingReplyId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  const showComment = async () => {
    try {
      const showcom = await axios.get(`http://localhost:3000/comments/${id}`, {
        withCredentials: true,
      });
      setShowcomments(showcom.data.comments);
    } catch (err) {
      console.error(
        "Failed to fetch recipe:",
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/check", {
          withCredentials: true,
        });
        setIsLoggedIn(res.data); // If logged in, set state with user data
      } catch (err) {
        console.error("Auth check failed:", err.message);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    showComment();
  }, []);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/recipe/recipeDetails/${id}`,
          {
            withCredentials: true,
          }
        );
        setResult(res.data);
        // console.log(res.data);
      } catch (err) {
        console.error(
          "Failed to fetch recipe:",
          err.response?.data || err.message
        );
      }
    };

    fetchRecipe();
  }, [id]);

  useEffect(() => {
    const fetchUserRating = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/rating/user/${id}`, {
          withCredentials: true,
        });
        setRating(res.data.rating); // Set the user's own rating
      } catch (err) {
        console.error(
          "Failed to fetch user rating",
          err.response?.data || err.message
        );
      }
    };

    fetchUserRating();
  }, [id]);

  const AddRating = async (newRating) => {
    try {
      const reciperating = await axios.post(
        `http://localhost:3000/rating/giverating/${id}`,
        {
          rating: newRating,
        },
        { withCredentials: true }
      );
      // console.log("Rating submitted:", reciperating.data);
    } catch (error) {
      console.error(
        "Failed to give rating",
        error.response?.data || error.message
      );
    }
  };

  const saveRecipe = async (recipeId, userId) => {
    try {
      const recipsave = await axios.post(
        "http://localhost:3000/recipe/saveRecipeForUser",
        { recipeId, userId }, // This is the data being sent
        { withCredentials: true } // This is config (for cookies/auth)
      );
      // console.log("Recipe saved:", recipsave.data);
    } catch (error) {
      console.error(
        "Failed to save recipe:",
        error.response?.data || error.message
      );
    }
  };

  const handleMainCommentSubmit = async (text) => {
    const res = await axios.post(
      "http://localhost:3000/comments/writecomment",
      {
        recipeId: id,
        user: IsLoggedIn.user.id,
        text,
      },
      { withCredentials: true }
    );
    showComment();
  };

  const handleReplySubmit = async (commentIndex, replyText) => {
    const commentId = showcomments[commentIndex]._id;

    const res = await axios.post(
      `http://localhost:3000/comments/reply/${commentId}`,
      {
        user: IsLoggedIn.user.id,
        text: replyText,
      },
      { withCredentials: true }
    );

    // const updatedComments = [...showcomments];
    // updatedComments[commentIndex] = res.data.comment;
    // console.log(res.data.comment);
    showComment();
  };

  const Deletereply = async (replyId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/comments/replydelete/${replyId}`,
        {
          user: IsLoggedIn.user.id,
        },
        { withCredentials: true }
      );

      // Refresh or remove the reply from state here
      // console.log("Reply deleted", res.data);
      showComment();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const editReply = async (commentIndex, replyIndex, replyText) => {
    const comment = showcomments[commentIndex];
    if (!comment) return;

    const reply = comment.replies[replyIndex];
    if (!reply) return;

    const replyId = reply._id;
    // console.log(replyId);

    try {
      const res = await axios.post(
        `http://localhost:3000/comments/replyedit/${replyId}`,
        {
          user: IsLoggedIn.user.id,
          text: replyText,
        },
        { withCredentials: true }
      );
      // console.log(res.data);
      showComment();
    } catch (error) {
      console.error("Failed to edit reply:", error);
    }
  };

  const editComment = async (commentIndex, replyText) => {
    const comment = showcomments[commentIndex];
    if (!comment) return;

    const commentId = comment._id;

    try {
      const res = await axios.post(
        `http://localhost:3000/comments/editcomment/${commentId}`,
        {
          user: IsLoggedIn.user.id,
          text: replyText,
        },
        { withCredentials: true }
      );
      showComment();
      // console.log(res.data);

      // if (res.data.success) {
      //   const updatedComments = [...showcomments];
      //   updatedComments[commentIndex] = {
      //     ...comment,
      //     text: replyText,
      //   };
      //   setShowcomments(updatedComments);
      // }
    } catch (error) {
      console.error("Failed to edit comment:", error);
    }
  };

  const DeleteComment = async (commentId) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/comments/deleteComment/${commentId}`,
        {
          user: IsLoggedIn.user.id,
        },
        { withCredentials: true }
      );

      // console.log("Comment deleted", res.data);
      showComment();
    } catch (err) {
      console.error("Delete failed:", err.response?.data || err.message);
    }
  };

  const recipeId = result._id;
  const userId = IsLoggedIn?.user?.id;
  if (!result || !IsLoggedIn?.user) return <div>Loading...</div>;
  // console.log(userId);

  return (
    <div className="min-h-screen font-[Montserrat] bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />

        {/* Recipe Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {/* Left: Image */}
          <div>
            <img
              src={result.imageUrl}
              alt="Recipe"
              name="image"
              className="rounded-xl object-cover w-full max-h-[330px]"
            />
          </div>

          {/* Right: Title and Info */}
          <div className="text-center md:text-left">
            <h1 className="text-5xl font-semibold leading-14 mb-2">
              {result.title}
            </h1>

            <p className="text-sm text-gray-500">{result.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 text-center mt-8 border-t border-gray-200 pt-6 gap-y-6 sm:gap-y-0">
              {/* Active Time */}
              <div className="flex flex-col items-center gap-1">
                <FiClock size={24} className="text-gray-700" />
                <span className="font-semibold">Active Time</span>
                <span className="text-gray-500 text-sm">
                  {result.activeTime}
                </span>
              </div>

              {/* Total Time */}
              <div className="flex flex-col items-center gap-1 border-t sm:border-t-0 sm:border-l sm:border-r border-gray-200 sm:px-4">
                <FiRefreshCw size={24} className="text-gray-700" />
                <span className="font-semibold">Total Time</span>
                <span className="text-gray-500 text-sm">
                  {result.totalTime}
                </span>
              </div>

              {/* Yield */}
              <div className="flex flex-col items-center gap-1">
                <FiUsers size={24} className="text-gray-700" />
                <span className="font-semibold">Yield</span>
                <span className="text-gray-500 text-sm">
                  Serves {result.servings}
                </span>
              </div>
            </div>
            <div className="createdby flex items-center justify-between">
              <p className="text-md text-gray-600 mt-5">
                Created By
                <span className="text-red-600 px-1">
                  {result?.createdBy?.fullname}
                </span>
              </p>
              <button
                className="bg-transparentoverflow-hidden"
                title="Save Recipe"
                onClick={() => saveRecipe(recipeId, userId)}
              >
                <CiBookmark className="h-6 w-6" />
              </button>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">2 recipes</p>

              {/* Rating Component */}
              <div className="flex items-center gap-1">
                <form method="post">
                  <div style={{ marginTop: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "6px",
                        fontWeight: "500",
                        color: "#333",
                      }}
                    >
                      Your Rating
                    </label>
                    <StarRatings
                      rating={rating}
                      starRatedColor="#FFD700"
                      changeRating={(newRating) => {
                        setRating(newRating);
                        AddRating(newRating);
                      }}
                      numberOfStars={5}
                      name="user-rating"
                      starDimension="20px"
                      starSpacing="2px"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Instructions & Ingredients */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
          <div>
            <h2 className="text-xl font-semibold mb-4">How to Make It</h2>
            {result?.steps?.map((stepText, index) => (
              <div key={index} className="mb-6">
                <h4 className="text-md font-bold text-red-600">
                  Step {index + 1}
                </h4>
                <p className="text-sm text-gray-700 mt-1">{stepText}</p>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Category</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>{result.category}</li>
            </ul>
            <h2 className="text-xl font-semibold mb-4 mt-4">Sub-Category</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              <li>{result.subcategory}</li>
            </ul>
            <h2 className="text-xl font-semibold mb-4 mt-4">Ingredients</h2>
            <ul className="list-disc list-inside text-sm text-gray-700 space-y-2">
              {result?.ingredients?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-16">
          <h2 className="flex justify-between items-center text-xl font-bold mb-4">
            Comments
            <span className="text-sm font-normal">
              {" "}
              {showcomments.reduce(
                (total, comment) => total + (comment.replies?.length || 0),
                0
              ) + showcomments.length}
            </span>
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {showcomments.length === 0 ? (
              <p className="text-gray-500 text-sm">
                No comments yet. Be the first!
              </p>
            ) : (
              showcomments.map((comment, commentIndex) => (
                <div
                  key={comment._id}
                  className="bg-white shadow-md p-4 rounded-xl"
                >
                  <div className="flex items-center gap-4 md:gap-5">
                    <img
                      src={comment.user.profilePic}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <h4 className="font-bold text-gray-800 text-sm md:text-base">
                      {comment.user.fullname}
                    </h4>
                  </div>

                  <div className="flex items-center justify-end gap-4 md:gap-5 mt-2 md:mt-0">
                    <FaReply
                      className="text-md text-gray-400 cursor-pointer"
                      onClick={() => {
                        setReplyingTo(commentIndex);
                        setReplyText("");
                      }}
                    />
                    {comment.user._id === IsLoggedIn.user.id && (
                      <>
                        <FaPencil
                          className="text-md text-green-600 cursor-pointer"
                          onClick={() => {
                            setCommentEditId(comment._id);
                            setReplyText(comment.text);
                          }}
                        />
                        <FaTrash
                          className="text-md text-red-400 cursor-pointer"
                          onClick={() => DeleteComment(comment._id)} // You'll need to implement this
                        />
                      </>
                    )}
                  </div>

                  {IsLoggedIn?.user && CommentEditId === comment._id ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        editComment(commentIndex, replyText);
                        setCommentEditId(null);
                        setReplyText("");
                      }}
                      className="mt-3 ml-6 flex items-center justify-between"
                    >
                      <textarea
                        className="px-5 py-2 w-[70%] rounded-md border-2 border-gray-400 outline-none resize-none"
                        rows="2"
                        placeholder="Edit your reply..."
                        value={replyText}
                        onChange={(x) => setReplyText(x.target.value)}
                      />
                      <button
                        type="submit"
                        className="flex items-center px-4 py-1 border bg-black text-white rounded-full hover:bg-red-700 transition-all duration-500"
                      >
                        <span className="mr-2">
                          <FaRegPaperPlane />
                        </span>
                        Send
                      </button>
                    </form>
                  ) : (
                    <p className="text-sm text-gray-600 mt-2 md:mt-0">
                      {comment.text}
                    </p>
                  )}

                  {/* Replies */}
                  {comment.replies?.map((reply, replyIndex) => (
                    <div
                      key={reply._id}
                      className="ml-6 mt-4 border-l-3 border-gray-500 pl-4"
                    >
                      <div className="flex items-center gap-4 md:gap-5">
                        <img
                          src={reply.user.profilePic}
                          alt="Profile"
                          className="w-7 h-7 rounded-full object-cover"
                        />
                        <h5 className="font-semibold text-gray-700 text-xs md:text-base">
                          {reply.user.fullname}
                        </h5>
                      </div>

                      <div className="flex items-center justify-end gap-4 md:gap-5 mt-2 md:mt-0">
                        {reply.user._id === IsLoggedIn.user.id && (
                          <>
                            <FaPencil
                              className="text-md text-green-600 cursor-pointer"
                              onClick={() => {
                                setEditingReplyId(reply._id);
                                setReplyText(reply.text);
                              }}
                            />
                            <FaTrash
                              className="text-md text-red-400 cursor-pointer"
                              onClick={() => Deletereply(reply._id)}
                            />
                          </>
                        )}
                      </div>

                      {IsLoggedIn?.user && editingReplyId === reply._id ? (
                        <form
                          onSubmit={(x) => {
                            x.preventDefault();
                            editReply(commentIndex, replyIndex, replyText);
                            setEditingReplyId(null);
                            setReplyText("");
                          }}
                          className="mt-3 ml-6 flex items-center justify-between"
                        >
                          <textarea
                            className="px-5 py-2 w-[70%] rounded-md border-2 border-gray-400 outline-none resize-none"
                            rows="2"
                            placeholder="Edit your reply..."
                            value={replyText}
                            onChange={(x) => setReplyText(x.target.value)}
                          />
                          <button
                            type="submit"
                            className="flex items-center px-4 py-1 border bg-black text-white rounded-full hover:bg-red-700 transition-all duration-500"
                          >
                            <span className="mr-2">
                              <FaRegPaperPlane />
                            </span>
                            Send
                          </button>
                        </form>
                      ) : (
                        <p className="text-sm text-gray-600 mt-3 md:mt-2">
                          {reply.text}
                        </p>
                      )}
                    </div>
                  ))}

                  {/* Reply form */}
                  {IsLoggedIn?.user && replyingTo === commentIndex && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleReplySubmit(commentIndex, replyText);
                        setReplyText("");
                        setReplyingTo(null);
                      }}
                      className="mt-3 ml-6 flex items-center justify-between"
                    >
                      <textarea
                        className="px-5 py-2 w-[70%] rounded-md border-2 border-gray-400 outline-none resize-none"
                        rows="2"
                        placeholder="Write your reply..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                      />
                      <button
                        type="submit"
                        className="flex items-center px-4 py-1 border bg-black text-white rounded-full hover:bg-red-700 transition-all duration-500"
                      >
                        <span className="mr-2">
                          <FaRegPaperPlane />
                        </span>
                        Send
                      </button>
                    </form>
                  )}
                </div>
              ))
            )}

            {/* Main comment form */}
            {IsLoggedIn?.user && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMainCommentSubmit(commentText);
                  setCommentText("");
                }}
              >
                <div className="flex items-center justify-between">
                  <textarea
                    className="px-5 py-2 w-[70%] rounded-md border-2 border-gray-400 outline-none resize-none"
                    placeholder="Write a comment"
                    rows="3"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    type="submit"
                    className="flex items-center px-4 py-1 border bg-black text-white rounded-full hover:bg-red-700 transition-all duration-500"
                  >
                    <span className="mr-2">
                      <FaRegPaperPlane />
                    </span>
                    Send
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>

        {/* Other Recipes Section */}
        <OtherRecipes />

        <Footer />
      </div>
    </div>
  );
};

export default RecipeDetails;
