import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be at least 3 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(100, "Message must be at least 100 characters")
    .required("Message is required"),
});
const Contact = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-[Montserrat]">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-10">
        <Header />

        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Text Side */}
            <div>
              <h2 className="text-4xl font-bold mb-6 text-[#191919]">
                Hello, what's on your mind?
              </h2>
              <p className="text-gray-700 mb-6">
                Credibly administrate market positioning deliverables rather
                than clicks-and-mortar methodologies. Proactively formulate
                out-of-the-box technology with clicks-and-mortar testing
                procedures. Uniquely promote leveraged web-readiness for
                standards compliant value. Rapidiously pontificate cooperative
                mindshare via maintainable applications.
              </p>
              <button className="bg-red-700 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-full transition-all duration-300">
                Schedule a call
              </button>
            </div>

            {/* Right Form Side */}
            <div className="bg-gray-300 text-white p-8 rounded-2xl">
              <Formik
                initialValues={{
                  name: "",
                  email: "",
                  message: "",
                }}
                validationSchema={ContactSchema}
                onSubmit={(values) => {
                  // handle login
                  console.log(values); // or use Axios
                }}
              >
                {() => (
                  <Form className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block mb-1 text-black font-semibold"
                      >
                        Name
                      </label>
                      <Field
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-2 rounded-full text-black bg-white border border-white placeholder-white/70 outline-none"
                        placeholder="Your name"
                      />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-1 text-black font-semibold"
                      >
                        Email
                      </label>
                      <Field
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-2 rounded-full bg-white text-black border border-white placeholder-white/70 outline-none"
                        placeholder="Your email"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block mb-1 text-black font-semibold"
                      >
                        Message
                      </label>
                      <Field
                        as="textarea"
                        id="message"
                        name="message"
                        rows="4"
                        className="w-full px-4 py-3 rounded-xl bg-white  border border-white placeholder-white/70 text-black outline-none"
                        placeholder="Your message"
                      />
                      <ErrorMessage
                        name="message"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-yellow-400 hover:bg-yellow-300 text-black font-semibold px-6 py-2 rounded-full transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
};

export default Contact;
