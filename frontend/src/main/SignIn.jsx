/**
 * SignIn component for user authentication
 * @component
 * @description Provides a sign-in form with email/password authentication and social login options.
 * Also includes a side panel with sign-up CTA for desktop view and mobile-optimized layout.
 *
 * @example
 * return (
 *   <SignIn />
 * )
 *
 * @returns {JSX.Element} A responsive sign-in page with form and decorative elements
 *
 * @property {Function} handleLogin - Async function that handles user login
 * @property {object} LoginSchema - Yup validation schema for the login form
 *
 * @requires react
 * @requires formik
 * @requires yup
 * @requires axios
 * @requires react-router
 * @requires react-icons/fa
 */
import React from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import SigninImage from "../assets/img/signin.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignIn = () => {
  let navigate = useNavigate();
  const API_URL = "http://localhost:3000";
  async function handleLogin(values) {
    try {
      const res = await axios.post(`${API_URL}/auth/login`, values, {
        withCredentials: true,
      });

      if (res.status === 200) {
        if (res.data.role === "admin") {
          navigate("/admin"); // Adjust route accordingly
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Login failed");
    }
  }

  const handleGoogle = async ({ credential }) => {
    try {
      // send the ID-token to backend
      const { data } = await axios.post(
        `${API_URL}/auth/google/token`,
        { id_token: credential },
        { withCredentials: true }      // ↞ so cookie comes back
      );

      // console.log(data.message);    // «Google auth OK»
      // navigate inside SPA, e.g.:
      navigate("/");
    } catch (err) {
      console.error("Google login failed", err.response?.data || err);
    }
  };

  return (
    <>
      <div className="min-h-screen font-[Montserrat] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden lg:h-[48rem]">
          {/* Left Side (Form) */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Logo */}
            <div className="text-center mb-6">
              <Link
                to="/"
                className="text-3xl sm:text-4xl text-red-700 font-[Leckerli_One] block hover:text-red-800 transition-colors"
              >
                Kocina
              </Link>
            </div>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-8">
              Sign In to Kocina
            </h2>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-6">
              {/* <button className="w-12 h-12 flex items-center justify-center border-2 rounded-full text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-all duration-300">
                <FaFacebookF size={20} />
              </button> */}
              
              <GoogleLogin 
                onSuccess={handleGoogle}
                onError={() => console.log("Login Failed")}
              />
              {/* <button className="w-12 h-12 flex items-center justify-center border-2 rounded-full text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                <FaLinkedinIn size={20} />
              </button> */}
            </div>

            <p className="text-center text-gray-500 mb-8">
              Or use your email account:
            </p>

            {/* Form */}
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              validationSchema={LoginSchema}
              onSubmit={(values) => handleLogin(values)}
            >
              {() => (
                <Form className="space-y-6">
                  <div className="space-y-2">
                    <Field
                      type="email"
                      placeholder="Email"
                      className="w-full px-6 py-4 border-2 rounded-full outline-none text-sm focus:border-red-500 transition-colors"
                      autoComplete="email"
                      name="email"
                      id="email"
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <Field
                      type="password"
                      placeholder="Min 8 characters"
                      className="w-full px-6 py-4 border-2 rounded-full outline-none text-sm focus:border-red-500 transition-colors"
                      autoComplete="current-password"
                      name="password"
                      id="password"
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  {/* <div className="text-right">
                    <Link
                      href="#"
                      className="text-sm text-gray-600 hover:text-red-700 hover:underline transition-colors"
                    >
                      Forgot your password?
                    </a>
                  </div> */}

                  <button
                    type="submit"
                    className="w-full bg-red-700 text-white py-4 rounded-full font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Sign In
                  </button>
                </Form>
              )}
            </Formik>
          </div>

          {/* Right Side (Image + Message) */}
          <div className="hidden md:flex flex-col items-center justify-center bg-gradient-to-br  text-white relative p-12">
            <div className="text-center z-10 max-w-md">
              <h2 className="text-3xl font-bold mb-4">Hello There, Join Us</h2>
              <p className="text-lg mb-8 opacity-90">
                Enter your personal details and join the cooking community
              </p>
              <Link
                to="/signup"
                className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-semibold hover:bg-white hover:text-red-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Sign Up
              </Link>
            </div>
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              <img
                src={SigninImage}
                alt="Background"
                className="w-full h-full object-cover mix-blend-overlay"
              />
            </div>
          </div>

          {/* Mobile Sign Up Button (shows only on mobile) */}
          <div className="md:hidden text-center py-6 bg-gray-50">
            <p className="mb-4 text-gray-600">Don't have an account?</p>
            <button className="bg-red-700 text-white py-3 px-8 rounded-full font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-300">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
