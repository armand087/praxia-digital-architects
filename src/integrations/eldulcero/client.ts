import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// El sitio funciona por completo sin Supabase configurado: las herramientas
// caen automáticamente en datos locales/mock (ver src/data/eldulcero y los
// hooks de cada componente). Configura VITE_SUPABASE_URL y
// VITE_SUPABASE_ANON_KEY para persistir de verdad.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl as string, supabaseAnonKey as string)
  : null;
