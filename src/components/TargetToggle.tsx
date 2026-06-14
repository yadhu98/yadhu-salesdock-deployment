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
      className="rounded-circle d-flex align-items-center justify-content-center" 
      style={{ 
        width: '24px', 
        height: '24px',
        backgroundColor: '#ffffff',
        border: isSelected ? 'none' : '1px solid #dee2e6',
        transition: 'all 0.2s ease'
      }}
    >
      {isSelected && (
        <span 
          style={{ 
            color: '#26b7c9', 
            fontWeight: 'bold', 
            fontSize: '14px',
            lineHeight: 1
          }}
        >
          ✓
        </span>
      )}
    </div>
  );

  return (
    <div className="d-flex gap-3" style={{ width: '350px' }}>
      <label 
        className="flex-fill border-0 rounded-3 d-flex justify-content-between align-items-center"
        style={{ 
          padding: '16px 20px',
          cursor: 'pointer', 
          backgroundColor: value === 'ONE_TIME' ? '#26b7c9' : '#f0f2f5',
          color: value === 'ONE_TIME' ? '#ffffff' : '#7a8a9e',
          transition: '0.2s ease-in-out' 
        }}
      >
        <input 
          type="radio" 
          className="d-none" 
          checked={value === 'ONE_TIME'} 
          onChange={() => onChange('ONE_TIME')} 
        />
        <span className="fw-medium" style={{ fontSize: '0.9rem' }}>{oneTimeLabel}</span>
        {renderIndicator(value === 'ONE_TIME')}
      </label>

      <label 
        className="flex-fill border-0 rounded-3 d-flex justify-content-between align-items-center"
        style={{ 
          padding: '16px 20px', 
          cursor: 'pointer', 
          backgroundColor: value === 'MONTHLY' ? '#26b7c9' : '#f0f2f5',
          color: value === 'MONTHLY' ? '#ffffff' : '#7a8a9e',
          transition: '0.2s ease-in-out' 
        }}
      >
        <input 
          type="radio" 
          className="d-none" 
          checked={value === 'MONTHLY'} 
          onChange={() => onChange('MONTHLY')} 
        />
        <span className="fw-medium" style={{ fontSize: '0.9rem' }}>{monthlyLabel}</span>
        {renderIndicator(value === 'MONTHLY')}
      </label>
    </div>
  );
};