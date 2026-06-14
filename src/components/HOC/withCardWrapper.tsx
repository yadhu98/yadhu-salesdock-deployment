import React from 'react';

export function withCardWrapper<T extends object>(WrappedComponent: React.ComponentType<T>) {
  return (props: T) => (
    <div className="card shadow-sm border-0 mb-4 rounded-3 overflow-hidden">
      <div className="card-body p-0">
        <WrappedComponent {...props} />
      </div>
    </div>
  );
}