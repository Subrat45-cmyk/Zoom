import React, { useState } from 'react';
import TranscriptCard from '../components/transcript/TranscriptCard';
import TranscriptSearch from '../components/transcript/TranscriptSearch';
import TranscriptDownload from '../components/transcript/TranscriptDownload';
import { motion } from 'framer-motion';

const Transcript = () => {
  const [search, setSearch] = useState('');

  const mockTranscripts = [];

  const filtered = mockTranscripts.filter(t => 
    t.text.toLowerCase().includes(search.toLowerCase()) || 
    t.speaker.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">Transcripts</h1>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Review your past conversations and AI feedback.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <TranscriptSearch value={search} onChange={setSearch} />
          <TranscriptDownload onDownload={() => {}} />
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4 pt-4"
      >
        {filtered.length > 0 ? (
          filtered.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
              <TranscriptCard {...t} />
            </motion.div>
          ))
        ) : (
          <div className="text-center py-20 bg-slate-100 dark:bg-gray-800/50 rounded-2xl border border-slate-200 dark:border-gray-800">
            <p className="text-lg font-medium text-slate-900 dark:text-gray-100">No transcripts available</p>
            <p className="text-slate-500 dark:text-gray-400 mt-1">Join a meeting to start recording and viewing transcripts.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Transcript;
