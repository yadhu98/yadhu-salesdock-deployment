import React, { useState } from 'react';
import { Accordion } from '../Accordion/Accordion';
import { accordionRegistry } from '../Accordion/accordionConfig';
import { useVerbiage } from '../../hooks/useVerbiage';

const EmptyPanelContent: React.FC = () => {
  const text = useVerbiage();
  return (
    <div className="p-4 text-muted small fst-italic">
      {text.accordion?.emptyContent || 'the content here is empty'}
    </div>
  );
};

export const DiscountList: React.FC = () => {
  const text = useVerbiage();
  const [activePanelId, setActivePanelId] = useState<string | null>('discounts');

  const handleToggle = (id: string) => {
    setActivePanelId(prev => (prev === id ? null : id));
  };

  const resolvePanelTitle = (key: string): string => {
    if (key === 'discounts' && text.discounts?.title) return text.discounts.title;
    if (text.accordion && (text.accordion as any)[key]) return (text.accordion as any)[key];
    return key;
  };

  return (
    <div className="w-100 d-flex flex-column gap-1">
      {accordionRegistry.map((panel) => {
        const ContentComponent = panel.component;
        
        return (
          <Accordion
            key={panel.id}
            title={resolvePanelTitle(panel.titleKey)}
            isOpen={activePanelId === panel.id}
            isBrandHeader={panel.isBrandHeader}
            onToggle={() => handleToggle(panel.id)}
          >
            {ContentComponent ? <ContentComponent /> : <EmptyPanelContent />}
          </Accordion>
        );
      })}
    </div>
  );
};