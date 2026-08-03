import React from 'react';
import LeaderboardCard from '../components/dashboard/LeaderboardCard';
import { Trophy } from 'lucide-react';

const Leaderboard = () => {
  const users = [
    { id: 1, name: "Alice Smith", avatar: "https://i.pravatar.cc/150?u=1", level: "Advanced", score: 9850 },
    { id: 2, name: "Bob Johnson", avatar: "https://i.pravatar.cc/150?u=2", level: "Intermediate", score: 8420 },
    { id: 3, name: "Charlie Brown", avatar: "https://i.pravatar.cc/150?u=3", level: "Beginner", score: 7210 },
    { id: 4, name: "Diana Prince", avatar: "https://i.pravatar.cc/150?u=4", level: "Advanced", score: 6890 },
    { id: 5, name: "Evan Wright", avatar: "https://i.pravatar.cc/150?u=5", level: "Intermediate", score: 5400 },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/20 text-yellow-500">
          <Trophy className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">Global Leaderboard</h1>
        <p className="text-slate-500 dark:text-gray-400">See how you rank against other learners this week.</p>
      </div>

      <div className="max-w-2xl mx-auto">
        <LeaderboardCard users={users} />
      </div>
    </div>
  );
};

export default Leaderboard;
