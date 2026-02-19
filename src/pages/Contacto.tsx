import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Phone, Mail, Building2, User, ChevronDown } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  nombre: z.string().min(2, "Por favor ingresa tu nombre completo"),
  empresa: z.string().min(2, "Ingresa el nombre de tu empresa"),
  telefono: z.string().min(10, "Ingresa un número de teléfono válido"),
  correo: z.string().email("Ingresa un correo electrónico válido"),
  facturacion: z.string().min(1, "Selecciona tu rango de facturación"),
  problema: z.string().min(20, "Describe brevemente tu principal problema (mínimo 20 caracteres)"),
});

type FormData = z.infer<typeof schema>;

const facturacionOpciones = [
  { value: "", label: "Selecciona tu rango aproximado" },
  { value: "menos-50k", label: "Menos de $50,000 MXN/mes" },
  { value: "50k-150k", label: "$50,000 – $150,000 MXN/mes" },
  { value: "150k-500k", label: "$150,000 – $500,000 MXN/mes" },
  { value: "500k-1m", label: "$500,000 – $1,000,000 MXN/mes" },
  { value: "mas-1m", label: "Más de $1,000,000 MXN/mes" },
];

export default function Contacto() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate async submission
    await new Promise((r) => setTimeout(r, 1200));
    console.log("Lead captured:", data);
    toast({ title: "¡Solicitud enviada!", description: "Te contactaremos en menos de 24 horas." });
    setIsSubmitting(false);
    navigate("/gracias");
  };

  return (
    <>
      <Navbar />
      <main className="bg-praxia-black min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-16 border-b border-praxia-border relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="container mx-auto max-w-4xl px-6 text-center relative">
            <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-6">
              Diagnóstico gratuito
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Hablemos de tu empresa</h1>
            <p className="text-praxia-muted text-lg max-w-xl mx-auto">
              Completa el formulario. En menos de 24 horas agendamos un diagnóstico estratégico de 30 minutos.
            </p>
          </div>
        </section>

        {/* Form */}
        <section className="py-20">
          <div className="container mx-auto max-w-2xl px-6">
            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-6">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <User size={14} className="inline mr-2 text-praxia-muted" />
                  Nombre completo
                </label>
                <input
                  {...register("nombre")}
                  placeholder="Tu nombre"
                  className="w-full bg-praxia-surface border border-praxia-border rounded-sm px-4 py-3 text-white placeholder:text-praxia-muted focus:outline-none focus:border-praxia-blue transition-colors"
                />
                {errors.nombre && <p className="mt-1 text-sm text-red-400">{errors.nombre.message}</p>}
              </div>

              {/* Empresa */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  <Building2 size={14} className="inline mr-2 text-praxia-muted" />
                  Empresa
                </label>
                <input
                  {...register("empresa")}
                  placeholder="Nombre de tu empresa"
                  className="w-full bg-praxia-surface border border-praxia-border rounded-sm px-4 py-3 text-white placeholder:text-praxia-muted focus:outline-none focus:border-praxia-blue transition-colors"
                />
                {errors.empresa && <p className="mt-1 text-sm text-red-400">{errors.empresa.message}</p>}
              </div>

              {/* Teléfono + Correo */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Phone size={14} className="inline mr-2 text-praxia-muted" />
                    Teléfono
                  </label>
                  <input
                    {...register("telefono")}
                    type="tel"
                    placeholder="+52 55 0000 0000"
                    className="w-full bg-praxia-surface border border-praxia-border rounded-sm px-4 py-3 text-white placeholder:text-praxia-muted focus:outline-none focus:border-praxia-blue transition-colors"
                  />
                  {errors.telefono && <p className="mt-1 text-sm text-red-400">{errors.telefono.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white mb-2">
                    <Mail size={14} className="inline mr-2 text-praxia-muted" />
                    Correo electrónico
                  </label>
                  <input
                    {...register("correo")}
                    type="email"
                    placeholder="tu@empresa.com"
                    className="w-full bg-praxia-surface border border-praxia-border rounded-sm px-4 py-3 text-white placeholder:text-praxia-muted focus:outline-none focus:border-praxia-blue transition-colors"
                  />
                  {errors.correo && <p className="mt-1 text-sm text-red-400">{errors.correo.message}</p>}
                </div>
              </div>

              {/* Facturación */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Nivel aproximado de facturación mensual
                </label>
                <div className="relative">
                  <select
                    {...register("facturacion")}
                    className="w-full appearance-none bg-praxia-surface border border-praxia-border rounded-sm px-4 py-3 text-white focus:outline-none focus:border-praxia-blue transition-colors"
                  >
                    {facturacionOpciones.map((opt) => (
                      <option key={opt.value} value={opt.value} disabled={opt.value === ""} className="bg-praxia-dark">
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-praxia-muted pointer-events-none" />
                </div>
                {errors.facturacion && <p className="mt-1 text-sm text-red-400">{errors.facturacion.message}</p>}
              </div>

              {/* Problema */}
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Principal problema actual
                </label>
                <textarea
                  {...register("problema")}
                  rows={5}
                  placeholder="Describe brevemente el mayor dolor operativo o comercial que enfrenta tu empresa hoy..."
                  className="w-full bg-praxia-surface border border-praxia-border rounded-sm px-4 py-3 text-white placeholder:text-praxia-muted focus:outline-none focus:border-praxia-blue transition-colors resize-none"
                />
                {errors.problema && <p className="mt-1 text-sm text-red-400">{errors.problema.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-sm bg-gradient-blue text-white font-bold text-base hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed glow-blue"
              >
                {isSubmitting ? "Enviando..." : "Solicitar Diagnóstico Gratuito →"}
              </button>

              <p className="text-center text-xs text-praxia-muted">
                Tu información es confidencial y no será compartida con terceros.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
