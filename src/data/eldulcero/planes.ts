export interface Plan {
  id: "basico" | "estandar" | "premium";
  nombre: string;
  emoji: string;
  precioDesde: number;
  destacado?: boolean;
  incluye: string[];
}

export const planes: Plan[] = [
  {
    id: "basico",
    nombre: "Básico",
    emoji: "🎈",
    precioDesde: 3500,
    incluye: [
      "Decoración temática del salón",
      "Bolos de dulces para 15 invitados",
      "1 centro de mesa principal",
      "Coordinación del evento (3 horas)",
    ],
  },
  {
    id: "estandar",
    nombre: "Estándar",
    emoji: "🎉",
    precioDesde: 6500,
    destacado: true,
    incluye: [
      "Todo lo del plan Básico",
      "Bolos de dulces para 25 invitados",
      "3 centros de mesa a juego",
      "Piñata temática incluida",
      "Coordinación del evento (4 horas)",
    ],
  },
  {
    id: "premium",
    nombre: "Premium",
    emoji: "✨",
    precioDesde: 10500,
    incluye: [
      "Todo lo del plan Estándar",
      "Bolos de dulces para 40 invitados",
      "5 centros de mesa a juego",
      "Piñata + show temático (1 hora)",
      "Itinerario personalizado completo",
      "Coordinación del evento (6 horas)",
    ],
  },
];
