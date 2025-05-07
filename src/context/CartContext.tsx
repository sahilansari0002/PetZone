import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';
import { Product } from '../types';

interface CartItem {
  id: string;
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  loading: boolean;
  total: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: async () => {},
  removeItem: async () => {},
  updateQuantity: async () => {},
  clearCart: async () => {},
  loading: false,
  total: 0,
});

export const useCart = () => useContext(CartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (user) {
      loadCart();
    } else {
      setItems([]);
      setLoading(false);
    }
  }, [user]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('user_id', user?.id);

      if (error) {
        throw error;
      }

      if (data) {
        const cartItems = data.map(item => ({
          id: item.id,
          product: JSON.parse(item.product_id),
          quantity: item.quantity,
        }));
        setItems(cartItems);
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (product: Product) => {
    if (!user) return;

    try {
      const existingItem = items.find(item => item.product.id === product.id);

      if (existingItem) {
        await updateQuantity(product.id, existingItem.quantity + 1);
      } else {
        const { data, error } = await supabase
          .from('cart_items')
          .insert({
            user_id: user.id,
            product_id: JSON.stringify(product),
            quantity: 1,
          })
          .select()
          .single();

        if (error) throw error;

        if (data) {
          const newItem = {
            id: data.id,
            product,
            quantity: 1,
          };
          setItems(prevItems => [...prevItems, newItem]);
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  const removeItem = async (productId: string) => {
    if (!user) return;

    try {
      const itemToRemove = items.find(item => item.product.id === productId);
      if (!itemToRemove) return;

      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('id', itemToRemove.id);

      if (error) throw error;

      setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    if (!user || quantity < 1) return;

    try {
      const itemToUpdate = items.find(item => item.product.id === productId);
      if (!itemToUpdate) return;

      const { error } = await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', itemToUpdate.id);

      if (error) throw error;

      setItems(prevItems => prevItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      ));
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
      throw error;
    }
  };

  const clearCart = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', user.id);

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      loading,
      total,
    }}>
      {children}
    </CartContext.Provider>
  );
};