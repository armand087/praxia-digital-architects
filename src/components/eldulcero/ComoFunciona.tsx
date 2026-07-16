import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";

const pasos = [
  {
    numero: "1",
    emoji: "🎨",
    titulo: "Elige tu tema",
    descripcion: "Escoge entre más de 20 temas de fiesta y la paleta de colores que más le guste a tu hijo.",
  },
  {
    numero: "2",
    emoji: "📅",
    titulo: "Agenda tu fecha",
    descripcion: "Consulta la disponibilidad en tiempo real y reserva tu fecha con una cita rápida.",
  },
  {
    numero: "3",
    emoji: "🎉",
    titulo: "Nosotros hacemos el resto",
    descripcion: "Decoración, dulces, centros de mesa y actividades — todo listo el día de la fiesta.",
  },
];

export default function ComoFunciona() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-white px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-5xl text-center">
        <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
          ¿Cómo funciona? 🤔
        </h2>
        <p className="mt-2 text-dulce-texto/70">Organizar la fiesta perfecta nunca fue tan fácil</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {pasos.map((paso) => (
            <div
              key={paso.numero}
              className="relative rounded-3xl border-2 border-dulce-amarillo/40 bg-dulce-crema p-6 shadow-sm transition-transform hover:-translate-y-1"
            >
              <div className="mx-auto -mt-10 mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-dulce-rosa text-3xl shadow-md">
                {paso.emoji}
              </div>
              <div className="mb-1 text-sm font-bold text-dulce-morado">Paso {paso.numero}</div>
              <h3 className="font-heading text-xl font-bold text-dulce-texto">{paso.titulo}</h3>
              <p className="mt-2 text-sm text-dulce-texto/70">{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
