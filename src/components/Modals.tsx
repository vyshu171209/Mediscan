import React, { useState } from 'react';
import { Appliance, AutomationFlow, AppNotification } from '../types';

/* -------------------------------------------------------------
 * Notifications Drawer
 * ------------------------------------------------------------- */
interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: AppNotification[];
  onMarkAllAsRead: () => void;
  onClearNotifications: () => void;
  onActionClick?: (notif: AppNotification) => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllAsRead,
  onClearNotifications,
  onActionClick
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer content */}
      <aside className="relative z-10 w-full max-w-md bg-surface dark:bg-[#0b1523] h-full shadow-2xl flex flex-col border-l border-outline-variant/15 dark:border-slate-800 transition-colors">
        <div className="p-6 border-b border-outline-variant/10 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary dark:text-primary-container">
              notifications
            </span>
            <h3 className="font-headline text-xl font-bold text-on-surface dark:text-inverse-on-surface">
              Notifications & Alerts
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant dark:text-slate-400 cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="px-6 py-3 bg-surface-container-low dark:bg-slate-900 flex justify-between items-center text-xs">
          <span className="text-outline dark:text-slate-400">
            {notifications.filter((n) => !n.isRead).length} unread alerts
          </span>
          <div className="flex gap-4">
            <button
              onClick={onMarkAllAsRead}
              className="text-primary dark:text-primary-container font-semibold hover:underline cursor-pointer"
            >
              Mark all read
            </button>
            <button
              onClick={onClearNotifications}
              className="text-outline hover:text-error cursor-pointer"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-outline dark:text-slate-500">
              <span className="material-symbols-outlined text-4xl mb-2">check_circle</span>
              <p className="text-sm">All caught up! Zero active system alerts.</p>
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-4 rounded-xl border transition-all ${
                  notif.isRead
                    ? 'bg-surface-container-lowest/60 dark:bg-slate-900/60 border-outline-variant/10 dark:border-slate-800 opacity-80'
                    : 'bg-surface-container-lowest dark:bg-slate-900 border-primary/20 dark:border-primary-container/30 shadow-sm'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                      notif.type === 'alert'
                        ? 'bg-error-container text-error'
                        : notif.type === 'success'
                        ? 'bg-primary-container/20 text-primary dark:text-primary-container'
                        : 'bg-secondary-container/10 text-secondary dark:text-secondary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined text-lg">{notif.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline gap-2">
                      <h4 className="font-headline font-bold text-sm text-on-surface dark:text-inverse-on-surface truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-outline shrink-0">{notif.time}</span>
                    </div>
                    <p className="text-xs text-on-surface-variant dark:text-slate-400 mt-1 leading-relaxed">
                      {notif.description}
                    </p>
                    {notif.actionText && (
                      <button
                        onClick={() => {
                          onActionClick?.(notif);
                          onClose();
                        }}
                        className="mt-2 text-xs font-bold text-primary dark:text-primary-container hover:underline cursor-pointer"
                      >
                        {notif.actionText} →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </div>
  );
};

/* -------------------------------------------------------------
 * New Flow Modal
 * ------------------------------------------------------------- */
interface NewFlowModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateFlow: (flow: Partial<AutomationFlow>) => void;
}

export const NewFlowModal: React.FC<NewFlowModalProps> = ({ isOpen, onClose, onCreateFlow }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'energy' | 'water' | 'ev'>('energy');
  const [savingsBadge, setSavingsBadge] = useState('-10% kWh');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onCreateFlow({
      name,
      description: description || 'Custom rule executed by Luminous Engine optimization schedule.',
      category,
      icon: category === 'energy' ? 'bolt' : category === 'water' ? 'water_drop' : 'ev_station',
      statBadge: savingsBadge,
      subText: 'Custom user flow active',
      isActive: true,
      highlightColor: category === 'water' ? 'secondary' : 'primary'
    });
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative z-10 w-full max-w-lg bg-surface dark:bg-[#0b1523] border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
              Create Automation Flow
            </h3>
            <p className="text-xs text-outline dark:text-slate-400 mt-1">
              Harness predictive grid algorithms to manage high-draw circuits.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400 mb-1">
              Flow Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Heat Pump Night Pre-Cooling"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400 mb-1">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['energy', 'water', 'ev'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`py-2 px-3 rounded-lg border text-xs font-bold capitalize transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    category === cat
                      ? 'border-primary bg-primary text-on-primary shadow-sm'
                      : 'border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-slate-300'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {cat === 'energy' ? 'bolt' : cat === 'water' ? 'water_drop' : 'ev_station'}
                  </span>
                  <span>{cat}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400 mb-1">
              Description / Trigger Logic
            </label>
            <textarea
              rows={2}
              placeholder="Describe what conditions activate this flow..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface focus:outline-none focus:ring-2 focus:ring-primary text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400 mb-1">
              Target Benefit / Stat Badge
            </label>
            <input
              type="text"
              value={savingsBadge}
              onChange={(e) => setSavingsBadge(e.target.value)}
              placeholder="e.g. -$8.50/mo or -12% kWh"
              className="w-full px-4 py-2 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-outline-variant/20 dark:border-slate-700 text-on-surface dark:text-slate-300 text-xs font-semibold hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md shadow-primary/20"
            >
              Activate Flow
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * Schedule EV Modal
 * ------------------------------------------------------------- */
interface ScheduleEVModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSchedule: (time: string, limit: number) => void;
}

export const ScheduleEVModal: React.FC<ScheduleEVModalProps> = ({
  isOpen,
  onClose,
  onConfirmSchedule
}) => {
  const [departureTime, setDepartureTime] = useState('07:00');
  const [chargeLimit, setChargeLimit] = useState(80);
  const [useOffPeakOnly, setUseOffPeakOnly] = useState(true);

  if (!isOpen) return null;

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmSchedule(departureTime, chargeLimit);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative z-10 w-full max-w-lg bg-surface dark:bg-[#0b1523] border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined">ev_station</span>
            </div>
            <div>
              <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
                Schedule EV Charge
              </h3>
              <p className="text-xs text-outline dark:text-slate-400">
                Luminous Engine will compute the lowest-cost charging window.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <form onSubmit={handleConfirm} className="space-y-5">
          <div className="p-4 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex justify-between items-center">
            <div>
              <span className="text-xs font-semibold text-outline dark:text-slate-400">
                Recommended Window
              </span>
              <p className="font-headline text-lg font-bold text-primary dark:text-primary-container">
                11:45 PM – 05:00 AM
              </p>
            </div>
            <span className="text-xs font-bold text-primary dark:text-primary-container bg-primary-container/20 px-3 py-1 rounded-full">
              Save $6.80
            </span>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400 mb-1">
              Departure Time Tomorrow
            </label>
            <input
              type="time"
              value={departureTime}
              onChange={(e) => setDepartureTime(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-outline-variant/20 dark:border-slate-700 bg-surface-container-low dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface font-headline font-bold text-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-bold uppercase tracking-wider text-outline dark:text-slate-400">
                Battery Target Limit
              </label>
              <span className="font-headline font-bold text-primary dark:text-primary-container text-base">
                {chargeLimit}%
              </span>
            </div>
            <input
              type="range"
              min={50}
              max={100}
              step={5}
              value={chargeLimit}
              onChange={(e) => setChargeLimit(Number(e.target.value))}
              className="w-full accent-primary h-2 bg-surface-container-highest dark:bg-slate-700 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-outline mt-1 font-semibold">
              <span>Daily (80%)</span>
              <span>Long Trip (100%)</span>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={useOffPeakOnly}
              onChange={(e) => setUseOffPeakOnly(e.target.checked)}
              className="w-4 h-4 accent-primary rounded cursor-pointer"
            />
            <span className="text-xs text-on-surface-variant dark:text-slate-300">
              Only charge during Off-Peak Tariff rates ($0.12/kWh)
            </span>
          </label>

          <div className="pt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-lg border border-outline-variant/20 dark:border-slate-700 text-on-surface dark:text-slate-300 text-xs font-semibold hover:bg-surface-container cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-primary text-on-primary text-xs font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-md shadow-primary/20"
            >
              Confirm Schedule
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * View All Appliances Modal
 * ------------------------------------------------------------- */
interface ViewAllAppliancesModalProps {
  isOpen: boolean;
  onClose: () => void;
  appliances: Appliance[];
  onToggleAppliance: (id: string) => void;
}

export const ViewAllAppliancesModal: React.FC<ViewAllAppliancesModalProps> = ({
  isOpen,
  onClose,
  appliances,
  onToggleAppliance
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="fixed inset-0 bg-black/50 backdrop-blur-xs" />
      <div className="relative z-10 w-full max-w-2xl bg-surface dark:bg-[#0b1523] border border-outline-variant/20 dark:border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 space-y-6 max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-headline text-2xl font-bold text-on-surface dark:text-inverse-on-surface">
              All Connected Appliances & Circuits
            </h3>
            <p className="text-xs text-outline dark:text-slate-400 mt-1">
              Live power and water telemetry from home smart relays.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-surface-container dark:hover:bg-slate-800 text-on-surface-variant cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {appliances.map((app) => {
            const isEnergy = app.category === 'energy';
            return (
              <div
                key={app.id}
                className="p-4 rounded-xl bg-surface-container-low dark:bg-slate-900 border border-outline-variant/10 dark:border-slate-800 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      isEnergy
                        ? 'bg-primary-container/20 text-primary dark:text-primary-container'
                        : 'bg-secondary-container/10 text-secondary dark:text-secondary-fixed'
                    }`}
                  >
                    <span className="material-symbols-outlined">{app.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-headline font-bold text-base text-on-surface dark:text-inverse-on-surface">
                      {app.name}
                    </h4>
                    <p className="text-xs text-outline dark:text-slate-400">{app.details}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="font-headline font-bold text-on-surface dark:text-inverse-on-surface text-base">
                      {app.isActive ? `${app.currentDraw} ${app.unit}` : `0 ${app.unit}`}
                    </p>
                    <span className="text-[10px] text-outline">
                      {app.isActive ? 'Active' : 'Standby'}
                    </span>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={app.isActive}
                      onChange={() => onToggleAppliance(app.id)}
                      className="sr-only peer"
                    />
                    <div
                      className={`w-11 h-6 bg-surface-container-highest dark:bg-slate-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                        isEnergy ? 'peer-checked:bg-primary dark:peer-checked:bg-primary-container' : 'peer-checked:bg-secondary'
                      }`}
                    />
                  </label>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-surface-container-highest dark:bg-slate-800 text-on-surface dark:text-inverse-on-surface rounded-lg text-xs font-bold hover:bg-surface-container cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------
 * Toast Feedback Popup
 * ------------------------------------------------------------- */
interface ToastProps {
  message: string | null;
  onClear: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, onClear }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#0b1c30] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-outline-variant/30 text-xs md:text-sm animate-bounce-short">
      <span className="material-symbols-outlined text-primary-fixed text-lg">check_circle</span>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClear}
        className="ml-2 hover:opacity-75 cursor-pointer text-slate-400 hover:text-white"
      >
        <span className="material-symbols-outlined text-sm">close</span>
      </button>
    </div>
  );
};
