import { useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '@/integrations/supabase/client';

interface Booking {
  id: string;
  user_id: string | null;
  service_id: string | null;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  notes: string | null;
  status: string;
  scheduled_date: string | null;
  scheduled_time: string | null;
  created_at: string;
  updated_at: string;
  service?: {
    name: string;
  };
}

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('bookings')
      .select('*, service:services(name)')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data as Booking[]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchBookings();

    if (!isSupabaseConfigured) return;

    const channelName = `bookings_${Math.random().toString(36).substring(2, 7)}`;
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'bookings' },
        () => fetchBookings()
      );

    try { channel.subscribe(); } catch (_) {}

    return () => {
      try { supabase.removeChannel(channel); } catch (_) {}
    };
  }, []);

  const updateBookingStatus = async (id: string, status: string) => {
    const { error } = await supabase
      .from('bookings')
      .update({ status })
      .eq('id', id);

    if (!error) {
      setBookings(prev =>
        prev.map(b => (b.id === id ? { ...b, status } : b))
      );
    }
    return { error };
  };

  const deleteBooking = async (id: string) => {
    const { error } = await supabase
      .from('bookings')
      .delete()
      .eq('id', id);

    if (!error) {
      setBookings(prev => prev.filter(b => b.id !== id));
    }
    return { error };
  };

  return {
    bookings,
    isLoading,
    updateBookingStatus,
    deleteBooking,
    refetch: fetchBookings,
  };
};
