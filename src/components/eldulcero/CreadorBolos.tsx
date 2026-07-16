import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { temas } from "@/data/eldulcero/temas";
import { tiposDulce, calcularPrecioBolos } from "@/data/eldulcero/bolos";
import { formatoMoneda } from "@/lib/eldulcero/formato";
import { supabase } from "@/integrations/eldulcero/client";
import type { PlantillaBolos } from "@/integrations/eldulcero/types";
import { guardarLocal } from "@/lib/eldulcero/almacenLocal";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export default function CreadorBolos() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [temaId, setTemaId] = useState(temas[0].id);
  const [invitados, setInvitados] = useState(20);
  const [tiposSeleccionados, setTiposSeleccionados] = useState<string[]>([tiposDulce[0].id]);
  const [guardando, setGuardando] = useState(false);

  const tema = useMemo(() => temas.find((t) => t.id === temaId) ?? temas[0], [temaId]);
  const { precioUnitario, precioTotal } = useMemo(
    () => calcularPrecioBolos(invitados, tiposSeleccionados),
    [invitados, tiposSeleccionados],
  );

  function alternarTipo(id: string) {
    setTiposSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
  }

  async function guardarPlantilla() {
    setGuardando(true);
    const plantilla: PlantillaBolos = {
      tema: tema.nombre,
      cantidad_invitados: invitados,
      tipos_dulce: tiposSeleccionados,
      precio_unitario: precioUnitario,
      precio_total: precioTotal,
    };

    if (supabase) {
      await supabase.from("plantillas_bolos").insert(plantilla);
    } else {
      guardarLocal("plantillas_bolos", plantilla);
    }

    setGuardando(false);
    toast.success("¡Tu bolo de dulces quedó guardado! Te contactaremos para confirmarlo.");
  }

  return (
    <section id="bolos" className="bg-white px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
            Arma tu bolo de dulces 🍭
          </h2>
          <p className="mt-2 text-dulce-texto/70">Elige el tema y los dulces — el precio se calcula al instante</p>
        </div>

        <div className="mt-8 grid gap-6 rounded-3xl bg-dulce-crema p-6 shadow-sm sm:p-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-dulce-texto">Tema</label>
              <Select value={temaId} onValueChange={setTemaId}>
                <SelectTrigger className="bg-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {temas.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.emoji} {t.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 flex justify-between text-sm font-bold text-dulce-texto">
                <span>Cantidad de invitados</span>
                <span className="text-dulce-morado">{invitados}</span>
              </label>
              <Slider
                value={[invitados]}
                min={5}
                max={100}
                step={1}
                onValueChange={([v]) => setInvitados(v)}
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-dulce-texto">
                Tipos de dulce / snack
              </label>
              <div className="space-y-2">
                {tiposDulce.map((tipo) => (
                  <label
                    key={tipo.id}
                    className="flex cursor-pointer items-center justify-between rounded-xl bg-white px-3 py-2 text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <Checkbox
                        checked={tiposSeleccionados.includes(tipo.id)}
                        onCheckedChange={() => alternarTipo(tipo.id)}
                      />
                      {tipo.emoji} {tipo.nombre}
                    </span>
                    <span className="text-dulce-texto/60">+{formatoMoneda(tipo.precioPorInvitado)}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between rounded-2xl bg-white p-6 text-center">
            <div>
              <div className="text-5xl">{tema.emoji}</div>
              <div className="mt-2 font-heading text-lg font-bold text-dulce-texto">
                Bolo temático {tema.nombre}
              </div>
              <div className="mt-1 flex flex-wrap justify-center gap-1 text-sm text-dulce-texto/70">
                {tiposSeleccionados.length === 0 && <span>Elige al menos un dulce</span>}
                {tiposSeleccionados.map((id) => {
                  const t = tiposDulce.find((td) => td.id === id);
                  return (
                    <span
                      key={id}
                      className={cn(
                        "rounded-full bg-dulce-crema px-2 py-0.5",
                      )}
                    >
                      {t?.emoji} {t?.nombre}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 w-full border-t border-dashed border-dulce-texto/20 pt-4">
              <div className="flex justify-between text-sm text-dulce-texto/70">
                <span>Precio por bolo</span>
                <span>{formatoMoneda(precioUnitario)}</span>
              </div>
              <div className="flex justify-between text-sm text-dulce-texto/70">
                <span>Invitados</span>
                <span>× {invitados}</span>
              </div>
              <div className="mt-2 flex justify-between text-xl font-extrabold text-dulce-morado">
                <span>Total estimado</span>
                <span>{formatoMoneda(precioTotal)}</span>
              </div>
            </div>

            <Button
              className="mt-4 w-full rounded-full bg-dulce-rosa font-bold text-white hover:bg-dulce-rosa/90"
              disabled={tiposSeleccionados.length === 0 || guardando}
              onClick={guardarPlantilla}
            >
              {guardando ? "Guardando..." : "Guardar este bolo 🍬"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
