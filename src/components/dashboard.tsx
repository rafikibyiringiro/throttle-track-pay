import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Motorbike, Rental, Payment } from '../types';
import { 
  Bike, 
  TrendingUp, 
  ShieldAlert, 
  DollarSign, 
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DashboardProps {
  bikes: Motorbike[];
  rentals: Rental[];
  payments: Payment[];
}

export function Dashboard({ bikes, rentals, payments }: DashboardProps) {
  const activeRentals = rentals.filter(r => r.status === 'active').length;
  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const expiringInsurance = bikes.filter(b => b.insurance.status !== 'active').length;
  const availableBikes = bikes.filter(b => b.status === 'available').length;

  const stats = [
    { label: 'Active Rentals', value: activeRentals, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Total Revenue', value: `$${totalRevenue}`, icon: DollarSign, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Insurance Alerts', value: expiringInsurance, icon: ShieldAlert, color: 'text-red-600', bg: 'bg-red-50' },
    { label: 'Fleet Status', value: `${availableBikes}/${bikes.length} Available`, icon: Bike, color: 'text-orange-600', bg: 'bg-orange-50' },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-slate-900">Welcome Back, Admin</h2>
        <p className="text-slate-500 mt-1">Here's what's happening with RB Motor Rental today.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat, idx) => (
          <motion.div variants={item} key={idx}>
            <Card className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={cn(stat.bg, "p-2 rounded-lg")}>
                    <stat.icon className={cn("w-5 h-5", stat.color)} />
                  </div>
                  <TrendingUp className="w-4 h-4 text-slate-300" />
                </div>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                <p className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Insurance Tracking Section */}
        <Card className="lg:col-span-2 border-none shadow-sm overflow-hidden">
          <CardHeader className="border-b border-slate-50 bg-white">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-orange-600" />
                Insurance Tracking
              </CardTitle>
              <Badge variant="outline" className="text-slate-400">Monthly Audit</Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3 font-medium">Motorbike</th>
                    <th className="px-6 py-3 font-medium">Policy #</th>
                    <th className="px-6 py-3 font-medium">Expiry Date</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bikes.map((bike) => (
                    <tr key={bike.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{bike.model}</div>
                        <div className="text-xs text-slate-500">{bike.plateNumber}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 font-mono">
                        {bike.insurance.policyNumber}
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(bike.insurance.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={cn(
                            "capitalize border-none",
                            bike.insurance.status === 'active' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                            bike.insurance.status === 'expiring-soon' ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                            "bg-red-100 text-red-700 hover:bg-red-100"
                          )}
                        >
                          {bike.insurance.status.replace('-', ' ')}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Recent Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {payments.slice(-5).reverse().map((payment) => (
                <div key={payment.id} className="flex items-start gap-4">
                  <div className="bg-green-100 p-2 rounded-full">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-900">
                      Payment Received
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      Rental ID: {payment.rentalId} • {payment.method}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-900">+${payment.amount}</p>
                    <p className="text-[10px] text-slate-400 uppercase tracking-tighter">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
              {payments.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-sm text-slate-400 italic">No payments recorded yet.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}