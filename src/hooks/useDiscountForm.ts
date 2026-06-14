import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useVerbiage } from '../hooks/useVerbiage';

export const useDiscountForm = () => {
  const context = useContext(CartContext);
  const text = useVerbiage();

  const [discountName, setDiscountName] = useState('');
  const [discountType, setDiscountType] = useState<'FIXED' | 'PERCENTAGE'>('FIXED');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [target, setTarget] = useState<'ONE_TIME' | 'MONTHLY'>('ONE_TIME');
  const [durationMonths, setDurationMonths] = useState<number | 'none'>('none');

  if (!context) {
    throw new Error('useDiscountForm must be used within a CartProvider');
  }

  const { modalState, discounts, updateDiscount, addDiscount, closeModal } = context;
  const isEditMode = modalState.mode === 'EDIT';
  useEffect(() => {
    if (isEditMode && modalState.discountId) {
      const discountToEdit = discounts.find(d => d.id === modalState.discountId);
      if (discountToEdit) {
        setDiscountName(discountToEdit.name);
        setDiscountType(discountToEdit.type);
        setDiscountValue(discountToEdit.value);
        setTarget(discountToEdit.target);
        setDurationMonths(discountToEdit.durationMonths || 'none');
      }
    } else {
      setDiscountName('');
      setDiscountType('FIXED');
      setDiscountValue(0);
      setTarget('ONE_TIME');
      setDurationMonths('none');
    }
  }, [isEditMode, modalState.discountId, modalState.isOpen]);

  const handleSave = () => {
    const numericValue = Number(discountValue) || 0;
    const cleanDuration = durationMonths === 'none' ? undefined : Number(durationMonths);

    if (isEditMode && modalState.discountId) {
      updateDiscount(modalState.discountId, {
        name: discountName || text.modal.editTitle,
        type: discountType,
        value: numericValue,
        target,
        durationMonths: cleanDuration
      });
    } else {
      addDiscount({
        name: discountName || text.modal.addTitle,
        type: discountType,
        value: numericValue,
        target,
        durationMonths: cleanDuration,
        isManual: true
      });
    }
    closeModal();
  };

  return {
    isOpen: modalState.isOpen,
    isEditMode,
    discountName,
    setDiscountName,
    discountType,
    setDiscountType,
    discountValue,
    setDiscountValue,
    target,
    setTarget,
    durationMonths,
    setDurationMonths,
    handleSave,
    closeModal
  };
};