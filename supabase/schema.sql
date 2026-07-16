-- ============================================================================
-- El Dulcero — esquema de base de datos (Supabase / Postgres)
-- ============================================================================
-- Cómo aplicar: pega este archivo en el SQL Editor de tu proyecto Supabase,
-- o guárdalo como una migración con la CLI de Supabase
-- (`supabase migration new eldulcero_schema` y pega el contenido).
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- eventos: fechas ya reservadas / bloqueadas, usadas por el agendador de
-- disponibilidad para pintar el calendario (disponible vs. ocupado).
-- ----------------------------------------------------------------------------
create table if not exists public.eventos (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  titulo text,
  estado text not null default 'ocupado' check (estado in ('ocupado', 'bloqueado', 'disponible_limitado')),
  notas text,
  created_at timestamptz not null default now()
);

create unique index if not exists eventos_fecha_idx on public.eventos (fecha);

-- ----------------------------------------------------------------------------
-- citas: solicitudes de cita para cotización, capturadas desde el formulario
-- del agendador de citas.
-- ----------------------------------------------------------------------------
create table if not exists public.citas (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  telefono text not null,
  email text,
  fecha_preferida date not null,
  horario_preferido text not null,
  tema_interes text,
  numero_invitados int,
  mensaje text,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmada', 'cancelada')),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- cotizaciones: resumen de una cotización generada por cualquiera de las
-- herramientas (bolos, centros de mesa, itinerario) o de forma manual.
-- ----------------------------------------------------------------------------
create table if not exists public.cotizaciones (
  id uuid primary key default gen_random_uuid(),
  nombre_cliente text,
  telefono text,
  email text,
  tema text,
  numero_invitados int,
  plan text check (plan in ('basico', 'estandar', 'premium')),
  detalle jsonb not null default '{}'::jsonb,
  precio_estimado numeric(10, 2),
  estado text not null default 'borrador' check (estado in ('borrador', 'enviada', 'aceptada', 'rechazada')),
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- plantillas_bolos: configuraciones guardadas del creador de bolos de dulces.
-- ----------------------------------------------------------------------------
create table if not exists public.plantillas_bolos (
  id uuid primary key default gen_random_uuid(),
  cotizacion_id uuid references public.cotizaciones (id) on delete set null,
  tema text not null,
  cantidad_invitados int not null check (cantidad_invitados > 0),
  tipos_dulce text[] not null default '{}',
  precio_unitario numeric(10, 2) not null,
  precio_total numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- plantillas_centros_mesa: configuraciones guardadas del creador de centros
-- de mesa.
-- ----------------------------------------------------------------------------
create table if not exists public.plantillas_centros_mesa (
  id uuid primary key default gen_random_uuid(),
  cotizacion_id uuid references public.cotizaciones (id) on delete set null,
  tema text not null,
  tamano_mesa text not null check (tamano_mesa in ('chica', 'mediana', 'grande')),
  estilo text not null,
  cantidad_mesas int not null default 1 check (cantidad_mesas > 0),
  precio_unitario numeric(10, 2) not null,
  precio_total numeric(10, 2) not null,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- itinerarios: cronogramas de actividades generados por el creador de
-- itinerario, para poder recuperarlos o reenviarlos después.
-- ----------------------------------------------------------------------------
create table if not exists public.itinerarios (
  id uuid primary key default gen_random_uuid(),
  cotizacion_id uuid references public.cotizaciones (id) on delete set null,
  edad_ninos int,
  numero_invitados int,
  duracion_horas numeric(4, 1),
  actividades jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- ----------------------------------------------------------------------------
-- Row Level Security: el sitio es público y de solo-escritura para leads
-- (citas, cotizaciones, plantillas) y solo-lectura para disponibilidad.
-- Ajusta estas políticas si agregas un panel de administración autenticado.
-- ----------------------------------------------------------------------------
alter table public.eventos enable row level security;
alter table public.citas enable row level security;
alter table public.cotizaciones enable row level security;
alter table public.plantillas_bolos enable row level security;
alter table public.plantillas_centros_mesa enable row level security;
alter table public.itinerarios enable row level security;

create policy "Cualquiera puede leer eventos" on public.eventos
  for select using (true);

create policy "Cualquiera puede crear citas" on public.citas
  for insert with check (true);

create policy "Cualquiera puede crear cotizaciones" on public.cotizaciones
  for insert with check (true);

create policy "Cualquiera puede crear plantillas de bolos" on public.plantillas_bolos
  for insert with check (true);

create policy "Cualquiera puede crear plantillas de centros de mesa" on public.plantillas_centros_mesa
  for insert with check (true);

create policy "Cualquiera puede crear itinerarios" on public.itinerarios
  for insert with check (true);
