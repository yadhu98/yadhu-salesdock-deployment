import { useContext } from 'react';
import { CartProvider, CartContext } from './context/CartContext';
import { DiscountList } from './components/Discounts/DiscountList';
import { CartSummary } from './components/Cart/CartSummary';
import { DiscountModal } from './components/Discounts/DiscountModal';
import { supportedLanguages } from './locale/language';
import { useVerbiage } from './hooks/useVerbiage';
import { Button } from './components/Common/Button';

function MasterDashboard() {
  const context = useContext(CartContext);
  const text = useVerbiage();
  
  if (!context) return null;

  return (
    <div className="container py-5 px-3" style={{ maxWidth: '1160px' }}>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button variant="secondary">
          {text.navigation.previous}
        </Button>
        <div className="btn-group shadow-sm">
          {supportedLanguages.map((lang) => {
            const isActive = context.locale === lang.code;
            return (
              <Button 
                key={lang.code}
                variant={isActive ? 'lang-active' : 'lang-inactive'}
                onClick={() => context.setLocale(lang.code as any)}
              >
                {lang.verbiage.langLabel}
              </Button>
            );
          })}
        </div>
      </div>
      <div className="row g-4">
        <div className="col-12 col-lg-8">
          <DiscountList />
          
          <div className="d-flex justify-content-between align-items-center mt-4">
            <span className="text-info small fw-bold" style={{ cursor: 'pointer' }}>
              {text.navigation.previous}
            </span>
            <Button variant="primary">
              {text.navigation.next}
            </Button>
          </div>
        </div>

        <div className="col-12 col-lg-4">
          <CartSummary />
        </div>
      </div>

      <DiscountModal />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <MasterDashboard />
    </CartProvider>
  );
}
