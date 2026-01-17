import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "@/shared/routing/ProtectedRoute.tsx";
import LoginPage from "@/pages/login";
import RegisterPage from "@/pages/register";
import DashboardPage from "@/pages/dashboard";
import NotFound from "@/pages/not-found";
import EmotionWheelPage from "@/pages/emotion-wheel.tsx";

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
      path: "/emotion-wheel",
      element: (
          <ProtectedRoute>
              <EmotionWheelPage />
          </ProtectedRoute>
      )
    },
  {
    path: "*",
    element: <NotFound />,
  },
]);
