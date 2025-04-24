import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Header from "./components/custom/Header.tsx";
import { Toaster } from "./components/ui/sonner.tsx";
import Register from "./components/custom/Register.tsx";
import Login from "./components/custom/Login.tsx";
import TripDetails from "./components/custom/tripDetails.tsx";
import MyTrips from "./components/custom/MyTrips.tsx";
import LandingPage from "./components/custom/LandingPage.tsx";
import CreateTripNew from "./components/custom/createTripNew.tsx";
import Contact from "./components/custom/Contact.tsx";
import PrivacyPolicy from "./components/custom/PrivacyPolicy.tsx";
import TermsOfService from "./components/custom/TermsOfService.tsx";
import ProtectedRoute from "./components/custom/ProtectedRoute.tsx";
// Create a layout component that conditionally renders Header
const RootLayout = () => {
  const location = useLocation();

  // List of paths where Header should not be shown
  const noHeaderPaths = ["/login", "/", "/register", "/landing"];

  return (
    <>
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Outlet />
    </>
  );
};

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/register",
        element: (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
              <Register />
            </div>
          </div>
        ),
      },
      {
        path: "/login",
        element: (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
              <Login />
            </div>
          </div>
        ),
      },
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/home",
        element: <App />,
      },
      {
        path: "/create-trip-new",
        element: <CreateTripNew />,
      },

      {
        path: "/trip-details/:tripId",
        element: <TripDetails />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/saved-trips",
        element: <MyTrips />,
      },
      {
        path: "/privacy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms",
        element: <TermsOfService />,
      },
      {
        path: "/trip/:tripId",
        element: (
          <ProtectedRoute>
            <TripDetails />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId="1075418359786-c91d8abaaaspc4dmkta33uo4chjcgbuo.apps.googleusercontent.com">
      <Toaster />
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
