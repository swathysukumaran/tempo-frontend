import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }: { children: JSX.Element }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:8081/me", {
          credentials: "include",
        });
        setIsAuthenticated(res.ok);
      } catch (err) {
        console.log(err);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default ProtectedRoute;
