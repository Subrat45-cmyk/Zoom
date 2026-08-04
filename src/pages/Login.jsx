import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Video, Mail, Lock } from "lucide-react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { motion } from "framer-motion";
import { useToast } from "../components/common/Toast";
import axios from "axios";
import GoogleCodeSignIn from "../components/auth/GoogleCodeSignIn";

const Login = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        {
          email,
          password,
        }
      );

      console.log("Login Response:", response.data);

      // Save JWT Token
      localStorage.setItem("token", response.data.access_token);

      // Save User Details
      localStorage.setItem(
        "meeet_user_name",
        response.data.user.name
      );

      localStorage.setItem(
        "meeet_user_email",
        response.data.user.email
      );

      toast.success(
        "Login Successful",
        "Welcome Back!"
      );

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.log("Login Error:", err);

      if (err.response) {
        console.log("Server Response:", err.response.data);
        toast.error(
          "Login Failed",
          err.response?.data?.message || "Invalid credentials"
        );
      } else {
        // Network or backend not running. Offer demo sign-in option.
        console.log("No server response. Backend may be down.");
        toast.error(
          "Server Unreachable",
          "Login server is not available. You can use the demo account to continue."
        );
      }

    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = () => {
    // Set a demo token and demo user details so the app can be demoed without a backend
    localStorage.setItem('token', 'demo-token');
    localStorage.setItem('meeet_user_name', 'Demo User');
    localStorage.setItem('meeet_user_email', 'demo@example.com');
    toast.success('Demo Login', 'Signed in as Demo User');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-gray-950 flex justify-center items-center p-4">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8"
      >

        <Link
          to="/"
          className="flex items-center justify-center gap-2 mb-8 text-2xl font-bold"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 text-white">
            <Video className="h-6 w-6" />
          </div>

          MEEET
        </Link>

        <h2 className="text-3xl font-bold text-center mb-2">
          Welcome Back
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Login to continue
        </p>

        <form onSubmit={handleLogin} className="space-y-5">

          <Input
            type="email"
            placeholder="Email"
            leftIcon={<Mail className="h-4 w-4" />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            type="password"
            placeholder="Password"
            leftIcon={<Lock className="h-4 w-4" />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button
            type="submit"
            variant="primary"
            className="w-full h-12"
            isLoading={isLoading}
          >
            Sign In
          </Button>

        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-slate-500">If the backend is not running, you can use the demo account:</p>
          <div className="mt-3 flex items-center justify-center gap-3">
            <Button variant="outline" onClick={handleDemoLogin}>Use Demo Account</Button>
          </div>
        </div>

        {/* Google Sign-in button (uses existing component in src/components/auth/GoogleCodeSignIn.jsx) */}
        <div className="mt-6">
          <p className="text-center text-sm text-slate-500 mb-3">Or continue with</p>
          <GoogleCodeSignIn text="Continue with Google" />
        </div>

      </motion.div>

    </div>
  );
};

export default Login;
