"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/schools/");
      if (!response.ok) {
        throw new Error("Failed to fetch schools");
      }
      const data = await response.json();
      setSchools(data);
    } catch (err) {
      setError("Error loading schools. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const filteredSchools = schools.filter(
    (school) =>
      school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.state.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading schools...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Browse Schools - School Directory</title>
        <script src="https://cdn.tailwindcss.com"></script>
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100">
        {/* Header */}
        <header className="bg-white shadow-lg rounded-b-3xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="text-center md:text-left mb-4 md:mb-0">
                <h1 className="text-4xl font-extrabold text-indigo-700 drop-shadow">
                  School Directory
                </h1>
                <p className="text-gray-500 mt-2 text-lg">
                  Discover educational institutions across the country
                </p>
              </div>
              <Link
                href="../AddSchool"
                className="bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow transition-all duration-200 inline-flex items-center justify-center"
              >
                + Add New School
              </Link>
            </div>
          </div>
        </header>

        {/* Search Section */}
        <div className="bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-indigo-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search by school name, city, or state..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-400 focus:border-transparent bg-indigo-50 text-gray-800"
              />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl mb-6 shadow">
              {error}
            </div>
          )}

          {filteredSchools.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-indigo-200 mb-4">
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h2m-9 0H9m3 0h2m-2 0h2m-2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-indigo-700 mb-2">
                No schools found
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Be the first to add a school!"}
              </p>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <p className="text-gray-500 text-lg">
                  Showing <span className="font-bold text-indigo-700">{filteredSchools.length}</span> of <span className="font-bold">{schools.length}</span> schools
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredSchools.map((school) => (
                  <div
                    key={school.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden group border border-indigo-100"
                  >
                    {/* School Image */}
                    <div className="relative overflow-hidden">
                      <Image
                        src={school.image}
                        alt={`${school.name} campus building exterior with modern architecture`}
                        width={400}
                        height={300}
                        className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src =
                            "https://placehold.co/400x300/e5e7eb/9ca3af?text=School+Image";
                        }}
                      />
                      <div className="absolute bg-indigo-900 bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-indigo-700 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                        {school.name}
                      </h3>

                      <div className="space-y-2 text-gray-600">
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 mt-1 mr-2 flex-shrink-0 text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="text-sm line-clamp-2">
                            {school.address}
                          </span>
                        </div>

                        <div className="flex items-center">
                          <svg
                            className="w-5 h-5 mr-2 flex-shrink-0 text-indigo-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h2m-9 0H9m3 0h2m-2 0h2m-2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4m-4 0h4"
                            />
                          </svg>
                          <span className="text-sm">
                            {school.city}, {school.state}
                          </span>
                        </div>
                      </div>

                      {/* View Details Button */}
                      <div className="mt-6 pt-4 border-t border-indigo-100">
                        <button className="w-full bg-gradient-to-r from-indigo-50 to-blue-100 hover:from-indigo-100 hover:to-blue-200 text-indigo-700 font-semibold py-2 px-4 rounded-xl transition-colors duration-200 text-base shadow">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white border-t mt-16 rounded-t-3xl shadow-inner">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center text-gray-500 text-lg">
              <p>© 2024 School Directory. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
}
