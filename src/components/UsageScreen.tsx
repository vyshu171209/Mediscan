import React, { useState } from 'react';
import { USAGE_DAYS } from '../data';
import { DayUsage } from '../types';

interface UsageScreenProps {
  onAutomateTip: () => void;
  onSelectApplianceModal: (title: string, data: any) => void;
}

export const UsageScreen: React.FC<UsageScreenProps> = ({
  onAutomateTip,
  onSelectApplianceModal
}) => {
  const [selectedDay, setSelectedDay] = useState<DayUsage>(USAGE_DAYS[3]); // THU default active
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'month'>('7d');

  return (
    <main className="px-6 py-8 max-w-5xl mx-auto space-y-10 pb-24">
      {/* Hero Section: Dynamic Summary */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-8 p-8 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <span className="font-label text-xs font-semibold tracking-widest text-primary dark:text-primary-container uppercase bg-primary-fixed/30 dark:bg-primary-container/20 px-3 py-1 rounded-full">
              Weekly Insight
            </span>
            <h2 className="font-headline text-3xl md:text-4xl mt-4 font-bold leading-tight text-on-surface dark:text-inverse-on-surface">
              Your efficiency rose by{' '}
              <span className="text-primary dark:text-primary-container">12%</span> since last
              Monday.
            </h2>
          </div>
          <div className="mt-8 flex gap-8 relative z-10">
            <div>
              <p className="font-label text-sm text-on-surface-variant dark:text-slate-400">
                Avg. Daily Energy
              </p>
              <p className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
                14.2 kWh
              </p>
            </div>
            <div>
              <p className="font-label text-sm text-on-surface-variant dark:text-slate-400">
                Avg. Daily Water
              </p>
              <p className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
                420 L
              </p>
            </div>
          </div>
          {/* Abstract Gradient Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-container/20 to-transparent rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none" />
        </div>

        <div className="md:col-span-4 p-8 rounded-xl bg-primary dark:bg-primary text-on-primary flex flex-col justify-between shadow-xl shadow-primary/10">
          <div className="flex justify-between items-start">
            <span
              className="material-symbols-outlined text-4xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bolt
            </span>
            <span className="material-symbols-outlined opacity-60">arrow_outward</span>
          </div>
          <div>
            <p className="font-headline text-4xl font-bold tracking-tight">-$42.00</p>
            <p className="font-label text-sm opacity-85 mt-1">Estimated Savings this month</p>
          </div>
        </div>
      </section>

      {/* Usage Trends: The "Pulse" Chart Area */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
              Usage Trends
            </h3>
            <p className="font-label text-sm text-on-surface-variant dark:text-slate-400">
              7-Day Resource Comparison
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary dark:bg-primary-container" />
                <span className="text-xs font-medium text-on-surface dark:text-slate-200">
                  Energy (kWh)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary dark:bg-secondary-fixed" />
                <span className="text-xs font-medium text-on-surface dark:text-slate-200">
                  Water (L)
                </span>
              </div>
            </div>

            {/* Timeframe pill selector */}
            <div className="hidden sm:flex items-center p-1 bg-surface-container dark:bg-slate-800 rounded-lg text-xs font-medium">
              <button
                onClick={() => setTimeframe('7d')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  timeframe === '7d'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-on-surface dark:text-inverse-on-surface font-semibold'
                    : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
                }`}
              >
                7 Days
              </button>
              <button
                onClick={() => setTimeframe('30d')}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  timeframe === '30d'
                    ? 'bg-white dark:bg-slate-900 shadow-sm text-on-surface dark:text-inverse-on-surface font-semibold'
                    : 'text-on-surface-variant dark:text-slate-400 hover:text-on-surface'
                }`}
              >
                30 Days
              </button>
            </div>
          </div>
        </div>

        {/* Pulse Chart Container */}
        <div className="p-8 rounded-xl bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 shadow-sm h-88 flex flex-col justify-between">
          {/* Active Day Selected Floating Ribbon */}
          <div className="flex items-center justify-between pb-4 border-b border-outline-variant/10 dark:border-slate-800 text-xs text-on-surface-variant dark:text-slate-400">
            <div>
              <span className="font-bold text-on-surface dark:text-inverse-on-surface mr-2">
                {selectedDay.fullDay} Focus:
              </span>
              <span>
                Energy: <strong className="text-primary dark:text-primary-container">{selectedDay.energyKwh} kWh</strong>
              </span>
              <span className="mx-2">·</span>
              <span>
                Water: <strong className="text-secondary dark:text-secondary-fixed">{selectedDay.waterLiters} L</strong>
              </span>
              <span className="mx-2">·</span>
              <span>
                Cost: <strong className="text-on-surface dark:text-inverse-on-surface">${selectedDay.cost.toFixed(2)}</strong>
              </span>
            </div>
            <span className="text-[11px] font-medium hidden md:inline text-outline dark:text-slate-500">
              Hover or click bars to inspect days
            </span>
          </div>

          <div className="flex-1 flex items-end gap-2 md:gap-4 px-2 pt-6">
            {USAGE_DAYS.map((dayItem) => {
              const isSelected = selectedDay.day === dayItem.day;
              return (
                <div
                  key={dayItem.day}
                  onClick={() => setSelectedDay(dayItem)}
                  className="flex-1 flex flex-col items-center gap-2 h-full justify-end group cursor-pointer"
                >
                  <div className="w-full flex justify-center items-end gap-1 md:gap-1.5 h-full relative">
                    {/* Energy Bar */}
                    <div
                      className={`w-2.5 md:w-4 rounded-t-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-primary dark:bg-primary-container shadow-md shadow-primary/30'
                          : 'bg-primary/20 dark:bg-primary/30 group-hover:bg-primary dark:group-hover:bg-primary-container'
                      }`}
                      style={{ height: `${dayItem.energyPercent}%` }}
                      title={`${dayItem.fullDay}: ${dayItem.energyKwh} kWh`}
                    />
                    {/* Water Bar */}
                    <div
                      className={`w-2.5 md:w-4 rounded-t-full transition-all duration-300 ${
                        isSelected
                          ? 'bg-secondary dark:bg-secondary-fixed shadow-md shadow-secondary/30'
                          : 'bg-secondary/20 dark:bg-secondary/30 group-hover:bg-secondary dark:group-hover:bg-secondary-fixed'
                      }`}
                      style={{ height: `${dayItem.waterPercent}%` }}
                      title={`${dayItem.fullDay}: ${dayItem.waterLiters} Liters`}
                    />
                  </div>
                  <span
                    className={`text-[10px] font-bold transition-colors ${
                      isSelected
                        ? 'text-on-surface dark:text-inverse-on-surface font-extrabold scale-110'
                        : 'text-on-surface-variant dark:text-slate-400 group-hover:text-on-surface'
                    }`}
                  >
                    {dayItem.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Top Consumers: Bento Grid Style */}
      <section className="space-y-6">
        <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
          Top Consumers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Appliance 1: HVAC */}
          <div
            onClick={() =>
              onSelectApplianceModal('HVAC System Details', {
                consumption: '84.2 kWh',
                delta: '+4% vs LW',
                type: 'cooling/heating',
                tip: 'Pre-cool 30 minutes before 4 PM peak tariff window.'
              })
            }
            className="bg-surface-container dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container-high dark:hover:bg-slate-850 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-primary dark:text-primary-container">
                  hvac
                </span>
              </div>
              <span className="text-xs font-bold text-error">+4% vs LW</span>
            </div>
            <div className="mt-8">
              <h4 className="font-headline text-lg font-bold text-on-surface dark:text-inverse-on-surface">
                HVAC System
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
                  84.2
                </span>
                <span className="text-sm font-label text-on-surface-variant dark:text-slate-400">
                  kWh
                </span>
              </div>
              <div className="w-full bg-surface-container-highest dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-primary dark:bg-primary-container h-full w-[75%]" />
              </div>
            </div>
          </div>

          {/* Appliance 2: Dishwasher */}
          <div
            onClick={() =>
              onSelectApplianceModal('Dishwasher Details', {
                consumption: '156 Liters',
                delta: '-12% vs LW',
                type: 'water',
                tip: 'Night cycle savings: $14.50/month active.'
              })
            }
            className="bg-surface-container dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container-high dark:hover:bg-slate-850 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-secondary dark:text-secondary-fixed">
                  local_laundry_service
                </span>
              </div>
              <span className="text-xs font-bold text-primary dark:text-primary-container">
                -12% vs LW
              </span>
            </div>
            <div className="mt-8">
              <h4 className="font-headline text-lg font-bold text-on-surface dark:text-inverse-on-surface">
                Dishwasher
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
                  156
                </span>
                <span className="text-sm font-label text-on-surface-variant dark:text-slate-400">
                  Liters
                </span>
              </div>
              <div className="w-full bg-surface-container-highest dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-secondary dark:bg-secondary-fixed h-full w-[45%]" />
              </div>
            </div>
          </div>

          {/* Appliance 3: EV Charger */}
          <div
            onClick={() =>
              onSelectApplianceModal('EV Charger Details', {
                consumption: '52.0 kWh',
                delta: 'Stable',
                type: 'mobility',
                tip: 'Off-peak charging between 12 AM and 5 AM.'
              })
            }
            className="bg-surface-container dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 p-6 rounded-xl flex flex-col justify-between hover:bg-surface-container-high dark:hover:bg-slate-850 transition-all cursor-pointer group"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-lg bg-surface-container-highest dark:bg-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined text-primary dark:text-primary-container">
                  ev_station
                </span>
              </div>
              <span className="text-xs font-bold text-on-surface-variant dark:text-slate-400">
                Stable
              </span>
            </div>
            <div className="mt-8">
              <h4 className="font-headline text-lg font-bold text-on-surface dark:text-inverse-on-surface">
                EV Charger
              </h4>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
                  52.0
                </span>
                <span className="text-sm font-label text-on-surface-variant dark:text-slate-400">
                  kWh
                </span>
              </div>
              <div className="w-full bg-surface-container-highest dark:bg-slate-800 h-1.5 rounded-full mt-4 overflow-hidden">
                <div className="bg-primary dark:bg-primary-container h-full w-[60%]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Anomaly Detection / Advice Section */}
      <section className="bg-secondary-fixed dark:bg-[#1a3a60] text-on-secondary-fixed dark:text-secondary-fixed p-6 rounded-xl flex flex-col md:flex-row gap-6 items-center shadow-sm">
        <div className="flex-shrink-0 w-16 h-16 bg-on-secondary-fixed/10 dark:bg-secondary-fixed/20 rounded-full flex items-center justify-center">
          <span
            className="material-symbols-outlined text-3xl"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            lightbulb
          </span>
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="font-headline text-xl font-bold">Smart Optimization Tip</h4>
          <p className="mt-1 opacity-85 leading-relaxed text-sm md:text-base">
            Your hot water usage peaks between 7 AM and 8 AM. Shifting your dishwasher cycle to 11
            PM could save you $14.50/month on off-peak rates.
          </p>
        </div>
        <button
          onClick={onAutomateTip}
          className="bg-on-secondary-fixed dark:bg-secondary-fixed text-secondary-fixed dark:text-[#001a41] px-6 py-3 rounded-lg font-bold whitespace-nowrap hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md"
        >
          Automate Now
        </button>
      </section>
    </main>
  );
};
