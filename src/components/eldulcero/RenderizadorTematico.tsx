import { useMemo, useState } from "react";
import { temas, paletasColor } from "@/data/eldulcero/temas";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";
import { cn } from "@/lib/utils";

export default function RenderizadorTematico() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [temaId, setTemaId] = useState(temas[0].id);
  const [paletaId, setPaletaId] = useState(paletasColor[0].id);

  const tema = useMemo(() => temas.find((t) => t.id === temaId) ?? temas[0], [temaId]);
  const paleta = useMemo(
    () => paletasColor.find((p) => p.id === paletaId) ?? paletasColor[0],
    [paletaId],
  );

  return (
    <section id="renderizador" className="bg-dulce-crema px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-4xl text-center">
        <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
          Imagina tu salón decorado 🎨
        </h2>
        <p className="mt-2 text-dulce-texto/70">
          Elige un tema y una paleta de color para ver una vista previa de la decoración
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {temas.map((t) => (
            <button
              key={t.id}
              onClick={() => setTemaId(t.id)}
              className={cn(
                "rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors",
                t.id === temaId
                  ? "border-dulce-rosa bg-dulce-rosa text-white"
                  : "border-dulce-rosa/30 bg-white text-dulce-texto hover:border-dulce-rosa/60",
              )}
            >
              {t.emoji} {t.nombre}
            </button>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {paletasColor.map((p) => (
            <button
              key={p.id}
              onClick={() => setPaletaId(p.id)}
              aria-label={p.nombre}
              className={cn(
                "h-9 w-9 rounded-full border-4 transition-transform hover:scale-110",
                p.id === paletaId ? "border-dulce-texto scale-110" : "border-white",
              )}
              style={{ backgroundColor: p.hex }}
            />
          ))}
        </div>

        {/* Vista previa ilustrativa armada con los colores/tema elegidos.
           No es una fotografía real: es una maqueta visual generada en vivo. */}
        <div
          className="relative mx-auto mt-10 flex h-64 max-w-lg items-center justify-center overflow-hidden rounded-3xl border-4 border-white shadow-xl sm:h-80"
          style={{
            background: `linear-gradient(135deg, ${tema.colores[0]}33, ${paleta.hex}55, ${tema.colores[1] ?? tema.colores[0]}33)`,
          }}
        >
          <div className="absolute left-4 top-4 text-4xl opacity-80">🎈</div>
          <div className="absolute right-4 top-6 text-4xl opacity-80">🎈</div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-5xl">{tema.emoji}</div>
          <div
            className="absolute top-3 rounded-full px-4 py-1 text-sm font-bold text-white shadow"
            style={{ backgroundColor: paleta.hex }}
          >
            ¡Feliz cumpleaños! {tema.emoji}
          </div>
          <div className="absolute bottom-3 right-4 text-3xl opacity-70">✨</div>
        </div>
        <p className="mt-3 text-xs text-dulce-texto/50">
          Vista previa ilustrativa — el resultado real puede variar según el salón y la disponibilidad
          de materiales.
        </p>
      </div>
    </section>
  );
}
