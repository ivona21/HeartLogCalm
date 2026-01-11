import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import DashboardPage from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import EmotionsWheelPage from "@/pages/emotions-wheel.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
    {
      path: "/emotions-wheel",
      element: (
          <ProtectedRoute>
              <EmotionsWheelPage />
          </ProtectedRoute>
      )
    },
  {
    path: "*",
    element: <NotFound />,
  },
]);
