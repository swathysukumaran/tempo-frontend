import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { API_URL } from "@/config/api";
import { Alert, AlertDescription } from "../ui/alert";

import { toast } from "sonner";
function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/create-trip-new";
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      console.log("API_URL", API_URL);
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (!response.ok) {
        // Check for a specific error message
        console.log("Response Data:", data);
        setError(data.error || "Login failed. Please try again.");
        setIsLoading(false);
        return; // Stop execution here
      }
      toast.success("Login successful! Redirecting...");

      navigate(from, { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      setError("Network error. Please try again");
    } finally {
      console.log("Finally");
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full justify-center align-middle mt-6 bg-white max-w-md">
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Enter your credentials to login</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert
              variant="destructive"
              className="p-3 bg-red-100 border border-red-500 rounded-md"
            >
              <AlertDescription className="text-red-700">
                {error}
              </AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
        <p>
          Don’t have an account?{" "}
          <Link to="/register" state={{ from: location.state?.from }}>
            Register here
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

export default Login;
