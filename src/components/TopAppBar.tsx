import React from 'react';
import { NavTab } from '../types';
import { USER_AVATAR_DASHBOARD, USER_AVATAR_USAGE, USER_AVATAR_AUTOMATIONS } from '../data';

interface TopAppBarProps {
  currentTab: NavTab;
  unreadCount: number;
  onOpenNotifications: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onSelectTab: (tab: NavTab) => void;
}

export const TopAppBar: React.FC<TopAppBarProps> = ({
  currentTab,
  unreadCount,
  onOpenNotifications,
  isDarkMode,
  onToggleDarkMode,
  onSelectTab
}) => {
  // Select appropriate avatar matching the specific screen design mockups
  const avatarSrc =
    currentTab === 'usage'
      ? USER_AVATAR_USAGE
      : currentTab === 'automations'
      ? USER_AVATAR_AUTOMATIONS
      : USER_AVATAR_DASHBOARD;

  return (
    <header className="sticky top-0 z-40 bg-surface/85 dark:bg-[#0b1523]/85 backdrop-blur-xl px-6 py-4 flex items-center justify-between border-b border-outline-variant/10 transition-colors">
      <div className="flex items-center gap-3">
        <button
          onClick={() => onSelectTab('settings')}
          className="w-10 h-10 rounded-full bg-surface-container-highest dark:bg-surface-container flex items-center justify-center overflow-hidden border border-outline-variant/20 hover:ring-2 hover:ring-primary/40 transition-all cursor-pointer"
          title="Account & System Settings"
          aria-label="Account Settings"
        >
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src={avatarSrc}
            onError={(e) => {
              // fallback if image fails to load
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        </button>
        <button
          onClick={() => onSelectTab('dashboard')}
          className="text-left cursor-pointer group"
        >
          <h1 className="font-headline text-xl font-bold tracking-tight text-on-surface dark:text-inverse-on-surface group-hover:text-primary transition-colors">
            EcoSync
          </h1>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {/* Dark/Light mode toggle */}
        <button
          onClick={onToggleDarkMode}
          className="w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-inverse-on-surface hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          aria-label="Toggle Theme"
        >
          <span className="material-symbols-outlined text-xl">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
        </button>

        {/* Notifications toggle */}
        <button
          onClick={onOpenNotifications}
          className="relative w-10 h-10 flex items-center justify-center rounded-full text-on-surface-variant dark:text-inverse-on-surface hover:bg-surface-container dark:hover:bg-slate-800 transition-colors cursor-pointer"
          title="Notifications"
          aria-label="Open Notifications"
        >
          <span className="material-symbols-outlined">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-error rounded-full ring-2 ring-background dark:ring-[#0b1523]" />
          )}
        </button>
      </div>
    </header>
  );
};
