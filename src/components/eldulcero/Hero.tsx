import { Button } from "@/components/ui/button";

const stats = [
  { label: "Años de experiencia", valor: "8+", emoji: "🎉" },
  { label: "Fiestas realizadas", valor: "500+", emoji: "🎂" },
  { label: "Temas disponibles", valor: "20+", emoji: "🎈" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-dulce-gradient px-4 pb-16 pt-28 text-center sm:pt-32">
      <div className="pointer-events-none absolute -left-10 top-10 text-6xl opacity-30 float">🎈</div>
      <div
        className="pointer-events-none absolute -right-6 top-32 text-6xl opacity-30 float"
        style={{ animationDelay: "1.5s" }}
      >
        🍭
      </div>
      <div
        className="pointer-events-none absolute bottom-10 left-1/4 text-5xl opacity-20 float"
        style={{ animationDelay: "3s" }}
      >
        ✨
      </div>

      <div className="relative mx-auto max-w-3xl">
        <span className="mb-4 inline-block rounded-full bg-white/70 px-4 py-1 text-sm font-semibold text-dulce-morado shadow-sm backdrop-blur">
          🎊 Dulcería y fiestas infantiles en La Laguna
        </span>
        <h1 className="font-heading text-4xl font-extrabold leading-tight text-dulce-texto sm:text-5xl md:text-6xl">
          LA FIESTA QUE TUS HIJOS <span className="text-dulce-rosa">VAN A RECORDAR</span> 🎉
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-lg text-dulce-texto/80">
          Nosotros nos encargamos de la decoración, los dulces y cada detalle — tú solo disfruta la
          fiesta junto a tus hijos.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            size="lg"
            className="w-full rounded-full bg-dulce-rosa text-base font-bold text-white hover:bg-dulce-rosa/90 sm:w-auto"
            onClick={() => scrollTo("cita")}
          >
            Cotiza tu fiesta 🎂
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full rounded-full border-2 border-dulce-morado bg-white/70 text-base font-bold text-dulce-morado hover:bg-white sm:w-auto"
            onClick={() => scrollTo("disponibilidad")}
          >
            Ver disponibilidad 📅
          </Button>
        </div>

        <div className="mx-auto mt-12 grid max-w-lg grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/80 px-2 py-4 shadow-sm backdrop-blur transition-transform hover:-translate-y-1"
            >
              <div className="text-2xl">{stat.emoji}</div>
              <div className="font-heading text-2xl font-extrabold text-dulce-morado">{stat.valor}</div>
              <div className="text-xs font-medium text-dulce-texto/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
