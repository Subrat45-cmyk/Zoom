import React from 'react';
import { X, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import Button from '../common/Button';
import Avatar from '../common/Avatar';
import { motion } from 'framer-motion';

const ParticipantsPanel = ({ participants, onClose }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-80 h-full bg-white dark:bg-gray-900 border-l border-slate-200 dark:border-gray-800 flex flex-col absolute right-0 top-0 bottom-0 z-20"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-800">
        <h3 className="font-semibold text-slate-900 dark:text-gray-100">Participants ({participants.length})</h3>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-500 dark:text-gray-400">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {participants.map(p => (
          <div key={p.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-100 dark:bg-gray-800 transition-colors">
            <div className="flex items-center gap-3">
              <Avatar src={p.avatar} fallback={p.name[0]} size="sm" />
              <span className="text-sm font-medium text-slate-800 dark:text-gray-200">{p.name} {p.isLocal && "(You)"}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
              {p.isMuted ? <MicOff className="h-4 w-4 text-red-500" /> : <Mic className="h-4 w-4" />}
              {p.isVideoOff ? <VideoOff className="h-4 w-4 text-red-500" /> : <Video className="h-4 w-4" />}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ParticipantsPanel;
