import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  LayoutDashboard,
  Package,
  Truck,
  Zap,
  Users,
  CalendarDays,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Wrench,
  UserRound,
  FileBarChart,
  Settings,
  Plus,
  ClipboardCheck,
} from 'lucide-react';
import { assets, generators, vehicles, customers, events, reminders } from './data/demoData';
import './styles.css';

const staffMembers = [
  { id: 'STF-001', name: 'Arun Kumar', role: 'Sound Engineer' },
  { id: 'STF-002', name: 'Manikandan', role: 'Lighting Operator' },
  { id: 'STF-003', name: 'Ramesh', role: 'Driver' },
  { id: 'STF-004', name: 'Suresh', role: 'Technician' },
  { id: 'STF-005', name: 'Vijay', role: 'Helper' },
  { id: 'STF-006', name: 'Karthik', role: 'Event Supervisor' },
];

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'assets', label: 'Assets', icon: Package },
  { id: 'generators', label: 'Generators', icon: Zap },
  { id: 'vehicles', label: 'Vehicles', icon: Truck },
  { id: 'customers', label: 'Customers', icon: Users },
  { id: 'events', label: 'Events & Deployments', icon: CalendarDays },
  { id: 'reminders', label: 'Reminders', icon: Bell },
  { id: 'reports', label: 'Reports', icon: FileBarChart },
  { id: 'settings', label: 'Settings', icon: Settings, locked: true },
];

const statusClass = {
  Available: 'success',
  Deployed: 'info',
  Maintenance: 'warning',
  Confirmed: 'success',
  Planning: 'info',
  Completed: 'muted',
  Returned: 'success',
  Paid: 'success',
  Partial: 'warning',
  Pending: 'danger',
  Overdue: 'danger',
  Upcoming: 'warning',
};

const today = new Date().toISOString().slice(0, 10);

function Badge({ children, type }) {
  return <span className={`badge ${statusClass[type] || 'muted'}`}>{children}</span>;
}

function StatCard({ title, value, icon: Icon, tone = 'blue', sub }) {
  return (
    <div className="stat-card">
      <div>
        <p>{title}</p>
        <h3>{value}</h3>
        {sub && <span>{sub}</span>}
      </div>
      <div className={`stat-icon ${tone}`}><Icon size={22} /></div>
    </div>
  );
}

function Login({ onLogin }) {
  return (
    <main className="login-page">
      <section className="login-card">
        <div className="brand-mark">RSM</div>
        <h1>Ravi Sound Business Management System</h1>
        <p>ERP demo for event deployment, assets, generators, vehicles, reminders and business operations.</p>
        <div className="demo-box">
          <strong>Demo Login</strong>
          <span>Email: admin@rsm.com</span>
          <span>Password: 123456</span>
        </div>
        <button onClick={onLogin}>Open Demo Dashboard</button>
      </section>
    </main>
  );
}

function Layout({ page, setPage, children, onLogout }) {
  const [open, setOpen] = useState(false);
  const active = navItems.find((item) => item.id === page);
  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <div className="brand-icon">R</div>
          <div>
            <h2>RSM ERP</h2>
            <p>Demo Workspace</p>
          </div>
        </div>
        <nav>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={page === item.id ? 'active' : ''}
                onClick={() => {
                  setPage(item.id);
                  setOpen(false);
                }}
              >
                <Icon size={18} />
                <span>{item.label}</span>
                {item.locked && <small>Full</small>}
              </button>
            );
          })}
        </nav>
      </aside>

      <section className="main-area">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setOpen(true)}><Menu size={22} /></button>
          <div>
            <h1>{active?.label || 'Dashboard'}</h1>
            <p>Super Admin · Chennai Branch</p>
          </div>
          <div className="top-actions">
            <div className="search-box"><Search size={16} /><span>Search assets, vehicles, events...</span></div>
            <button className="logout" onClick={onLogout}><LogOut size={17} /> Logout</button>
          </div>
        </header>
        {open && <button className="overlay" onClick={() => setOpen(false)}><X /></button>}
        <div className="content">{children}</div>
      </section>
    </div>
  );
}

function Dashboard({ assetsData, generatorsData, vehiclesData, eventsData, onCreateEvent }) {
  const stats = useMemo(() => ({
    availableAssets: assetsData.reduce((sum, item) => sum + item.available, 0),
    deployedAssets: assetsData.reduce((sum, item) => sum + item.deployed, 0),
    maintenance: assetsData.reduce((sum, item) => sum + item.maintenance, 0) + generatorsData.filter(g => g.status === 'Maintenance').length + vehiclesData.filter(v => v.status === 'Maintenance').length,
    overdue: reminders.filter(r => r.status === 'Overdue').length,
  }), [assetsData, generatorsData, vehiclesData]);

  return (
    <div className="page-stack">
      <div className="hero-panel">
        <div>
          <Badge type="Confirmed">Client Demo</Badge>
          <h2>Complete business overview for Ravi Sound operations</h2>
          <p>Track events, deployed equipment, vehicle renewals, generator service, staff tasks and reminders from one dashboard.</p>
        </div>
        <button onClick={onCreateEvent}><Plus size={18} /> Create Event</button>
      </div>

      <div className="stat-grid">
        <StatCard title="Due Today" value="5" icon={Clock} tone="orange" sub="tasks and renewals" />
        <StatCard title="Overdue Items" value={stats.overdue} icon={AlertTriangle} tone="red" sub="needs attention" />
        <StatCard title="Available Assets" value={stats.availableAssets} icon={CheckCircle2} tone="green" sub="ready to deploy" />
        <StatCard title="Deployed Assets" value={stats.deployedAssets} icon={Package} tone="blue" sub="currently on event" />
        <StatCard title="Maintenance Pending" value={stats.maintenance} icon={Wrench} tone="orange" sub="assets/vehicles/gensets" />
        <StatCard title="Open Tasks" value="12" icon={UserRound} tone="purple" sub="team assignments" />
      </div>

      <div className="two-col">
        <div className="panel">
          <h3>Upcoming Events</h3>
          <Table columns={['Event ID', 'Client', 'Date', 'Status']} rows={eventsData.map(e => [e.id, e.client, e.date, <Badge type={e.status}>{e.status}</Badge>])} />
        </div>
        <div className="panel">
          <h3>Upcoming Reminders</h3>
          <div className="reminder-list">
            {reminders.map(r => <div key={r.id}><div><strong>{r.title}</strong><span>{r.type} · {r.due}</span></div><Badge type={r.status}>{r.status}</Badge></div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

function Table({ columns, rows }) {
  return (
    <div className="table-wrap">
      <table>
        <thead><tr>{columns.map(c => <th key={c}>{c}</th>)}</tr></thead>
        <tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

function AssetsPage({ assetsData }) {
  return <ModulePage title="Assets / Equipment" action="Add Asset" subtitle="Track total, available, deployed and maintenance quantities.">
    <Table columns={['Code', 'Asset Name', 'Category', 'Total', 'Available', 'Deployed', 'Maintenance', 'Status']} rows={assetsData.map(a => [a.id, a.name, a.category, a.total, a.available, a.deployed, a.maintenance, <Badge type={a.status}>{a.status}</Badge>])} />
  </ModulePage>;
}

function GeneratorsPage({ generatorsData }) {
  return <ModulePage title="Generator Management" action="Add Generator" subtitle="Service reminders, fuel records and deployment tracking.">
    <Table columns={['Generator No.', 'Capacity', 'Service Frequency', 'Next Service', 'Location', 'Fuel', 'Status']} rows={generatorsData.map(g => [g.id, g.capacity, g.frequency, g.nextService, g.location, g.fuel, <Badge type={g.status}>{g.status}</Badge>])} />
  </ModulePage>;
}

function VehiclesPage({ vehiclesData }) {
  return <ModulePage title="Vehicle Management" action="Add Vehicle" subtitle="Insurance, FC, permit and pollution certificate expiry tracking.">
    <Table columns={['Vehicle No.', 'Type', 'Insurance', 'Pollution', 'FC', 'Permit', 'Status']} rows={vehiclesData.map(v => [v.id, v.type, v.insurance, v.pollution, v.fc, v.permit, <Badge type={v.status}>{v.status}</Badge>])} />
  </ModulePage>;
}

function CustomersPage() {
  return <ModulePage title="Customer Management" action="Add Customer" subtitle="Customer database with event history, notes and payment status.">
    <Table columns={['Customer ID', 'Name', 'Mobile', 'Location', 'Events', 'Payment', 'Notes']} rows={customers.map(c => [c.id, c.name, c.mobile, c.location, c.events, <Badge type={c.payment}>{c.payment}</Badge>, c.notes])} />
  </ModulePage>;
}

function EventsPage({ eventsData, assetsData, generatorsData, vehiclesData, onCreateEvent, onOpenDeployment, onReturnEvent }) {
  return <div className="page-stack">
    <div className="module-head"><div><h2>Event / Deployment Management</h2><p>Create event and assign equipment, generator, vehicle and staff.</p></div><button onClick={onCreateEvent}><Plus size={17} /> Create Event</button></div>
    <div className="event-grid">
      {eventsData.map(event => {
        const deployedAssetNames = (event.assets || []).map((assetId) => assetsData.find((asset) => asset.id === assetId)?.name || assetId);
        return <div className="event-card" key={event.id}>
          <div className="event-top"><div><h3>{event.id}</h3><p>{event.client}</p></div><Badge type={event.status}>{event.status}</Badge></div>
          <div className="event-meta"><span>{event.type}</span><span>{event.location}</span><span>{event.date}</span></div>
          <div className="deploy-box">
            <strong>Deployment</strong>
            <p>Assets: {deployedAssetNames.length ? deployedAssetNames.join(', ') : 'Not assigned'}</p>
            <p>Generator: {event.generator || 'Not assigned'}</p>
            <p>Vehicle: {event.vehicle || 'Not assigned'}</p>
            <p>Staff Assigned: {event.staff || 0}</p>
            <p>Return Status: <b>{event.returnStatus || 'Pending'}</b></p>
          </div>
          <div className="card-actions"><button onClick={() => onOpenDeployment(event)}>View / Edit Deployment</button><button className="light" onClick={() => onReturnEvent(event)}>Return Tracking</button></div>
        </div>;
      })}
    </div>

    <div className="panel">
      <h3>Available items for new deployment</h3>
      <div className="availability-strip">
        <div><strong>{assetsData.reduce((sum, asset) => sum + asset.available, 0)}</strong><span>Available Assets</span></div>
        <div><strong>{generatorsData.filter((item) => item.status === 'Available').length}</strong><span>Available Generators</span></div>
        <div><strong>{vehiclesData.filter((item) => item.status === 'Available').length}</strong><span>Available Vehicles</span></div>
        <div><strong>{staffMembers.length}</strong><span>Staff Members</span></div>
      </div>
    </div>
  </div>;
}

function RemindersPage() {
  return <ModulePage title="Reminder System" action="Add Reminder" subtitle="Automatic reminders for renewals, service due dates and task deadlines.">
    <Table columns={['Title', 'Type', 'Due Date', 'Priority', 'Status']} rows={reminders.map(r => [r.title, r.type, r.due, r.priority, <Badge type={r.status}>{r.status}</Badge>])} />
  </ModulePage>;
}


function ReportsPage({ assetsData, generatorsData, vehiclesData, eventsData }) {
  const reportCards = [
    {
      title: 'Asset Report',
      value: assetsData.reduce((sum, item) => sum + item.total, 0),
      sub: `${assetsData.reduce((sum, item) => sum + item.available, 0)} available · ${assetsData.reduce((sum, item) => sum + item.deployed, 0)} deployed`,
      icon: Package,
      tone: 'blue',
    },
    {
      title: 'Generator Report',
      value: generatorsData.length,
      sub: `${generatorsData.filter((item) => item.status === 'Available').length} available · ${generatorsData.filter((item) => item.status === 'Deployed').length} deployed`,
      icon: Zap,
      tone: 'orange',
    },
    {
      title: 'Vehicle Report',
      value: vehiclesData.length,
      sub: `${vehiclesData.filter((item) => item.status === 'Available').length} available · FC/insurance alerts ready`,
      icon: Truck,
      tone: 'green',
    },
    {
      title: 'Deployment Report',
      value: eventsData.length,
      sub: `${eventsData.filter((item) => item.status === 'Confirmed').length} active events · ${eventsData.filter((item) => item.returnStatus === 'Returned').length} returned`,
      icon: CalendarDays,
      tone: 'purple',
    },
  ];

  const expiryRows = vehiclesData.flatMap((vehicle) => [
    [vehicle.id, 'Insurance Renewal', vehicle.insurance, vehicle.status === 'Maintenance' ? <Badge type="Overdue">Overdue</Badge> : <Badge type="Upcoming">Upcoming</Badge>],
    [vehicle.id, 'FC Certificate', vehicle.fc, <Badge type="Upcoming">Upcoming</Badge>],
    [vehicle.id, 'Pollution Certificate', vehicle.pollution, vehicle.pollution === 'Expired' ? <Badge type="Overdue">Overdue</Badge> : <Badge type="Upcoming">Upcoming</Badge>],
  ]).slice(0, 8);

  const deploymentRows = eventsData.map((event) => [
    event.id,
    event.client,
    event.date,
    event.assets?.length || 0,
    event.generator || 'N/A',
    event.vehicle || 'N/A',
    <Badge type={event.returnStatus === 'Returned' ? 'Returned' : 'Pending'}>{event.returnStatus || 'Pending'}</Badge>,
  ]);

  return (
    <div className="page-stack">
      <div className="module-head reports-head">
        <div>
          <h2>Reports & Analytics</h2>
          <p>Preview of PDF/Excel reports required in the full RSM ERP version.</p>
        </div>
        <div className="report-actions">
          <button className="secondary-action">Export Excel</button>
          <button>Export PDF</button>
        </div>
      </div>

      <div className="report-filter-bar">
        <label>Report Type
          <select defaultValue="all">
            <option value="all">All Reports</option>
            <option value="asset">Asset Report</option>
            <option value="vehicle">Vehicle Report</option>
            <option value="generator">Generator Report</option>
            <option value="deployment">Deployment Report</option>
            <option value="expiry">Upcoming Expiry Report</option>
          </select>
        </label>
        <label>From Date
          <input type="date" defaultValue="2026-06-01" />
        </label>
        <label>To Date
          <input type="date" defaultValue="2026-06-30" />
        </label>
        <label>Branch
          <select defaultValue="chennai">
            <option value="chennai">Chennai Branch</option>
            <option value="madurai">Madurai Branch</option>
            <option value="coimbatore">Coimbatore Branch</option>
          </select>
        </label>
      </div>

      <div className="stat-grid">
        {reportCards.map((card) => <StatCard key={card.title} {...card} />)}
      </div>

      <div className="two-col report-columns">
        <div className="panel report-panel">
          <div className="panel-title-row">
            <h3>Upcoming Expiry Report</h3>
            <span>Vehicle insurance, FC and pollution alerts</span>
          </div>
          <Table columns={['Vehicle', 'Document', 'Expiry Date', 'Status']} rows={expiryRows} />
        </div>
        <div className="panel report-panel">
          <div className="panel-title-row">
            <h3>Maintenance Report</h3>
            <span>Assets, generators and vehicles requiring service</span>
          </div>
          <Table columns={['Item', 'Type', 'Due / Issue', 'Status']} rows={[
            ['GEN-103', 'Generator Service', 'Service Overdue', <Badge type="Overdue">Overdue</Badge>],
            ['SPK-001', 'Speaker Set', '2 units in maintenance', <Badge type="Upcoming">Pending</Badge>],
            ['TN 03 EF 7890', 'Vehicle', 'Pollution expired', <Badge type="Overdue">Overdue</Badge>],
            ['LGT-001', 'Lighting', 'Routine check required', <Badge type="Upcoming">Upcoming</Badge>],
          ]} />
        </div>
      </div>

      <div className="panel report-panel">
        <div className="panel-title-row">
          <h3>Deployment Report</h3>
          <span>Event-wise equipment, generator, vehicle and return status</span>
        </div>
        <Table columns={['Event ID', 'Client', 'Date', 'Assets', 'Generator', 'Vehicle', 'Return']} rows={deploymentRows} />
      </div>

      <div className="report-note">
        <FileBarChart size={20} />
        <div>
          <strong>Demo note</strong>
          <p>In the final version these buttons will generate real PDF and Excel files from backend data with filters, branch selection and date range.</p>
        </div>
      </div>
    </div>
  );
}

function Placeholder({ title }) {
  return <div className="empty-state"><h2>{title}</h2><p>This module will be included in the full version after client approval.</p><button>Show in Proposal</button></div>;
}

function ModulePage({ title, subtitle, action, children }) {
  return <div className="page-stack"><div className="module-head"><div><h2>{title}</h2><p>{subtitle}</p></div><button>{action}</button></div><div className="panel">{children}</div></div>;
}

function Modal({ title, subtitle, children, onClose }) {
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="modal-card" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}>
        <div className="modal-head">
          <div>
            <h2>{title}</h2>
            {subtitle && <p>{subtitle}</p>}
          </div>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>
        {children}
      </section>
    </div>
  );
}

function AddEventModal({ onClose, onCreate }) {
  const [form, setForm] = useState({
    client: customers[0]?.name || '',
    type: 'Wedding',
    date: today,
    location: 'Chennai',
    status: 'Planning',
    notes: '',
  });

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    onCreate({
      ...form,
      id: `RSM-EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      assets: [],
      generator: '',
      vehicle: '',
      staff: 0,
      returnStatus: 'Pending',
    });
  };

  return (
    <Modal title="Create New Event" subtitle="Add event details first. Deployment can be assigned in the next step." onClose={onClose}>
      <form className="form-grid" onSubmit={submit}>
        <label>Client Name
          <select value={form.client} onChange={(e) => update('client', e.target.value)}>
            {customers.map((customer) => <option key={customer.id}>{customer.name}</option>)}
          </select>
        </label>
        <label>Event Type
          <select value={form.type} onChange={(e) => update('type', e.target.value)}>
            <option>Wedding</option>
            <option>Corporate</option>
            <option>Birthday</option>
            <option>Temple Function</option>
            <option>Political Event</option>
            <option>College Event</option>
          </select>
        </label>
        <label>Event Date
          <input type="date" value={form.date} onChange={(e) => update('date', e.target.value)} />
        </label>
        <label>Location
          <input value={form.location} onChange={(e) => update('location', e.target.value)} placeholder="Event location" />
        </label>
        <label>Status
          <select value={form.status} onChange={(e) => update('status', e.target.value)}>
            <option>Planning</option>
            <option>Confirmed</option>
          </select>
        </label>
        <label className="full-field">Notes
          <textarea value={form.notes} onChange={(e) => update('notes', e.target.value)} placeholder="Special requirements, timing, stage size, etc." />
        </label>
        <div className="modal-actions full-field">
          <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary-btn">Create Event</button>
        </div>
      </form>
    </Modal>
  );
}

function DeploymentModal({ event, assetsData, generatorsData, vehiclesData, onClose, onSave }) {
  const [selectedAssets, setSelectedAssets] = useState(event.assets || []);
  const [generator, setGenerator] = useState(event.generator || '');
  const [vehicle, setVehicle] = useState(event.vehicle || '');
  const [selectedStaff, setSelectedStaff] = useState(event.staffList || []);

  const toggleAsset = (assetId) => {
    setSelectedAssets((prev) => prev.includes(assetId) ? prev.filter((id) => id !== assetId) : [...prev, assetId]);
  };

  const toggleStaff = (staffId) => {
    setSelectedStaff((prev) => prev.includes(staffId) ? prev.filter((id) => id !== staffId) : [...prev, staffId]);
  };

  const submit = (submitEvent) => {
    submitEvent.preventDefault();
    onSave({
      ...event,
      assets: selectedAssets,
      generator,
      vehicle,
      staff: selectedStaff.length,
      staffList: selectedStaff,
      status: 'Confirmed',
      returnStatus: 'Pending',
    });
  };

  return (
    <Modal title="Deployment Assignment" subtitle={`${event.id} · ${event.client}`} onClose={onClose}>
      <form className="deployment-form" onSubmit={submit}>
        <div className="deploy-section">
          <h3><Package size={18} /> Equipment Deployment</h3>
          <div className="check-grid">
            {assetsData.map((asset) => {
              const isSelected = selectedAssets.includes(asset.id);
              const disabled = asset.available <= 0 && !isSelected;
              return <label className={`check-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`} key={asset.id}>
                <input type="checkbox" checked={isSelected} disabled={disabled} onChange={() => toggleAsset(asset.id)} />
                <strong>{asset.name}</strong>
                <span>{asset.id} · Available: {asset.available}</span>
              </label>;
            })}
          </div>
        </div>

        <div className="form-grid compact">
          <label>Generator
            <select value={generator} onChange={(e) => setGenerator(e.target.value)}>
              <option value="">Select Generator</option>
              {generatorsData.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.capacity} · {item.status}</option>)}
            </select>
          </label>
          <label>Vehicle
            <select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
              <option value="">Select Vehicle</option>
              {vehiclesData.map((item) => <option key={item.id} value={item.id}>{item.id} · {item.type} · {item.status}</option>)}
            </select>
          </label>
        </div>

        <div className="deploy-section">
          <h3><Users size={18} /> Staff Deployment</h3>
          <div className="check-grid staff-grid">
            {staffMembers.map((staff) => {
              const isSelected = selectedStaff.includes(staff.id);
              return <label className={`check-card ${isSelected ? 'selected' : ''}`} key={staff.id}>
                <input type="checkbox" checked={isSelected} onChange={() => toggleStaff(staff.id)} />
                <strong>{staff.name}</strong>
                <span>{staff.role}</span>
              </label>;
            })}
          </div>
        </div>

        <div className="demo-note"><ClipboardCheck size={18} /> In full version, this save action will create deployment records and update stock/availability in database.</div>

        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>Cancel</button>
          <button type="submit" className="primary-btn">Save Deployment</button>
        </div>
      </form>
    </Modal>
  );
}

function ReturnModal({ event, onClose, onConfirm }) {
  return (
    <Modal title="Return Tracking" subtitle={`${event.id} · ${event.client}`} onClose={onClose}>
      <div className="return-box">
        <p>Mark deployed equipment, generator, vehicle and staff as returned after the event.</p>
        <div className="return-summary">
          <span>Assets</span><strong>{event.assets?.length || 0}</strong>
          <span>Generator</span><strong>{event.generator || 'N/A'}</strong>
          <span>Vehicle</span><strong>{event.vehicle || 'N/A'}</strong>
          <span>Staff</span><strong>{event.staff || 0}</strong>
        </div>
        <div className="demo-note"><AlertTriangle size={18} /> Full system can also track missing, damaged, late return and repair-required items.</div>
        <div className="modal-actions">
          <button type="button" className="secondary-btn" onClick={onClose}>Close</button>
          <button type="button" className="primary-btn" onClick={() => onConfirm(event)}>Mark All Returned</button>
        </div>
      </div>
    </Modal>
  );
}

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [page, setPage] = useState('dashboard');
  const [eventsData, setEventsData] = useState(events);
  const [assetsData, setAssetsData] = useState(assets);
  const [generatorsData, setGeneratorsData] = useState(generators);
  const [vehiclesData, setVehiclesData] = useState(vehicles);
  const [modal, setModal] = useState(null);

  const openCreateEvent = () => setModal({ type: 'create-event' });

  const createEvent = (newEvent) => {
    setEventsData((prev) => [newEvent, ...prev]);
    setPage('events');
    setModal({ type: 'deployment', event: newEvent });
  };

  const saveDeployment = (updatedEvent) => {
    const oldEvent = eventsData.find((item) => item.id === updatedEvent.id) || {};
    const oldAssets = oldEvent.assets || [];
    const newAssets = updatedEvent.assets || [];
    const addedAssets = newAssets.filter((id) => !oldAssets.includes(id));

    setEventsData((prev) => prev.map((item) => item.id === updatedEvent.id ? updatedEvent : item));

    if (addedAssets.length) {
      setAssetsData((prev) => prev.map((asset) => {
        if (!addedAssets.includes(asset.id)) return asset;
        const available = Math.max(0, asset.available - 1);
        return { ...asset, available, deployed: asset.deployed + 1, status: available === 0 ? 'Deployed' : asset.status };
      }));
    }

    if (updatedEvent.generator) {
      setGeneratorsData((prev) => prev.map((item) => item.id === updatedEvent.generator ? { ...item, status: 'Deployed', location: updatedEvent.client } : item));
    }
    if (updatedEvent.vehicle) {
      setVehiclesData((prev) => prev.map((item) => item.id === updatedEvent.vehicle ? { ...item, status: 'Deployed' } : item));
    }

    setModal(null);
  };

  const confirmReturn = (eventToReturn) => {
    setEventsData((prev) => prev.map((item) => item.id === eventToReturn.id ? { ...item, status: 'Completed', returnStatus: 'Returned' } : item));

    setAssetsData((prev) => prev.map((asset) => {
      if (!eventToReturn.assets?.includes(asset.id)) return asset;
      return { ...asset, available: asset.available + 1, deployed: Math.max(0, asset.deployed - 1), status: 'Available' };
    }));

    if (eventToReturn.generator) {
      setGeneratorsData((prev) => prev.map((item) => item.id === eventToReturn.generator ? { ...item, status: 'Available', location: 'Main Godown' } : item));
    }
    if (eventToReturn.vehicle) {
      setVehiclesData((prev) => prev.map((item) => item.id === eventToReturn.vehicle ? { ...item, status: 'Available' } : item));
    }

    setModal(null);
  };

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />;

  const pages = {
    dashboard: <Dashboard assetsData={assetsData} generatorsData={generatorsData} vehiclesData={vehiclesData} eventsData={eventsData} onCreateEvent={openCreateEvent} />,
    assets: <AssetsPage assetsData={assetsData} />,
    generators: <GeneratorsPage generatorsData={generatorsData} />,
    vehicles: <VehiclesPage vehiclesData={vehiclesData} />,
    customers: <CustomersPage />,
    events: <EventsPage eventsData={eventsData} assetsData={assetsData} generatorsData={generatorsData} vehiclesData={vehiclesData} onCreateEvent={openCreateEvent} onOpenDeployment={(event) => setModal({ type: 'deployment', event })} onReturnEvent={(event) => setModal({ type: 'return', event })} />,
    reminders: <RemindersPage />,
    reports: <ReportsPage assetsData={assetsData} generatorsData={generatorsData} vehiclesData={vehiclesData} eventsData={eventsData} />,
    settings: <Placeholder title="Settings, Branding & Permissions" />,
  };

  return <>
    <Layout page={page} setPage={setPage} onLogout={() => setLoggedIn(false)}>{pages[page]}</Layout>
    {modal?.type === 'create-event' && <AddEventModal onClose={() => setModal(null)} onCreate={createEvent} />}
    {modal?.type === 'deployment' && <DeploymentModal event={modal.event} assetsData={assetsData} generatorsData={generatorsData} vehiclesData={vehiclesData} onClose={() => setModal(null)} onSave={saveDeployment} />}
    {modal?.type === 'return' && <ReturnModal event={modal.event} onClose={() => setModal(null)} onConfirm={confirmReturn} />}
  </>;
}

createRoot(document.getElementById('root')).render(<App />);
