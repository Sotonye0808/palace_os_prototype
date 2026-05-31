'use client';

import { useOrderStore } from '@/lib/stores/order';
import { useAuth } from '@/lib/auth/hooks/useAuth';
import { useEffect } from 'react';
import { supabase } from '@/lib/auth/supabase';

export const useOrderRealtime = () => {
  const { user } = useAuth();
  const { updateOrderStatus } = useOrderStore();

  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel(`orders-${user.id}`)
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'orders', filter: `user_id=eq.${user.id}` },
        (payload) => {
          // Update the order store with the new status
          updateOrderStatus(payload.new.status);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, updateOrderStatus]);
};