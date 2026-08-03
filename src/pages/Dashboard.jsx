import React from "react";
import axios from "axios";
import { Video, Calendar } from "lucide-react";
import Button from "../components/common/Button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const navigate = useNavigate();

  const createMeeting = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/create-room",
        {
          room_name: "English Learning Room",
          created_by: localStorage.getItem("meeet_user_email"),
        }
      );

      const roomId = response.data.room_id;

      alert(`Meeting ID: ${roomId}`);
      navigate(`/meeting/${roomId}`);
    } catch (error) {
      console.log(error);
      alert("Room creation failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] space-y-10">
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">
          Welcome to Meeet
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* New Meeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div
            className="block group cursor-pointer"
            onClick={createMeeting}
          >
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-8 text-center hover:border-red-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Video className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-2">
                  New Meeting
                </h3>

                <p className="text-sm text-slate-500 dark:text-gray-400">
                  Start an instant meeting and invite others to join
                </p>
              </div>

              <Button variant="primary" className="w-full mt-4">
                Start Now
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Join Meeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Link to="/join" className="block group">
            <div className="bg-white dark:bg-gray-900 border border-slate-200 dark:border-gray-800 rounded-2xl p-8 text-center hover:border-red-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col items-center justify-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-8 w-8" />
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-gray-100 mb-2">
                  Join Meeting
                </h3>

                <p className="text-sm text-slate-500 dark:text-gray-400">
                  Enter a meeting code or link to join an existing call
                </p>
              </div>

              <Button variant="outline" className="w-full mt-4">
                Join Now
              </Button>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;