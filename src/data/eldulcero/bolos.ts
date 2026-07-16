export interface TipoDulce {
  id: string;
  nombre: string;
  emoji: string;
  precioPorInvitado: number;
}

export const tiposDulce: TipoDulce[] = [
  { id: "mexicano", nombre: "Dulces mexicanos", emoji: "🍬", precioPorInvitado: 12 },
  { id: "chocolate", nombre: "Chocolates", emoji: "🍫", precioPorInvitado: 15 },
  { id: "gomitas", nombre: "Gomitas", emoji: "🧸", precioPorInvitado: 10 },
  { id: "chamoy", nombre: "Enchilados / chamoy", emoji: "🌶️", precioPorInvitado: 14 },
  { id: "galletas", nombre: "Galletas decoradas", emoji: "🍪", precioPorInvitado: 18 },
  { id: "paletas", nombre: "Paletas artesanales", emoji: "🍭", precioPorInvitado: 16 },
];

export const PRECIO_BASE_BOLSA = 8; // costo fijo de bolsa + armado, por invitado

export function calcularPrecioBolos(cantidadInvitados: number, tiposSeleccionados: string[]) {
  const precioTiposPorInvitado = tiposSeleccionados.reduce((total, tipoId) => {
    const tipo = tiposDulce.find((t) => t.id === tipoId);
    return total + (tipo?.precioPorInvitado ?? 0);
  }, 0);
  const precioUnitario = PRECIO_BASE_BOLSA + precioTiposPorInvitado;
  const precioTotal = precioUnitario * cantidadInvitados;
  return { precioUnitario, precioTotal };
}
