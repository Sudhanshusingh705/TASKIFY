import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { signup } from "../utils/api";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(String);
  const { auth } = useAuth();
  const navigate = useNavigate();

  if (auth.accessToken) {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrMessage("");
    const user = {
      name,
      email,
      password,
    };
    try {
      const res = await signup(user);
      if (res.status === 200) {
        // localStorage.setItem("token", JSON.stringify(res.data));
        // setAuth(res.data);
        navigate("/login");
      } else {
        setErrMessage(res.response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center h-screen max-w-screen-xl mx-auto bg-slate-50">
      <div className=" w-[500px]  mx-auto  bg-white p-8 rounded-xl border shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <div className="mb-4 text-3xl font-semibold text-gray-800 text-center relative">
          Taskify SignUp
        </div>
        <Link to="/login">
          <div className="text-center text-black opacity-80">
            Already have an account?
            <div className="ml-2 text-indigo-600 font-semibold inline-flex space-x-1 items-center">
              <div>
                <span>LogIn </span>
              </div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </div>
          </div>
        </Link>
        <form onSubmit={handleSubmit} className="mt-5 mb-0">
          <div className="flex flex-col space-y-5">
            <label htmlFor="name">
              <p className="font-medium text-slate-700 pb-2">Full Name</p>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full py-3 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your name"
              />
            </label>
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full py-3 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full py-3 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
              />
            </label>
            <p className="text-red-600 text-xs">
              {errMessage && `* ${errMessage}`}
            </p>
            <button
              type="submit"
              className="w-full py-3 font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
            >
              <span>Signup</span>
              <svg
                className="w-5 h-5 ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
