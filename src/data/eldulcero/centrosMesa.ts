export interface TamanoMesaOpcion {
  id: "chica" | "mediana" | "grande";
  nombre: string;
  precioBase: number;
}

export interface EstiloCentroMesa {
  id: string;
  nombre: string;
  emoji: string;
  multiplicador: number; // sobre el precio base del tamaño
}

export const tamanosMesa: TamanoMesaOpcion[] = [
  { id: "chica", nombre: "Chica (4-6 personas)", precioBase: 180 },
  { id: "mediana", nombre: "Mediana (8-10 personas)", precioBase: 260 },
  { id: "grande", nombre: "Grande (12+ personas)", precioBase: 340 },
];

export const estilosCentroMesa: EstiloCentroMesa[] = [
  { id: "globos", nombre: "Globos temáticos", emoji: "🎈", multiplicador: 1 },
  { id: "flores", nombre: "Flores + temático", emoji: "🌸", multiplicador: 1.35 },
  { id: "impreso", nombre: "Impreso 3D temático", emoji: "🖼️", multiplicador: 1.5 },
  { id: "dulces", nombre: "Torre de dulces", emoji: "🍭", multiplicador: 1.2 },
];

export function calcularPrecioCentroMesa(
  tamanoId: TamanoMesaOpcion["id"],
  estiloId: string,
  cantidadMesas: number,
) {
  const tamano = tamanosMesa.find((t) => t.id === tamanoId) ?? tamanosMesa[0];
  const estilo = estilosCentroMesa.find((e) => e.id === estiloId) ?? estilosCentroMesa[0];
  const precioUnitario = Math.round(tamano.precioBase * estilo.multiplicador);
  const precioTotal = precioUnitario * cantidadMesas;
  return { precioUnitario, precioTotal };
}
