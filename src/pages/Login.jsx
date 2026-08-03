import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Video, Mail, Lock } from "lucide-react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { motion } from "framer-motion";
import { useToast } from "../components/common/Toast";
import axios from "axios";

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

      console.log(
        "Saved Token:",
        localStorage.getItem("token")
      );

      toast.success(
        "Login Successful",
        "Welcome Back!"
      );

      window.location.replace("/dashboard");  
      console.log("After navigate");

    } catch (err) {
      console.log("Login Error:", err);

      if (err.response) {
        console.log("Server Response:", err.response.data);
      }

      toast.error(
        "Login Failed",
        err.response?.data?.message || "Invalid credentials"
      );

    } finally {
      setIsLoading(false);
    }
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

          Meeet
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

      </motion.div>

    </div>
  );
};

export default Login;