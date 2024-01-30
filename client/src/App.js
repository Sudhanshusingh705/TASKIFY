import React from "react";
import { AuthProvider } from "./context/AuthProvider";
import Router from "./Router";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </div>
  );
};

export default App;
