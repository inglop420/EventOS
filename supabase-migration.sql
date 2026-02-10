-- ============================================
-- Supabase Migration v2 — Jardín El Paraíso
-- Modelo relacional completo para operación real
-- ============================================

-- 1) Catálogo de Servicios
CREATE TABLE IF NOT EXISTS services_catalog (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'general'
    CHECK (category IN ('renta', 'servicio', 'addon', 'hora_extra')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) Paquetes (agrupan servicios)
CREATE TABLE IF NOT EXISTS packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  includes_services JSONB NOT NULL DEFAULT '[]'::jsonb,
  event_type TEXT NOT NULL DEFAULT 'general'
    CHECK (event_type IN ('boda', 'xv', 'corporativo', 'social', 'general')),
  max_guests INTEGER NOT NULL DEFAULT 200,
  is_active BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3) Bloqueos de disponibilidad
CREATE TABLE IF NOT EXISTS availability_blocks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  reason TEXT NOT NULL DEFAULT 'Bloqueado',
  is_full_day_block BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(date)
);

-- 4) Bookings (evolución de la tabla events)
CREATE TABLE IF NOT EXISTS bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('boda', 'xv', 'corporativo', 'social')),
  client_name TEXT NOT NULL,
  client_email TEXT,
  phone TEXT NOT NULL,
  guests INTEGER NOT NULL DEFAULT 100,
  package_id UUID REFERENCES packages(id) ON DELETE SET NULL,
  addons JSONB NOT NULL DEFAULT '[]'::jsonb,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  paid_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  balance_due DECIMAL(10,2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5) Pagos (rastreo de anticipos vs liquidación)
CREATE TABLE IF NOT EXISTS payments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(10,2) NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'transferencia'
    CHECK (payment_method IN ('efectivo', 'transferencia', 'tarjeta', 'otro')),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'verified', 'rejected')),
  proof_url TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- Row Level Security
-- ============================================

ALTER TABLE services_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE availability_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Lectura pública (el frontend necesita leer catálogo, paquetes, disponibilidad)
CREATE POLICY "Public read services_catalog" ON services_catalog FOR SELECT USING (true);
CREATE POLICY "Public read packages" ON packages FOR SELECT USING (true);
CREATE POLICY "Public read availability_blocks" ON availability_blocks FOR SELECT USING (true);
CREATE POLICY "Public read bookings dates" ON bookings FOR SELECT USING (true);
CREATE POLICY "Public read payments" ON payments FOR SELECT USING (true);

-- Inserción pública (lead capture desde landing page)
CREATE POLICY "Public insert bookings" ON bookings FOR INSERT WITH CHECK (true);

-- Operaciones de admin (update/insert/delete abiertas — se protege con contraseña en el frontend)
CREATE POLICY "Public update bookings" ON bookings FOR UPDATE USING (true);
CREATE POLICY "Public insert services_catalog" ON services_catalog FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update services_catalog" ON services_catalog FOR UPDATE USING (true);
CREATE POLICY "Public delete services_catalog" ON services_catalog FOR DELETE USING (true);
CREATE POLICY "Public insert packages" ON packages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update packages" ON packages FOR UPDATE USING (true);
CREATE POLICY "Public delete packages" ON packages FOR DELETE USING (true);
CREATE POLICY "Public insert availability_blocks" ON availability_blocks FOR INSERT WITH CHECK (true);
CREATE POLICY "Public delete availability_blocks" ON availability_blocks FOR DELETE USING (true);
CREATE POLICY "Public insert payments" ON payments FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update payments" ON payments FOR UPDATE USING (true);

-- ============================================
-- Índices
-- ============================================

CREATE INDEX IF NOT EXISTS idx_bookings_date ON bookings(date);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_availability_blocks_date ON availability_blocks(date);
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_services_catalog_category ON services_catalog(category);
CREATE INDEX IF NOT EXISTS idx_packages_event_type ON packages(event_type);

-- ============================================
-- Datos iniciales (seed)
-- ============================================

-- Servicios del catálogo
INSERT INTO services_catalog (name, description, price, category, sort_order) VALUES
  ('Renta del Jardín', 'Uso exclusivo del jardín con áreas verdes, vista al lago y estacionamiento', 15000.00, 'renta', 1),
  ('Zona Techada', 'Área cubierta con capacidad para 150 personas', 5000.00, 'servicio', 2),
  ('Carpa para Eventos', 'Carpa profesional para eventos de más de 200 personas', 8000.00, 'servicio', 3),
  ('Iluminación Decorativa', 'Sistema de luces LED y guirnaldas para decoración nocturna', 3500.00, 'addon', 4),
  ('Sistema de Audio', 'Equipo de sonido profesional con micrófono y bocinas', 4000.00, 'addon', 5),
  ('Pista de Baile', 'Pista de baile portátil de 6x6 metros', 3000.00, 'addon', 6),
  ('Coordinación de Evento', 'Coordinador profesional durante todo el evento', 5000.00, 'servicio', 7),
  ('Hora Extra', 'Extensión de horario por hora adicional', 2500.00, 'hora_extra', 8),
  ('Estacionamiento VIP', 'Servicio de valet parking para 30 vehículos', 3000.00, 'addon', 9),
  ('WiFi Premium', 'Red WiFi dedicada de alta velocidad para el evento', 1500.00, 'addon', 10);

-- Paquetes predefinidos
INSERT INTO packages (name, description, total_price, event_type, max_guests, sort_order, includes_services) VALUES
  ('Paquete Esencial', 'Ideal para eventos íntimos. Incluye renta del jardín y zona techada.', 25000.00, 'general', 100, 1,
   (SELECT jsonb_agg(id) FROM services_catalog WHERE name IN ('Renta del Jardín', 'Zona Techada'))),
  ('Paquete Boda Clásica', 'Todo lo necesario para una boda inolvidable con vista al lago.', 45000.00, 'boda', 200, 2,
   (SELECT jsonb_agg(id) FROM services_catalog WHERE name IN ('Renta del Jardín', 'Zona Techada', 'Iluminación Decorativa', 'Sistema de Audio', 'Pista de Baile'))),
  ('Paquete Boda Premium', 'La experiencia completa con coordinación y todos los servicios incluidos.', 65000.00, 'boda', 350, 3,
   (SELECT jsonb_agg(id) FROM services_catalog WHERE name IN ('Renta del Jardín', 'Zona Techada', 'Carpa para Eventos', 'Iluminación Decorativa', 'Sistema de Audio', 'Pista de Baile', 'Coordinación de Evento', 'Estacionamiento VIP', 'WiFi Premium'))),
  ('Paquete XV Años', 'Celebración mágica con decoración e iluminación para la quinceañera.', 38000.00, 'xv', 200, 4,
   (SELECT jsonb_agg(id) FROM services_catalog WHERE name IN ('Renta del Jardín', 'Zona Techada', 'Iluminación Decorativa', 'Sistema de Audio', 'Pista de Baile'))),
  ('Paquete Corporativo', 'Espacio profesional para reuniones y eventos empresariales.', 20000.00, 'corporativo', 150, 5,
   (SELECT jsonb_agg(id) FROM services_catalog WHERE name IN ('Renta del Jardín', 'Zona Techada', 'WiFi Premium'))),
  ('Paquete Social', 'Para graduaciones, cumpleaños y celebraciones familiares.', 22000.00, 'social', 150, 6,
   (SELECT jsonb_agg(id) FROM services_catalog WHERE name IN ('Renta del Jardín', 'Zona Techada', 'Sistema de Audio')));

-- Eliminar tablas antiguas si existen (opcional, descomentar si deseas limpiar)
-- DROP TABLE IF EXISTS events CASCADE;
-- DROP TABLE IF EXISTS blocked_dates CASCADE;
