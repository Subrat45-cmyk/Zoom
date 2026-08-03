import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MeetingHeader from "../../components/meeting/MeetingHeader";
import VideoGrid from "../../components/meeting/VideoGrid";
import MeetingControls from "../../components/meeting/MeetingControls";
import ParticipantsPanel from "../../components/meeting/ParticipantsPanel";
import ChatPanel from "../../components/meeting/ChatPanel";
import TranscriptPanel from "../../components/meeting/TranscriptPanel";
import AIAssistantPanel from "../../components/meeting/AIAssistantPanel";
import { useLocalMedia } from "../../hooks/useLocalMedia";
import { useScreenShare } from "../../hooks/useScreenShare";
import { useWebRTC } from "../../hooks/useWebRTC";
import { AnimatePresence } from "framer-motion";
import { useToast } from "../../components/common/Toast";

const VideoMeeting = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();

  const [activePanel, setActivePanel] = useState(null);

  const {
    localStream,
    isMicOn,
    isCameraOn,
    initLocalMedia,
    toggleMic,
    toggleCamera,
    stopLocalMedia,
    error: mediaError,
  } = useLocalMedia();

  const { isScreenSharing, toggleScreenShare } = useScreenShare();
  const { participants } = useWebRTC(id, localStream);

  useEffect(() => {
    initLocalMedia();

    return () => {
      stopLocalMedia();
    };
  }, [initLocalMedia, stopLocalMedia]);

  useEffect(() => {
    if (mediaError) {
      toast.error("Media Error", mediaError);
    }
  }, [mediaError, toast]);

  const handleLeave = () => {
    stopLocalMedia();
    navigate("/dashboard");
  };

  // 🔥 Copy Meeting Link
  const handleCopyMeetingLink = async () => {
    const meetingLink = `${window.location.origin}/meeting/${id}`;

    try {
      await navigator.clipboard.writeText(meetingLink);
      toast.success("Copied", "Meeting link copied successfully!");
    } catch {
      alert(meetingLink);
    }
  };

  const localParticipant = {
    id: "local",
    name: "You",
    avatar: "https://i.pravatar.cc/150?u=me",
    isMuted: !isMicOn,
    isVideoOff: !isCameraOn,
    isSpeaking: false,
    stream: localStream,
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-gray-950 overflow-hidden relative">
      <MeetingHeader roomId={id} />

      {/* Share Meeting Banner */}
      <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-slate-900 border rounded-xl shadow-lg px-5 py-3 flex items-center gap-4">
        <div>
          <p className="text-xs text-gray-500">Meeting ID</p>
          <p className="font-semibold">{id}</p>
        </div>

        <button
          onClick={handleCopyMeetingLink}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          Copy Invite Link
        </button>
      </div>

      <div
        className="flex flex-1 flex-col relative w-full h-full transition-all duration-300"
        style={{ paddingRight: activePanel ? "320px" : "0" }}
      >
        <VideoGrid
          participants={participants}
          localParticipant={localParticipant}
        />

        <MeetingControls
          isMicOn={isMicOn}
          toggleMic={toggleMic}
          isCameraOn={isCameraOn}
          toggleCamera={toggleCamera}
          isScreenSharing={isScreenSharing}
          toggleScreenShare={toggleScreenShare}
          onLeave={handleLeave}
          activePanel={activePanel}
          setActivePanel={setActivePanel}
        />
      </div>

      <AnimatePresence>
        {activePanel === "participants" && (
          <ParticipantsPanel
            participants={[localParticipant, ...participants]}
            onClose={() => setActivePanel(null)}
          />
        )}

        {activePanel === "chat" && (
          <ChatPanel
            onClose={() => setActivePanel(null)}
            roomId={id}
          />
        )}

        {activePanel === "transcript" && (
          <TranscriptPanel
            onClose={() => setActivePanel(null)}
            isMicOn={isMicOn}
          />
        )}

        {activePanel === "ai" && (
          <AIAssistantPanel
            onClose={() => setActivePanel(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoMeeting;