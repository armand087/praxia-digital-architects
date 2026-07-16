import { useMemo, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { temas } from "@/data/eldulcero/temas";
import {
  tamanosMesa,
  estilosCentroMesa,
  calcularPrecioCentroMesa,
  type TamanoMesaOpcion,
} from "@/data/eldulcero/centrosMesa";
import { formatoMoneda } from "@/lib/eldulcero/formato";
import { supabase } from "@/integrations/eldulcero/client";
import type { PlantillaCentroMesa } from "@/integrations/eldulcero/types";
import { guardarLocal } from "@/lib/eldulcero/almacenLocal";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";

export default function CreadorCentrosMesa() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [temaId, setTemaId] = useState(temas[0].id);
  const [tamanoId, setTamanoId] = useState<TamanoMesaOpcion["id"]>("mediana");
  const [estiloId, setEstiloId] = useState(estilosCentroMesa[0].id);
  const [cantidadMesas, setCantidadMesas] = useState(3);
  const [guardando, setGuardando] = useState(false);

  const tema = useMemo(() => temas.find((t) => t.id === temaId) ?? temas[0], [temaId]);
  const estilo = useMemo(
    () => estilosCentroMesa.find((e) => e.id === estiloId) ?? estilosCentroMesa[0],
    [estiloId],
  );
  const { precioUnitario, precioTotal } = useMemo(
    () => calcularPrecioCentroMesa(tamanoId, estiloId, cantidadMesas),
    [tamanoId, estiloId, cantidadMesas],
  );

  async function guardarPlantilla() {
    setGuardando(true);
    const plantilla: PlantillaCentroMesa = {
      tema: tema.nombre,
      tamano_mesa: tamanoId,
      estilo: estilo.nombre,
      cantidad_mesas: cantidadMesas,
      precio_unitario: precioUnitario,
      precio_total: precioTotal,
    };

    if (supabase) {
      await supabase.from("plantillas_centros_mesa").insert(plantilla);
    } else {
      guardarLocal("plantillas_centros_mesa", plantilla);
    }

    setGuardando(false);
    toast.success("¡Tu centro de mesa quedó guardado! Te contactaremos para confirmarlo.");
  }

  return (
    <section id="centros-mesa" className="bg-dulce-crema px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-3xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
            Diseña tus centros de mesa 🌸
          </h2>
          <p className="mt-2 text-dulce-texto/70">Elige tamaño y estilo — mira el precio al instante</p>
        </div>

        <div className="mt-8 grid gap-6 rounded-3xl bg-white p-6 shadow-sm sm:p-8 md:grid-cols-2">
          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-dulce-texto">Tema</label>
              <Select value={temaId} onValueChange={setTemaId}>
                <SelectTrigger>
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
              <label className="mb-2 block text-sm font-bold text-dulce-texto">Tamaño de mesa</label>
              <Select value={tamanoId} onValueChange={(v) => setTamanoId(v as TamanoMesaOpcion["id"])}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tamanosMesa.map((t) => (
                    <SelectItem key={t.id} value={t.id}>
                      {t.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-dulce-texto">Estilo</label>
              <div className="grid grid-cols-2 gap-2">
                {estilosCentroMesa.map((e) => (
                  <button
                    key={e.id}
                    onClick={() => setEstiloId(e.id)}
                    className={`rounded-xl border-2 px-3 py-2 text-sm font-medium transition-colors ${
                      e.id === estiloId
                        ? "border-dulce-morado bg-dulce-morado/10 text-dulce-morado"
                        : "border-dulce-texto/10 text-dulce-texto hover:border-dulce-morado/40"
                    }`}
                  >
                    {e.emoji} {e.nombre}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-dulce-texto">Número de mesas</label>
              <Input
                type="number"
                min={1}
                value={cantidadMesas}
                onChange={(e) => setCantidadMesas(Math.max(1, Number(e.target.value) || 1))}
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-between rounded-2xl bg-dulce-crema p-6 text-center">
            <div>
              <div className="text-5xl">{estilo.emoji}</div>
              <div className="mt-2 font-heading text-lg font-bold text-dulce-texto">
                Centro de mesa {tema.nombre}
              </div>
              <p className="mt-1 text-sm text-dulce-texto/70">
                Estilo {estilo.nombre.toLowerCase()} · {tamanosMesa.find((t) => t.id === tamanoId)?.nombre}
              </p>
            </div>

            <div className="mt-6 w-full border-t border-dashed border-dulce-texto/20 pt-4">
              <div className="flex justify-between text-sm text-dulce-texto/70">
                <span>Precio por mesa</span>
                <span>{formatoMoneda(precioUnitario)}</span>
              </div>
              <div className="flex justify-between text-sm text-dulce-texto/70">
                <span>Mesas</span>
                <span>× {cantidadMesas}</span>
              </div>
              <div className="mt-2 flex justify-between text-xl font-extrabold text-dulce-morado">
                <span>Total estimado</span>
                <span>{formatoMoneda(precioTotal)}</span>
              </div>
            </div>

            <Button
              className="mt-4 w-full rounded-full bg-dulce-morado font-bold text-white hover:bg-dulce-morado/90"
              disabled={guardando}
              onClick={guardarPlantilla}
            >
              {guardando ? "Guardando..." : "Guardar este centro de mesa 🌸"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
