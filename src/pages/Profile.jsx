import React, { useState, useEffect } from 'react';
import ProfileCard from '../components/profile/ProfileCard';
import { cn } from "../utils/cn";

export const defaultUserProfileData = {
  name: "Prashant",
  shortName: "PR",
  level: "Advanced Speaker",
  location: "Jaipur, Rajasthan",
  email: "prashant@gmail.com",
  avatar: "https://i.pravatar.cc/150?u=prashant",
};

const Profile = () => {
  const [user, setUser] = useState(defaultUserProfileData);

  useEffect(() => {
    const storedEmail = localStorage.getItem('meeet_user_email');
    const storedName = localStorage.getItem('meeet_user_name');
    
    if (storedEmail || storedName) {
      const emailPart = storedEmail ? storedEmail.split('@')[0] : 'user';
      let displayName = storedName;
      
      if (!displayName && storedEmail) {
        displayName = emailPart.charAt(0).toUpperCase() + emailPart.slice(1);
      } else if (!displayName) {
        displayName = "Guest";
      }
      
      const shortName = displayName.substring(0, 2).toUpperCase();
      const identifier = storedName ? storedName.toLowerCase().replace(/\s+/g, '') : emailPart;
      
      setUser((prevUser) => ({
        ...prevUser,
        name: displayName,
        shortName: shortName,
        email: storedEmail || prevUser.email,
        avatar: `https://i.pravatar.cc/150?u=${identifier}`
      }));
    }
  }, []);

  const handleUpdateName = (newName) => {
    localStorage.setItem('meeet_user_name', newName);
    setUser(prev => ({
      ...prev,
      name: newName,
      shortName: newName.substring(0, 2).toUpperCase(),
      avatar: `https://i.pravatar.cc/150?u=${newName.toLowerCase().replace(/\s+/g, '')}`
    }));
    // Note: We dispatch a custom event so Sidebar can update immediately without reload.
    window.dispatchEvent(new Event('userProfileUpdated'));
    window.dispatchEvent(new Event('storage'));
  };

  return (
    <div className={cn('max-w-5xl', 'mx-auto', 'space-y-8')}>
      <div>
        <h1 className={cn('text-3xl', 'font-bold', 'text-slate-900', 'dark:text-gray-100', 'tracking-tight')}>Profile</h1>
        <p className={cn('text-slate-500', 'dark:text-gray-400', 'mt-1')}>Manage your account and view your achievements.</p>
      </div>

      <div className={cn('grid', 'grid-cols-1', 'lg:grid-cols-3', 'gap-8')}>
        <div className={cn('lg:col-span-2', 'space-y-8')}>
          <ProfileCard user={user} onUpdateName={handleUpdateName} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
