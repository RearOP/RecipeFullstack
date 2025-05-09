import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router";
const stepsLabels = [
  "Title & Description",
  "Ingredients",
  "Steps",
  "Extras",
];

const validationSchemas = [
  Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  }),
  Yup.object({
    ingredients: Yup.array()
      .of(Yup.string())
      .test(
        "not-empty",
        "Add at least one ingredient",
        (arr) => arr && arr.some((item) => item && item.trim() !== "")
      )
      .min(1, "Add at least one ingredient"),
  }),
  Yup.object({
    stepsList: Yup.array()
      .of(Yup.string())
      .test(
        "not-empty",
        "Add at least one step",
        (arr) => arr && arr.some((item) => item && item.trim() !== "")
      )
      .min(1, "Add at least one step"),
  }),
  Yup.object({
    image: Yup.mixed().required("Image is required"),
    category: Yup.string().required("Category is required"),
    subcategory: Yup.string().required("Sub category is required"),
    activeTime: Yup.string().required("Active Time is required"),
    totalTime: Yup.string().required("Total Time is required"),
    servings: Yup.string().required("Serves is required"),
  }),
];

const Add_Recipe = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const steps = ["Title & Description", "Ingredients", "Steps", "Extras"];

  // Handle tab navigation
  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  async function handelSubmit(values) {
    // console.log("Submitting:", {
    //   title: values.title,
    //   description: values.description,
    //   ingredients: values.ingredients,
    //   steps: values.stepsList,
    //   category: values.category,
    //   image: values.image,
    // });
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("category", values.category);
    formData.append("subcategory", values.subcategory);
    formData.append("activeTime", values.activeTime);
    formData.append("totalTime", values.totalTime);
    formData.append("servings", values.servings);

    formData.append("image", values.image);
    // Convert ingredients and stepsList to JSON strings
    formData.append("ingredients", JSON.stringify(values.ingredients));
    formData.append("steps", JSON.stringify(values.stepsList));

    try {
      const res = await axios.post(
        "http://localhost:3000/recipe/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.status === 201) {
        // console.log("recipe created");
        navigate("/"); // Uncomment if you're using react-router
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log("not submitted", err);
    }
  }
  //Show Categories in options
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/category/showcategory",
          {
            withCredentials: true,
          }
        );
        setCategories(res.data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="min-h-screen font-[Montserrat] bg-gray-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />
        <div className="p-6 sm:p-8 lg:p-12 bg-white mt-8 rounded-2xl shadow-md">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Add Your Recipe
          </h1>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {stepsLabels.map((label, index) => (
              <button
                key={index}
                onClick={() => setStep(index)}
                className={`px-4 py-2 text-sm font-semibold rounded-full border ${
                  step === index
                    ? "bg-red-600 text-white"
                    : "bg-white text-red-600 border-red-600"
                } transition-all duration-200`}
              >
                {label}
              </button>
            ))}
          </div>

          <Formik
            initialValues={{
              title: "",
              description: "",
              ingredients: [""],
              stepsList: [""],
              image: null,
              category: "",
              subcategory: "", 
              activeTime: "",
              totalTime: "",
              servings: "",
            }}
            validationSchema={validationSchemas[step]}
            onSubmit={async (values, { setSubmitting }) => {
              // console.log("Submitting values:", values);
              await handelSubmit(values);
              setSubmitting(false);
            }}
          >
            {({ values, setFieldValue, validateForm, setTouched }) => (
              <Form className="space-y-6">
                {step === 0 && (
                  <div className="grid gap-6">
                    <Field
                      name="title"
                      placeholder="Recipe Title"
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                    <Field
                      as="textarea"
                      name="description"
                      placeholder="Description"
                      rows={4}
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                {step === 1 && (
                  <div className="space-y-4">
                    {" "}
                    {/* Added space-y-4 class */}
                    {values.ingredients.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Field
                          name={`ingredients[${index}]`}
                          placeholder={`Ingredient ${index + 1}`}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        {values.ingredients.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                "ingredients",
                                values.ingredients.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("ingredients", [
                          ...values.ingredients,
                          "",
                        ])
                      }
                      className="text-sm text-red-600 hover:text-red-800 font-medium mt-2"
                    >
                      + Add Ingredient
                    </button>
                    <ErrorMessage
                      name="ingredients"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-4">
                    {values.stepsList.map((stepItem, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <Field
                          name={`stepsList[${index}]`}
                          placeholder={`Step ${index + 1}`}
                          className="w-full px-4 py-2 border rounded-lg"
                        />
                        {values.stepsList.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                "stepsList",
                                values.stepsList.filter((_, i) => i !== index)
                              )
                            }
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() =>
                        setFieldValue("stepsList", [...values.stepsList, ""])
                      }
                      className="text-sm text-red-600 hover:text-red-800 font-medium mt-2"
                    >
                      + Add Step
                    </button>
                    <ErrorMessage
                      name="stepsList"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                {step === 3 && (
                  <div className="grid gap-6">
                    {/* Image Upload */}
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.currentTarget.files[0];
                        setFieldValue("image", file);
                        setImagePreview(URL.createObjectURL(file));
                      }}
                      className="hidden"
                    />
                    <label
                      htmlFor="imageUpload"
                      className="cursor-pointer px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all text-sm font-medium"
                    >
                      Choose Image
                    </label>
                    <span className="text-sm text-gray-500">
                      {imagePreview ? "Image Selected" : "No image chosen"}
                    </span>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        className="w-40 h-40 rounded-xl shadow"
                        alt="preview"
                      />
                    )}

                    {/* Category Select */}
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Category
                      </label>
                      <select
                        name="category"
                        value={values.category}
                        onChange={(e) => {
                          setFieldValue("category", e.target.value);
                          setFieldValue("subcategory", ""); // Reset subcategory when category changes
                        }}
                        className={inputClass}
                      >
                        <option value="" disabled >
                          Select Category
                        </option>
                        {categories.map((cat) => (
                          <option key={cat._id} value={cat.name}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                      <ErrorMessage
                        name="category"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    {/* subcategory Select (Only if selected category has subcategories) */}
                    {categories.find((c) => c.name === values.category)
                      ?.subcategories?.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Sub-Category
                        </label>
                        <select
                          name="subcategory"
                          value={values.subcategory}
                          onChange={(e) =>
                            setFieldValue("subcategory", e.target.value)
                          }
                          className={inputClass}
                        >
                          <option value="" disabled>
                            Select Sub-Category
                          </option>
                          {categories
                            .find((c) => c.name === values.category)
                            ?.subcategories.map((sub, i) => (
                              <option key={i} value={sub.name}>
                                {sub.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}

                    {/* Other Fields */}
                    <Field
                      name="activeTime"
                      placeholder="e.g. 20 mins"
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="activeTime"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <Field
                      name="totalTime"
                      placeholder="e.g. 50 mins"
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="totalTime"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <Field
                      name="servings"
                      placeholder="Serves 4"
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="servings"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                )}

                <div className="flex justify-between pt-4">
                  <button
                    type="button"
                    onClick={prevStep}
                    disabled={step === 0}
                    className="px-4 py-2 rounded-full bg-gray-300 hover:bg-gray-400 text-sm font-semibold disabled:opacity-50"
                  >
                    Back
                  </button>

                  {step < stepsLabels.length - 1 ? (
                    <button
                      type="button"
                      onClick={async () => {
                        const errors = await validateForm();
                        if (Object.keys(errors).length === 0) {
                          nextStep();
                        } else {
                          setTouched(
                            Object.keys(errors).reduce((acc, key) => {
                              acc[key] = true;
                              return acc;
                            }, {})
                          );
                        }
                      }}
                      className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 text-sm font-semibold transition-colors duration-300"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 text-sm font-semibold transition-colors duration-300"
                    >
                      Submit Recipe
                    </button>
                  )}
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

export default Add_Recipe;

// Tailwind helper
const inputClass =
  "w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm focus:outline-none focus:ring-2 focus:ring-red-400";

// Add this to your tailwind config or use Tailwind classnames in JSX directly
