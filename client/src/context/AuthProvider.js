import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let tokens = localStorage.getItem("token");
  tokens = JSON.parse(tokens);
  const [auth, setAuth] = useState(tokens || {});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
