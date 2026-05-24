import React from 'react';
import { 
  LayoutDashboard, 
  Bike, 
  History, 
  Settings, 
  Menu, 
  X,
  CreditCard,
  ShieldCheck
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export function Layout({ children, activeTab, setActiveTab }: { children: React.ReactNode } & SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'fleet', label: 'Our Fleet', icon: Bike },
    { id: 'rentals', label: 'Rentals', icon: History },
    { id: 'payments', label: 'Payments', icon: CreditCard },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-orange-600 p-2 rounded-lg">
              <Bike className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">RB Motor Rental</h1>
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  activeTab === item.id
                    ? "bg-orange-50 text-orange-600"
                    : "text-slate-600 hover:bg-slate-50"
                )}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="mt-auto p-6 border-t border-slate-100">
          <div className="bg-slate-900 rounded-xl p-4 text-white">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-orange-400" />
              <span className="text-xs font-semibold uppercase tracking-wider">Insurance Status</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">All systems operational. Tracking 12 active policies.</p>
            <Button variant="outline" className="w-full text-xs h-8 border-slate-700 hover:bg-slate-800 text-white">
              View Reports
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Nav */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-white border-b border-slate-200 z-50 px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-orange-600 p-1.5 rounded-md">
            <Bike className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-slate-900">RB Rental</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white w-64 h-full p-6 animate-in slide-in-from-left duration-300" onClick={e => e.stopPropagation()}>
             <div className="flex items-center gap-2 mb-8">
              <div className="bg-orange-600 p-2 rounded-lg">
                <Bike className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900">RB Motor</h1>
            </div>
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={cn(
                    "flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg",
                    activeTab === item.id ? "bg-orange-50 text-orange-600" : "text-slate-600"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}