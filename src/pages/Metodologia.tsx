import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fases = [
  {
    num: "01",
    title: "Diagnóstico Estratégico",
    duration: "1–2 semanas",
    desc: "Analizamos tu operación actual con profundidad. Entrevistas con stakeholders clave, revisión de herramientas existentes, identificación de cuellos de botella y oportunidades de alto impacto.",
    entregables: [
      "Mapa de operación actual (AS-IS)",
      "Informe de brechas digitales",
      "Propuesta de arquitectura objetivo",
      "Estimado de impacto por área",
    ],
    color: "from-blue-900/20 to-transparent",
  },
  {
    num: "02",
    title: "Diseño de Arquitectura Digital",
    duration: "1–2 semanas",
    desc: "Con el diagnóstico en mano, diseñamos el sistema completo: qué herramientas, cómo se conectan entre sí, qué flujos automatizamos, qué medimos y cómo se verá la operación en 90 días.",
    entregables: [
      "Mapa de arquitectura digital (TO-BE)",
      "Stack tecnológico recomendado",
      "Plan de automatizaciones prioritarias",
      "Cronograma de implementación",
    ],
    color: "from-indigo-900/20 to-transparent",
  },
  {
    num: "03",
    title: "Implementación en Software Robusto",
    duration: "4–8 semanas",
    desc: "Configuramos e implementamos cada plataforma con flujos probados, datos migrados y documentación clara para tu equipo. Sin código propietario. Sin dependencia de nosotros para operar.",
    entregables: [
      "CRM / ERP configurado y funcional",
      "Automatizaciones activas",
      "Integraciones entre plataformas",
      "Manual operativo del sistema",
    ],
    color: "from-violet-900/20 to-transparent",
  },
  {
    num: "04",
    title: "Medición y Dashboards",
    duration: "1–2 semanas",
    desc: "Construimos los tableros de control con los KPIs que realmente importan para tu negocio. Tu operación, visible en tiempo real desde cualquier dispositivo y para cada nivel de tu organización.",
    entregables: [
      "Dashboard ejecutivo",
      "Dashboards por área (ventas, ops, finanzas)",
      "Alertas automáticas",
      "Definición de KPIs y metas",
    ],
    color: "from-cyan-900/20 to-transparent",
  },
  {
    num: "05",
    title: "Optimización Continua",
    duration: "Ongoing",
    desc: "Revisamos resultados mensualmente, ajustamos procesos y escalamos lo que funciona. El sistema evoluciona con tu empresa. No es un proyecto de una vez. Es una relación de crecimiento.",
    entregables: [
      "Revisión mensual de KPIs",
      "Ajustes y nuevas automatizaciones",
      "Capacitación continua del equipo",
      "Roadmap de evolución trimestral",
    ],
    color: "from-teal-900/20 to-transparent",
  },
];

export default function Metodologia() {
  return (
    <>
      <Navbar />
      <main className="bg-praxia-black min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-praxia-border relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="container mx-auto max-w-4xl px-6 text-center relative">
            <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-6">
              Metodología
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Un proceso probado.
              <br />
              <span className="text-gradient-blue">Resultados medibles.</span>
            </h1>
            <p className="text-praxia-muted text-lg max-w-2xl mx-auto">
              No improvisamos. Cada implementación sigue las mismas 5 fases que nos permiten entregar resultados consistentes en 30 a 90 días.
            </p>
          </div>
        </section>

        {/* Phases */}
        <section className="py-20">
          <div className="container mx-auto max-w-5xl px-6">
            <div className="flex flex-col gap-8">
              {fases.map((fase, i) => (
                <div
                  key={i}
                  className={`relative border border-praxia-border rounded-sm overflow-hidden bg-gradient-to-r ${fase.color} bg-praxia-surface`}
                >
                  <div className="p-8 md:p-10">
                    <div className="flex flex-col md:flex-row gap-8">
                      <div className="flex-shrink-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-praxia-blue text-sm">{fase.num}</span>
                          <span className="text-xs text-praxia-muted border border-praxia-border px-2 py-0.5 rounded-full">
                            {fase.duration}
                          </span>
                        </div>
                        <h2 className="text-2xl md:text-3xl font-black text-white w-full md:w-64">{fase.title}</h2>
                      </div>
                      <div className="flex-1">
                        <p className="text-praxia-muted leading-relaxed mb-6">{fase.desc}</p>
                        <div>
                          <p className="text-xs text-praxia-blue uppercase tracking-widest font-semibold mb-3">Entregables</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {fase.entregables.map((e, j) => (
                              <div key={j} className="flex items-center gap-2">
                                <CheckCircle2 size={14} className="text-praxia-blue-light flex-shrink-0" />
                                <span className="text-white text-sm">{e}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Phase number decoration */}
                  <div className="absolute top-4 right-6 text-8xl font-black text-white/3 select-none pointer-events-none">
                    {fase.num}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-praxia-border">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              ¿Listo para comenzar tu diagnóstico?
            </h2>
            <p className="text-praxia-muted mb-8">
              La primera fase es gratuita. En 30 minutos te decimos exactamente qué necesita tu empresa.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-gradient-blue text-white font-bold hover:opacity-90 transition-opacity glow-blue"
            >
              Agendar Diagnóstico Estratégico <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
