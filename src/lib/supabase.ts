import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ---- Types ----

export type ServiceCatalog = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: 'renta' | 'servicio' | 'addon' | 'hora_extra';
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type Package = {
  id: string;
  name: string;
  description: string | null;
  total_price: number;
  includes_services: string[]; // array of service UUIDs
  event_type: 'boda' | 'xv' | 'corporativo' | 'social' | 'general';
  max_guests: number;
  is_active: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
};

export type AvailabilityBlock = {
  id: string;
  date: string;
  reason: string;
  is_full_day_block: boolean;
  created_at?: string;
};

export type Booking = {
  id?: string;
  date: string;
  event_type: 'boda' | 'xv' | 'corporativo' | 'social';
  client_name: string;
  client_email?: string;
  phone: string;
  guests: number;
  package_id: string | null;
  addons: string[]; // array of service UUIDs
  total_amount: number;
  paid_amount: number;
  balance_due?: number; // computed column
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  created_at?: string;
  updated_at?: string;
};

export type Payment = {
  id?: string;
  booking_id: string;
  amount: number;
  payment_method: 'efectivo' | 'transferencia' | 'tarjeta' | 'otro';
  status: 'pending' | 'verified' | 'rejected';
  proof_url?: string;
  notes?: string;
  created_at?: string;
};

// Legacy compat — Event alias
export type Event = Booking;
