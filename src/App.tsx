/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { supabase } from './utils/supabase';
import AuthView from './components/AuthView';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  HelpCircle,
  Search,
  Bell,
  Plus,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  History,
  Download,
  Filter,
  MoreVertical,
  QrCode,
  Landmark,
  Wallet,
  Palette,
  Code,
  Music,
  ToyBrick,
  CheckCircle2,
  XCircle,
  Send,
  Save,
  Eye,
  MoreHorizontal,
  ChevronDown,
  LogOut
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Custom Icons for specialized views
const HubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 7V17L12 22L20 17V7L12 2Z" fill="currentColor" fillOpacity="0.2" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
    <path d="M12 2V9M12 22V15M4 7L10 10.5M20 17L14 13.5M20 7L14 10.5M4 17L10 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

type Tab = 'dashboard' | 'classes' | 'students' | 'payments' | 'messages';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardView />;
      case 'classes': return <ClassesView />;
      case 'students': return <StudentsView />;
      case 'payments': return <PaymentsView />;
      case 'messages': return <MessagesView />;
      default: return <DashboardView />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <HubIcon />
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-primary/40 animate-pulse">Initializing System...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return <AuthView />;
  }

  return (
    <div className="flex min-h-screen bg-surface">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 flex flex-col py-8 px-6 bg-surface border-r border-primary/10 z-50">
        <div className="flex flex-col gap-1 mb-16">
          <div className="flex items-center gap-2 text-primary">
            <HubIcon />
            <h1 className="text-2xl font-serif italic tracking-tighter leading-none">HobbyHub</h1>
          </div>
          <p className="text-[9px] uppercase font-bold text-tertiary tracking-[0.3em] mt-2">Operator Suite</p>
        </div>

        <nav className="flex-1 space-y-6">
          <SidebarItem 
            active={activeTab === 'dashboard'} 
            onClick={() => setActiveTab('dashboard')} 
            icon={<LayoutDashboard size={18} />} 
            label="Dashboard" 
          />
          <SidebarItem 
            active={activeTab === 'classes'} 
            onClick={() => setActiveTab('classes')} 
            icon={<CalendarDays size={18} />} 
            label="Classes" 
          />
          <SidebarItem 
            active={activeTab === 'students'} 
            onClick={() => setActiveTab('students')} 
            icon={<Users size={18} />} 
            label="Students" 
          />
          <SidebarItem 
            active={activeTab === 'payments'} 
            onClick={() => setActiveTab('payments')} 
            icon={<CreditCard size={18} />} 
            label="Payments" 
          />
          <SidebarItem 
            active={activeTab === 'messages'} 
            onClick={() => setActiveTab('messages')} 
            icon={<MessageSquare size={18} />} 
            label="Messages" 
          />
        </nav>

        <div className="mt-auto space-y-4 pt-8 border-t border-primary/10">
          <SidebarItem icon={<Settings size={18} />} label="Settings" />
          <SidebarItem icon={<LogOut size={18} />} label="Logout" onClick={handleLogout} />
          <p className="text-[10px] uppercase font-bold tracking-widest text-on-surface-variant/40 pt-4">© 2024 Monolith Press</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col">
        {/* Top bar */}
        <header className="fixed top-0 right-0 left-64 h-24 bg-surface flex justify-between items-center px-12 z-40 border-b border-primary">
          <div className="flex items-center border-b border-primary/20 pb-1 w-96 group focus-within:border-primary transition-colors">
            <Search size={16} className="text-primary/40 mr-2" />
            <input 
              type="text" 
              placeholder="Search Archives..." 
              className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:uppercase placeholder:tracking-widest placeholder:text-[10px] placeholder:font-bold"
            />
          </div>

          <div className="flex items-center gap-10">
            <button className="text-primary font-bold text-[10px] uppercase tracking-[0.2em] border-b border-primary pb-1 hover:opacity-60 transition-opacity">
              + New Class
            </button>
            <div className="flex items-center gap-6 text-primary">
              <button className="relative hover:opacity-60 transition-opacity">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-tertiary rounded-full"></span>
              </button>
            </div>
            <div className="h-10 w-10 border border-primary p-0.5 grayscale hover:grayscale-0 transition-all">
              <img 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>

        <main className="mt-24 p-12 custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}

function SidebarItem({ active, onClick, icon, label }: { active?: boolean, onClick?: () => void, icon: React.ReactNode, label: string }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-4 py-1 transition-all text-left ${
        active 
          ? 'text-primary font-bold border-b border-primary' 
          : 'text-primary/40 hover:text-primary'
      }`}
    >
      <span className="shrink-0">{icon}</span>
      <span className="text-[11px] uppercase tracking-[0.25em] font-bold">{label}</span>
    </button>
  );
}

// --- Dashboard View Components ---
function DashboardView() {
  return (
    <div className="space-y-16">
      <header className="border-b border-primary pb-8">
        <div className="text-[10px] font-bold tracking-[0.3em] uppercase text-tertiary mb-4">Chapter 01 — Overview</div>
        <h1 className="text-7xl font-serif italic tracking-tighter text-on-surface mb-2">Good morning, Operator</h1>
        <p className="text-xl font-serif italic text-on-surface-variant/60 max-w-2xl">"Efficiency is not just about speed, but the deliberate space created for creativity to flourish."</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-16">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <MetricCard 
              label="Total Enrollment" 
              value="156" 
              trend="+12% Periodic Expansion" 
              icon={<Users size={24} />} 
              bgColor="bg-primary/5"
            />
            <MetricCard 
              label="Pending Payments" 
              value="05" 
              trend="Attention Required" 
              isWarning
              icon={<CreditCard size={24} />} 
              bgColor="bg-error/5"
            />
          </div>

          {/* Schedule */}
          <div className="bg-white p-10 border border-primary relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none transition-opacity group-hover:opacity-10">
              <CalendarDays size={200} />
            </div>
            <div className="flex items-center justify-between mb-12 border-b border-primary/10 pb-4">
              <h3 className="text-2xl font-serif italic tracking-tight text-on-surface">Daily Archive</h3>
              <div className="flex items-center gap-6">
                <button className="hover:opacity-60 transition-opacity"><ChevronLeft size={18} /></button>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Wed, 24 May</span>
                <button className="hover:opacity-60 transition-opacity"><ChevronRight size={18} /></button>
              </div>
            </div>

            <div className="relative pl-16 border-l border-primary/20 space-y-16 pb-4">
              <TimelineEvent 
                time="09:00" 
                title="Beginner Watercolor" 
                room="Studio A" 
                duration="90m" 
                students="12" 
                fee="RM 120.00" 
                color="primary"
                icon={<Palette size={14} />}
              />
              <TimelineEvent 
                time="11:30" 
                title="Python for Kids" 
                room="Lab 2" 
                duration="60m" 
                students="08" 
                fee="RM 150.00" 
                color="secondary"
                icon={<Code size={14} />}
              />
              <TimelineEvent 
                time="14:00" 
                title="Piano Mastery" 
                room="Suite 1" 
                duration="45m" 
                students="01" 
                fee="RM 200.00" 
                color="warning"
                icon={<Music size={14} />}
              />
            </div>
          </div>
        </div>

        {/* Sidebar Components */}
        <div className="lg:col-span-4 space-y-12">
          <div className="bg-white p-8 border border-primary">
            <h3 className="text-[10px] font-bold text-on-surface-variant mb-8 uppercase tracking-[0.4em] border-b border-primary/10 pb-2">Quick Commands</h3>
            <div className="space-y-6">
              <QuickActionButton icon={<Users size={16} />} label="Mark Attendance" />
              <QuickActionButton icon={<Send size={16} />} label="Parent Update" />
              <QuickActionButton icon={<Plus size={16} />} label="Add Student" />
            </div>
          </div>

          <div className="bg-white border border-primary overflow-hidden">
            <div className="p-8 border-b border-primary flex items-center justify-between bg-primary text-on-primary">
              <h3 className="text-lg font-serif italic tracking-tight">Absent Index</h3>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2 py-0.5">04 Count</span>
            </div>
            <div className="divide-y divide-primary/10">
              <AbsentStudent name="Ahmad Rizwan" info="Studio A — 09:00" image="https://i.pravatar.cc/150?u=1" />
              <AbsentStudent name="Lim Wei Ling" info="Lab 2 — 11:30" image="https://i.pravatar.cc/150?u=2" />
              <AbsentStudent name="Karthik Raja" info="Workshop — 16:30" image="https://i.pravatar.cc/150?u=4" />
            </div>
            <button className="w-full py-4 bg-surface text-primary font-bold text-[10px] uppercase tracking-[0.3em] hover:bg-primary hover:text-on-primary transition-all">
              Manage All Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value, trend, icon, bgColor, isWarning }: { label: string, value: string, trend: string, icon: React.ReactNode, bgColor: string, isWarning?: boolean }) {
  return (
    <div className={`bg-white p-8 border border-primary relative flex flex-col justify-between hover:translate-x-1 transition-transform cursor-default`}>
      <div className="mb-6 flex justify-between items-start">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary/40">{label}</p>
        <div className={`text-primary`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className={`text-6xl font-serif italic tracking-tighter mb-2 ${isWarning ? 'text-tertiary' : 'text-primary'}`}>{value}</h3>
        <p className={`text-[9px] uppercase tracking-widest font-bold ${isWarning ? 'text-tertiary' : 'text-primary/60'}`}>
          {trend}
        </p>
      </div>
    </div>
  );
}

function TimelineEvent({ time, title, room, duration, students, fee, color, icon }: { time: string, title: string, room: string, duration: string, students: string, fee: string, color: string, icon: React.ReactNode }) {
  return (
    <div className="relative group">
      <span className="absolute -left-16 top-0 text-[10px] font-bold tracking-widest text-primary/40 pt-1">{time}</span>
      <div className={`absolute -left-[10px] top-1.5 w-5 h-5 rounded-full border border-primary bg-white flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors`}>
        {icon}
      </div>
      <div className={`pb-2 border-b border-primary/10 group-hover:border-primary transition-colors cursor-pointer`}>
        <div className="flex justify-between items-baseline mb-2">
          <h4 className="text-2xl font-serif italic tracking-tight text-on-surface">{title}</h4>
          <span className="text-[9px] font-bold tracking-[0.2em] uppercase opacity-40">{room}</span>
        </div>
        <div className="flex items-center gap-6 text-[9px] font-bold uppercase tracking-widest text-primary/60">
          <span>{duration}</span>
          <span>{students} Students</span>
          <span className="text-tertiary">{fee}</span>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <button className="w-full flex items-center justify-between group border-b border-primary/10 pb-2 hover:border-primary transition-all">
      <div className="flex items-center gap-3">
        <span className="text-primary/40 group-hover:text-primary transition-colors">{icon}</span>
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary">{label}</span>
      </div>
      <ArrowRight size={14} className="text-primary opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
    </button>
  );
}

function AbsentStudent({ name, info, image }: { name: string, info: string, image: string }) {
  return (
    <div className="flex items-center justify-between p-6 hover:bg-primary/5 transition-colors group">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img src={image} className="w-10 h-10 border border-primary grayscale group-hover:grayscale-0 transition-all object-cover" alt={name} />
        </div>
        <div>
          <h4 className="text-sm font-serif italic tracking-tight">{name}</h4>
          <p className="text-[9px] uppercase tracking-widest font-bold opacity-40">{info}</p>
        </div>
      </div>
      <button className="p-2 border border-primary/20 hover:border-primary transition-colors rounded-full">
        <MessageSquare size={14} className="text-primary" />
      </button>
    </div>
  );
}

// --- Classes View Components ---
function ClassesView() {
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

  if (selectedClass) {
    return <StudentListView onClose={() => setSelectedClass(null)} className={selectedClass} />;
  }

  return (
    <div className="space-y-16">
      <header className="flex justify-between items-end border-b border-primary pb-8">
        <div>
          <nav className="flex items-center gap-2 text-[9px] font-bold tracking-[0.3em] uppercase text-primary/40 mb-4">
            <span>Archives</span>
            <ChevronRight size={10} />
            <span className="text-tertiary">Class Catalog</span>
          </nav>
          <h2 className="text-6xl font-serif italic tracking-tighter text-on-surface">Class Manager</h2>
          <p className="text-xl font-serif italic text-on-surface-variant/60 mt-2 max-w-xl">Curating the finest sessions for evolving minds.</p>
        </div>
        <div className="flex gap-4 border border-primary p-1">
          <button className="px-6 py-2 bg-primary text-on-primary text-[10px] uppercase tracking-widest font-bold">Grid</button>
          <button className="px-6 py-2 text-primary text-[10px] uppercase tracking-widest font-bold opacity-40 hover:opacity-100">Timeline</button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        <ClassCard 
          title="Junior Robotics" 
          time="Saturdays — 10:00" 
          enrolled="12 / 15" 
          teacher="Ariff Rahim" 
          fee="RM 180 / term" 
          icon={<ToyBrick size={20} />} 
          status="Active"
          onClick={() => {}}
        />
        <ClassCard 
          title="Watercolor Basics" 
          time="Sundays — 14:00" 
          enrolled="08 / 10" 
          teacher="Sarah Jenkins" 
          fee="RM 150 / term" 
          icon={<Palette size={20} />} 
          status="Selected"
          isSelected
          onClick={() => setSelectedClass("Watercolor Basics")}
        />
        <ClassCard 
          title="Beginner Piano" 
          time="Fridays — 17:00" 
          enrolled="05 / 05" 
          teacher="Wong Wei" 
          fee="RM 220 / term" 
          icon={<Music size={20} />} 
          status="Full"
          progressColor="bg-tertiary"
          onClick={() => {}}
        />
      </div>
    </div>
  );
}

function ClassCard({ title, time, enrolled, teacher, fee, icon, status, isSelected, onClick, progressColor = "bg-primary" }: any) {
  return (
    <div className={`bg-white p-8 border transition-all hover:translate-y-[-4px] group flex flex-col justify-between h-[420px] ${
      isSelected ? 'border-primary ring-1 ring-primary' : 'border-primary/10 hover:border-primary'
    }`}>
      <div>
        <div className="flex justify-between items-start mb-8">
          <div className="p-4 border border-primary/10 group-hover:border-primary transition-colors text-primary grayscale group-hover:grayscale-0">
            {icon}
          </div>
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-tertiary">{status}</span>
        </div>
        <h3 className="text-3xl font-serif italic tracking-tight text-on-surface mb-2">{title}</h3>
        <p className="text-[10px] font-bold uppercase tracking-widest text-primary/40 flex items-center gap-2 mb-8">
          <History size={12} /> {time}
        </p>
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-end text-[10px] uppercase tracking-widest font-bold">
            <span className="text-primary/40">Enrollment</span>
            <span className="text-primary">{enrolled}</span>
          </div>
          <div className="w-full bg-primary/5 h-px relative">
            <div className={`${progressColor} h-1 absolute -top-[0.5px] rounded-full`} style={{ width: '80%' }}></div>
          </div>
          <div className="flex justify-between items-end text-[10px] uppercase tracking-widest font-bold">
            <span className="text-primary/40">Instructor</span>
            <span className="text-primary">{teacher}</span>
          </div>
        </div>
      </div>
      <button 
        onClick={onClick}
        className={`w-full py-4 border font-bold text-[10px] uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
          isSelected 
            ? 'bg-primary text-on-primary border-primary' 
            : 'border-primary text-primary hover:bg-primary hover:text-on-primary'
        }`}
      >
        {status === "Selected" ? "Managing Session" : "Access Records"}
        {status === "Selected" ? <ChevronDown size={14} /> : <ArrowRight size={14} />}
      </button>
    </div>
  );
}

function StudentListView({ onClose, className }: any) {
  return (
    <div className="space-y-12">
      <button onClick={onClose} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:opacity-60 transition-opacity">
        <ChevronLeft size={16} /> Return to Archives
      </button>

      <section className="bg-white border border-primary relative">
        <div className="px-10 py-10 border-b border-primary/10 flex justify-between items-center bg-primary text-on-primary">
          <div>
            <h3 className="text-4xl font-serif italic tracking-tighter">Student Registry — {className}</h3>
            <p className="text-[10px] uppercase font-bold tracking-[0.3em] mt-2 opacity-60">Catalogue of active participants and performance metadata.</p>
          </div>
          <div className="flex gap-4">
            <button className="p-3 border border-white/20 hover:bg-white/10 transition-colors"><Filter size={18}/></button>
            <button className="p-3 border border-white/20 hover:bg-white/10 transition-colors"><Download size={18}/></button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface border-b border-primary/10 text-primary/40 font-bold text-[10px] uppercase tracking-[0.3em]">
                <th className="px-10 py-6">Member Identity</th>
                <th className="px-10 py-6">Persistence (Last 10 Cycles)</th>
                <th className="px-10 py-6 text-center">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              <StudentRow name="Ahmad Muiz" joined="Jan 2024" initials="AM" status="Paid" history={[1, 1, 0, 1, 1, 1, 1, 1, 1, -1]} />
              <StudentRow name="Lim Yi" joined="Feb 2024" initials="LY" status="Overdue" history={[1, 1, 1, 1, 0, 0, 1, 1, 1, -1]} color="bg-tertiary text-on-tertiary" />
              <StudentRow name="Siti Khadijah" joined="Mar 2024" initials="SK" status="Paid" history={[1, 1, 1, 1, 1, 1, 1, 1, 1, -1]} />
            </tbody>
          </table>
        </div>
        <div className="px-10 py-6 bg-surface border-t border-primary/10 flex justify-between items-center">
          <div className="text-[10px] uppercase font-bold tracking-widest text-primary/40">Registry Page 01 — Index [3/8]</div>
          <div className="flex gap-4">
            <button disabled className="p-3 border border-primary/10 opacity-30 cursor-not-allowed"><ChevronLeft size={16}/></button>
            <button className="p-3 border border-primary/10 hover:border-primary transition-colors"><ChevronRight size={16}/></button>
          </div>
        </div>
      </section>
    </div>
  );
}

function StudentRow({ name, joined, initials, status, history, color = "bg-primary text-on-primary" }: any) {
  return (
    <tr className="hover:bg-primary/5 transition-colors group">
      <td className="px-10 py-8">
        <div className="flex items-center gap-6">
          <div className={`w-12 h-12 flex items-center justify-center font-bold text-[10px] grayscale group-hover:grayscale-0 transition-all border border-primary/20 ${color}`}>{initials}</div>
          <div>
            <div className="text-lg font-serif italic tracking-tight text-on-surface">{name}</div>
            <div className="text-[9px] uppercase tracking-widest font-bold opacity-40">Entry Cycle: {joined}</div>
          </div>
        </div>
      </td>
      <td className="px-10 py-8">
        <div className="flex gap-2 items-center">
          {history.map((val: number, i: number) => (
            <div key={i} className={`w-3 h-3 ${
              val === 1 ? 'bg-primary opacity-80' : val === 0 ? 'bg-tertiary shadow-[0_0_8px_rgba(196,164,132,0.5)]' : 'border border-primary/10'
            }`} />
          ))}
        </div>
      </td>
      <td className="px-10 py-8 text-center">
        <span className={`px-4 py-1 text-[9px] font-bold uppercase tracking-[0.2em] border ${
          status === 'Paid' ? 'border-primary/20 text-primary' : 'border-tertiary text-tertiary'
        }`}>{status}</span>
      </td>
      <td className="px-10 py-8 text-right">
        <button className="text-[10px] font-bold uppercase tracking-widest border-b border-primary hover:opacity-60 transition-opacity">Log Presence</button>
      </td>
    </tr>
  );
}

// --- Students View Components ---
function StudentsView() {
  return (
    <div className="space-y-16">
      <header className="flex justify-between items-end border-b border-primary pb-8">
        <div>
          <h2 className="text-6xl font-serif italic tracking-tighter text-on-surface">Students</h2>
          <p className="text-xl font-serif italic text-on-surface-variant/60 mt-2">Nurturing the next generation of creative pioneers.</p>
        </div>
        <div className="flex gap-6 items-center">
          <div className="relative border-b border-primary">
            <select className="appearance-none bg-transparent pr-8 py-2 text-[10px] font-bold uppercase tracking-widest outline-none cursor-pointer">
              <option>Status: All</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
            <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-primary" size={14} />
          </div>
          <button className="bg-primary text-on-primary px-10 py-3 text-[10px] uppercase font-bold tracking-[0.3em] hover:opacity-90 transition-all">
            + New Member
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-12">
          <StudentCard 
            name="Maya Jenkins" 
            classTitle="Saturday Art" 
            parent="Sarah Jenkins" 
            attendance="92%" 
            status="Paid" 
            progress={92}
            image="https://i.pravatar.cc/150?u=a"
          />
          <StudentCard 
            name="Leo Thorne" 
            classTitle="Pottery 101" 
            parent="Mark Thorne" 
            attendance="78%" 
            status="Overdue" 
            progress={78}
            active
            image="https://i.pravatar.cc/150?u=b"
          />
          <StudentCard 
            name="Amara Gupta" 
            classTitle="Saturday Art" 
            parent="Priya Gupta" 
            attendance="100%" 
            status="Partial" 
            progress={100}
            image="https://i.pravatar.cc/150?u=c"
          />
          <StudentCard 
            name="Felix Owens" 
            classTitle="Guitar Basics" 
            parent="David Owens" 
            attendance="85%" 
            status="Paid" 
            progress={85}
            image="https://i.pravatar.cc/150?u=d"
          />
        </div>

        <div className="bg-white border border-primary sticky top-28 overflow-hidden">
          <div className="p-10 bg-primary text-on-primary">
            <div className="flex items-center gap-6 mb-10">
              <img src="https://i.pravatar.cc/150?u=b" alt="Leo Thorne" className="w-24 h-24 border border-white/20 grayscale object-cover" />
              <div>
                <h3 className="text-3xl font-serif italic tracking-tight">Leo Thorne</h3>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">Pottery 101 — Level 2</p>
              </div>
            </div>
            <button className="w-full border border-white py-4 text-[10px] font-bold uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white hover:text-primary transition-all">
              <MessageSquare size={16} /> Contact Guardian
            </button>
          </div>
          <div className="p-10 space-y-12">
            <section>
              <h4 className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.4em] mb-6 border-b border-primary/10 pb-2">Narrative Progress</h4>
              <div className="space-y-6">
                <NoteItem date="Oct 12" text='"Mastered the centering technique today. Great focus!"' isBold />
                <NoteItem date="Oct 05" text='"Started working with larger clay masses. Struggling with walls."' />
              </div>
            </section>
            <section>
              <h4 className="text-[10px] font-bold text-primary/40 uppercase tracking-[0.4em] mb-6 border-b border-primary/10 pb-2">Periodic Persistence</h4>
              <div className="flex items-end justify-between h-32 gap-3 pb-2 border-b border-primary/10">
                <div className="flex-1 bg-primary h-full opacity-80"></div>
                <div className="flex-1 bg-primary h-full opacity-80"></div>
                <div className="flex-1 bg-tertiary h-2/5"></div>
                <div className="flex-1 bg-primary h-full opacity-80"></div>
                <div className="flex-1 bg-primary h-1/5 opacity-10"></div>
              </div>
              <div className="flex justify-between mt-4 text-[9px] text-primary/40 font-bold tracking-widest">
                <span>PHASE 1</span><span>PHASE 2</span><span>PHASE 3</span><span>PHASE 4</span><span>PHASE 5</span>
              </div>
            </section>
            <button className="w-full py-4 border border-primary text-primary text-[10px] uppercase font-bold tracking-widest hover:bg-primary hover:text-on-primary transition-all">
              View Detailed Portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StudentCard({ name, classTitle, parent, attendance, status, progress, active, image }: any) {
  return (
    <div className={`bg-white p-8 border transition-all cursor-pointer group ${
      active ? 'border-tertiary ring-1 ring-tertiary' : 'border-primary/10 hover:border-primary'
    }`}>
      <div className="flex justify-between items-start mb-8">
        <img src={image} className="w-20 h-20 border border-primary/10 grayscale group-hover:grayscale-0 transition-all object-cover" alt={name} />
        <span className={`text-[9px] font-bold uppercase tracking-widest border px-3 py-1 ${
          status === 'Paid' ? 'border-primary/20 text-primary' : 'border-tertiary text-tertiary'
        }`}>{status}</span>
      </div>
      <h3 className="text-2xl font-serif italic tracking-tight text-on-surface mb-2">{name}</h3>
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-tertiary mb-8">{classTitle}</p>
      <div className="space-y-4 pt-6 border-t border-primary/5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-widest font-bold">
          <span className="text-primary/40 flex items-center gap-2">
            <Users size={12} /> {parent}
          </span>
          <span className="text-primary">{attendance}</span>
        </div>
        <div className="w-full bg-primary/5 h-px relative">
          <div className="bg-primary h-1 absolute -top-[0.5px] rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

function NoteItem({ date, text, isBold }: { date: string, text: string, isBold?: boolean }) {
  return (
    <div className="flex gap-6 group">
      <div className="flex flex-col items-center">
        <div className={`w-1.5 h-1.5 border border-primary ${isBold ? 'bg-primary' : 'bg-transparent'} mt-2`}></div>
        <div className="w-px h-full bg-primary/10 my-2"></div>
      </div>
      <div className="pb-6">
        <p className={`text-[10px] font-bold tracking-widest ${isBold ? 'text-primary' : 'text-primary/40'}`}>{date}</p>
        <p className={`text-sm mt-2 font-serif italic ${isBold ? 'text-on-surface opacity-100' : 'text-on-surface/60'}`}>{text}</p>
      </div>
    </div>
  );
}

// --- Payments View Components ---
function PaymentsView() {
  return (
    <div className="space-y-16">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-10 border-b border-primary pb-8">
        <div>
          <h1 className="text-6xl font-serif italic tracking-tighter text-on-surface">Payments</h1>
          <p className="text-xl font-serif italic text-on-surface-variant/60 mt-2">Documenting the exchange of value within our creative studio.</p>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 border border-primary text-primary font-bold text-[10px] uppercase tracking-[0.3em] px-8 py-4 hover:bg-primary hover:text-on-primary transition-all">
            <Download size={16} /> Export Dossier
          </button>
          <button className="flex items-center gap-3 bg-primary text-on-primary font-bold text-[10px] uppercase tracking-[0.3em] px-8 py-4 hover:opacity-90 transition-all">
            <Send size={16} /> Bulk Notification
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        <div className="md:col-span-2 lg:col-span-2 bg-white p-10 border border-primary relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Wallet size={160} />
          </div>
          <div className="relative z-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-4">Total Revenue — Periodic</p>
            <h2 className="text-7xl font-serif italic tracking-tighter text-primary mb-6">RM 14,200</h2>
            <div className="flex items-center gap-3 border border-primary/20 w-fit px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
              <TrendingUp size={14} />
              <span>+12% Expansion Rate</span>
            </div>
          </div>
        </div>
        <div className="bg-white p-10 border border-primary flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-4">Outstanding Fees</p>
            <h2 className="text-4xl font-serif italic tracking-tight text-tertiary mb-2">RM 2,850</h2>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-tertiary">14 Overdue Records</p>
        </div>
        <div className="bg-white p-10 border border-primary flex flex-col justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 mb-4">Collection Rate</p>
            <h2 className="text-4xl font-serif italic tracking-tight text-primary mb-6">83%</h2>
          </div>
          <div className="w-full bg-primary/5 h-px relative">
            <div className="bg-primary h-1 absolute -top-[0.5px]" style={{ width: '83%' }}></div>
          </div>
        </div>
      </div>

      <div className="bg-white border border-primary overflow-hidden">
        <div className="p-10 border-b border-primary flex flex-wrap items-center justify-between gap-8 bg-primary text-on-primary">
          <div className="flex items-center gap-10">
            <h3 className="text-3xl font-serif italic tracking-tight">Fee Index</h3>
            <div className="flex items-center border border-white/20 px-4 py-2 hover:bg-white/10 transition-colors">
              <Filter size={14} className="mr-3 opacity-60" />
              <select className="bg-transparent border-none focus:ring-0 text-[10px] uppercase font-bold tracking-widest py-0 cursor-pointer">
                <option>All Classes</option>
                <option>Oil Painting</option>
              </select>
            </div>
          </div>
          <div className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-60">Archive Index 01 — 10 [Total 48]</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface border-b border-primary/10 text-primary/40 text-[10px] font-bold uppercase tracking-[0.3em]">
                <th className="px-10 py-6">Member</th>
                <th className="px-8 py-6">Category</th>
                <th className="px-8 py-6">Amount</th>
                <th className="px-8 py-6">Due Date</th>
                <th className="px-8 py-6 text-center">Status</th>
                <th className="px-10 py-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-primary/5">
              <PaymentRow name="Amira Wong" id="8842" classTitle="Oil Painting" amount="RM 350.00" date="15 Oct 2023" status="Paid" method="QR Pay" icon={<QrCode size={14}/>} />
              <PaymentRow name="Marcus Tan" id="8845" classTitle="Digital Art" amount="RM 420.00" date="05 Oct 2023" status="Overdue" method="—" overdue />
              <PaymentRow name="Siti Ling" id="8849" classTitle="Ceramics Basics" amount="RM 280.00" date="20 Oct 2023" status="Pending" method="Online Trf" icon={<Landmark size={14}/>} />
              <PaymentRow name="Raj Kapoor" id="8851" classTitle="Oil Painting" amount="RM 350.00" date="15 Oct 2023" status="Paid" method="Cash" icon={<Wallet size={14}/>} />
            </tbody>
          </table>
        </div>
        <div className="p-10 border-t border-primary/10 flex items-center justify-between">
          <button disabled className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 opacity-30 cursor-not-allowed">Previous Page</button>
          <div className="flex items-center gap-10 text-[10px] font-bold text-primary">
            <span className="border-b border-primary cursor-pointer pb-1">01</span>
            <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">02</span>
            <span className="opacity-40 cursor-pointer hover:opacity-100 transition-opacity">03</span>
          </div>
          <button className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:opacity-60 transition-opacity">Next Page</button>
        </div>
      </div>
      
      <div className="border border-tertiary p-12 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group">
        <div className="flex-grow relative z-10">
          <h3 className="text-4xl font-serif italic tracking-tight text-tertiary mb-4">Automated Metadata Generation</h3>
          <p className="text-on-surface-variant max-w-2xl text-lg font-serif italic text-on-surface/60">"Relinquish the burden of administrative oversight. Let the system curate your invoices with absolute precision."</p>
        </div>
        <button className="bg-tertiary text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] relative z-10 hover:opacity-90 transition-all">Activate Autopay</button>
        <div className="absolute top-0 right-0 w-32 h-32 border-r border-t border-tertiary/20 -translate-y-12 translate-x-12"></div>
      </div>
    </div>
  );
}

function PaymentRow({ name, id, classTitle, amount, date, status, method, icon, overdue }: any) {
  return (
    <tr className="hover:bg-primary/5 transition-colors group">
      <td className="px-10 py-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-primary/10 grayscale group-hover:grayscale-0 transition-all flex items-center justify-center text-primary font-bold text-[10px]">{name.split(' ').map((n: string) => n[0]).join('')}</div>
          <div>
            <p className="font-serif italic text-lg leading-none">{name}</p>
            <p className="text-[9px] uppercase tracking-widest font-bold opacity-40 mt-1">Inv — #{id}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-8 text-[10px] font-bold uppercase tracking-widest opacity-60">{classTitle}</td>
      <td className="px-8 py-8 font-serif italic text-lg">{amount}</td>
      <td className={`px-8 py-8 text-[10px] font-bold uppercase tracking-widest ${overdue ? 'text-tertiary' : 'opacity-40'}`}>{date}</td>
      <td className="px-8 py-8 text-center text-[9px] font-bold uppercase tracking-widest">
        <span className={`px-4 py-1 border ${status === 'Paid' ? 'border-primary/20 text-primary' : status === 'Overdue' ? 'border-tertiary text-tertiary' : 'border-primary/40 text-primary/40'}`}>
          {status}
        </span>
      </td>
      <td className="px-10 py-8 text-right">
        {overdue && <button className="text-tertiary font-bold text-[10px] uppercase tracking-widest border-b border-tertiary pb-0.5 hover:opacity-60 transition-opacity mr-6">Issue Alert</button>}
        <button className="text-primary opacity-20 hover:opacity-100 transition-opacity">
          <MoreVertical size={18} />
        </button>
      </td>
    </tr>
  );
}

// --- Messages View Components ---
function MessagesView() {
  return (
    <div className="space-y-16">
      <header className="border-b border-primary pb-8">
        <h1 className="text-6xl font-serif italic tracking-tighter text-on-surface">Communication</h1>
        <p className="text-xl font-serif italic text-on-surface-variant/60 mt-2">Connecting the curated community through deliberate dialogue.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-4 space-y-10">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 border-b border-primary/10 pb-2">Dialogue Blueprints</h3>
          <div className="space-y-6">
            <TemplateCard icon={<Bell size={18}/>} label="Attendance Alert" desc="Presence confirmation for members." />
            <TemplateCard icon={<CreditCard size={18}/>} label="Exchange Request" desc="Notice regarding tuition metadata." />
            <TemplateCard icon={<TrendingUp size={18}/>} label="Growth Narrative" desc="Sharing specific milestones achieved." />
          </div>
        </div>

        <div className="lg:col-span-8">
          <div className="bg-white border border-primary overflow-hidden">
            <div className="flex items-center justify-between p-10 bg-primary text-on-primary">
              <h3 className="text-2xl font-serif italic tracking-tight">Narrative Editor</h3>
              <button className="text-[10px] font-bold uppercase tracking-widest opacity-60 hover:opacity-100 transition-opacity">Archive Draft</button>
            </div>
            <div className="p-10 space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Recipient Tier</label>
                  <select className="w-full h-12 border-b border-primary bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none transition-all">
                    <option>Specific Archive</option>
                    <option>Complete Collective</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Target Selection</label>
                  <select className="w-full h-12 border-b border-primary bg-transparent text-[10px] font-bold uppercase tracking-widest outline-none transition-all">
                    <option>Watercolor — Sunday Session</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold text-primary/40 uppercase tracking-widest">Dialogue Content</label>
                <div className="border border-primary/10 group focus-within:border-primary transition-colors">
                  <textarea 
                    className="w-full p-8 bg-transparent border-none focus:ring-0 font-serif italic text-lg text-on-surface/80" 
                    placeholder="Transcribe your narrative or select a blueprint..." 
                    rows={8}
                  />
                </div>
              </div>

              <div className="pt-4 flex flex-col md:flex-row md:items-center justify-between gap-10">
                <div className="flex flex-wrap gap-8">
                  <DeliveryOption label="WhatsApp Transmission" icon={<MessageSquare size={14} className="text-tertiary" />} />
                  <DeliveryOption label="Digital Post" icon={<Send size={14} className="text-primary" />} />
                </div>
                <button className="bg-primary text-on-primary px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:opacity-90 transition-all flex items-center gap-4">
                  Broadcast Narrative <Send size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        <header className="flex justify-between items-end border-b border-primary/10 pb-4">
          <h3 className="text-3xl font-serif italic tracking-tight">Transmission History</h3>
          <button className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary/40 flex items-center gap-3 hover:opacity-100 transition-opacity">
            Export Records <Download size={14} />
          </button>
        </header>
        <div className="bg-white border border-primary overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left bg-surface border-b border-primary/10 uppercase font-bold text-[10px] tracking-[0.3em] text-primary/40">
                  <th className="px-10 py-6">Timestamp</th>
                  <th className="px-10 py-6">Recipient Archetype</th>
                  <th className="px-10 py-6 text-center">Narrative Type</th>
                  <th className="px-10 py-6">Channel</th>
                  <th className="px-10 py-6 text-center">Status</th>
                  <th className="px-10 py-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                <HistoryRow time="Oct 24 · 09:15" recipient="Ceramics 101 (24 Parents)" type="Attendance Alert" status="Delivered" />
                <HistoryRow time="Oct 23 · 14:30" recipient="Marcus Thompson" type="Exchange Request" status="Pending" color="border-tertiary text-tertiary" />
                <HistoryRow time="Oct 22 · 11:00" recipient="Kids Clay Club (15 Parents)" type="Schedule Change" status="Failed" color="border-primary opacity-30" />
              </tbody>
            </table>
          </div>
          <div className="p-8 bg-surface flex justify-center border-t border-primary/5">
            <button className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary hover:opacity-60 transition-opacity">Retrieve Deeper Archives</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TemplateCard({ icon, label, desc }: any) {
  return (
    <button className="w-full flex items-center text-left p-6 bg-white border border-primary/10 hover:border-primary transition-all group relative overflow-hidden">
      <div className="grayscale group-hover:grayscale-0 transition-all text-primary mr-6 bg-primary/5 p-4 border border-primary/5 group-hover:border-primary">
        {icon}
      </div>
      <div>
        <span className="text-[10px] font-bold text-primary uppercase tracking-[0.3em] block mb-1">{label}</span>
        <span className="text-[9px] text-primary/40 font-bold uppercase tracking-widest">{desc}</span>
      </div>
      <div className="absolute right-6 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0">
        <ChevronRight size={14} className="text-primary" />
      </div>
    </button>
  );
}

function DeliveryOption({ label, icon }: any) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer">
      <div className="w-12 h-6 border border-primary relative shadow-sm transition-colors group-hover:border-tertiary">
        <div className="absolute right-1 top-1 w-4 h-[14px] bg-primary group-hover:bg-tertiary transition-colors"></div>
      </div>
      <span className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-primary/60 group-hover:text-primary transition-colors">
        {icon} {label}
      </span>
    </div>
  );
}

function HistoryRow({ time, recipient, type, status, color = "border-primary opacity-60 text-primary" }: any) {
  return (
    <tr className="hover:bg-primary/5 transition-colors group">
      <td className="px-10 py-8 text-[10px] font-bold text-primary/40 uppercase tracking-widest">{time}</td>
      <td className="px-10 py-8">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 border border-primary/10 grayscale group-hover:grayscale-0 transition-all flex items-center justify-center text-primary text-[10px] font-bold">
            {recipient.substring(0, 2).toUpperCase()}
          </div>
          <span className="text-lg font-serif italic tracking-tight">{recipient}</span>
        </div>
      </td>
      <td className="px-10 py-8 text-center text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity">
        {type}
      </td>
      <td className="px-10 py-8">
        <div className="flex gap-4 opacity-20 group-hover:opacity-100 transition-opacity">
          <MessageSquare size={16} className="text-tertiary" />
          <Send size={16} className="text-primary" />
        </div>
      </td>
      <td className="px-10 py-8 text-center">
        <span className={`px-4 py-1 border text-[9px] font-bold uppercase tracking-[0.2em] ${color}`}>{status}</span>
      </td>
      <td className="px-10 py-8 text-right">
        <button className="text-primary opacity-20 hover:opacity-100 transition-opacity text-right">
          <MoreVertical size={18} className="ml-auto" />
        </button>
      </td>
    </tr>
  );
}
