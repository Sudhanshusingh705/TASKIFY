import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { login } from "../utils/api";

const LogInPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMessage, setErrMessage] = useState(String);

  useEffect(() => {
    if (auth.accessToken) {
      navigate("/dashboard");
    }
  }, [auth, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrMessage("");
    const user = {
      email,
      password,
    };
    try {
      const res = await login(user);
      if (res.status === 200) {
        localStorage.setItem("token", JSON.stringify(res.data));
        setAuth(res.data);
        navigate("/dashboard");
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
          Taskify LogIn
        </div>
        <Link to="/signup">
          <div className="text-center text-black opacity-80">
            Don't have an account yet?
            <div className="ml-2 text-indigo-600 font-semibold inline-flex space-x-1 items-center">
              <div>
                <span>SignUp </span>
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
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Email address</p>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                className="w-full py-3 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter email address"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
            <label htmlFor="password">
              <p className="font-medium text-slate-700 pb-2">Password</p>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                className="w-full py-3 border border-slate-300 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="Enter your password"
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>
            <p className="text-red-600 text-xs">
              {errMessage && `* ${errMessage}`}
            </p>

            <button
              className="w-full py-3 font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center"
              type="submit"
            >
              <span>Login</span>
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

export default LogInPage;
