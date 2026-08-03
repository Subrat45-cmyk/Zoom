import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { ThemeProvider } from "./contexts/ThemeContext";
import { ToastProvider } from "./components/common/Toast";

// Layout
import PageLayout from "./components/layout/PageLayout";

// Pages
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CreateMeeting from "./pages/CreateMeeting";
import JoinMeeting from "./pages/JoinMeeting";
import VideoMeeting from "./pages/all_five_file/VideoMeeting";
import Transcript from "./pages/Transcript";
import Profile from "./pages/Profile";
import Leaderboard from "./pages/Leaderboard";
import Settings from "./pages/Settings";
import NotFoundPage from "./pages/NotFoundPage";

const PrivateRoute = ({ children }) => {
  // Login.jsx me yehi save ho raha hai
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

const App = () => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />

            {/* Protected Meeting */}
            <Route
              path="/meeting/:id"
              element={
                <PrivateRoute>
                  <VideoMeeting />
                </PrivateRoute>
              }
            />

            {/* Protected Dashboard Routes */}
            <Route
              element={
                <PrivateRoute>
                  <PageLayout />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/create-meeting" element={<CreateMeeting />} />
              <Route path="/join" element={<JoinMeeting />} />
              <Route path="/transcript" element={<Transcript />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />

          </Routes>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;