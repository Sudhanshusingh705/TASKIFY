import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!auth.accessToken) {
      navigate("/login");
    }
  }, [auth, navigate]);

  return <Outlet />;
};

export default ProtectedRoute;
