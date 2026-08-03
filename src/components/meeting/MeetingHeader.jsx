import React from "react";
import { Copy, Share2, Shield } from "lucide-react";
import Button from "../common/Button";
import Badge from "../common/Badge";
import { useToast } from "../common/Toast";

const MeetingHeader = ({ roomId, title = "Meeet Meeting" }) => {
  const toast = useToast();

  const meetingLink = `${window.location.origin}/meeting/${roomId}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(meetingLink);
      toast.success("Copied", "Meeting invite link copied.");
    } catch {
      alert(meetingLink);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Meeet Meeting",
          text: `Join my meeting`,
          url: meetingLink,
        });
      } catch {}
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10 pointer-events-none">
      <div className="pointer-events-auto bg-black/70 backdrop-blur-md rounded-xl p-4 border border-slate-700">

        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-white font-semibold text-lg">
            {title}
          </h2>

          <Badge
            variant="primary"
            className="bg-red-600/20 text-red-400 border-none"
          >
            Live
          </Badge>
        </div>

        <div className="text-sm text-slate-300">
          <p>
            <Shield className="inline h-4 w-4 text-green-500 mr-1" />
            End-to-End Encrypted
          </p>

          <p className="mt-2">
            <strong>Meeting ID:</strong>
          </p>

          <div className="font-mono text-red-400">
            {roomId}
          </div>
        </div>
      </div>

      <div className="flex gap-2 pointer-events-auto">

        <Button
          variant="secondary"
          size="sm"
          leftIcon={<Copy className="h-4 w-4" />}
          onClick={handleCopyLink}
        >
          Copy Link
        </Button>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Share2 className="h-4 w-4" />}
          onClick={handleShare}
        >
          Share
        </Button>

      </div>
    </div>
  );
};

export default MeetingHeader;