import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { verbiageRegistry } from '../locale/language';
import { en } from '../locale/en';

export const useVerbiage = () => {
  const context = useContext(CartContext);
  const currentLocale = context?.locale || 'en';
  
  return verbiageRegistry[currentLocale] || en;
};