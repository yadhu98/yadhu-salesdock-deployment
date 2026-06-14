import React from 'react';

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  isBrandHeader?: boolean;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  isOpen,
  onToggle,
  isBrandHeader = false,
  children
}) => {
  const contentStyle = {
    maxHeight: isOpen ? '1200px' : '0px',
    opacity: isOpen ? 1 : 0,
    transition: 'max-height 0.35s ease-in-out, opacity 0.25s ease-in-out',
    overflow: 'hidden',
    backgroundColor: '#ffffff'
  };

  return (
    <div className="card shadow-sm border-0 rounded-0 overflow-hidden w-100">
      <div 
        className="px-4 py-3 d-flex justify-content-between align-items-center"
        style={{ 
          cursor: 'pointer', 
          backgroundColor: isBrandHeader ? '#26b7c9' : '#cccccc', 
          color: isBrandHeader ? '#ffffff' : '#333333' 
        }}
        onClick={onToggle}
      >
        <h5 className={`m-0 ${isBrandHeader ? 'fs-5 fw-normal text-white' : 'fs-6 fw-normal text-muted'}`}>
          {title}
        </h5>
      </div>

      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};