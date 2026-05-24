import { useState } from 'react';
import { Layout } from './components/layout';
import { Dashboard } from './components/dashboard';
import { Fleet } from './components/fleet';
import { Rentals } from './components/rentals';
import { PaymentsList } from './components/payments';
import { useMotorbikeStorage } from './hooks/use-storage';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { 
    bikes, 
    rentals, 
    payments, 
    addBike, 
    updateBike, 
    addRental, 
    completeRental, 
    addPayment 
  } = useMotorbikeStorage();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard bikes={bikes} rentals={rentals} payments={payments} />;
      case 'fleet':
        return <Fleet bikes={bikes} onAddBike={addBike} />;
      case 'rentals':
        return (
          <Rentals 
            rentals={rentals} 
            bikes={bikes} 
            payments={payments} 
            onAddRental={addRental}
            onCompleteRental={completeRental}
            onAddPayment={addPayment}
          />
        );
      case 'payments':
        return <PaymentsList payments={payments} rentals={rentals} bikes={bikes} />;
      default:
        return <Dashboard bikes={bikes} rentals={rentals} payments={payments} />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
      <Toaster />
    </div>
  );
}

export default App;