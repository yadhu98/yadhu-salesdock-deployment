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
    <label className="small text-muted fw-normal">{label}</label>
    <div className="input-group">
      <select 
        className="form-select flex-grow-0 border-end-0" 
        style={{ width: '75px', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
        value={type}
        onChange={(e) => onTypeChange(e.target.value as any)}
      >
        <option value="PERCENTAGE">%</option>
        <option value="FIXED">€</option>
      </select>
      <input 
        type="number" 
        className="form-control" 
        value={value || ''}
        onChange={(e) => onValueChange(Number(e.target.value))}
      />
    </div>
  </div>
);