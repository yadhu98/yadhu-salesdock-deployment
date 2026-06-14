import React from 'react';
import { useCart } from '../../hooks/useCart';
import { useVerbiage } from '../../hooks/useVerbiage';
import warmtewinnerImage from "../../assets/warmtewinner-roze 1.png"

export const CartSummary: React.FC = () => {
  const baseOneTime = 1000.00;
  const baseMonthly = 10.00;
  
  const text = useVerbiage();
  const { finalOneTime, eventuallyMonthlyPrice, appliedOneTimeRows } = useCart(baseOneTime, baseMonthly);

  const formatEuro = (val: number) => `€ ${val.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="card shadow-sm border-0 rounded-0 bg-white text-dark">
      <div className="card-body p-0">
        
        <div className="p-4 text-center border-bottom">
        <img src={warmtewinnerImage} alt="Warmtewinner" className="sidebar-image" />
          <h5 className="text-start text-secondary fw-normal mb-3 fs-5">{text.cart.title}</h5>
          
          <div className="d-flex justify-content-between small mb-2">
            <span className="text-muted">Webasto Pure II laadpaal type 2</span>
            <span className="fw-normal">{formatEuro(baseOneTime)}</span>
          </div>
          
          <div className="d-flex justify-content-between small mb-3">
            <span className="text-muted fst-italic">{text.cart.monthlyHeader}</span>
            <span className="fw-normal">{formatEuro(baseMonthly)}</span>
          </div>
          
          <div className="text-start">
            <span className="text-info small" style={{ cursor: 'pointer' }}>Edit</span>
          </div>
        </div>

        <div className="sidebar-grey-band px-4 py-3 d-flex justify-content-between align-items-center fw-bold small border-bottom">
          <span className="text-dark">{text.cart.eventuallyLabel}</span>
          <span className="text-dark">{formatEuro(eventuallyMonthlyPrice)}</span>
        </div>

        <div className="sidebar-grey-band p-4 small border-top-0">
          <div className="d-flex justify-content-between mb-2 text-muted">
            <span>{text.cart.subtotalOneTime}</span>
            <span>{formatEuro(baseOneTime)}</span>
          </div>

          {appliedOneTimeRows.map((row, idx) => (
            <div key={idx} className="d-flex justify-content-between mb-2 text-dark fst-italic">
              <span>{row.name}</span>
              <span>- {formatEuro(row.deduced)}</span>
            </div>
          ))}

          <div className="d-flex justify-content-between fw-bold mt-3 pt-3 border-top border-secondary-subtotal">
            <span>{text.cart.oneTimeHeader}</span>
            <span>{formatEuro(finalOneTime)}</span>
          </div>
        </div>

      </div>
    </div>
  );
};