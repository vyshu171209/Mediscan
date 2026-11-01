import React, { useState } from 'react';
import { USER_AVATAR_DASHBOARD } from '../data';

interface SettingsScreenProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onResetData: () => void;
  onShowToast: (msg: string) => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  isDarkMode,
  onToggleDarkMode,
  onResetData,
  onShowToast
}) => {
  const [peakPrice, setPeakPrice] = useState('0.38');
  const [offPeakPrice, setOffPeakPrice] = useState('0.12');
  const [currency, setCurrency] = useState('$');
  const [pushAlerts, setPushAlerts] = useState(true);
  const [leakProtection, setLeakProtection] = useState(true);

  const handleSaveTariff = (e: React.FormEvent) => {
    e.preventDefault();
    onShowToast('Utility tariff rates updated successfully!');
  };

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 pb-24 space-y-10">
      <div>
        <h2 className="font-headline text-4xl md:text-5xl font-medium tracking-tight text-on-surface dark:text-inverse-on-surface">
          Settings & Grid Sync
        </h2>
        <p className="text-on-surface-variant dark:text-slate-400 text-base md:text-lg mt-2">
          Manage hardware gateways, utility rate structures, and automated protection policies.
        </p>
      </div>

      {/* Household Profile Card */}
      <section className="bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5 w-full md:w-auto">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary/30 shrink-0">
            <img
              src={USER_AVATAR_DASHBOARD}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="font-headline text-xl font-bold text-on-surface dark:text-inverse-on-surface">
              Oakwood Residence
            </h3>
            <p className="text-sm text-outline dark:text-slate-400">
              Smart Residence · 185 m² · 3 Occupants
            </p>
            <div className="flex items-center gap-2 mt-2 text-xs font-semibold text-primary dark:text-primary-container">
              <span className="material-symbols-outlined text-sm">public</span>
              Northern European Grid Standards (Nord Pool Synchronized)
            </div>
          </div>
        </div>
        <button
          onClick={onToggleDarkMode}
          className="w-full md:w-auto px-5 py-2.5 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface text-sm font-semibold flex items-center justify-center gap-2 hover:bg-surface-container dark:hover:bg-slate-700 cursor-pointer transition-colors"
        >
          <span className="material-symbols-outlined text-lg">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
          </span>
          <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </section>

      {/* Grid Tariff Rates Section */}
      <section className="bg-surface-container-lowest dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 rounded-xl p-6 md:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
              Utility Tariff Structure
            </h3>
            <p className="text-sm text-outline dark:text-slate-400">
              Configure dynamic rates used by the Luminous Engine for cost optimization.
            </p>
          </div>
          <span className="px-3 py-1 bg-primary-fixed/40 dark:bg-primary-container/20 text-primary dark:text-primary-container font-semibold text-xs rounded-full uppercase tracking-wider">
            Time of Use (TOU)
          </span>
        </div>

        <form onSubmit={handleSaveTariff} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400">
              Peak Tariff Rate ({currency}/kWh)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-on-surface-variant dark:text-slate-400 text-sm font-bold">
                {currency}
              </span>
              <input
                type="number"
                step="0.01"
                value={peakPrice}
                onChange={(e) => setPeakPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface font-headline font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-[11px] text-outline dark:text-slate-500">
              Active: 4:00 PM – 9:00 PM weekdays
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400">
              Off-Peak Night Rate ({currency}/kWh)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-on-surface-variant dark:text-slate-400 text-sm font-bold">
                {currency}
              </span>
              <input
                type="number"
                step="0.01"
                value={offPeakPrice}
                onChange={(e) => setOffPeakPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-2 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface font-headline font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <p className="text-[11px] text-outline dark:text-slate-500">
              Active: 11:00 PM – 5:00 AM every day
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400">
              Currency & Region
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface font-headline font-semibold text-base focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
            >
              <option value="$">USD ($) - North America</option>
              <option value="€">EUR (€) - Northern Europe</option>
              <option value="£">GBP (£) - United Kingdom</option>
              <option value="kr">SEK / NOK (kr) - Scandinavia</option>
            </select>
            <p className="text-[11px] text-outline dark:text-slate-500">
              Syncs with local utility billing schedule
            </p>
          </div>

          <div className="md:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary text-on-primary font-semibold rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Save Tariff Rates
            </button>
          </div>
        </form>
      </section>

      {/* Connected Hardware & Smart Meters */}
      <section className="space-y-4">
        <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
          Connected Smart Hardware
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-container/20 text-primary dark:text-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined">router</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface dark:text-inverse-on-surface">
                  EcoSync Gateway v3.2
                </h4>
                <p className="text-xs text-outline dark:text-slate-400">
                  Firmware 3.2.4 · Zigbee 3.0 & Matter Bridge
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-primary dark:text-primary-container">
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-container" />
              Online
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary-container/10 text-secondary dark:text-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined">speed</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface dark:text-inverse-on-surface">
                  Omnipower Smart Main Meter
                </h4>
                <p className="text-xs text-outline dark:text-slate-400">
                  CT Clamp Sensor · 0.2% measurement class
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-primary dark:text-primary-container">
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-container" />
              Active
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-secondary-container/10 text-secondary dark:text-secondary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined">sprinkler</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface dark:text-inverse-on-surface">
                  RainBird Hydrowise Controller
                </h4>
                <p className="text-xs text-outline dark:text-slate-400">
                  4 Irrigation Zones · Flow meter telemetry
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-secondary dark:text-secondary-fixed">
              <span className="w-2 h-2 rounded-full bg-secondary dark:bg-secondary-fixed" />
              Rain Paused
            </span>
          </div>

          <div className="p-5 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-primary-container/20 text-primary dark:text-primary-container flex items-center justify-center">
                <span className="material-symbols-outlined">ev_station</span>
              </div>
              <div>
                <h4 className="font-headline font-bold text-on-surface dark:text-inverse-on-surface">
                  Pulsar Plus EV Wallbox
                </h4>
                <p className="text-xs text-outline dark:text-slate-400">
                  32A Level 2 · OCPP 2.0.1 Connected
                </p>
              </div>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-primary dark:text-primary-container">
              <span className="w-2 h-2 rounded-full bg-primary dark:bg-primary-container" />
              Standby
            </span>
          </div>
        </div>
      </section>

      {/* Safety & System Reset */}
      <section className="p-6 rounded-xl bg-surface-container dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-headline font-bold text-on-surface dark:text-inverse-on-surface">
            System Reset & Baseline Data
          </h4>
          <p className="text-xs text-outline dark:text-slate-400 mt-1">
            Re-align all energy simulations, active appliances, and mock automation states.
          </p>
        </div>
        <button
          onClick={onResetData}
          className="px-5 py-2.5 rounded-lg bg-surface-container-highest dark:bg-slate-800 hover:bg-surface-container-high dark:hover:bg-slate-700 text-on-surface dark:text-inverse-on-surface text-xs font-bold transition-all cursor-pointer"
        >
          Reset Baseline
        </button>
      </section>
    </main>
  );
};
