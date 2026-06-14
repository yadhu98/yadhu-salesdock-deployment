import { useContext, useMemo } from 'react';
import { CartContext } from '../context/CartContext';

export const useCart = (initialOneTime: number, initialMonthly: number) => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider context pipeline');

  return useMemo(() => {
    const activeDiscounts = context.discounts.filter(d => d.isActive);
    let finalOneTime = initialOneTime;
    const appliedOneTimeRows: { name: string; deduced: number }[] = [];

    activeDiscounts.filter(d => d.target === 'ONE_TIME').forEach(d => {
      const deduction = d.type === 'PERCENTAGE' ? (initialOneTime * (d.value / 100)) : d.value;
      finalOneTime -= deduction;
      appliedOneTimeRows.push({ name: d.name, deduced: deduction });
    });
    finalOneTime = Math.max(0, finalOneTime);
    let eventuallyMonthlyPrice = initialMonthly;
    activeDiscounts.filter(d => d.target === 'MONTHLY').forEach(d => {
      const deduction = d.type === 'PERCENTAGE' ? (initialMonthly * (d.value / 100)) : d.value;
      eventuallyMonthlyPrice -= deduction;
    });
    eventuallyMonthlyPrice = Math.max(0, eventuallyMonthlyPrice);

    return {
      finalOneTime,
      eventuallyMonthlyPrice,
      appliedOneTimeRows
    };
  }, [context.discounts, initialOneTime, initialMonthly]);
};