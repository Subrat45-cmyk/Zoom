import React, { useState, useEffect, useRef } from 'react';
import { X, Mic, MicOff } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';

const TranscriptPanel = ({ onClose, isMicOn }) => {
  const [transcripts, setTranscripts] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState('');
  const recognitionRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom on new transcript
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [transcripts, interimTranscript]);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setTranscripts([{ id: 1, text: "Speech Recognition API is not supported in this browser.", isSystem: true }]);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let interim = '';
      let final = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          final += event.results[i][0].transcript;
        } else {
          interim += event.results[i][0].transcript;
        }
      }

      if (final) {
        setTranscripts(prev => [...prev, {
          id: Date.now() + Math.random(),
          text: final,
          sender: 'You',
          time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
          isSystem: false
        }]);
      }
      setInterimTranscript(interim);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error);
      if (event.error === 'not-allowed') {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      // Restart if it ends naturally while mic is on
      if (isMicOn && isListening) {
        try {
          recognition.start();
        } catch (e) {
          console.error(e);
        }
      } else {
        setIsListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Manage start/stop based on isMicOn
  useEffect(() => {
    if (!recognitionRef.current) return;

    if (isMicOn) {
      if (!isListening) {
        try {
          recognitionRef.current.start();
          setIsListening(true);
        } catch (e) {
          console.error(e);
        }
      }
    } else {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
        setInterimTranscript('');
      }
    }
  }, [isMicOn, isListening]);

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-80 h-full bg-white dark:bg-gray-900 border-l border-slate-200 dark:border-gray-800 flex flex-col absolute right-0 top-0 bottom-0 z-20 shadow-2xl"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-900 dark:text-gray-100">Live Transcript</h3>
          {isListening ? (
             <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Listening..." />
          ) : (
             <span className="flex h-2 w-2 rounded-full bg-red-500" title="Paused" />
          )}
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-500 dark:text-gray-400">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div ref={containerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {transcripts.length === 0 && !interimTranscript && (
          <div className="text-center text-slate-500 dark:text-gray-400 text-sm mt-10">
            {isMicOn ? "Listening for speech..." : "Turn on your mic to start transcribing."}
          </div>
        )}
        {transcripts.map(t => (
          <div key={t.id} className="flex flex-col items-start">
            {!t.isSystem && <span className="text-xs text-slate-400 dark:text-gray-500 mb-1">{t.sender} • {t.time}</span>}
            <div className={`px-3 py-2 rounded-lg text-sm ${t.isSystem ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300 mx-auto text-center' : 'bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-gray-100 rounded-tl-none'}`}>
              {t.text}
            </div>
          </div>
        ))}
        {interimTranscript && (
          <div className="flex flex-col items-start opacity-70">
            <span className="text-xs text-slate-400 dark:text-gray-500 mb-1">You • speaking...</span>
            <div className="px-3 py-2 rounded-lg text-sm bg-slate-100 dark:bg-gray-800 text-slate-900 dark:text-gray-100 rounded-tl-none">
              {interimTranscript}
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-gray-800 text-xs text-slate-500 dark:text-gray-400 text-center">
        Powered by Web Speech API
      </div>
    </motion.div>
  );
};

export default TranscriptPanel;
