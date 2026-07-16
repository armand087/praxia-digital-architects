export interface Testimonio {
  id: string;
  nombre: string; // nombre + inicial, sin apellido completo por privacidad
  tema: string;
  comentario: string;
  estrellas: number;
}

export const testimonios: Testimonio[] = [
  {
    id: "t1",
    nombre: "Andrea R.",
    tema: "Unicornios",
    comentario:
      "Todo el salón quedó exactamente como lo imaginé para mi hija. Llegaron puntuales y se encargaron de absolutamente todo. ¡100% recomendados!",
    estrellas: 5,
  },
  {
    id: "t2",
    nombre: "Carlos M.",
    tema: "Dinosaurios",
    comentario:
      "Mi hijo quedó fascinado con la decoración y la piñata. El equipo fue súper atento y el itinerario que armamos juntos se cumplió al pie de la letra.",
    estrellas: 5,
  },
  {
    id: "t3",
    nombre: "Fernanda L.",
    tema: "Princesas",
    comentario:
      "Cotizamos por WhatsApp un jueves y para el sábado ya teníamos todo listo. Los bolos de dulces fueron el éxito de la fiesta.",
    estrellas: 5,
  },
  {
    id: "t4",
    nombre: "Jorge T.",
    tema: "Superhéroes",
    comentario:
      "Precio justo, cumplieron con todo lo acordado y el show temático fue una sorpresa increíble para los niños y los papás.",
    estrellas: 4,
  },
];
