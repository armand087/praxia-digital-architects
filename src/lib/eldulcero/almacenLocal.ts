// Respaldo local para cuando Supabase no está configurado: nada se pierde,
// solo se guarda en el navegador del usuario en vez de en la base de datos.
const PREFIJO = "eldulcero";

export function guardarLocal<T>(coleccion: string, registro: T) {
  const clave = `${PREFIJO}:${coleccion}`;
  const previos = leerLocal<T>(coleccion);
  const actualizados = [...previos, registro];
  window.localStorage.setItem(clave, JSON.stringify(actualizados));
  return actualizados;
}

export function leerLocal<T>(coleccion: string): T[] {
  try {
    const crudo = window.localStorage.getItem(`${PREFIJO}:${coleccion}`);
    return crudo ? (JSON.parse(crudo) as T[]) : [];
  } catch {
    return [];
  }
}
