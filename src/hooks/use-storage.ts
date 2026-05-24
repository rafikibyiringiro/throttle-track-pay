import { useState, useEffect } from 'react';
import { Motorbike, Rental, Payment } from '../types';

const INITIAL_BIKES: Motorbike[] = [
  {
    id: '1',
    brand: 'Honda',
    model: 'CB500X Adventure',
    plateNumber: 'B 1234 ABC',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f0d1a549-4c0a-4726-be77-cbbd94b1c78a/adventure-motorbike-770ae923-1779622738026.webp',
    dailyRate: 45,
    status: 'available',
    insurance: {
      policyNumber: 'INS-001',
      provider: 'Allianz',
      expiryDate: '2025-12-31',
      status: 'active'
    }
  },
  {
    id: '2',
    brand: 'Yamaha',
    model: 'NMAX 155',
    plateNumber: 'B 5678 XYZ',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f0d1a549-4c0a-4726-be77-cbbd94b1c78a/urban-scooter-c9628bdb-1779622738068.webp',
    dailyRate: 25,
    status: 'rented',
    insurance: {
      policyNumber: 'INS-002',
      provider: 'AXA',
      expiryDate: '2024-05-15',
      status: 'expiring-soon'
    }
  },
  {
    id: '3',
    brand: 'Royal Enfield',
    model: 'Classic 350',
    plateNumber: 'B 9012 DEF',
    imageUrl: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/f0d1a549-4c0a-4726-be77-cbbd94b1c78a/vintage-motorbike-e3b406e5-1779622738523.webp',
    dailyRate: 35,
    status: 'available',
    insurance: {
      policyNumber: 'INS-003',
      provider: 'MSIG',
      expiryDate: '2024-03-01',
      status: 'expired'
    }
  }
];

export function useMotorbikeStorage() {
  const [bikes, setBikes] = useState<Motorbike[]>(() => {
    const saved = localStorage.getItem('rb_bikes');
    return saved ? JSON.parse(saved) : INITIAL_BIKES;
  });

  const [rentals, setRentals] = useState<Rental[]>(() => {
    const saved = localStorage.getItem('rb_rentals');
    return saved ? JSON.parse(saved) : [];
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem('rb_payments');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('rb_bikes', JSON.stringify(bikes));
  }, [bikes]);

  useEffect(() => {
    localStorage.setItem('rb_rentals', JSON.stringify(rentals));
  }, [rentals]);

  useEffect(() => {
    localStorage.setItem('rb_payments', JSON.stringify(payments));
  }, [payments]);

  const addBike = (bike: Motorbike) => setBikes([...bikes, bike]);
  const updateBike = (id: string, updates: Partial<Motorbike>) => {
    setBikes(bikes.map(b => b.id === id ? { ...b, ...updates } : b));
  };

  const addRental = (rental: Rental) => {
    setRentals([...rentals, rental]);
    updateBike(rental.motorbikeId, { status: 'rented' });
  };

  const completeRental = (rentalId: string) => {
    const rental = rentals.find(r => r.id === rentalId);
    if (rental) {
      setRentals(rentals.map(r => r.id === rentalId ? { ...r, status: 'completed' } : r));
      updateBike(rental.motorbikeId, { status: 'available' });
    }
  };

  const addPayment = (payment: Payment) => setPayments([...payments, payment]);

  return {
    bikes,
    rentals,
    payments,
    addBike,
    updateBike,
    addRental,
    completeRental,
    addPayment
  };
}