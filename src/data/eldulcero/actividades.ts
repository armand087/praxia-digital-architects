export interface ActividadDisponible {
  id: string;
  nombre: string;
  emoji: string;
  duracionMinutos: number;
}

export const actividadesDisponibles: ActividadDisponible[] = [
  { id: "bienvenida", nombre: "Bienvenida y juegos libres", emoji: "👋", duracionMinutos: 20 },
  { id: "juegos", nombre: "Juegos organizados", emoji: "🎮", duracionMinutos: 30 },
  { id: "piñata", nombre: "Piñata", emoji: "🪅", duracionMinutos: 20 },
  { id: "show", nombre: "Show / animación temática", emoji: "🎭", duracionMinutos: 30 },
  { id: "pastel", nombre: "Pastel y Las Mañanitas", emoji: "🎂", duracionMinutos: 20 },
  { id: "baile", nombre: "Baile sorpresa", emoji: "💃", duracionMinutos: 15 },
  { id: "comida", nombre: "Comida", emoji: "🍕", duracionMinutos: 40 },
  { id: "recuerdos", nombre: "Entrega de recuerdos y despedida", emoji: "🎁", duracionMinutos: 15 },
];
