// Tipos alineados con supabase/schema.sql — actualízalos si cambias el esquema.
//
// Nota: se usan `type` (no `interface`) para Row/Insert/Update porque
// supabase-js valida estos tipos contra `Record<string, unknown>`, y un
// `interface` no se considera estructuralmente compatible con un tipo con
// índice — con `interface` el cliente pierde el tipado y cae a `never`.

export type EstadoEvento = "ocupado" | "bloqueado" | "disponible_limitado";
export type EstadoCita = "pendiente" | "confirmada" | "cancelada";
export type PlanFiesta = "basico" | "estandar" | "premium";
export type EstadoCotizacion = "borrador" | "enviada" | "aceptada" | "rechazada";
export type TamanoMesa = "chica" | "mediana" | "grande";

export type Evento = {
  id: string;
  fecha: string; // YYYY-MM-DD
  titulo: string | null;
  estado: EstadoEvento;
  notas: string | null;
  created_at: string;
};

export type Cita = {
  id?: string;
  nombre: string;
  telefono: string;
  email?: string | null;
  fecha_preferida: string; // YYYY-MM-DD
  horario_preferido: string;
  tema_interes?: string | null;
  numero_invitados?: number | null;
  mensaje?: string | null;
  estado?: EstadoCita;
  created_at?: string;
};

export type ActividadItinerario = {
  id: string;
  nombre: string;
  duracionMinutos: number;
  emoji: string;
};

export type Itinerario = {
  id?: string;
  cotizacion_id?: string | null;
  edad_ninos?: number | null;
  numero_invitados?: number | null;
  duracion_horas?: number | null;
  actividades: ActividadItinerario[];
  created_at?: string;
};

export type PlantillaBolos = {
  id?: string;
  cotizacion_id?: string | null;
  tema: string;
  cantidad_invitados: number;
  tipos_dulce: string[];
  precio_unitario: number;
  precio_total: number;
  created_at?: string;
};

export type PlantillaCentroMesa = {
  id?: string;
  cotizacion_id?: string | null;
  tema: string;
  tamano_mesa: TamanoMesa;
  estilo: string;
  cantidad_mesas: number;
  precio_unitario: number;
  precio_total: number;
  created_at?: string;
};

export type Cotizacion = {
  id?: string;
  nombre_cliente?: string | null;
  telefono?: string | null;
  email?: string | null;
  tema?: string | null;
  numero_invitados?: number | null;
  plan?: PlanFiesta | null;
  detalle: Record<string, unknown>;
  precio_estimado?: number | null;
  estado?: EstadoCotizacion;
  created_at?: string;
};

type SinRelaciones = { Relationships: [] };

export type Database = {
  public: {
    Tables: {
      eventos: { Row: Evento; Insert: Partial<Evento>; Update: Partial<Evento> } & SinRelaciones;
      citas: { Row: Cita; Insert: Cita; Update: Partial<Cita> } & SinRelaciones;
      cotizaciones: { Row: Cotizacion; Insert: Cotizacion; Update: Partial<Cotizacion> } & SinRelaciones;
      plantillas_bolos: {
        Row: PlantillaBolos;
        Insert: PlantillaBolos;
        Update: Partial<PlantillaBolos>;
      } & SinRelaciones;
      plantillas_centros_mesa: {
        Row: PlantillaCentroMesa;
        Insert: PlantillaCentroMesa;
        Update: Partial<PlantillaCentroMesa>;
      } & SinRelaciones;
      itinerarios: { Row: Itinerario; Insert: Itinerario; Update: Partial<Itinerario> } & SinRelaciones;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
  };
};
