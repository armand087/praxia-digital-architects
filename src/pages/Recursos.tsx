import { Link } from "react-router-dom";
import { BookOpen, ArrowRight, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const proximamente = [
  { tag: "CRM", titulo: "Cómo estructurar tu pipeline de ventas en 5 pasos", tiempo: "8 min lectura" },
  { tag: "Automatización", titulo: "Las 10 automatizaciones que toda empresa B2B debería tener", tiempo: "12 min lectura" },
  { tag: "ERP", titulo: "¿Cuándo pasar de Excel a un ERP? La guía definitiva", tiempo: "10 min lectura" },
  { tag: "Dashboards", titulo: "Los 7 KPIs que todo director debería ver cada lunes", tiempo: "6 min lectura" },
  { tag: "IA", titulo: "IA aplicada a PyMES: por dónde empezar sin perder tiempo", tiempo: "9 min lectura" },
  { tag: "Estrategia", titulo: "Diagnóstico digital: cómo saber en qué fase está tu empresa", tiempo: "7 min lectura" },
];

export default function Recursos() {
  return (
    <>
      <Navbar />
      <main className="bg-praxia-black min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-praxia-border relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="container mx-auto max-w-4xl px-6 text-center relative">
            <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-6">
              Recursos
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
              Inteligencia aplicada al conocimiento.
            </h1>
            <p className="text-praxia-muted text-lg max-w-xl mx-auto">
              Artículos, guías y casos prácticos sobre transformación digital para empresas que quieren crecer con orden.
            </p>
          </div>
        </section>

        {/* Próximamente */}
        <section className="py-20">
          <div className="container mx-auto max-w-5xl px-6">
            {/* Empty state banner */}
            <div className="bg-praxia-surface border border-praxia-border rounded-sm p-8 text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-praxia-blue/10 border border-praxia-blue/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-praxia-blue-light" />
              </div>
              <h2 className="text-white font-bold text-xl mb-2">Contenido próximamente</h2>
              <p className="text-praxia-muted max-w-md mx-auto">
                Estamos preparando recursos de alto valor sobre implementación digital, automatización y estrategia. Sé el primero en recibirlos.
              </p>
              <Link
                to="/contacto"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-sm bg-gradient-blue text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Notificarme cuando esté listo <ArrowRight size={14} />
              </Link>
            </div>

            {/* Preview cards */}
            <div>
              <p className="text-praxia-muted text-sm uppercase tracking-widest mb-6">Artículos en preparación</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {proximamente.map((art, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-5 border border-praxia-border rounded-sm bg-praxia-surface opacity-50 cursor-not-allowed"
                  >
                    <span className="px-2 py-0.5 border border-praxia-blue/30 rounded text-xs text-praxia-blue flex-shrink-0">
                      {art.tag}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium leading-snug">{art.titulo}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Clock size={12} className="text-praxia-muted" />
                        <span className="text-praxia-muted text-xs">{art.tiempo}</span>
                      </div>
                    </div>
                    <span className="text-xs text-praxia-muted border border-praxia-border px-2 py-0.5 rounded flex-shrink-0">
                      Próximamente
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
