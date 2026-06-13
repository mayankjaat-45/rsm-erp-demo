export const assets = [
  { id: 'SPK-001', name: 'JBL Speaker Set', category: 'Sound', total: 20, available: 12, deployed: 6, maintenance: 2, location: 'Main Godown', status: 'Available' },
  { id: 'MIC-001', name: 'Wireless Mic Set', category: 'Audio', total: 15, available: 10, deployed: 5, maintenance: 0, location: 'Rack A2', status: 'Available' },
  { id: 'LED-001', name: 'LED Wall Panel', category: 'Display', total: 50, available: 35, deployed: 15, maintenance: 0, location: 'Display Room', status: 'Deployed' },
  { id: 'LGT-001', name: 'Moving Head Light', category: 'Lighting', total: 24, available: 18, deployed: 6, maintenance: 0, location: 'Lighting Bay', status: 'Available' },
  { id: 'AMP-001', name: 'Amplifier Rack', category: 'Sound', total: 10, available: 7, deployed: 2, maintenance: 1, location: 'Main Godown', status: 'Maintenance' },
];

export const generators = [
  { id: 'GEN-101', capacity: '25 KVA', purchaseDate: '2023-01-12', frequency: '90 days', nextService: '2026-06-20', location: 'Main Godown', status: 'Available', fuel: '18 L/hr' },
  { id: 'GEN-102', capacity: '40 KVA', purchaseDate: '2022-08-05', frequency: '60 days', nextService: '2026-06-15', location: 'ABC Wedding Event', status: 'Deployed', fuel: '26 L/hr' },
  { id: 'GEN-103', capacity: '62.5 KVA', purchaseDate: '2021-11-19', frequency: '45 days', nextService: '2026-06-08', location: 'Workshop', status: 'Maintenance', fuel: '32 L/hr' },
];

export const vehicles = [
  { id: 'TN 01 AB 1234', type: 'Truck', insurance: '2026-07-30', pollution: '2026-08-12', fc: '2026-07-15', permit: '2026-09-01', status: 'Available' },
  { id: 'TN 02 CD 4567', type: 'Mini Truck', insurance: '2026-06-20', pollution: '2026-08-05', fc: '2026-07-05', permit: '2026-10-16', status: 'Deployed' },
  { id: 'TN 03 EF 7890', type: 'Pickup', insurance: '2026-09-10', pollution: '2026-06-01', fc: '2026-11-18', permit: '2026-12-20', status: 'Maintenance' },
];

export const customers = [
  { id: 'CUS-001', name: 'ABC Wedding Events', mobile: '+91 98765 43210', location: 'Chennai', events: 8, payment: 'Partial', notes: 'Regular wedding client' },
  { id: 'CUS-002', name: 'Elite Corporate Events', mobile: '+91 91234 56789', location: 'Coimbatore', events: 5, payment: 'Paid', notes: 'Corporate stage setup' },
  { id: 'CUS-003', name: 'Kumar Family Function', mobile: '+91 99887 76655', location: 'Madurai', events: 2, payment: 'Pending', notes: 'Birthday and family functions' },
];

export const events = [
  { id: 'RSM-EVT-1001', client: 'ABC Wedding Events', type: 'Wedding', date: '2026-06-25', location: 'Chennai', status: 'Confirmed', assets: ['SPK-001', 'MIC-001'], generator: 'GEN-102', vehicle: 'TN 02 CD 4567', staff: 6 },
  { id: 'RSM-EVT-1002', client: 'Elite Corporate Events', type: 'Corporate', date: '2026-06-28', location: 'Coimbatore', status: 'Planning', assets: ['LED-001', 'LGT-001'], generator: 'GEN-101', vehicle: 'TN 01 AB 1234', staff: 4 },
  { id: 'RSM-EVT-1003', client: 'Kumar Family Function', type: 'Birthday', date: '2026-06-30', location: 'Madurai', status: 'Completed', assets: ['MIC-001'], generator: 'GEN-103', vehicle: 'TN 03 EF 7890', staff: 3 },
];

export const reminders = [
  { id: 1, title: 'Generator GEN-103 service overdue', type: 'Generator Service', due: '2026-06-08', priority: 'High', status: 'Overdue' },
  { id: 2, title: 'Vehicle TN 03 EF 7890 pollution expired', type: 'Pollution Certificate', due: '2026-06-01', priority: 'High', status: 'Overdue' },
  { id: 3, title: 'Vehicle TN 02 CD 4567 insurance renewal', type: 'Insurance Renewal', due: '2026-06-20', priority: 'Medium', status: 'Upcoming' },
  { id: 4, title: 'Return tracking for ABC Wedding Events', type: 'Event Return', due: '2026-06-26', priority: 'Medium', status: 'Upcoming' },
];
