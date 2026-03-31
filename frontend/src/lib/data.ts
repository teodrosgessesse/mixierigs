import type { Rig, Customer, Alert, User, FleetKPI } from '@/lib/types'

// ── Customers ──────────────────────────────────────────────────────────────
export const CUSTOMERS: Record<string, Customer> = {
  shell: {
    id: 'shell', name: 'Shell plc', code: 'SHL',
    plan: 'Enterprise', rigs: ['neptune', 'titan'], users: 24, color: '#CC0000',
  },
  mobil: {
    id: 'mobil', name: 'Mobil Drilling', code: 'MOB',
    plan: 'Professional', rigs: ['atlas', 'valiant'], users: 18, color: '#003366',
  },
  chevron: {
    id: 'chevron', name: 'Chevron Exploration', code: 'CVX',
    plan: 'Professional', rigs: ['pioneer'], users: 12, color: '#003087',
  },
  texoil: {
    id: 'texoil', name: 'TexOil Drilling', code: 'TXO',
    plan: 'Standard', rigs: ['ranger1', 'ranger2', 'ranger3'], users: 16, color: '#1a0a2e',
  },
  neptune_energy: {
    id: 'neptune_energy', name: 'Neptune Energy', code: 'NEP',
    plan: 'Enterprise', rigs: [], users: 8, color: '#0a1628',
  },
}

// ── Rigs ───────────────────────────────────────────────────────────────────
export const RIGS: Record<string, Rig> = {
  neptune: {
    id: 'neptune', name: 'Neptune Star', type: 'floater', area: 'GoM',
    status: 'DRILLING', alarms: 2, depth: '14,382 ft WD 4,820 ft', dot: 'amber',
    customer: 'shell', wellName: 'MC-743 #4', operator: 'Shell plc',
    lat: 28.2, lng: -89.4,
    metrics: [
      { label: 'ROP', value: '88', unit: 'ft/hr', status: 'ok' },
      { label: 'Hookload', value: '492', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '3,840', unit: 'psi', status: 'ok' },
      { label: 'Top Drive RPM', value: '138', unit: 'rpm', status: 'ok' },
      { label: 'WOB', value: '22.4', unit: 'klbf', status: 'ok' },
      { label: 'Bit Depth', value: '14,382', unit: 'ft', status: 'ok' },
      { label: 'Pit Volume', value: '814', unit: 'bbl', status: 'warn' },
      { label: 'Gas LEL', value: '4%', unit: 'Z-1', status: 'ok' },
      { label: 'Wind Speed', value: '38', unit: 'kt NW', status: 'warn' },
      { label: 'TVD', value: '11,840', unit: 'ft', status: 'ok' },
      { label: 'Ann Pressure', value: '2,240', unit: 'psi', status: 'ok' },
      { label: 'Pump SPM', value: '105', unit: 'spm', status: 'ok' },
    ],
  },
  titan: {
    id: 'titan', name: 'Titan Deep', type: 'floater', area: 'GoM',
    status: 'DRILLING', alarms: 3, depth: '8,200 ft WD', dot: 'red',
    customer: 'shell', wellName: 'GB-641 #2', operator: 'Shell plc',
    lat: 27.8, lng: -90.1,
    metrics: [
      { label: 'ROP', value: '84', unit: 'ft/hr', status: 'warn' },
      { label: 'Hookload', value: '487', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '4,120', unit: 'psi', status: 'alarm' },
      { label: 'Top Drive RPM', value: '142', unit: 'rpm', status: 'ok' },
      { label: 'WOB', value: '24.2', unit: 'klbf', status: 'ok' },
      { label: 'Bit Depth', value: '14,382', unit: 'ft', status: 'ok' },
      { label: 'Pit Volume', value: '812', unit: 'bbl', status: 'alarm' },
      { label: 'Gas LEL', value: '18%', unit: 'Z-3A', status: 'alarm' },
      { label: 'Pump SPM', value: '105', unit: 'spm', status: 'ok' },
      { label: 'TVD', value: '11,840', unit: 'ft', status: 'ok' },
      { label: 'Ann Pressure', value: '2,240', unit: 'psi', status: 'ok' },
      { label: 'Flow Out', value: '97%', unit: '', status: 'warn' },
    ],
  },
  atlas: {
    id: 'atlas', name: 'Atlas JU-47', type: 'jackup', area: 'GoM',
    status: 'DRILLING', alarms: 0, depth: '312 ft WD', dot: 'green',
    customer: 'mobil', wellName: 'HI-A395 #7', operator: 'Mobil Drilling',
    lat: 28.9, lng: -91.2,
    metrics: [
      { label: 'ROP', value: '102', unit: 'ft/hr', status: 'ok' },
      { label: 'Hookload', value: '338', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '3,210', unit: 'psi', status: 'ok' },
      { label: 'Top Drive RPM', value: '128', unit: 'rpm', status: 'ok' },
      { label: 'WOB', value: '18.6', unit: 'klbf', status: 'ok' },
      { label: 'Bit Depth', value: '9,204', unit: 'ft', status: 'ok' },
      { label: 'Leg A Load', value: '8,420', unit: 't', status: 'ok' },
      { label: 'Leg B Load', value: '8,380', unit: 't', status: 'ok' },
      { label: 'Leg C Load', value: '8,340', unit: 't', status: 'ok' },
      { label: 'Air Gap', value: '44', unit: 'ft', status: 'ok' },
      { label: 'Pump SPM', value: '98', unit: 'spm', status: 'ok' },
      { label: 'Gas LEL', value: '0%', unit: '', status: 'ok' },
    ],
  },
  valiant: {
    id: 'valiant', name: 'Valiant NS-12', type: 'jackup', area: 'NS',
    status: 'DRILLING', alarms: 0, depth: '210 ft WD', dot: 'green',
    customer: 'mobil', wellName: 'N-22 #3', operator: 'Mobil Drilling',
    lat: 57.4, lng: 2.8,
    metrics: [
      { label: 'ROP', value: '97', unit: 'ft/hr', status: 'ok' },
      { label: 'Hookload', value: '315', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '3,100', unit: 'psi', status: 'ok' },
      { label: 'Wave Height', value: '2.1', unit: 'm', status: 'ok' },
      { label: 'Wind Speed', value: '22', unit: 'kt', status: 'ok' },
      { label: 'Bit Depth', value: '7,840', unit: 'ft', status: 'ok' },
    ],
  },
  pioneer: {
    id: 'pioneer', name: 'Pioneer NS-7', type: 'jackup', area: 'NS',
    status: 'DRILLING', alarms: 1, depth: '190 ft WD', dot: 'amber',
    customer: 'chevron', wellName: 'N-15 #1', operator: 'Chevron Exploration',
    lat: 58.1, lng: 1.4,
    metrics: [
      { label: 'ROP', value: '84', unit: 'ft/hr', status: 'ok' },
      { label: 'Hookload', value: '272', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '2,980', unit: 'psi', status: 'ok' },
      { label: 'Leg C Load', value: '9,110', unit: 't', status: 'warn' },
      { label: 'Leg Imbalance', value: '8.4%', unit: '', status: 'warn' },
      { label: 'Wave Height', value: '3.2', unit: 'm', status: 'ok' },
    ],
  },
  ranger1: {
    id: 'ranger1', name: 'Ranger 1', type: 'land', area: 'Permian',
    status: 'DRILLING', alarms: 0, depth: '9,400 ft MD', dot: 'green',
    customer: 'texoil', wellName: 'Midland #44', operator: 'TexOil Drilling',
    lat: 31.8, lng: -102.4,
    metrics: [
      { label: 'ROP', value: '118', unit: 'ft/hr', status: 'ok' },
      { label: 'WOB', value: '31.8', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '3,440', unit: 'psi', status: 'ok' },
      { label: 'Bit Depth', value: '9,400', unit: 'ft', status: 'ok' },
      { label: 'H₂S', value: '0', unit: 'ppm', status: 'ok' },
      { label: 'Motor Torque', value: '14.2', unit: 'kft·lb', status: 'ok' },
    ],
  },
  ranger2: {
    id: 'ranger2', name: 'Ranger 2', type: 'land', area: 'Permian',
    status: 'DRILLING', alarms: 0, depth: '11,200 ft MD', dot: 'green',
    customer: 'texoil', wellName: 'Midland #45', operator: 'TexOil Drilling',
    lat: 31.9, lng: -102.5,
    metrics: [
      { label: 'ROP', value: '112', unit: 'ft/hr', status: 'ok' },
      { label: 'WOB', value: '28.4', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '3,280', unit: 'psi', status: 'ok' },
      { label: 'Bit Depth', value: '11,200', unit: 'ft', status: 'ok' },
      { label: 'H₂S', value: '0', unit: 'ppm', status: 'ok' },
      { label: 'Gas Units', value: '12', unit: 'gu', status: 'ok' },
    ],
  },
  ranger3: {
    id: 'ranger3', name: 'Ranger 3', type: 'land', area: 'Permian',
    status: 'DRILLING', alarms: 1, depth: '6,800 ft MD', dot: 'amber',
    customer: 'texoil', wellName: 'Delaware #12', operator: 'TexOil Drilling',
    lat: 31.7, lng: -102.2,
    metrics: [
      { label: 'ROP', value: '64', unit: 'ft/hr', status: 'warn' },
      { label: 'WOB', value: '22.0', unit: 'klbf', status: 'ok' },
      { label: 'Standpipe P', value: '2,940', unit: 'psi', status: 'ok' },
      { label: 'Bit Depth', value: '6,800', unit: 'ft', status: 'ok' },
      { label: 'H₂S', value: '3.2', unit: 'ppm', status: 'warn' },
      { label: 'Gas Units', value: '44', unit: 'gu', status: 'warn' },
    ],
  },
}

// ── Alerts ─────────────────────────────────────────────────────────────────
export const ALERTS: Alert[] = [
  { id: 'a1', rigId: 'titan', rigName: 'Titan Deep', severity: 'critical', system: 'Well Control', message: 'Pit Gain +2.4 bbl', time: '00:03:21', acknowledged: false },
  { id: 'a2', rigId: 'titan', rigName: 'Titan Deep', severity: 'critical', system: 'F&G Safety', message: 'Gas 18% LEL Zone-3A', time: '00:03:21', acknowledged: false },
  { id: 'a3', rigId: 'titan', rigName: 'Titan Deep', severity: 'critical', system: 'Mud/Circulation', message: 'Standpipe 4,120 psi', time: '00:03:21', acknowledged: false },
  { id: 'a4', rigId: 'neptune', rigName: 'Neptune Star', severity: 'critical', system: 'Marine/DP', message: 'DP Wind Advisory 38kt NW', time: '00:11:44', acknowledged: false },
  { id: 'a5', rigId: 'neptune', rigName: 'Neptune Star', severity: 'warning', system: 'Equip Health', message: 'Pump 2 Vibration 4.8mm/s', time: '00:22:10', acknowledged: false },
  { id: 'a6', rigId: 'pioneer', rigName: 'Pioneer NS-7', severity: 'warning', system: 'Jacking', message: 'Leg C Load Imbalance 8.4%', time: '01:04:33', acknowledged: false },
  { id: 'a7', rigId: 'ranger3', rigName: 'Ranger 3', severity: 'warning', system: 'F&G Safety', message: 'H₂S 3.2 ppm at Shaker', time: '00:45:18', acknowledged: false },
]

// ── Users ──────────────────────────────────────────────────────────────────
export const DEMO_USERS: User[] = [
  { id: 'u1', name: 'Platform Admin', email: 'admin@mixierigs.com', role: 'platform_admin', customerId: 'shell', customerName: 'Shell plc' },
  { id: 'u2', name: 'Shell Operations', email: 'ops@shell.com', role: 'customer_admin', customerId: 'shell', customerName: 'Shell plc' },
  { id: 'u3', name: 'John Driller', email: 'driller@shell.com', role: 'driller', customerId: 'shell', customerName: 'Shell plc' },
  { id: 'u4', name: 'Mobil Admin', email: 'admin@mobil.com', role: 'customer_admin', customerId: 'mobil', customerName: 'Mobil Drilling' },
  { id: 'u5', name: 'TexOil Ops', email: 'ops@texoil.com', role: 'oim', customerId: 'texoil', customerName: 'TexOil Drilling' },
]

// ── Fleet KPIs ─────────────────────────────────────────────────────────────
export const FLEET_KPIS: FleetKPI[] = [
  { label: 'Active Rigs', value: '8 / 8', sub: 'All operational', color: 'green' },
  { label: 'Critical Alarms', value: '4', sub: 'Require attention', color: 'red' },
  { label: 'Avg ROP', value: '94.2 ft/hr', sub: '+12% vs plan', color: 'blue' },
  { label: 'Fleet NPT', value: '2.4%', sub: '↑ vs target', color: 'amber' },
  { label: 'MixieAI Insights', value: '12', sub: 'Last 24 hrs', color: 'blue' },
]
