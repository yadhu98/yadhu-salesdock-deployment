import React, { createContext, useState, useMemo } from 'react';
import type { ReactNode } from 'react';
export interface DiscountItem {
  id: string;
  name: string;
  description?: string;
  newPrice?: number;  
  type: 'PERCENTAGE' | 'FIXED';
  target: 'ONE_TIME' | 'MONTHLY';
  value: number;
  durationMonths?: number | 'none';
  isActive: boolean;
  isManual?: boolean;
}

export type LocaleType = 'en' | 'nl';

export interface ModalState {
  isOpen: boolean;
  mode: 'ADD' | 'EDIT';
  isEditMode: boolean;
  discountId: string | null;
}

interface CartContextType {
  discounts: DiscountItem[];
  locale: LocaleType;
  setLocale: (locale: LocaleType) => void;
  toggleDiscount: (id: string) => void;
  addCustomDiscount: (discount: Omit<DiscountItem, 'id' | 'isActive' | 'isManual'>) => void;
  updateDiscount: (id: string, updatedFields: Partial<DiscountItem>) => void;
  deleteDiscount: (id: string) => void;
  openAddModal: () => void;
  openEditModal: (id: string) => void;
  closeModal: () => void;
  modalState: ModalState;
  setModalState: React.Dispatch<React.SetStateAction<ModalState>>;
  addDiscount: (discount: Omit<DiscountItem, 'id' | 'isActive'>) => void;
}
export const CartContext = createContext<CartContextType | undefined>(undefined);

const PRESET_DISCOUNTS: DiscountItem[] = [
  { id: 'd1', name: 'Discount name', type: 'FIXED', target: 'ONE_TIME', value: 250, isActive: true },
  { id: 'd2', name: 'Discount name', type: 'PERCENTAGE', target: 'ONE_TIME', value: 5, isActive: false },
];

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [discounts, setDiscounts] = useState<DiscountItem[]>(PRESET_DISCOUNTS);
  const [locale, setLocale] = useState<LocaleType>('en');
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    mode: 'ADD',
    isEditMode: false,
    discountId: null,
  });

  const openAddModal = () => { 
    setModalState({ isOpen: true, mode: 'ADD', isEditMode: false, discountId: null });
  };

  const openEditModal = (id: string) => { 
    setModalState({ isOpen: true, mode: 'EDIT', isEditMode: true, discountId: id });
  };

  const closeModal = () => { 
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const addCustomDiscount = (data: Omit<DiscountItem, 'id' | 'isActive' | 'isManual'>) => {
    setDiscounts(prev => [...prev, { ...data, id: crypto.randomUUID(), isActive: true, isManual: true }]);
    closeModal();
  };

  const updateDiscount = (id: string, fields: Partial<DiscountItem>) => {
    setDiscounts(prev => prev.map(d => d.id === id ? { ...d, ...fields } : d));
    closeModal();
  };

  const toggleDiscount = (id: string) => {
    setDiscounts(prev => prev.map(d => d.id === id ? { ...d, isActive: !d.isActive } : d));
  };

  const deleteDiscount = (id: string) => {
    setDiscounts(prev => prev.filter(d => d.id !== id));
    closeModal();
  };

  const addDiscount = (newDiscount: Omit<DiscountItem, 'id' | 'isActive'>) => {
    const discountWithId: DiscountItem = {
      ...newDiscount,
      id: crypto.randomUUID(),
      isActive: true 
    };
    setDiscounts((prev) => [...prev, discountWithId]);
  };

  const stateValue = useMemo(() => ({
    discounts, 
    locale, 
    setLocale, 
    toggleDiscount, 
    deleteDiscount, 
    addCustomDiscount,
    updateDiscount, 
    openAddModal, 
    openEditModal, 
    closeModal, 
    modalState, 
    setModalState, 
    addDiscount  
  }), [discounts, locale, modalState]);

  return <CartContext.Provider value={stateValue}>{children}</CartContext.Provider>;
};