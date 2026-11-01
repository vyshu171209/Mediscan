import React, { useState } from 'react';
import { AutomationFlow } from '../types';
import { EV_CARD_BG } from '../data';

interface AutomationsScreenProps {
  flows: AutomationFlow[];
  onToggleFlow: (id: string) => void;
  onOpenNewFlowModal: () => void;
}

export const AutomationsScreen: React.FC<AutomationsScreenProps> = ({
  flows,
  onToggleFlow,
  onOpenNewFlowModal
}) => {
  const [filterCategory, setFilterCategory] = useState<'all' | 'energy' | 'water' | 'ev'>('all');
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Separate the featured cards from other flows
  const peakFlow = flows.find((f) => f.id === 'peak-eco');
  const sprinklerFlow = flows.find((f) => f.id === 'smart-sprinkler');
  const evFlow = flows.find((f) => f.id === 'ev-charge');

  // Filter flows
  const filteredFlows = flows.filter((f) => {
    if (filterCategory === 'all') return true;
    return f.category === filterCategory;
  });

  const activeFlowsCount = flows.filter((f) => f.isActive).length;

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 pb-24">
      {/* Editorial Header Section */}
      <section className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <span className="inline-block px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label text-xs font-bold mb-4">
              OPTIMIZED
            </span>
            <h2 className="font-headline text-5xl md:text-6xl font-medium tracking-tighter leading-none mb-6 text-on-surface dark:text-inverse-on-surface">
              Automations
            </h2>
            <p className="text-on-surface-variant dark:text-slate-300 text-lg leading-relaxed font-light">
              The Luminous Engine is currently managing{' '}
              <span className="font-bold text-primary dark:text-primary-container italic">
                {activeFlowsCount} active flows
              </span>{' '}
              to reduce your carbon footprint while maximizing grid efficiency.
            </p>
          </div>

          <div className="flex gap-2 relative">
            {/* Filter Button */}
            <div className="relative">
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className="px-6 py-3 bg-surface-container-highest dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface rounded-lg font-medium flex items-center gap-2 transition-all hover:bg-surface-container-high dark:hover:bg-slate-700 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">filter_list</span>
                <span>{filterCategory === 'all' ? 'Filter' : `Filter: ${filterCategory}`}</span>
              </button>

              {showFilterDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 border border-outline-variant/20 dark:border-slate-800 rounded-xl shadow-xl z-30 p-1">
                  {(['all', 'energy', 'water', 'ev'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setFilterCategory(cat);
                        setShowFilterDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm rounded-lg capitalize transition-colors flex items-center justify-between ${
                        filterCategory === cat
                          ? 'bg-primary-container/20 text-primary dark:text-primary-container font-semibold'
                          : 'text-on-surface dark:text-slate-200 hover:bg-surface-container-low dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{cat === 'all' ? 'All Flows' : `${cat} Only`}</span>
                      {filterCategory === cat && (
                        <span className="material-symbols-outlined text-sm">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* New Flow Button */}
            <button
              onClick={onOpenNewFlowModal}
              className="px-6 py-3 bg-primary text-on-primary rounded-lg font-medium flex items-center gap-2 transition-all hover:shadow-lg hover:shadow-primary-container/20 active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>New Flow</span>
            </button>
          </div>
        </div>
      </section>

      {/* Asymmetric Bento Grid for Automations */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Featured Card: Peak Hours Eco Mode */}
        {peakFlow && (filterCategory === 'all' || filterCategory === 'energy') && (
          <div className="md:col-span-8 bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-xl p-8 editorial-shadow flex flex-col justify-between min-h-[320px] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-container/10 dark:bg-primary/10 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-primary-container/20 transition-all duration-700 pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <div className="w-12 h-12 rounded-lg bg-primary/10 dark:bg-primary-container/20 flex items-center justify-center mb-4">
                  <span
                    className="material-symbols-outlined text-primary dark:text-primary-container"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                </div>
                <h3 className="font-headline text-2xl md:text-3xl font-bold tracking-tight text-on-surface dark:text-inverse-on-surface">
                  {peakFlow.name}
                </h3>
                <p className="text-on-surface-variant dark:text-slate-400 text-base md:text-lg mt-2 max-w-md">
                  {peakFlow.description}
                </p>
              </div>

              {/* Toggle Switch */}
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input
                  type="checkbox"
                  checked={peakFlow.isActive}
                  onChange={() => onToggleFlow(peakFlow.id)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-surface-container-high dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-primary-container" />
              </label>
            </div>

            <div className="relative z-10 mt-8 flex items-center gap-6">
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-highest dark:bg-slate-800 border-2 border-surface-container-lowest dark:border-slate-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xs">lightbulb</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-surface-container-highest dark:bg-slate-800 border-2 border-surface-container-lowest dark:border-slate-900 flex items-center justify-center">
                  <span className="material-symbols-outlined text-xs">thermostat</span>
                </div>
              </div>
              <span className="text-sm font-label text-on-surface-variant dark:text-slate-400">
                Influences 12 devices
              </span>
              <div className="ml-auto flex items-center gap-2 text-primary dark:text-primary-container font-bold font-headline text-xl">
                <span className="material-symbols-outlined text-sm">bolt</span>
                <span>{peakFlow.statBadge}</span>
              </div>
            </div>
          </div>
        )}

        {/* Side Card: Smart Sprinkler */}
        {sprinklerFlow && (filterCategory === 'all' || filterCategory === 'water') && (
          <div className="md:col-span-4 bg-surface-container dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group">
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl -mb-10 -mr-10 pointer-events-none" />
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 dark:bg-secondary-fixed/20 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-secondary dark:text-secondary-fixed"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  water_drop
                </span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-4">
                <input
                  type="checkbox"
                  checked={sprinklerFlow.isActive}
                  onChange={() => onToggleFlow(sprinklerFlow.id)}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-surface-container-highest dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-secondary dark:peer-checked:bg-secondary-container" />
              </label>
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold tracking-tight mb-2 text-on-surface dark:text-inverse-on-surface">
                {sprinklerFlow.name}
              </h3>
              <p className="text-on-surface-variant dark:text-slate-400 text-sm leading-relaxed">
                {sprinklerFlow.description}
              </p>
            </div>
            <div className="pt-6 mt-6 border-t border-outline-variant/20 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-secondary dark:text-secondary-fixed">
                <span className="material-symbols-outlined text-sm">cloud</span>
                <span className="text-xs font-medium">80% Rain Chance</span>
              </div>
              <span className="text-xs font-bold text-secondary dark:text-secondary-fixed uppercase tracking-widest">
                {sprinklerFlow.isActive ? 'Idle' : 'Disabled'}
              </span>
            </div>
          </div>
        )}

        {/* Full Width Content / Stats */}
        <div className="md:col-span-12 py-2 md:py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-lg">
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mb-2 font-semibold">
                Daily Savings
              </p>
              <p className="font-headline text-3xl font-medium text-on-surface dark:text-inverse-on-surface">
                $4.20
              </p>
            </div>
            <div className="p-6 bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-lg">
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mb-2 font-semibold">
                Carbon Offset
              </p>
              <p className="font-headline text-3xl font-medium text-on-surface dark:text-inverse-on-surface">
                12.4kg
              </p>
            </div>
            <div className="p-6 bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-lg">
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mb-2 font-semibold">
                Efficiency Score
              </p>
              <p className="font-headline text-3xl font-medium text-primary dark:text-primary-container">
                94/100
              </p>
            </div>
            <div className="p-6 bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-lg">
              <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant dark:text-slate-400 mb-2 font-semibold">
                Grid Health
              </p>
              <p className="font-headline text-3xl font-medium text-on-surface dark:text-inverse-on-surface flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary dark:bg-primary-container" />
                Stable
              </p>
            </div>
          </div>
        </div>

        {/* EV Card: Bottom Wide */}
        {evFlow && (filterCategory === 'all' || filterCategory === 'ev' || filterCategory === 'energy') && (
          <div className="md:col-span-12 bg-inverse-surface rounded-xl p-8 editorial-shadow relative overflow-hidden text-inverse-on-surface">
            {/* Background texture from mockup */}
            <div
              className="absolute inset-0 opacity-15 pointer-events-none"
              style={{
                backgroundImage: `url(${EV_CARD_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg shadow-primary/30">
                  <span className="material-symbols-outlined text-on-primary text-3xl">
                    ev_station
                  </span>
                </div>
                <div>
                  <h3 className="font-headline text-2xl md:text-3xl font-bold text-inverse-on-surface tracking-tight">
                    {evFlow.name}
                  </h3>
                  <p className="text-surface-variant text-base md:text-lg max-w-md mt-1 opacity-90">
                    {evFlow.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-8 md:gap-12 w-full md:w-auto justify-between md:justify-end">
                <div className="text-right">
                  <p className="text-surface-variant text-xs uppercase tracking-widest mb-1 opacity-80 font-semibold">
                    Next Active Cycle
                  </p>
                  <p className="text-inverse-on-surface font-headline text-lg md:text-xl font-bold">
                    Today, 11:45 PM
                  </p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer scale-110 md:scale-125">
                    <input
                      type="checkbox"
                      checked={evFlow.isActive}
                      onChange={() => onToggleFlow(evFlow.id)}
                      className="sr-only peer"
                    />
                    <div className="w-14 h-8 bg-surface-variant/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-primary-container" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Custom/Created Flows */}
        {filteredFlows
          .filter((f) => !['peak-eco', 'smart-sprinkler', 'ev-charge'].includes(f.id))
          .map((flow) => (
            <div
              key={flow.id}
              className="md:col-span-6 bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-xl p-6 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-container/20 text-primary dark:text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined">{flow.icon}</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={flow.isActive}
                    onChange={() => onToggleFlow(flow.id)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-surface-container-highest dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary dark:peer-checked:bg-primary-container" />
                </label>
              </div>
              <h4 className="font-headline text-xl font-bold text-on-surface dark:text-inverse-on-surface">
                {flow.name}
              </h4>
              <p className="text-on-surface-variant dark:text-slate-400 text-sm mt-1">
                {flow.description}
              </p>
              <div className="mt-4 pt-3 border-t border-outline-variant/10 dark:border-slate-800 flex justify-between items-center text-xs">
                <span className="text-outline dark:text-slate-400">{flow.subText}</span>
                <span className="font-bold text-primary dark:text-primary-container">{flow.statBadge}</span>
              </div>
            </div>
          ))}
      </div>

      {/* Footer Visual Section */}
      <section className="mt-20 flex flex-col items-center">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-outline-variant/30 to-transparent mb-8" />
        <p className="font-label text-sm text-on-surface-variant dark:text-slate-400 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary dark:text-primary-container text-base">
            verified
          </span>
          System algorithms are optimized for Northern European Grid Standards
        </p>
      </section>
    </main>
  );
};
