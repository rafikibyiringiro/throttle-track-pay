import { Motorbike, Payment, Rental } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, ArrowDownCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PaymentsProps {
  payments: Payment[];
  rentals: Rental[];
  bikes: Motorbike[];
}

export function PaymentsList({ payments, rentals, bikes }: PaymentsProps) {
  const getRentalInfo = (rentalId: string) => {
    const rental = rentals.find(r => r.id === rentalId);
    const bike = bikes.find(b => b.id === rental?.motorbikeId);
    return {
      customer: rental?.customerName || 'Unknown',
      bike: bike?.model || 'Unknown Bike'
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Payment Ledger</h2>
          <p className="text-slate-500 text-sm">Full history of all financial transactions.</p>
        </div>
        <Button variant="outline" className="gap-2 bg-white">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

      <Card className="border-none shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-medium">Transaction ID</th>
                  <th className="px-6 py-4 font-medium">Customer / Bike</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Method</th>
                  <th className="px-6 py-4 font-medium">Amount</th>
                  <th className="px-6 py-4 font-medium text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {payments.slice().reverse().map((payment) => {
                  const info = getRentalInfo(payment.rentalId);
                  return (
                    <tr key={payment.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-mono text-slate-400 uppercase">
                        #{payment.id}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">{info.customer}</div>
                        <div className="text-xs text-slate-500">{info.bike}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(payment.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-slate-400" />
                          <span className="text-sm text-slate-600 capitalize">{payment.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-bold text-slate-900">${payment.amount}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none capitalize">
                          {payment.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
                {payments.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">
                      No transactions recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}