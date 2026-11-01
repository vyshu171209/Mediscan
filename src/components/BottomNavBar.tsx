import React from 'react';
import { NavTab } from '../types';

interface BottomNavBarProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNavBar: React.FC<BottomNavBarProps> = ({ currentTab, onSelectTab }) => {
  const navItems: { tab: NavTab; label: string; icon: string }[] = [
    { tab: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { tab: 'usage', label: 'Usage', icon: 'bar_chart' },
    { tab: 'automations', label: 'Automations', icon: 'settings_input_component' },
    { tab: 'settings', label: 'Settings', icon: 'settings' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-surface/90 dark:bg-[#0b1523]/90 backdrop-blur-xl border-t border-outline-variant/15 dark:border-slate-800 px-6 py-2 transition-colors">
      <div className="max-w-md mx-auto flex items-center justify-between">
        {navItems.map((item) => {
          const isActive = currentTab === item.tab;
          return (
            <button
              key={item.tab}
              onClick={() => onSelectTab(item.tab)}
              className={`flex flex-col items-center gap-1 p-2 transition-all cursor-pointer select-none ${
                isActive
                  ? 'text-primary font-bold dark:text-primary-container scale-105'
                  : 'text-on-surface-variant/70 dark:text-slate-400 hover:text-on-surface dark:hover:text-slate-200'
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={`material-symbols-outlined text-2xl transition-transform ${
                  isActive ? 'fill-icon' : ''
                }`}
                style={isActive ? { fontVariationSettings: "'FILL' 1, 'wght' 600" } : undefined}
              >
                {item.icon}
              </span>
              <span className="font-label text-[10px] uppercase tracking-wider font-semibold">
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-primary dark:bg-primary-container -mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
