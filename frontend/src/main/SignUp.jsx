import {React,useState} from "react";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa";
import SignupImage from "../assets/img/signup.jpg";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(3, "Full Name must be at least 3 characters")
    .required("Full Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

const SignUp = () => {

  async function handleSubmit(values) {
    try {
      const res = await axios.post("http://localhost:3000/auth/register", values,{
        withCredentials: true //this is critical for setting cookies!
      });
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "Registration failed");
    }
  }
  
  return (
    <>
      <div className="min-h-screen font-[Montserrat] flex items-center justify-center p-4">
        <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-2xl overflow-hidden lg:h-[48rem]">
          {/* Left Side (Form) */}
          <div className="p-6 sm:p-8 lg:p-12">
            {/* Logo */}
            <div className="text-center mb-6">
              <a
                href="/"
                className="text-3xl sm:text-4xl text-red-700 font-[Leckerli_One] block hover:text-red-800 transition-colors"
              >
                Kocina
              </a>
            </div>

            {/* Heading */}
            <h2 className="text-xl sm:text-2xl font-semibold text-center mb-8">
              Sign In to Kocina
            </h2>

            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-6">
              <button className="w-12 h-12 flex items-center justify-center border-2 rounded-full text-[#3b5998] hover:bg-[#3b5998] hover:text-white transition-all duration-300">
                <FaFacebookF size={20} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center border-2 rounded-full text-[#dd4b39] hover:bg-[#dd4b39] hover:text-white transition-all duration-300">
                <FaGooglePlusG size={24} />
              </button>
              <button className="w-12 h-12 flex items-center justify-center border-2 rounded-full text-[#0077b5] hover:bg-[#0077b5] hover:text-white transition-all duration-300">
                <FaLinkedinIn size={20} />
              </button>
            </div>

            <p className="text-center text-gray-500 mb-8">
              Or use your email for registration:
            </p>

            {/* Form */}
            <Formik
              initialValues={{
                fullname: "",
                email: "",
                password: "",
              }}
              validationSchema={SignUpSchema}
              onSubmit={(values) => handleSubmit(values)}
            >
              {() => (
                <Form
                  className="space-y-6"
                  method="POST"
                >
                  <div className="space-y-2">
                    <Field
                      type="text"
                      className="w-full px-6 py-4 border-2 rounded-full outline-none text-sm focus:border-red-500 transition-colors"
                      autoComplete="name"
                      name="fullname"
                      placeholder="Fullname"
                      id="fullname"
                    />
                    <ErrorMessage
                      name="fullname"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
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
                  <button
                    type="submit"
                    className="w-full bg-red-700 text-white py-4 rounded-full font-semibold hover:bg-red-600 transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Sign Up
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
              <a
                href="/signin"
                className="bg-transparent border-2 border-white text-white py-3 px-8 rounded-full font-semibold hover:bg-white hover:text-red-700 transform hover:scale-[1.02] transition-all duration-300"
              >
                Sign In
              </a>
            </div>
            {/* Background Image with Overlay */}
            <div className="absolute inset-0  z-0">
              <img
                src={SignupImage}
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

export default SignUp;
