import { useState, useCallback } from 'react';

export const useScreenShare = () => {
  const [screenStream, setScreenStream] = useState(null);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [error, setError] = useState(null);

  const startScreenShare = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false // Often true for tab sharing, keeping simple here
      });
      setScreenStream(stream);
      setIsScreenSharing(true);

      // Handle user stopping share via browser UI
      stream.getVideoTracks()[0].onended = () => {
        stopScreenShare();
      };

      return stream;
    } catch (err) {
      console.error("Failed to share screen", err);
      setError("Screen sharing was denied or not supported.");
      return null;
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    if (screenStream) {
      screenStream.getTracks().forEach(track => track.stop());
      setScreenStream(null);
      setIsScreenSharing(false);
    }
  }, [screenStream]);

  const toggleScreenShare = useCallback(async () => {
    if (isScreenSharing) {
      stopScreenShare();
    } else {
      await startScreenShare();
    }
  }, [isScreenSharing, startScreenShare, stopScreenShare]);

  return {
    screenStream,
    isScreenSharing,
    error,
    startScreenShare,
    stopScreenShare,
    toggleScreenShare
  };
};
