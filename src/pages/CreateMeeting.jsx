import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Video, Copy, Calendar, Link as LinkIcon } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { Card, CardContent } from '../components/common/Card';
import { useToast } from '../components/common/Toast';
import { motion } from 'framer-motion';

const CreateMeeting = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [topic, setTopic] = useState('');
  
  // Mock generated ID
  const newMeetingId = "meet-" + Math.random().toString(36).substr(2, 6);

  const handleCreate = (e) => {
    e.preventDefault();
    navigate(`/meeting/${newMeetingId}`);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/meeting/${newMeetingId}`);
    toast.success("Link copied", "Meeting link copied to clipboard");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">Create a Meeting</h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1">Start an instant meeting or schedule one for later.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-gray-800 pb-4">
                <div className="h-12 w-12 rounded-full bg-red-600/20 flex items-center justify-center text-red-500">
                  <Video className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-gray-100">Instant Meeting</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Start right away</p>
                </div>
              </div>

              <form onSubmit={handleCreate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-2">Meeting Topic (Optional)</label>
                  <Input 
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g. English Practice" 
                  />
                </div>
                
                <div className="pt-2">
                  <Button type="submit" variant="primary" className="w-full">
                    Start Meeting Now
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-gray-800 pb-4">
                <div className="h-12 w-12 rounded-full bg-purple-600/20 flex items-center justify-center text-purple-500">
                  <Calendar className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-gray-100">Schedule Meeting</h3>
                  <p className="text-sm text-slate-500 dark:text-gray-400">Plan for later</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-100 dark:bg-gray-800/50 border border-slate-300 dark:border-gray-700 flex justify-between items-center">
                  <div className="flex items-center gap-3 overflow-hidden text-sm text-slate-700 dark:text-gray-300">
                    <LinkIcon className="h-4 w-4 shrink-0" />
                    <span className="truncate">meeet.app/{newMeetingId}</span>
                  </div>
                  <Button variant="ghost" size="icon" onClick={copyLink} className="shrink-0 h-8 w-8 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:text-gray-100">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>

                <div className="pt-2">
                  <Button variant="outline" className="w-full">
                    Add to Calendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateMeeting;
