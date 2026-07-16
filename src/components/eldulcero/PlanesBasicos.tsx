import { Button } from "@/components/ui/button";
import { planes } from "@/data/eldulcero/planes";
import { formatoMoneda } from "@/lib/eldulcero/formato";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";
import { Check } from "lucide-react";

function scrollToCita() {
  document.getElementById("cita")?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function PlanesBasicos() {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <section className="bg-white px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-5xl text-center">
        <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
          Nuestros planes 🎁
        </h2>
        <p className="mt-2 text-dulce-texto/70">Elige el que mejor se ajuste a tu fiesta</p>

        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {planes.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col rounded-3xl border-2 p-6 text-left shadow-sm transition-transform hover:-translate-y-1 ${
                plan.destacado
                  ? "border-dulce-rosa bg-dulce-rosa/5 sm:scale-105"
                  : "border-dulce-amarillo/30 bg-dulce-crema"
              }`}
            >
              {plan.destacado && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-dulce-rosa px-3 py-1 text-xs font-bold text-white shadow">
                  Más popular ⭐
                </span>
              )}
              <div className="text-3xl">{plan.emoji}</div>
              <h3 className="mt-2 font-heading text-xl font-bold text-dulce-texto">{plan.nombre}</h3>
              <div className="mt-2">
                <span className="text-sm text-dulce-texto/60">Desde</span>
                <div className="font-heading text-3xl font-extrabold text-dulce-morado">
                  {formatoMoneda(plan.precioDesde)}
                </div>
              </div>
              <ul className="mt-4 flex-1 space-y-2 text-sm text-dulce-texto/80">
                {plan.incluye.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-dulce-verde" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button
                className="mt-5 w-full rounded-full bg-dulce-morado font-bold text-white hover:bg-dulce-morado/90"
                onClick={scrollToCita}
              >
                Quiero este plan
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
