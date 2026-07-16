import { useMemo, useState } from "react";
import { toast } from "sonner";
import { ArrowDown, ArrowUp, Download, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { actividadesDisponibles } from "@/data/eldulcero/actividades";
import type { ActividadItinerario } from "@/integrations/eldulcero/types";
import { supabase } from "@/integrations/eldulcero/client";
import { guardarLocal } from "@/lib/eldulcero/almacenLocal";
import { construirLinkWhatsApp } from "@/lib/eldulcero/whatsapp";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";

function sumarMinutos(hora: string, minutos: number) {
  const [h, m] = hora.split(":").map(Number);
  const total = h * 60 + m + minutos;
  const hh = Math.floor((total / 60) % 24)
    .toString()
    .padStart(2, "0");
  const mm = (total % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

export default function CreadorItinerario() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [edadNinos, setEdadNinos] = useState(7);
  const [numeroInvitados, setNumeroInvitados] = useState(20);
  const [duracionHoras, setDuracionHoras] = useState(3);
  const [horaInicio, setHoraInicio] = useState("13:00");
  const [actividades, setActividades] = useState<ActividadItinerario[]>(
    actividadesDisponibles
      .filter((a) => ["bienvenida", "juegos", "piñata", "pastel", "recuerdos"].includes(a.id))
      .map((a) => ({ id: a.id, nombre: a.nombre, duracionMinutos: a.duracionMinutos, emoji: a.emoji })),
  );
  const [guardando, setGuardando] = useState(false);

  function alternarActividad(actividad: (typeof actividadesDisponibles)[number]) {
    setActividades((prev) => {
      const yaExiste = prev.some((a) => a.id === actividad.id);
      if (yaExiste) return prev.filter((a) => a.id !== actividad.id);
      return [
        ...prev,
        {
          id: actividad.id,
          nombre: actividad.nombre,
          duracionMinutos: actividad.duracionMinutos,
          emoji: actividad.emoji,
        },
      ];
    });
  }

  function mover(index: number, direccion: -1 | 1) {
    setActividades((prev) => {
      const nuevo = [...prev];
      const destino = index + direccion;
      if (destino < 0 || destino >= nuevo.length) return prev;
      [nuevo[index], nuevo[destino]] = [nuevo[destino], nuevo[index]];
      return nuevo;
    });
  }

  function quitar(id: string) {
    setActividades((prev) => prev.filter((a) => a.id !== id));
  }

  const timeline = useMemo(() => {
    let horaActual = horaInicio;
    return actividades.map((actividad) => {
      const inicio = horaActual;
      const fin = sumarMinutos(horaActual, actividad.duracionMinutos);
      horaActual = fin;
      return { ...actividad, inicio, fin };
    });
  }, [actividades, horaInicio]);

  const duracionTotalMinutos = actividades.reduce((sum, a) => sum + a.duracionMinutos, 0);
  const excedeDuracion = duracionTotalMinutos > duracionHoras * 60;

  const textoItinerario = useMemo(() => {
    const lineas = [
      `🎉 Itinerario de la fiesta`,
      `Edad de los niños: ${edadNinos} años`,
      `Invitados: ${numeroInvitados}`,
      `Inicio: ${horaInicio} hrs`,
      "",
      ...timeline.map((t) => `${t.inicio} - ${t.fin}  ${t.emoji} ${t.nombre}`),
    ];
    return lineas.join("\n");
  }, [edadNinos, numeroInvitados, horaInicio, timeline]);

  function descargarItinerario() {
    const blob = new Blob([textoItinerario], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "itinerario-fiesta.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  async function guardarItinerario() {
    setGuardando(true);
    const registro = {
      edad_ninos: edadNinos,
      numero_invitados: numeroInvitados,
      duracion_horas: duracionHoras,
      actividades,
    };

    if (supabase) {
      await supabase.from("itinerarios").insert(registro);
    } else {
      guardarLocal("itinerarios", registro);
    }

    setGuardando(false);
    toast.success("¡Itinerario guardado! Te contactaremos para confirmarlo.");
  }

  return (
    <section id="itinerario" className="bg-white px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
            Crea el itinerario de actividades 🕐
          </h2>
          <p className="mt-2 text-dulce-texto/70">
            Ordena las actividades como quieras — nosotros calculamos los horarios
          </p>
        </div>

        <div className="mt-8 grid gap-6 rounded-3xl bg-dulce-crema p-6 shadow-sm sm:p-8 md:grid-cols-2">
          <div className="space-y-5">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="mb-1 block text-xs font-bold text-dulce-texto">Edad</label>
                <Input
                  type="number"
                  min={1}
                  value={edadNinos}
                  onChange={(e) => setEdadNinos(Number(e.target.value) || 1)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-dulce-texto">Invitados</label>
                <Input
                  type="number"
                  min={1}
                  value={numeroInvitados}
                  onChange={(e) => setNumeroInvitados(Number(e.target.value) || 1)}
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold text-dulce-texto">Duración (hrs)</label>
                <Input
                  type="number"
                  min={1}
                  step={0.5}
                  value={duracionHoras}
                  onChange={(e) => setDuracionHoras(Number(e.target.value) || 1)}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold text-dulce-texto">Hora de inicio</label>
              <Input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-dulce-texto">Actividades</label>
              <div className="grid grid-cols-2 gap-2">
                {actividadesDisponibles.map((actividad) => (
                  <label
                    key={actividad.id}
                    className="flex cursor-pointer items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm"
                  >
                    <Checkbox
                      checked={actividades.some((a) => a.id === actividad.id)}
                      onCheckedChange={() => alternarActividad(actividad)}
                    />
                    {actividad.emoji} {actividad.nombre}
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-5">
            <h3 className="font-heading text-lg font-bold text-dulce-texto">Tu cronograma</h3>
            {excedeDuracion && (
              <p className="mt-1 text-xs font-semibold text-destructive">
                ⚠️ Las actividades suman {Math.round((duracionTotalMinutos / 60) * 10) / 10} hrs, más que
                la duración del evento ({duracionHoras} hrs).
              </p>
            )}

            <ol className="mt-3 space-y-2">
              {timeline.length === 0 && (
                <p className="text-sm text-dulce-texto/60">Selecciona actividades para armar tu itinerario</p>
              )}
              {timeline.map((actividad, index) => (
                <li
                  key={actividad.id}
                  className="flex items-center justify-between gap-2 rounded-xl bg-dulce-crema px-3 py-2 text-sm"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-dulce-texto">
                      {actividad.emoji} {actividad.nombre}
                    </div>
                    <div className="text-xs text-dulce-texto/60">
                      {actividad.inicio} – {actividad.fin} ({actividad.duracionMinutos} min)
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-1">
                    <button
                      aria-label="Mover arriba"
                      onClick={() => mover(index, -1)}
                      disabled={index === 0}
                      className="rounded-full p-1 text-dulce-texto/60 hover:bg-white disabled:opacity-30"
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Mover abajo"
                      onClick={() => mover(index, 1)}
                      disabled={index === timeline.length - 1}
                      className="rounded-full p-1 text-dulce-texto/60 hover:bg-white disabled:opacity-30"
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Quitar actividad"
                      onClick={() => quitar(actividad.id)}
                      className="rounded-full p-1 text-destructive hover:bg-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-5 flex flex-col gap-2">
              <Button
                variant="outline"
                className="w-full rounded-full border-2 border-dulce-morado font-bold text-dulce-morado hover:bg-dulce-morado/10"
                onClick={descargarItinerario}
                disabled={timeline.length === 0}
              >
                <Download className="mr-2 h-4 w-4" /> Descargar itinerario
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full rounded-full border-2 border-[#25D366] font-bold text-[#25D366] hover:bg-[#25D366]/10"
              >
                <a href={construirLinkWhatsApp(textoItinerario)} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-4 w-4" /> Enviar por WhatsApp
                </a>
              </Button>
              <Button
                className="w-full rounded-full bg-dulce-rosa font-bold text-white hover:bg-dulce-rosa/90"
                onClick={guardarItinerario}
                disabled={timeline.length === 0 || guardando}
              >
                {guardando ? "Guardando..." : "Guardar itinerario"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
