import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Video, Keyboard } from "lucide-react";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import { Card, CardContent } from "../components/common/Card";
import { motion } from "framer-motion";

const JoinMeeting = () => {
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");

  const handleJoin = async (e) => {
    e.preventDefault();

    if (!meetingId.trim()) {
      alert("Please enter Meeting ID");
      return;
    }

    try {
      await axios.post("http://127.0.0.1:8000/join-room", {
        room_id: meetingId.trim(),
        user_email: localStorage.getItem("meeet_user_email"),
      });

      navigate(`/meeting/${meetingId.trim()}`);
    } catch (error) {
      console.error(error);
      alert("Room Not Found");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6 pt-12">
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-red-600/20 text-red-500 mb-4">
          <Video className="h-8 w-8" />
        </div>

        <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">
          Join a Meeting
        </h1>

        <p className="text-slate-500 dark:text-gray-400 mt-2">
          Enter the meeting code or link to join.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <Card>
          <CardContent className="p-8">
            <form onSubmit={handleJoin} className="flex gap-3">
              <Input
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                placeholder="Enter Room ID"
                leftIcon={<Keyboard className="h-5 w-5" />}
                className="h-12 text-base"
                required
              />

              <Button
                type="submit"
                variant="primary"
                className="h-12 px-8"
              >
                Join
              </Button>
            </form>

            <p className="text-xs text-slate-400 dark:text-gray-500 mt-4 text-center">
              Enter the Room ID shared by the meeting organizer.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default JoinMeeting;