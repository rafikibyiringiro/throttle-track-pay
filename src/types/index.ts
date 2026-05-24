export interface Motorbike {
  id: string;
  model: string;
  brand: string;
  plateNumber: string;
  imageUrl: string;
  dailyRate: number;
  status: 'available' | 'rented' | 'maintenance';
  insurance: Insurance;
}

export interface Insurance {
  policyNumber: string;
  provider: string;
  expiryDate: string; // ISO string
  status: 'active' | 'expiring-soon' | 'expired';
}

export interface Rental {
  id: string;
  motorbikeId: string;
  customerName: string;
  customerPhone: string;
  startDate: string;
  endDate: string;
  totalAmount: number;
  status: 'active' | 'completed' | 'cancelled';
}

export interface Payment {
  id: string;
  rentalId: string;
  amount: number;
  date: string;
  method: 'cash' | 'card' | 'transfer';
  status: 'paid' | 'pending';
}