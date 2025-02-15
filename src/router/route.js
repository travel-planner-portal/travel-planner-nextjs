import { createBrowserRouter } from "react-router-dom";
import Login from "../components/features/Login/Login";
import Home from "../pages/Home";
import DateSelectionPage from "../pages/DateSelectionPage";
import InterestsPage from "../pages/InterestsPage";
import TripsPage from "../pages/TripsPage";
import TripDetailsPage from "../pages/TripDetailsPage";
import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import SavedTripsPage from "../pages/SavedTripsPage";
import SavedTripDetailPage from "../pages/SavedTripDetailPage";
import ErrorBoundary from "../components/common/ErrorBoundary";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "discover/dates",
        element: <DateSelectionPage />,
      },
      {
        path: "/interests",
        element: <InterestsPage />,
      },
      {
        path: "discover/trips",
        element: <TripsPage />,
      },
      {
        path: "discover/trips/:id",
        element: <TripDetailsPage />,
      },
      {
        path: "/trip/:destination/:duration",
        element: <TripDetailsPage />,
      },
      {
        path: "saved-trips",
        element: (
          <ProtectedRoute>
            <SavedTripsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "saved-trips/:destination/:duration",
        element: (
          <ProtectedRoute>
            <SavedTripDetailPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
