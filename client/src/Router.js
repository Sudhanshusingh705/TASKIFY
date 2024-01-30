import LogInPage from "./pages/LogInPage";
import SignUpPage from "./pages/SignUpPage";
import WelcomePage from "./pages/WelcomePage";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoute";
import DashBoard from "./pages/DashBoard";
import CollectionPage from "./pages/CollectionPage";

const Router = () => {
  return (
    <Routes>
      <Route index element={<WelcomePage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route path="/dashboard" element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashBoard />}>
          <Route
            path="/dashboard/collection/:collectionId"
            element={<CollectionPage />}
          />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
