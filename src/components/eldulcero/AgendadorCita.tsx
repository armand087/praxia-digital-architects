import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/integrations/eldulcero/client";
import type { Cita } from "@/integrations/eldulcero/types";
import { guardarLocal } from "@/lib/eldulcero/almacenLocal";
import { construirLinkWhatsApp } from "@/lib/eldulcero/whatsapp";
import { temas } from "@/data/eldulcero/temas";
import { useScrollReveal } from "@/lib/eldulcero/useScrollReveal";
import { MessageCircle, PartyPopper } from "lucide-react";

const horarios = ["10:00 AM", "12:00 PM", "2:00 PM", "4:00 PM", "6:00 PM"];

const esquemaCita = z.object({
  nombre: z.string().min(2, "Escribe tu nombre"),
  telefono: z.string().min(8, "Escribe un teléfono válido"),
  email: z.string().email("Correo inválido").optional().or(z.literal("")),
  fecha_preferida: z.string().min(1, "Elige una fecha"),
  horario_preferido: z.string().min(1, "Elige un horario"),
  tema_interes: z.string().optional(),
  numero_invitados: z.coerce.number().int().positive().optional(),
  mensaje: z.string().optional(),
});

type FormValues = z.infer<typeof esquemaCita>;

export default function AgendadorCita() {
  const ref = useScrollReveal<HTMLDivElement>();
  const [confirmada, setConfirmada] = useState<FormValues | null>(null);
  const [enviando, setEnviando] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(esquemaCita),
    defaultValues: {
      nombre: "",
      telefono: "",
      email: "",
      fecha_preferida: "",
      horario_preferido: "",
      tema_interes: "",
      mensaje: "",
    },
  });

  async function onSubmit(valores: FormValues) {
    setEnviando(true);
    const cita: Cita = {
      nombre: valores.nombre,
      telefono: valores.telefono,
      email: valores.email || null,
      fecha_preferida: valores.fecha_preferida,
      horario_preferido: valores.horario_preferido,
      tema_interes: valores.tema_interes || null,
      numero_invitados: valores.numero_invitados ?? null,
      mensaje: valores.mensaje || null,
    };

    if (supabase) {
      await supabase.from("citas").insert(cita);
    } else {
      guardarLocal("citas", cita);
    }

    setEnviando(false);
    setConfirmada(valores);
  }

  const mensajeWhatsApp = construirLinkWhatsApp(
    `¡Hola! Quiero agendar una cita de cotización para una fiesta ${
      confirmada?.tema_interes ? `de ${confirmada.tema_interes}` : ""
    } el ${confirmada?.fecha_preferida ?? ""} a las ${confirmada?.horario_preferido ?? ""}.`,
  );

  return (
    <section id="cita" className="bg-dulce-crema px-4 py-16">
      <div ref={ref} className="fade-in-up mx-auto max-w-xl">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-extrabold text-dulce-texto sm:text-4xl">
            Agenda tu cita de cotización 📝
          </h2>
          <p className="mt-2 text-dulce-texto/70">
            Cuéntanos de tu fiesta y te contactamos para armar tu cotización
          </p>
        </div>

        {confirmada ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-sm">
            <PartyPopper className="mx-auto h-12 w-12 text-dulce-rosa" />
            <h3 className="mt-3 font-heading text-xl font-bold text-dulce-texto">
              ¡Listo, {confirmada.nombre}! 🎉
            </h3>
            <p className="mt-2 text-sm text-dulce-texto/70">
              Recibimos tu solicitud para el {confirmada.fecha_preferida} a las{" "}
              {confirmada.horario_preferido}. Te contactaremos al {confirmada.telefono} para confirmar.
            </p>
            <Button
              asChild
              className="mt-5 w-full rounded-full bg-[#25D366] font-bold text-white hover:bg-[#25D366]/90"
            >
              <a href={mensajeWhatsApp} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-4 w-4" /> Confirmar también por WhatsApp
              </a>
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mt-8 space-y-4 rounded-3xl bg-white p-6 shadow-sm sm:p-8"
            >
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tu nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Ej. Andrea Ramírez" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="telefono"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Teléfono / WhatsApp</FormLabel>
                      <FormControl>
                        <Input placeholder="871 123 4567" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Correo (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="tu@correo.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="fecha_preferida"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Fecha preferida</FormLabel>
                      <FormControl>
                        <Input type="date" min={new Date().toISOString().slice(0, 10)} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="horario_preferido"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horario</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Elige un horario" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {horarios.map((h) => (
                            <SelectItem key={h} value={h}>
                              {h}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={form.control}
                  name="tema_interes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tema de interés</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Elige un tema" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {temas.map((t) => (
                            <SelectItem key={t.id} value={t.nombre}>
                              {t.emoji} {t.nombre}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="numero_invitados"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número de invitados</FormLabel>
                      <FormControl>
                        <Input type="number" min={1} placeholder="Ej. 20" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="mensaje"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuéntanos más (opcional)</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Detalles, ideas o preguntas..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                disabled={enviando}
                className="w-full rounded-full bg-dulce-rosa text-base font-bold text-white hover:bg-dulce-rosa/90"
              >
                {enviando ? "Enviando..." : "Agendar mi cita 🎉"}
              </Button>

              <Button
                asChild
                type="button"
                variant="outline"
                className="w-full rounded-full border-2 border-[#25D366] font-bold text-[#25D366] hover:bg-[#25D366]/10"
              >
                <a
                  href={construirLinkWhatsApp("¡Hola! Quiero cotizar una fiesta infantil 🎉")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Prefiero escribir por WhatsApp
                </a>
              </Button>
            </form>
          </Form>
        )}
      </div>
    </section>
  );
}
