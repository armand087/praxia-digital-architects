import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";

const beneficios = [
  {
    emoji: "🏆",
    titulo: "8 años de experiencia",
    descripcion: "Más de 500 fiestas infantiles organizadas en toda la Comarca Lagunera.",
  },
  {
    emoji: "🎨",
    titulo: "Temas 100% personalizables",
    descripcion: "Adaptamos colores, decoración y actividades al gusto de tus hijos.",
  },
  {
    emoji: "📦",
    titulo: "Todo incluido",
    descripcion: "Decoración, dulcería, centros de mesa e itinerario en un solo lugar.",
  },
  {
    emoji: "💬",
    titulo: "Atención cercana",
    descripcion: "Te acompañamos por WhatsApp desde la cotización hasta el día del evento.",
  },
];

export default function PorQueElegirnos() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-dulce-crema px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-5xl text-center">
        <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
          ¿Por qué elegirnos? 💜
        </h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {beneficios.map((beneficio) => (
            <div
              key={beneficio.titulo}
              className="rounded-3xl bg-white p-6 text-left shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="text-3xl">{beneficio.emoji}</div>
              <h3 className="mt-3 font-heading text-lg font-bold text-dulce-texto">{beneficio.titulo}</h3>
              <p className="mt-1 text-sm text-dulce-texto/70">{beneficio.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
