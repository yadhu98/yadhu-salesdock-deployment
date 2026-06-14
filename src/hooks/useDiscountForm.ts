import { useState, useEffect, useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';
// import { useVerbiage } from '../hooks/useVerbiage';

export const useDiscountForm = () => {
  const context = useContext(CartContext);
  // const text = useVerbiage();

  const [discountName, setDiscountName] = useState('');
  const [discountType, setDiscountType] = useState<'FIXED' | 'PERCENTAGE'>('FIXED');
  const [discountValue, setDiscountValue] = useState<number>(0);
  const [target, setTarget] = useState<'ONE_TIME' | 'MONTHLY'>('ONE_TIME');
  const [durationMonths, setDurationMonths] = useState<number | 'none'>('none');
  const [description, setDescription] = useState('');
  const [isManualDiscount, setIsManualDiscount] = useState<boolean>(true);

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
        setDescription(discountToEdit.description || '');
        setIsManualDiscount(!!discountToEdit.isManual);
      }
    } else {
      setDiscountName('');
      setDiscountType('PERCENTAGE'); // default to percentage or keep FIXED as per default
      setDiscountValue(0);
      setTarget('ONE_TIME');
      setDurationMonths('none');
      setDescription('');
      setIsManualDiscount(true);
    }
  }, [isEditMode, modalState.discountId, modalState.isOpen]);

  const maxLimit = useMemo(() => {
    if (isEditMode && modalState.discountId) {
      const discountToEdit = discounts.find(d => d.id === modalState.discountId);
      if (discountToEdit && !discountToEdit.isManual) {
        return discountToEdit.value;
      }
    }
    return null;
  }, [isEditMode, modalState.discountId, discounts]);

  const isOverLimit = useMemo(() => {
    return maxLimit !== null && discountValue > maxLimit;
  }, [maxLimit, discountValue]);

  const calculatedNewPrice = useMemo(() => {
    const base = target === 'ONE_TIME' ? 1000 : 10;
    const val = Number(discountValue) || 0;
    let result = base;
    if (discountType === 'PERCENTAGE') {
      result = base - (base * (val / 100));
    } else {
      result = base - val;
    }
    return Math.max(0, result);
  }, [target, discountValue, discountType]);

  const formattedNewPrice = useMemo(() => {
    return `€ ${calculatedNewPrice.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }, [calculatedNewPrice]);

  const handleSave = () => {
    if (isOverLimit) return;

    const data = {
      name: discountName || (target === 'ONE_TIME' ? 'One time price discount' : 'Monthly price discount'),
      description,
      newPrice: calculatedNewPrice,
      type: discountType,
      value: Number(discountValue),
      target,
      durationMonths: target === 'ONE_TIME' ? undefined : (durationMonths === 'none' ? undefined : Number(durationMonths)),
      isManual: isManualDiscount,
    };

    if (isEditMode && modalState.discountId) {
      updateDiscount(modalState.discountId, data);
    } else {
      addDiscount(data);
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
    description,
    setDescription,
    isManualDiscount,
    maxLimit,
    isOverLimit,
    formattedNewPrice,
    handleSave,
    closeModal
  };
};