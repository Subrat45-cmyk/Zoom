import React from 'react';
import { X, Sparkles, BookOpen, MessageCircle } from 'lucide-react';
import Button from '../common/Button';
import { motion } from 'framer-motion';

const AIAssistantPanel = ({ onClose }) => {
  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="w-80 h-full bg-white dark:bg-gray-900 border-l border-slate-200 dark:border-gray-800 flex flex-col absolute right-0 top-0 bottom-0 z-20"
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-gray-800">
        <div className="flex items-center gap-2 text-red-400">
          <Sparkles className="h-5 w-5" />
          <h3 className="font-semibold text-slate-900 dark:text-gray-100">AI Coach</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 text-slate-500 dark:text-gray-400">
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-500 dark:text-gray-400 flex items-center gap-2">
            <MessageCircle className="h-4 w-4" /> Real-time Feedback
          </h4>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-sm text-red-100">
            You're speaking at a good pace. Try to use "furthermore" instead of "and" for better flow.
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-slate-500 dark:text-gray-400 flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Vocabulary Suggestions
          </h4>
          <div className="bg-slate-100 dark:bg-gray-800 rounded-lg p-3 space-y-3">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-900 dark:text-gray-100">Articulate</span>
              <span className="text-xs text-slate-500 dark:text-gray-400">Instead of "say clearly"</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium text-slate-900 dark:text-gray-100">Consequently</span>
              <span className="text-xs text-slate-500 dark:text-gray-400">Instead of "so"</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AIAssistantPanel;
