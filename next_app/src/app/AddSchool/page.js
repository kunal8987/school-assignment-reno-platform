"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function AddSchool() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    image: "",
    email_id: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "School name is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.contact.trim()) {
      newErrors.contact = "Contact number is required";
    } else if (!/^\d{10}$/.test(formData.contact)) {
      newErrors.contact = "Contact number must be 10 digits";
    }

    if (!formData.email_id.trim()) {
      newErrors.email_id = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email_id)) {
      newErrors.email_id = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSuccessMessage("");

    try {
      const response = await fetch(
        "http://localhost:8000/api/schools/create/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            contact: parseInt(formData.contact),
          }),
        }
      );

      if (response.ok) {
        setSuccessMessage("School added successfully!");
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          contact: "",
          image: "",
          email_id: "",
        });
      } else {
        throw new Error("Failed to add school");
      }
    } catch (error) {
      setErrors({ submit: "Error adding school. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Add School - School Management</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 py-10 px-4 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-indigo-100">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 drop-shadow">
                Add New School
              </h1>
              <p className="text-gray-500 text-lg">
                Fill in the details below to add a new school to the system
              </p>
            </div>

            {successMessage && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg mb-6 text-center font-semibold">
                {successMessage}
              </div>
            )}

            {errors.submit && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6 text-center font-semibold">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-7">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-indigo-700 mb-2"
                >
                  School Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter school name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Address Field */}
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-semibold text-indigo-700 mb-2"
                >
                  Address *
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50 ${
                    errors.address ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter school address"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address}</p>
                )}
              </div>

              {/* City and State Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-semibold text-indigo-700 mb-2"
                  >
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50 ${
                      errors.city ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter city"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="state"
                    className="block text-sm font-semibold text-indigo-700 mb-2"
                  >
                    State *
                  </label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50 ${
                      errors.state ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Enter state"
                  />
                  {errors.state && (
                    <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                  )}
                </div>
              </div>

              {/* Contact and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-semibold text-indigo-700 mb-2"
                  >
                    Contact Number *
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50 ${
                      errors.contact ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="10-digit number"
                  />
                  {errors.contact && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.contact}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email_id"
                    className="block text-sm font-semibold text-indigo-700 mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email_id"
                    name="email_id"
                    value={formData.email_id}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50 ${
                      errors.email_id ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="email@example.com"
                  />
                  {errors.email_id && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.email_id}
                    </p>
                  )}
                </div>
              </div>

              {/* Image URL Field */}
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-semibold text-indigo-700 mb-2"
                >
                  Image URL
                </label>
                <input
                  type="url"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-indigo-50"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 disabled:from-indigo-300 disabled:to-blue-400 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isSubmitting ? "Adding School..." : "Add School"}
                </button>
              </div>
            </form>

            <div className="mt-10 text-center">
              <Link
                href="../ShowSchool"
                className="inline-block text-indigo-600 hover:text-indigo-800 font-semibold transition-colors duration-200 underline underline-offset-4"
              >
                View All Schools →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
