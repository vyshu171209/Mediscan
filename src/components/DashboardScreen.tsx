import React from 'react';
import { Appliance } from '../types';

interface DashboardScreenProps {
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
  onOpenScheduleEV: () => void;
  onOpenViewAll: () => void;
  onGoToUsage: () => void;
}

export const DashboardScreen: React.FC<DashboardScreenProps> = ({
  appliances,
  onToggleAppliance,
  onOpenScheduleEV,
  onOpenViewAll,
  onGoToUsage
}) => {
  // Compute active stats dynamically
  const activeAppliancesCount = appliances.filter((a) => a.isActive).length;
  const activeEnergyDraw = appliances
    .filter((a) => a.isActive && a.category === 'energy')
    .reduce((acc, curr) => acc + curr.currentDraw, 0);

  // Dynamic calculation for today's kWh relative to baseline
  const dynamicKwh = (12.4 + (activeEnergyDraw > 8 ? 0.8 : activeEnergyDraw < 4 ? -0.9 : 0)).toFixed(1);

  return (
    <main className="max-w-5xl mx-auto px-6 pt-8 pb-24 space-y-12">
      {/* Centerpiece: Luminous Engine Dial */}
      <section className="flex flex-col items-center">
        <div
          onClick={onGoToUsage}
          className="relative w-72 h-72 md:w-80 md:h-80 flex items-center justify-center cursor-pointer group transition-transform hover:scale-[1.02]"
          title="Click to view detailed usage trends"
        >
          {/* Shadow Glow */}
          <div className="absolute inset-0 rounded-full bg-primary/10 dark:bg-primary-container/10 blur-3xl group-hover:bg-primary/20 transition-all duration-500"></div>

          {/* Outer Ring: Energy (primary) */}
          <svg className="absolute w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-surface-container dark:text-slate-800"
              cx="50"
              cy="50"
              fill="transparent"
              r="45"
              stroke="currentColor"
              strokeWidth="6"
            />
            <circle
              className="text-primary-container dark:text-primary-fixed transition-all duration-700 ease-out"
              cx="50"
              cy="50"
              fill="transparent"
              r="45"
              stroke="currentColor"
              strokeDasharray="282.7"
              strokeDashoffset="70"
              strokeLinecap="round"
              strokeWidth="6"
            />
          </svg>

          {/* Inner Ring: Water (secondary) */}
          <svg className="absolute w-3/4 h-3/4 -rotate-90 transform" viewBox="0 0 100 100">
            <circle
              className="text-surface-container-high dark:text-slate-700"
              cx="50"
              cy="50"
              fill="transparent"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
            />
            <circle
              className="text-secondary dark:text-secondary-fixed transition-all duration-700 ease-out"
              cx="50"
              cy="50"
              fill="transparent"
              r="45"
              stroke="currentColor"
              strokeDasharray="282.7"
              strokeDashoffset="120"
              strokeLinecap="round"
              strokeWidth="8"
            />
          </svg>

          {/* Central Content */}
          <div className="z-10 text-center select-none">
            <div className="font-headline text-5xl md:text-6xl font-bold text-on-surface dark:text-inverse-on-surface tracking-tight">
              {dynamicKwh}
            </div>
            <div className="text-xs font-semibold text-outline dark:text-slate-400 uppercase tracking-widest mt-1">
              kWh Today
            </div>
            <div className="mt-4 flex items-center justify-center gap-1.5 text-secondary dark:text-secondary-fixed font-semibold">
              <span className="material-symbols-outlined text-sm">water_drop</span>
              <span className="font-headline text-xl">240L</span>
            </div>
          </div>
        </div>

        {/* Stats Metadata Asymmetry */}
        <div className="grid grid-cols-2 gap-8 mt-10 w-full max-w-md">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-tighter text-outline dark:text-slate-400">
              Energy Efficiency
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-headline text-2xl font-bold text-primary dark:text-primary-container">
                88%
              </span>
              <span className="material-symbols-outlined text-primary dark:text-primary-container text-sm">
                trending_up
              </span>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <span className="text-xs font-bold uppercase tracking-tighter text-outline dark:text-slate-400">
              Resource Health
            </span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
                Optimal
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Active Appliances Section */}
      <section className="space-y-6">
        <div className="flex items-end justify-between px-2">
          <div>
            <h2 className="font-headline text-2xl font-bold tracking-tight text-on-surface dark:text-inverse-on-surface">
              Active Appliances
            </h2>
            <p className="text-sm text-outline dark:text-slate-400">
              {activeAppliancesCount} systems drawing power
            </p>
          </div>
          <button
            onClick={onOpenViewAll}
            className="text-primary dark:text-primary-container font-semibold text-sm hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>

        {/* Horizontal Scroll Cards */}
        <div className="flex gap-6 overflow-x-auto no-scrollbar pb-6 snap-x -mx-2 px-2">
          {appliances.slice(0, 4).map((appliance) => {
            const isEnergy = appliance.category === 'energy';
            return (
              <div
                key={appliance.id}
                className="snap-start flex-shrink-0 w-64 p-6 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 shadow-sm transition-all hover:bg-surface-container-high dark:hover:bg-slate-850"
              >
                <div className="flex justify-between items-start mb-8">
                  <div
                    className={`p-3 rounded-lg ${
                      isEnergy
                        ? 'bg-primary-container/20 text-primary dark:text-primary-container'
                        : 'bg-secondary-container/10 text-secondary dark:text-secondary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined">{appliance.icon}</span>
                  </div>

                  {/* Switch Toggle */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={appliance.isActive}
                      onChange={() => onToggleAppliance(appliance.id)}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-surface-container-highest dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        isEnergy ? 'peer-checked:bg-primary dark:peer-checked:bg-primary-container' : 'peer-checked:bg-secondary'
                      }`}
                    />
                  </label>
                </div>

                <h3 className="font-headline text-lg font-bold text-on-surface dark:text-inverse-on-surface">
                  {appliance.name}
                </h3>

                <div className="mt-2 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-outline dark:text-slate-400">
                      {isEnergy ? 'Current Draw' : 'Water Flow'}
                    </span>
                    <span className="font-headline font-bold text-on-surface dark:text-inverse-on-surface">
                      {appliance.isActive ? `${appliance.currentDraw} ${appliance.unit}` : `0 ${appliance.unit}`}
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isEnergy ? 'bg-primary dark:bg-primary-container' : 'bg-secondary'
                      }`}
                      style={{
                        width: appliance.isActive ? `${appliance.percentage}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bento Grid Insights */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Peak Saving Window */}
        <div className="md:col-span-2 p-8 rounded-2xl bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <h4 className="font-headline text-xl font-bold text-on-surface dark:text-inverse-on-surface">
              Peak Saving Window
            </h4>
            <p className="text-sm text-outline dark:text-slate-400 mt-2 max-w-sm">
              Lower rates available between 11 PM and 5 AM. Schedule your EV charge now.
            </p>
            <button
              onClick={onOpenScheduleEV}
              className="mt-6 px-6 py-2.5 bg-primary text-on-primary font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-sm shadow-primary/20"
            >
              Schedule Now
            </button>
          </div>
          <div className="absolute right-0 bottom-0 opacity-10 group-hover:scale-110 group-hover:opacity-15 transition-all duration-700 pointer-events-none select-none">
            <span
              className="material-symbols-outlined text-[160px] translate-x-12 translate-y-12 fill-icon text-primary dark:text-primary-fixed"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
          </div>
        </div>

        {/* Water Leak Alert */}
        <div className="p-8 rounded-2xl bg-secondary dark:bg-[#004ca8] text-on-secondary flex flex-col justify-between shadow-lg shadow-secondary/20">
          <div>
            <span
              className="material-symbols-outlined text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              water_drop
            </span>
            <h4 className="font-headline text-lg font-bold mt-4">Water Leak Alert</h4>
          </div>
          <p className="text-sm opacity-90 mt-2">
            No abnormal flow detected in the main line today.
          </p>
          <div className="mt-6 font-headline text-2xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-xl">check_circle</span>
            Secure
          </div>
        </div>
      </section>
    </main>
  );
};
