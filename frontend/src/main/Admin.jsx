import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { ErrorMessage, Field, Form, Formik, FieldArray } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";

const CategorySchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Category name must be at least 3 characters")
    .required("Category name is required"),
  slug: Yup.string(),
  subcategories: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().required("Subcategory name is required"),
    })
  ),
});

const Admin = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/category/create",
        values,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error(error.response?.data?.message || "server error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-[Montserrat]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />

        <div className="bg-white p-8 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Add New Category
          </h2>

          <Formik
            initialValues={{ name: "", slug: "", subcategories: [] }}
            validationSchema={CategorySchema}
            onSubmit={handleSubmit}
          >
            {({ values }) => (
              <Form
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                method="POST"
              >
                {/* Category Name */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Category Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="e.g. Desserts, Main Dishes"
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>

                {/* Category Slug */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Category Slug
                  </label>
                  <Field
                    name="slug"
                    type="text"
                    placeholder="e.g. desserts"
                    className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                  />
                </div>

                {/* Subcategories FieldArray */}
                <div className="col-span-1 md:col-span-2">
                  <label className="block mb-2 font-medium text-gray-700">
                    Subcategories
                  </label>
                  <FieldArray name="subcategories">
                    {({ push, remove }) => (
                      <div className="space-y-3">
                        {values.subcategories.map((sub, index) => (
                          <div key={index}>
                            <div className="flex gap-2 items-center">
                              <Field
                                name={`subcategories[${index}].name`}
                                type="text"
                                placeholder="e.g. Cakes"
                                className="flex-1 px-4 py-2 border rounded-xl focus:ring-2 focus:ring-red-400 outline-none"
                              />

                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-xl"
                              >
                                Remove
                              </button>
                            </div>
                            <ErrorMessage
                              name={`subcategories[${index}].name`}
                              component="div"
                              className="text-red-500 mt-1 text-sm"
                            />
                          </div>
                        ))}
                        <button
                          type="button"
                          onClick={() => push({ name: "" })}
                          className="text-sm text-red-600 font-semibold"
                        >
                          + Add Subcategory
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Submit */}
                <div className="col-span-1 md:col-span-2">
                  <button
                    type="submit"
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold hover:bg-red-500 transition duration-300"
                  >
                    Add Category
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default Admin;
