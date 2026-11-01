import { Appliance, AutomationFlow, DayUsage, AppNotification } from './types';

export const USER_AVATAR_DASHBOARD =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBjxMOnCACfRz2yL9-MeupUG2jc3soaE1lMMF0X1j54ZanW6JW8cLcHhOkSV5VKMrKgIN89XvBG1mbIAVyEHKl5Wzc1lZeXPWa9ddm3Chlk7EjZk176UR8AMqBqeS47TWRODGtA3rKIKL8j0_lCIS7I3pZb19a0A74fZ19qfRdj6nfY3Ho04BaPY7xxMz1SQzqqhgfPhIEPYn_UKl20kCOGv5iOOoJ11OpRmYeJHywfmWBO8lsRpo1XoVE9dM6S8E3BIsH520HkDOmH';

export const USER_AVATAR_USAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuA8cq54f5W_Hc1G7J8KPwmxs2pA1MK3tSDEuLFc62_88b0qe2hlMRDGgCjoitJACUsvO8cU9G45NyvLIr5U3ihCAu4Jhtyg0IMaysoo0FNtDheNZJ6zoBotOSWAFZRVC87NAgyHN1oYiIUHUMWsSsvYRh_HtSxDyhDlnkc4n2I3EQAw4tNPkxx0RSdFteolYI-xfBVFcf51WpY8-e6BJhLjx-YOm2Ld_SabY43c78wbfhrrJD2KotZ6jLCKRrdw_grhT9JUxerEQW2S';

export const USER_AVATAR_AUTOMATIONS =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBOI4rQlgUONwEE0nNCcLvZ-SCpzZxcZYw-NLGQU8qVNywWy84mHJql_Qwk7nn4f9Rn6xmK7ROa8ezQPvEKJ6ggSlhDkfSKHxpl4y7amsn6IbqoLTflXauOLBGeQot0jO8_ua2PuNouSCZg7as2em6Sk95S-li_ypDxRqXtWDfPi_6jIwbJ3BlMaXl6_-_IJ9UT1eh8xVcWFqLZpHpoFKxLe-FI7yvsits_2DnQLsejkWlNZ5CEyFpChg6XzH67ykt9AZBalRdJNnQC';

export const EV_CARD_BG =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCm2Yb6C5b8Pg21lDgFnJrwBr6VQ7Ba2Pr7rf_16s-_dEIJ2RgvH-aH6qox-w0or5-UZXInT67oSrC15ujc4oqt73eJXdMDN5kXpy9LLB1EbFxvHN4LYepa0PGvgUeT12vtDR_ljtoqDHqngfSE9-nKtGizjXTmYXyML7cJ_wtvrjx75C5gjIuT8D-dW6tp-ClwOOa5c6X6VxJsxQwb24Q0QZUmSHo91_u8OcowPZRPbp4zUXX_osms8_3E6iI7HMq2Ns5h0N0t_SuT';

export const INITIAL_APPLIANCES: Appliance[] = [
  {
    id: 'hvac',
    name: 'HVAC',
    icon: 'ac_unit',
    category: 'energy',
    currentDraw: 1.2,
    unit: 'kW',
    percentage: 66,
    isActive: true,
    colorType: 'primary',
    details: 'Living Area: 21.5°C · Target 22°C'
  },
  {
    id: 'ev',
    name: 'EV Charger',
    icon: 'ev_station',
    category: 'energy',
    currentDraw: 7.4,
    unit: 'kW',
    percentage: 85,
    isActive: true,
    colorType: 'primary',
    details: 'Vehicle battery 72% · Level 2 32A'
  },
  {
    id: 'sprinkler',
    name: 'Smart Sprinkler',
    icon: 'sprinkler',
    category: 'water',
    currentDraw: 0,
    unit: 'L/m',
    percentage: 0,
    isActive: false,
    colorType: 'secondary',
    details: 'Zone 1-4 Paused · Rain predicted'
  },
  {
    id: 'water-heater',
    name: 'Heat Pump Boiler',
    icon: 'water_heater',
    category: 'energy',
    currentDraw: 0.9,
    unit: 'kW',
    percentage: 45,
    isActive: true,
    colorType: 'primary',
    details: 'Tank temp: 54°C · Eco heating mode'
  },
  {
    id: 'dishwasher',
    name: 'Dishwasher',
    icon: 'local_laundry_service',
    category: 'water',
    currentDraw: 1.1,
    unit: 'kW',
    percentage: 55,
    isActive: false,
    colorType: 'secondary',
    details: 'Cycle delayed to 11:00 PM off-peak'
  },
  {
    id: 'solar',
    name: 'Solar Inverter',
    icon: 'solar_power',
    category: 'energy',
    currentDraw: 3.8,
    unit: 'kW Gen',
    percentage: 78,
    isActive: true,
    colorType: 'primary',
    details: '14 panels active · Exporting to grid'
  }
];

export const USAGE_DAYS: DayUsage[] = [
  {
    day: 'MON',
    fullDay: 'Monday',
    energyPercent: 40,
    waterPercent: 60,
    energyKwh: 11.2,
    waterLiters: 320,
    cost: 2.45
  },
  {
    day: 'TUE',
    fullDay: 'Tuesday',
    energyPercent: 55,
    waterPercent: 45,
    energyKwh: 14.1,
    waterLiters: 250,
    cost: 3.12
  },
  {
    day: 'WED',
    fullDay: 'Wednesday',
    energyPercent: 70,
    waterPercent: 80,
    energyKwh: 18.2,
    waterLiters: 450,
    cost: 4.25
  },
  {
    day: 'THU',
    fullDay: 'Thursday',
    energyPercent: 85,
    waterPercent: 40,
    energyKwh: 22.4,
    waterLiters: 215,
    cost: 4.95
  },
  {
    day: 'FRI',
    fullDay: 'Friday',
    energyPercent: 40,
    waterPercent: 50,
    energyKwh: 10.5,
    waterLiters: 275,
    cost: 2.30
  },
  {
    day: 'SAT',
    fullDay: 'Saturday',
    energyPercent: 30,
    waterPercent: 35,
    energyKwh: 7.8,
    waterLiters: 190,
    cost: 1.82
  },
  {
    day: 'SUN',
    fullDay: 'Sunday',
    energyPercent: 50,
    waterPercent: 40,
    energyKwh: 12.4,
    waterLiters: 240,
    cost: 2.75
  }
];

export const INITIAL_AUTOMATIONS: AutomationFlow[] = [
  {
    id: 'peak-eco',
    name: 'Peak Hours Eco Mode',
    description: 'Automatically dims lights and adjusts HVAC when energy demand is highest.',
    category: 'energy',
    icon: 'eco',
    isActive: true,
    statBadge: '-15% kWh',
    subText: 'Influences 12 devices',
    devicesInfluenced: 12,
    highlightColor: 'primary'
  },
  {
    id: 'smart-sprinkler',
    name: 'Smart Sprinkler',
    description: 'Based on local rain forecast. Skips cycles when precipitation is predicted.',
    category: 'water',
    icon: 'water_drop',
    isActive: true,
    statBadge: 'Idle',
    subText: '80% Rain Chance',
    highlightColor: 'secondary'
  },
  {
    id: 'ev-charge',
    name: 'EV Scheduled Charging',
    description: 'Charges during lowest tariff rates between 12:00 AM and 5:00 AM.',
    category: 'ev',
    icon: 'ev_station',
    isActive: true,
    statBadge: 'Next: 11:45 PM',
    subText: 'Tier 1 off-peak window active',
    nextCycle: 'Today, 11:45 PM',
    highlightColor: 'inverse'
  },
  {
    id: 'solar-export',
    name: 'Solar Battery Pre-Buffering',
    description: 'Charges domestic home battery directly when solar generation tops 3.5 kW.',
    category: 'energy',
    icon: 'solar_power',
    isActive: true,
    statBadge: '+4.2 kWh saved',
    subText: 'Battery SOC at 88%',
    devicesInfluenced: 3,
    highlightColor: 'primary'
  },
  {
    id: 'dishwasher-shift',
    name: 'Dishwasher Off-Peak Shift',
    description: 'Delays wash cycle until night tariff kicks in at 11:00 PM.',
    category: 'water',
    icon: 'local_laundry_service',
    isActive: true,
    statBadge: '-$14.50/mo',
    subText: 'Schedules automatically when loaded',
    devicesInfluenced: 1,
    highlightColor: 'secondary'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    title: 'Peak Tariff Approaching',
    description: 'Peak rates begin in 25 minutes ($0.38/kWh). Eco Mode is primed to lower HVAC demand.',
    time: '10m ago',
    icon: 'bolt',
    type: 'alert',
    isRead: false,
    actionText: 'View Flow'
  },
  {
    id: 'n2',
    title: 'Sprinkler Cycle Skipped',
    description: '80% probability of rain detected in your area. 180 Liters conserved today.',
    time: '2h ago',
    icon: 'cloud',
    type: 'success',
    isRead: false
  },
  {
    id: 'n3',
    title: 'EV Ready for Night Charge',
    description: 'Tesla Model Y plugged in. Charging will automatically start at 11:45 PM.',
    time: '3h ago',
    icon: 'ev_station',
    type: 'info',
    isRead: true
  },
  {
    id: 'n4',
    title: 'Water Line Security Verified',
    description: 'Diagnostic sweep completed. Zero micro-leaks detected across all 4 zones.',
    time: '5h ago',
    icon: 'verified_user',
    type: 'success',
    isRead: true
  }
];
