import React, { useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const stepsLabels = ["Basic Info", "Ingredients", "Steps", "Image & Details"];

const validationSchemas = [
  Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
  }),
  Yup.object({
    ingredients: Yup.array()
      .of(Yup.string().required("Ingredient cannot be empty"))
      .min(1, "Add at least one ingredient"),
  }),
  Yup.object({
    stepsList: Yup.array()
      .of(Yup.string().required("Step cannot be empty"))
      .min(1, "Add at least one step"),
  }),
  Yup.object({
    image: Yup.mixed().required("Image is required"),
    category: Yup.string().required("Category is required"),
    tags: Yup.string().required("Tags are required"),
  }),
];
const Add_Recipe = () => {
  const [step, setStep] = useState(0);
  const [ingredients, setIngredients] = useState([""]);
  const [stepsList, setStepsList] = useState([""]);
  const [imagePreview, setImagePreview] = useState(null);
  const steps = ["Basic Info", "Ingredients", "Steps", "Extras"];

  // Handle tab navigation
  const nextStep = () =>
    setStep((prev) => Math.min(prev + 1, steps.length - 1));

  const prevStep = () => setStep((prev) => Math.max(prev - 1, 0));

  // Handle ingredients
  const handleIngredientChange = (index, value) => {
    const updated = [...ingredients];
    updated[index] = value;
    setIngredients(updated);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, ""]);
  };

  const removeIngredient = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  // Handle steps
  const handleStepChange = (index, value) => {
    const updated = [...stepsList];
    updated[index] = value;
    setStepsList(updated);
  };

  const addStep = () => {
    setStepsList([...stepsList, ""]);
  };

  const removeStep = (index) => {
    const updated = stepsList.filter((_, i) => i !== index);
    setStepsList(updated);
  };
  //handleImage
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

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
              tags: "",
            }}
            validationSchema={validationSchemas[step]}
            onSubmit={(values) => {
                console.log("Submitted:", values);
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
                  <div className="space-y-4"> {/* Added space-y-4 class */}
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

                    <Field
                      name="category"
                      placeholder="Category"
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="category"
                      component="div"
                      className="text-red-500 text-sm"
                    />

                    <Field
                      name="tags"
                      placeholder="Tags (comma separated)"
                      className={inputClass}
                    />
                    <ErrorMessage
                      name="tags"
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
                          setTouched(errors);
                        }
                      }}
                      className="px-6 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 text-sm font-semibold"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="px-6 py-2 rounded-full bg-green-600 text-white hover:bg-green-700 text-sm font-semibold"
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
