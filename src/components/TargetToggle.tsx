import React from 'react';

interface Props {
  label: string;
  oneTimeLabel: string;
  monthlyLabel: string;
  value: 'ONE_TIME' | 'MONTHLY';
  onChange: (value: 'ONE_TIME' | 'MONTHLY') => void;
}

export const TargetToggle: React.FC<Props> = ({ oneTimeLabel, monthlyLabel, value, onChange }) => {
  
  const renderIndicator = (isSelected: boolean) => (
    <div 
      className={`rounded-circle d-flex align-items-center justify-content-center border-0
        ${isSelected ? 'bg-white text-info' : 'bg-white border'}`} 
      style={{ 
        width: '28px', 
        height: '28px',
        transition: 'all 0.2s ease'
      }}
    >
      {isSelected && <i className="bi bi-check-lg fw-bold" style={{ fontSize: '18px' }}>✓</i>}
    </div>
  );

  return (
    <div className="d-flex gap-3">
      <label 
        className={`flex-fill border-0 rounded-4 d-flex justify-content-between align-items-center cursor-pointer
          ${value === 'ONE_TIME' ? 'bg-info text-white' : 'bg-light text-secondary'}`}
        style={{ 
          padding: '20px 16px',
          cursor: 'pointer', 
          transition: '0.3s' 
        }}
      >
        <input type="radio" className="d-none" checked={value === 'ONE_TIME'} onChange={() => onChange('ONE_TIME')} />
        <span className="fw-medium" style={{ fontSize: '1.1rem' }}>{oneTimeLabel}</span>
        {renderIndicator(value === 'ONE_TIME')}
      </label>

      <label 
        className={`flex-fill border-0 rounded-4 d-flex justify-content-between align-items-center cursor-pointer
          ${value === 'MONTHLY' ? 'bg-info text-white' : 'bg-light text-secondary'}`}
        style={{ 
          padding: '20px 16px', 
          cursor: 'pointer', 
          transition: '0.3s' 
        }}
      >
        <input type="radio" className="d-none" checked={value === 'MONTHLY'} onChange={() => onChange('MONTHLY')} />
        <span className="fw-medium" style={{ fontSize: '1.1rem' }}>{monthlyLabel}</span>
        {renderIndicator(value === 'MONTHLY')}
      </label>
    </div>
  );
};