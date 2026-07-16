export interface Tema {
  id: string;
  nombre: string;
  emoji: string;
  descripcion: string;
  colores: string[]; // hex, para la paleta sugerida de ese tema
}

export const temas: Tema[] = [
  {
    id: "dinosaurios",
    nombre: "Dinosaurios",
    emoji: "🦕",
    descripcion: "Selva prehistórica llena de aventura",
    colores: ["#4ADE80", "#166534", "#FACC15"],
  },
  {
    id: "princesas",
    nombre: "Princesas",
    emoji: "👑",
    descripcion: "Castillo de cuento de hadas",
    colores: ["#F472B6", "#C084FC", "#FDE68A"],
  },
  {
    id: "superheroes",
    nombre: "Superhéroes",
    emoji: "🦸",
    descripcion: "Acción y poderes al rescate",
    colores: ["#3B82F6", "#EF4444", "#FACC15"],
  },
  {
    id: "unicornios",
    nombre: "Unicornios",
    emoji: "🦄",
    descripcion: "Magia y colores de ensueño",
    colores: ["#F0ABFC", "#93C5FD", "#FBCFE8"],
  },
  {
    id: "espacio",
    nombre: "Espacio",
    emoji: "🚀",
    descripcion: "Aventura intergaláctica",
    colores: ["#1E1B4B", "#818CF8", "#F97316"],
  },
  {
    id: "safari",
    nombre: "Safari",
    emoji: "🦁",
    descripcion: "Aventura en la sabana",
    colores: ["#D97706", "#84CC16", "#78350F"],
  },
];

export const paletasColor = [
  { id: "rosa", nombre: "Rosa chicle", hex: "#F472B6" },
  { id: "amarillo", nombre: "Amarillo dulce", hex: "#FACC15" },
  { id: "azul", nombre: "Azul cielo", hex: "#38BDF8" },
  { id: "morado", nombre: "Morado algodón de azúcar", hex: "#C084FC" },
  { id: "verde", nombre: "Verde menta", hex: "#4ADE80" },
];
