import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Alert, AlertDescription } from "../ui/alert";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { API_URL } from "../../config/api";
interface RegisterProps {
  onLoginClick?: () => void; // Optional function with no parameters and no return value
}
function Register({ onLoginClick }: RegisterProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/create-trip-new";
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  interface ErrorResponse {
    error: string;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate(from, { replace: true });
      } else {
        const data: ErrorResponse = await response.json();
        setError(data.error || "Registration failed");
      }
    } catch (err) {
      setError("Registration failed");
      console.log(err);
    }
  };
  return (
    <Card className="w-full bg-white max-w-md ">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>Enter your details to register</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              required
            />
          </div>

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

          <Button
            type="submit"
            className="w-full bg-secondary hover:bg-secondary-dark transition-colors"
          >
            Register
          </Button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <Button
              variant="link"
              onClick={(e) => {
                e.preventDefault();
                if (onLoginClick) {
                  onLoginClick();
                }
              }}
              className="p-0 text-primary hover:text-primary-dark"
            >
              Login
            </Button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}

export default Register;
