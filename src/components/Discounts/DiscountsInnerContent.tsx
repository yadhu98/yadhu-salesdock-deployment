import React, { useContext } from 'react';
import { CartContext } from '../../context/CartContext';
import { useVerbiage } from '../../hooks/useVerbiage';

export const DiscountsInnerContent: React.FC = () => {
  const context = useContext(CartContext);
  const text = useVerbiage();
  if (!context) return null;

  return (
    <div className="card-body p-0">
      <div className="text-end px-4 py-3 border-bottom">
        <span 
          className="text-info small fw-normal" 
          style={{ cursor: 'pointer', textDecoration: 'none' }} 
          onClick={context.openAddModal}
        >
          {text.discounts.addManual}
        </span>
      </div>

      <div className="list-group list-group-flush">
        {context.discounts.map(d => (
          <div key={d.id} className="list-group-item d-flex justify-content-between align-items-center px-4 py-3 border-bottom">
            <div>
              <span className="text-muted small">{d.name}</span>
            </div>
            
            <div className="d-flex align-items-center gap-3">
              {!d.isManual && (d.id === 'd2' || d.id === 'd6') && (
                <button 
                  type="button" 
                  className="btn btn-link p-0 border-0 text-info d-inline-flex align-items-center shadow-none" 
                  style={{ color: '#26b7c9' }}
                  onClick={() => context.openEditModal(d.id)}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                  </svg>
                </button>
              )}
              <span className="text-dark small">
                - {d.type === 'FIXED' ? `€ ${d.value.toLocaleString('nl-NL', { minimumFractionDigits: 2 })}` : `${d.value} %`}{' '}
                {d.target === 'ONE_TIME' 
                  ? text.discounts.oneTimeSuffix 
                  : d.durationMonths 
                    ? text.discounts.monthlyTierSuffix.replace('{months}', String(d.durationMonths))
                    : text.discounts.monthlySuffix}
              </span>
              {d.isManual ? (
                <div className="d-flex align-items-center gap-2">
                  <button 
                    type="button" 
                    className="btn btn-link p-0 border-0 text-info d-inline-flex align-items-center shadow-none" 
                    style={{ color: '#26b7c9' }}
                    onClick={() => context.openEditModal(d.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                    </svg>
                  </button>

                  <button 
                    type="button" 
                    className="btn btn-link p-0 border-0 text-info d-inline-flex align-items-center shadow-none" 
                    style={{ color: '#26b7c9' }}
                    onClick={() => context.deleteDiscount && context.deleteDiscount(d.id)}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </div>
              ) : (
                <input 
                  type="checkbox" 
                  className="custom-box-toggle"
                  checked={d.isActive}
                  onChange={() => context.toggleDiscount(d.id)}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};