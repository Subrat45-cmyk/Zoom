import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '../common/Card';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import { Edit2, MapPin, Mail, Check, X } from 'lucide-react';
import { cn } from "../../utils/cn";

const ProfileCard = ({ user, onUpdateName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);

  useEffect(() => {
    setEditName(user.name);
  }, [user.name]);

  const handleSave = () => {
    if (editName.trim() && onUpdateName) {
      onUpdateName(editName.trim());
    }
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className={cn('flex', 'flex-col', 'md:flex-row', 'items-center', 'md:items-start', 'gap-6')}>
          <Avatar src={user.avatar} fallback={user.name[0]} size="xl" className={cn('h-24', 'w-24')} />
          <div className={cn('flex-1', 'text-center', 'md:text-left')}>
            {isEditing ? (
              <div className="flex items-center justify-center md:justify-start gap-2">
                <input 
                  type="text" 
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSave();
                  }}
                  className="px-3 py-1 text-lg font-bold text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-800 border border-slate-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                  autoFocus
                />
                <Button variant="ghost" size="icon" onClick={handleSave} className="text-green-500 hover:text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
                  <Check className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => { setIsEditing(false); setEditName(user.name); }} className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                  <X className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <h2 className={cn('text-2xl', 'font-bold', 'text-slate-900', 'dark:text-gray-100')}>{user.name}</h2>
            )}
            
            <div className={cn('flex', 'flex-col', 'md:flex-row', 'items-center', 'gap-4', 'mt-4', 'text-slate-500', 'dark:text-gray-400', 'text-sm')}>
              <div className={cn('flex', 'items-center', 'gap-1')}>
                <MapPin className={cn('h-4', 'w-4')} />
                <span>{user.location}</span>
              </div>
              <div className={cn('flex', 'items-center', 'gap-1')}>
                <Mail className={cn('h-4', 'w-4')} />
                <span>{user.email}</span>
              </div>
            </div>
          </div>
          <div className={cn('flex', 'gap-2')}>
            {!isEditing && (
              <Button variant="outline" leftIcon={<Edit2 className={cn('h-4', 'w-4')} />} onClick={() => setIsEditing(true)}>
                Edit Profile
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
