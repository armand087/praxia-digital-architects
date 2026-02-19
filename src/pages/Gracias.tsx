import { Link } from "react-router-dom";
import { CheckCircle2, CalendarDays, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Gracias() {
  return (
    <>
      <Navbar />
      <main className="bg-praxia-black min-h-screen flex items-center justify-center">
        <div className="container mx-auto max-w-2xl px-6 py-32 text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={36} className="text-emerald-400" />
          </div>

          <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-6">
            Solicitud recibida
          </span>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
            ¡Listo! Tu solicitud fue recibida.
          </h1>

          <p className="text-praxia-muted text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Un consultor de PRAXIA revisará tu información y se pondrá en contacto contigo en{" "}
            <span className="text-white font-semibold">menos de 24 horas hábiles</span> para agendar tu diagnóstico estratégico.
          </p>

          {/* Calendar placeholder */}
          <div className="bg-praxia-surface border border-praxia-border rounded-sm p-8 mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <CalendarDays size={22} className="text-praxia-blue-light" />
              <h2 className="text-white font-bold text-lg">Agenda tu llamada directamente</h2>
            </div>
            <p className="text-praxia-muted text-sm mb-6">
              Si prefieres agendar inmediatamente, puedes seleccionar un horario disponible:
            </p>
            {/* Calendly placeholder */}
            <div className="border border-dashed border-praxia-border rounded-sm h-40 flex items-center justify-center">
              <div className="text-center">
                <CalendarDays size={28} className="text-praxia-muted mx-auto mb-2" />
                <p className="text-praxia-muted text-sm">Aquí se integrará tu calendario de Calendly</p>
                <a
                  href="https://calendly.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-3 px-5 py-2 rounded-sm bg-gradient-blue text-white text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  Ir a Calendly →
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm border border-praxia-border text-white font-semibold hover:border-praxia-blue/60 transition-colors"
            >
              Volver al inicio
            </Link>
            <Link
              to="/servicios"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm bg-gradient-blue text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Ver nuestros servicios <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
