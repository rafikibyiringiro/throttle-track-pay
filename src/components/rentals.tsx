import { useState } from 'react';
import { Motorbike, Rental, Payment } from '../types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Calendar, 
  User, 
  Phone, 
  CheckCircle2, 
  Clock,
  Plus
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface RentalsProps {
  rentals: Rental[];
  bikes: Motorbike[];
  payments: Payment[];
  onAddRental: (rental: Rental) => void;
  onCompleteRental: (id: string) => void;
  onAddPayment: (payment: Payment) => void;
}

export function Rentals({ rentals, bikes, payments, onAddRental, onCompleteRental, onAddPayment }: RentalsProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const getBikeModel = (id: string) => bikes.find(b => b.id === id)?.model || 'Unknown';
  
  const filteredRentals = rentals.filter(r => 
    r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    getBikeModel(r.motorbikeId).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNewRental = () => {
    const availableBike = bikes.find(b => b.status === 'available');
    if (!availableBike) {
      toast.error('No motorbikes available for rent at the moment.');
      return;
    }

    const newRental: Rental = {
      id: Math.random().toString(36).substr(2, 9),
      motorbikeId: availableBike.id,
      customerName: 'Customer #' + Math.floor(Math.random() * 1000),
      customerPhone: '+62 812-3456-7890',
      startDate: new Date().toISOString(),
      endDate: new Date(Date.now() + 86400000 * 3).toISOString(), // 3 days from now
      totalAmount: availableBike.dailyRate * 3,
      status: 'active',
    };

    onAddRental(newRental);
    
    // Add initial payment
    const newPayment: Payment = {
      id: Math.random().toString(36).substr(2, 9),
      rentalId: newRental.id,
      amount: newRental.totalAmount / 2, // Deposit
      date: new Date().toISOString(),
      method: 'cash',
      status: 'paid',
    };
    onAddPayment(newPayment);

    toast.success('Rental created and deposit payment recorded!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Rental Tracking</h2>
          <p className="text-slate-500 text-sm">Manage active bookings and track payment progress.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2" onClick={handleNewRental}>
          <Plus className="w-4 h-4" /> New Booking
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <Input 
          placeholder="Search by customer or bike..." 
          className="pl-10 bg-white border-slate-200"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredRentals.length === 0 ? (
          <Card className="border-dashed border-2 bg-slate-50/50">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <div className="bg-slate-200 p-3 rounded-full mb-4">
                <Clock className="w-6 h-6 text-slate-400" />
              </div>
              <p className="text-slate-500 font-medium">No active rentals found.</p>
              <p className="text-slate-400 text-sm">Try creating a new booking to get started.</p>
            </CardContent>
          </Card>
        ) : (
          filteredRentals.map((rental) => {
            const bike = bikes.find(b => b.id === rental.motorbikeId);
            const rentalPayments = payments.filter(p => p.rentalId === rental.id);
            const paidAmount = rentalPayments.reduce((sum, p) => sum + p.amount, 0);
            const remaining = rental.totalAmount - paidAmount;

            return (
              <Card key={rental.id} className="border-none shadow-sm overflow-hidden hover:ring-1 hover:ring-orange-200 transition-all">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 bg-slate-900 p-6 text-white flex flex-col justify-between">
                    <div>
                      <Badge className="bg-orange-500 border-none mb-4 uppercase tracking-wider text-[10px]">
                        Booking #{rental.id.toUpperCase()}
                      </Badge>
                      <h3 className="text-xl font-bold mb-1">{bike?.model}</h3>
                      <p className="text-slate-400 text-xs font-mono">{bike?.plateNumber}</p>
                    </div>
                    <div className="mt-8 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Calendar className="w-3 h-3" />
                        <span>{new Date(rental.startDate).toLocaleDateString()} - {new Date(rental.endDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6 flex flex-col md:flex-row gap-8">
                    <div className="flex-1 space-y-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Customer Details</span>
                        <div className="flex items-center gap-3">
                          <div className="bg-slate-100 p-2 rounded-full">
                            <User className="w-4 h-4 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{rental.customerName}</p>
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Phone className="w-3 h-3" />
                              <span>{rental.customerPhone}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-2">
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-2">Payment Progress</span>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className="bg-green-500 h-full transition-all duration-1000" 
                            style={{ width: `${(paidAmount / rental.totalAmount) * 100}%` }}
                          />
                        </div>
                        <div className="flex justify-between mt-2">
                          <span className="text-xs font-medium text-slate-600">Paid: ${paidAmount}</span>
                          <span className="text-xs font-medium text-slate-400">Total: ${rental.totalAmount}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-48 flex flex-col justify-between gap-4 border-l border-slate-100 pl-0 md:pl-8">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Status</span>
                        <Badge className={cn(
                          "border-none",
                          rental.status === 'active' ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                          rental.status === 'completed' ? "bg-green-100 text-green-700 hover:bg-green-100" :
                          "bg-red-100 text-red-700 hover:bg-red-100"
                        )}>
                          {rental.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        {rental.status === 'active' && (
                          <>
                            {remaining > 0 && (
                              <Button 
                                variant="outline" 
                                className="w-full text-xs h-8 border-slate-200 hover:bg-slate-50"
                                onClick={() => {
                                  onAddPayment({
                                    id: Math.random().toString(36).substr(2, 9),
                                    rentalId: rental.id,
                                    amount: remaining,
                                    date: new Date().toISOString(),
                                    method: 'card',
                                    status: 'paid'
                                  });
                                  toast.success('Balance paid in full!');
                                }}
                              >
                                Pay Balance
                              </Button>
                            )}
                            <Button 
                              className="w-full text-xs h-8 bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => {
                                onCompleteRental(rental.id);
                                toast.success('Booking completed and bike returned!');
                              }}
                            >
                              Complete Trip
                            </Button>
                          </>
                        )}
                        {rental.status === 'completed' && (
                          <div className="flex items-center gap-2 text-green-600 font-semibold text-xs py-2">
                            <CheckCircle2 className="w-4 h-4" />
                            Transaction Closed
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}