import React from 'react';
import { Card, CardContent } from '../components/common/Card';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import { useTheme } from '../contexts/ThemeContext';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100 tracking-tight">Settings</h1>
        <p className="text-slate-500 dark:text-gray-400 mt-1">Manage your app preferences and account details.</p>
      </div>

      <Card>
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-gray-100 border-b border-slate-200 dark:border-gray-800 pb-2">Appearance</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-slate-800 dark:text-gray-200">Theme</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">Toggle between Light and Dark mode.</p>
            </div>
            <Button variant="outline" onClick={toggleTheme}>
              Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6 space-y-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-gray-100 border-b border-slate-200 dark:border-gray-800 pb-2">Account Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Display Name</label>
              <Input defaultValue="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-gray-400 mb-1">Email</label>
              <Input type="email" defaultValue="john.doe@example.com" disabled />
            </div>
            <Button variant="primary">Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
