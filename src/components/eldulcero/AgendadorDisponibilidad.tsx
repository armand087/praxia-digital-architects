import { useEffect, useMemo, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { supabase, isSupabaseConfigured } from "@/integrations/eldulcero/client";
import type { Evento } from "@/integrations/eldulcero/types";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";

// Fechas ocupadas de ejemplo, usadas solo cuando Supabase no está configurado
// (ver src/integrations/eldulcero/client.ts).
function generarFechasOcupadasDemo(): string[] {
  const hoy = new Date();
  const fechas: string[] = [];
  for (let i = 0; i < 60; i += 1) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() + i);
    // Patrón determinista: ~1 de cada 4 días aparece ocupado, para dar una demo realista.
    if (d.getDate() % 4 === 0) {
      fechas.push(d.toISOString().slice(0, 10));
    }
  }
  return fechas;
}

export default function AgendadorDisponibilidad() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [fechasOcupadas, setFechasOcupadas] = useState<Date[]>([]);
  const [cargando, setCargando] = useState(isSupabaseConfigured);
  const [seleccionado, setSeleccionado] = useState<Date | undefined>();

  useEffect(() => {
    let cancelado = false;

    async function cargarEventos() {
      if (!supabase) {
        setFechasOcupadas(generarFechasOcupadasDemo().map((f) => new Date(`${f}T00:00:00`)));
        setCargando(false);
        return;
      }

      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .gte("fecha", new Date().toISOString().slice(0, 10));

      if (cancelado) return;

      if (error || !data) {
        setFechasOcupadas(generarFechasOcupadasDemo().map((f) => new Date(`${f}T00:00:00`)));
      } else {
        setFechasOcupadas((data as Evento[]).map((e) => new Date(`${e.fecha}T00:00:00`)));
      }
      setCargando(false);
    }

    cargarEventos();
    return () => {
      cancelado = true;
    };
  }, []);

  const fechasOcupadasSet = useMemo(
    () => new Set(fechasOcupadas.map((f) => f.toDateString())),
    [fechasOcupadas],
  );

  const disponibilidadTexto = seleccionado
    ? fechasOcupadasSet.has(seleccionado.toDateString())
      ? "😔 Esa fecha ya está ocupada. Elige otra o pregúntanos por WhatsApp por lista de espera."
      : "🎉 ¡Esa fecha está disponible! Agenda tu cita de cotización abajo."
    : "Selecciona una fecha para ver su disponibilidad";

  return (
    <section id="disponibilidad" className="bg-white px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-2xl text-center">
        <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
          Consulta la disponibilidad 📅
        </h2>
        <p className="mt-2 text-dulce-texto/70">Las fechas en rosa ya están comprometidas</p>

        <div className="mt-6 flex justify-center rounded-3xl bg-dulce-crema p-2 shadow-sm sm:p-4">
          <Calendar
            mode="single"
            selected={seleccionado}
            onSelect={setSeleccionado}
            disabled={{ before: new Date() }}
            modifiers={{ ocupado: fechasOcupadas }}
            modifiersClassNames={{ ocupado: "bg-dulce-rosa/70 text-white line-through" }}
            className="rounded-2xl bg-white"
          />
        </div>

        <p className="mt-4 min-h-[3rem] text-sm font-semibold text-dulce-texto">
          {cargando ? "Cargando disponibilidad…" : disponibilidadTexto}
        </p>
      </div>
    </section>
  );
}
