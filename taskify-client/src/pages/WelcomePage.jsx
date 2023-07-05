import React from "react";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const WelcomePage = () => {
  const { auth } = useAuth();
  if (auth.accessToken) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <div className=" mx-auto relative bg-gradient-to-r from-green-300 via-blue-500 to-purple-600">
      <div className=" relative mx-auto container flex flex-col items-center justify-center h-screen ">
        <div className="flex items-center gap-10 flex-col">
          <div className="text-4xl font-semibold text-center text-white">
            <p className="mb-2">Get organized </p>

            <p className="">and stay on track with </p>
          </div>
          <div className=" text-6xl font-bold text-yellow-300 ">Taskify</div>
        </div>
        <Link to="login">
          {" "}
          <button
            href="/"
            className="mt-10 inline-flex items-center justify-center h-12 px-12 text-lg font-medium tracking-wide text-white transition duration-200 bg-gray-900 rounded-lg hover:bg-gray-800 focus:shadow-outline focus:outline-none"
          >
            Next
            <svg
              class="w-4 h-4 ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
