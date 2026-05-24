import { useState } from 'react';
import { Motorbike } from '../types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert, 
  ShieldX,
  MapPin,
  Tag
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface FleetProps {
  bikes: Motorbike[];
  onAddBike?: (bike: Motorbike) => void;
}

export function Fleet({ bikes }: FleetProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBikes = bikes.filter(b => 
    b.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.plateNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Manage Fleet</h2>
          <p className="text-slate-500 text-sm">Monitor and manage your motorbike inventory and insurance.</p>
        </div>
        <Button className="bg-orange-600 hover:bg-orange-700 text-white gap-2" onClick={() => toast.info('Add Motorbike feature coming soon!')}>
          <Plus className="w-4 h-4" /> Add Motorbike
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input 
            placeholder="Search by model or plate number..." 
            className="pl-10 bg-white border-slate-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2 bg-white">
          <Filter className="w-4 h-4" /> Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBikes.map((bike) => (
          <Card key={bike.id} className="overflow-hidden border-none shadow-sm hover:shadow-md transition-all group">
            <div className="aspect-[16/10] overflow-hidden relative">
              <img 
                src={bike.imageUrl} 
                alt={bike.model} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <Badge className={cn(
                  "border-none shadow-sm",
                  bike.status === 'available' ? "bg-green-500 hover:bg-green-500" : "bg-orange-500 hover:bg-orange-500"
                )}>
                  {bike.status}
                </Badge>
              </div>
            </div>
            <CardHeader className="p-5 pb-2">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-lg text-slate-900">{bike.model}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-xs mt-1">
                    <Tag className="w-3 h-3" />
                    <span>{bike.brand}</span>
                    <span className="mx-1">•</span>
                    <MapPin className="w-3 h-3" />
                    <span>{bike.plateNumber}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-orange-600">${bike.dailyRate}</span>
                  <span className="text-xs text-slate-400 block">/day</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-5 pt-2">
              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    {bike.insurance.status === 'active' ? (
                      <ShieldCheck className="w-4 h-4 text-green-600" />
                    ) : bike.insurance.status === 'expiring-soon' ? (
                      <ShieldAlert className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <ShieldX className="w-4 h-4 text-red-600" />
                    )}
                    <span className="text-xs font-semibold text-slate-700">Insurance Info</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">{bike.insurance.policyNumber}</span>
                </div>
                <div className="flex justify-between items-end">
                  <div className="text-[10px] text-slate-500 leading-tight">
                    <p>Provider: {bike.insurance.provider}</p>
                    <p>Expires: {new Date(bike.insurance.expiryDate).toLocaleDateString()}</p>
                  </div>
                  <Badge variant="outline" className={cn(
                    "text-[10px] h-5 border-none",
                    bike.insurance.status === 'active' ? "bg-green-50 text-green-600" :
                    bike.insurance.status === 'expiring-soon' ? "bg-yellow-50 text-yellow-600" :
                    "bg-red-50 text-red-600"
                  )}>
                    {bike.insurance.status}
                  </Badge>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-5 pt-0 gap-2">
              <Button variant="outline" className="flex-1 text-xs h-9">Edit Details</Button>
              <Button className="bg-slate-900 hover:bg-slate-800 text-white flex-1 text-xs h-9">Update Policy</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}