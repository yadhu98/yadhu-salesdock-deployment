import { DiscountsInnerContent } from '../Discounts/DiscountsInnerContent';

export interface AccordionConfigItem {
  id: string;
  titleKey: string; 
  isBrandHeader: boolean;
  component: React.ComponentType | null;
 }

export const accordionRegistry: AccordionConfigItem[] = [
  { id: 'discounts', titleKey: 'discounts', isBrandHeader: true, component: DiscountsInnerContent },
  { id: 'klantgegevens', titleKey: 'klantgegevens', isBrandHeader: false, component: null },
  { id: 'productgegevens', titleKey: 'productgegevens', isBrandHeader: false, component: null },
  { id: 'checkout', titleKey: 'checkout', isBrandHeader: false, component: null }
];