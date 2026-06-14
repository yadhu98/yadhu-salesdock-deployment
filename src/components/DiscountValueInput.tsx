import React from 'react';

interface DiscountValueInputProps {
  label: string;
  value: number;
  type: 'FIXED' | 'PERCENTAGE';
  onValueChange: (val: number) => void;
  onTypeChange: (type: 'FIXED' | 'PERCENTAGE') => void;
}

export const DiscountValueInput: React.FC<DiscountValueInputProps> = ({
  label,
  value,
  type,
  onValueChange,
  onTypeChange
}) => (
  <div className="form-group d-flex flex-column gap-1">
    <label className="small text-muted fw-bold">{label}</label>
    <div className="input-group">
      <input 
        type="number" 
        className="form-control rounded-0" 
        value={value || ''}
        onChange={(e) => onValueChange(Number(e.target.value))}
      />
      <select 
        className="form-select rounded-0 flex-grow-0" 
        style={{ width: '65px' }}
        value={type}
        onChange={(e) => onTypeChange(e.target.value as any)}
      >
        <option value="FIXED">€</option>
        <option value="PERCENTAGE">%</option>
      </select>
    </div>
  </div>
);