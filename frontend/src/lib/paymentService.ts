import { supabase } from './supabase';
import { PaymentMethod } from './supabase';

export const paymentService = {
  getAll: async (): Promise<PaymentMethod[]> => {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  getActive: async (): Promise<PaymentMethod[]> => {
    const { data, error } = await supabase
      .from('payment_methods')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  create: async (method: Omit<PaymentMethod, 'id' | 'created_at' | 'updated_at'>): Promise<PaymentMethod> => {
    const { data, error } = await supabase
      .from('payment_methods')
      .insert([method])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  update: async (id: string, updates: Partial<PaymentMethod>): Promise<PaymentMethod> => {
    const { data, error } = await supabase
      .from('payment_methods')
      .update(updates)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  delete: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('payment_methods')
      .delete()
      .eq('id', id);
    if (error) throw error;
  },

  toggleActive: async (id: string, is_active: boolean): Promise<void> => {
    const { error } = await supabase
      .from('payment_methods')
      .update({ is_active })
      .eq('id', id);
    if (error) throw error;
  },
};
