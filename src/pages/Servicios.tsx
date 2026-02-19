import { Link } from "react-router-dom";
import { ArrowRight, Users, Zap, Database, LayoutDashboard, BarChart3, CheckCircle2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const servicios = [
  {
    id: "crm",
    icon: Users,
    title: "Implementación de CRM",
    tagline: "Tu proceso comercial, en piloto automático.",
    desc: "Configuramos tu CRM desde cero con pipelines adaptados a tu ciclo de venta, automatizaciones de seguimiento, plantillas de comunicación y panel de reportes. No solo instalamos el software — construimos el proceso completo sobre él.",
    resultado: "Pipeline comercial visible, seguimiento automático a cada prospecto y cierre de ventas medible con métricas claras.",
    empresa: "Empresas con equipo comercial de 3 o más personas que operan sin CRM o con uno mal configurado.",
    incluye: [
      "Configuración completa de CRM",
      "Diseño de pipeline(s) de ventas",
      "Automatizaciones de seguimiento",
      "Integración con correo y WhatsApp",
      "Capacitación del equipo comercial",
      "Reportes y dashboards de ventas",
    ],
    plataformas: ["HubSpot", "Pipedrive", "Zoho CRM"],
  },
  {
    id: "automatizacion",
    icon: Zap,
    title: "Automatización Comercial",
    tagline: "Responde antes que tu competencia.",
    desc: "Automatizamos seguimientos, notificaciones internas, asignación de leads por criterios, flujos de nurturing y comunicación multicanal. Tu equipo se enfoca en cerrar; el sistema se encarga del resto.",
    resultado: "Reducción drástica de tareas manuales, respuesta inmediata a prospectos y cero leads perdidos por falta de seguimiento.",
    empresa: "Negocios con alto volumen de leads que se pierden por falta de seguimiento o por procesos manuales lentos.",
    incluye: [
      "Mapeo de flujos actuales",
      "Diseño de automatizaciones",
      "Integración entre plataformas",
      "Secuencias de email y WhatsApp",
      "Notificaciones internas automáticas",
      "Monitoreo y ajuste de flujos",
    ],
    plataformas: ["Make", "Zapier", "n8n", "ActiveCampaign"],
  },
  {
    id: "erp",
    icon: Database,
    title: "ERP y Control Administrativo",
    tagline: "Visibilidad total de tu operación.",
    desc: "Implementamos sistemas de gestión administrativa, financiera y operativa completamente integrados. Facturación, inventarios, proyectos, nómina y compras centralizados en un solo sistema que habla con tu CRM.",
    resultado: "Visibilidad total de la operación en tiempo real y reducción significativa de errores administrativos y pérdidas por información dispersa.",
    empresa: "Empresas en crecimiento que operan con hojas de cálculo o sistemas desconectados que no escalan.",
    incluye: [
      "Evaluación y selección de ERP",
      "Configuración e implementación",
      "Migración de datos históricos",
      "Integración con CRM y facturación",
      "Capacitación operativa",
      "Soporte post-implementación",
    ],
    plataformas: ["Odoo", "Monday.com", "Notion", "SAP B1"],
  },
  {
    id: "dashboards",
    icon: LayoutDashboard,
    title: "Dashboards Ejecutivos",
    tagline: "Tu empresa, visible en tiempo real.",
    desc: "Construimos tableros de control personalizados con los KPIs que realmente importan para cada nivel de tu organización. Dirección, gerencia y operaciones — todos con la información que necesitan, cuando la necesitan.",
    resultado: "Decisiones basadas en datos reales, no suposiciones. Visibilidad en tiempo real desde cualquier dispositivo.",
    empresa: "Dirección y gerencia que toman decisiones importantes sin datos o con datos desactualizados.",
    incluye: [
      "Definición de KPIs estratégicos",
      "Diseño de arquitectura de datos",
      "Dashboard ejecutivo principal",
      "Dashboards por área",
      "Alertas y notificaciones automáticas",
      "Capacitación en lectura de métricas",
    ],
    plataformas: ["Looker Studio", "Power BI", "Metabase", "Tableau"],
  },
  {
    id: "ia",
    icon: BarChart3,
    title: "Arquitectura Digital con IA",
    tagline: "El siguiente nivel, sin ciencia ficción.",
    desc: "Integramos inteligencia artificial en flujos operativos existentes: clasificación automática de leads, predicción de churn, asistentes de atención al cliente, análisis de documentos y automatización de tareas cognitivas.",
    resultado: "Eficiencia operativa con tecnología de vanguardia, adaptada a tu contexto real. No teoría — implementación funcional.",
    empresa: "Empresas con datos organizados y operación estable que buscan el diferencial competitivo del siguiente nivel.",
    incluye: [
      "Auditoría de datos disponibles",
      "Identificación de casos de uso de IA",
      "Implementación de flujos con IA",
      "Integración con sistemas existentes",
      "Capacitación del equipo",
      "Monitoreo y mejora continua",
    ],
    plataformas: ["OpenAI", "Anthropic", "Make + AI", "LangChain"],
  },
];

export default function Servicios() {
  return (
    <>
      <Navbar />
      <main className="bg-praxia-black min-h-screen">
        {/* Hero */}
        <section className="pt-32 pb-20 border-b border-praxia-border relative overflow-hidden">
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="container mx-auto max-w-4xl px-6 text-center relative">
            <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-6">
              Servicios
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
              Implementamos.
              <br />
              <span className="text-gradient-blue">No solo recomendamos.</span>
            </h1>
            <p className="text-praxia-muted text-lg max-w-2xl mx-auto">
              Cinco servicios de transformación digital diseñados para resolver problemas concretos con resultados medibles.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-20">
          <div className="container mx-auto max-w-5xl px-6 flex flex-col gap-16">
            {servicios.map(({ id, icon: Icon, title, tagline, desc, resultado, empresa, incluye, plataformas }, i) => (
              <div key={id} id={id} className="border border-praxia-border rounded-sm overflow-hidden">
                {/* Header */}
                <div className="bg-praxia-surface p-8 border-b border-praxia-border">
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-sm bg-praxia-blue/15 border border-praxia-blue/25 flex items-center justify-center flex-shrink-0">
                      <Icon size={22} className="text-praxia-blue-light" />
                    </div>
                    <div>
                      <p className="text-praxia-muted text-xs tracking-widest uppercase mb-1">Servicio {String(i + 1).padStart(2, "0")}</p>
                      <h2 className="text-2xl md:text-3xl font-black text-white">{title}</h2>
                      <p className="text-praxia-blue-light font-medium mt-1">{tagline}</p>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-praxia-dark p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <p className="text-praxia-muted leading-relaxed mb-6">{desc}</p>
                      <div className="space-y-4">
                        <div className="bg-praxia-surface border border-praxia-border rounded-sm p-4">
                          <p className="text-xs text-praxia-blue uppercase tracking-widest font-semibold mb-2">Resultado esperado</p>
                          <p className="text-white text-sm">{resultado}</p>
                        </div>
                        <div className="bg-praxia-surface border border-praxia-border rounded-sm p-4">
                          <p className="text-xs text-praxia-muted uppercase tracking-widest font-semibold mb-2">Empresa ideal</p>
                          <p className="text-praxia-muted text-sm">{empresa}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="mb-6">
                        <p className="text-xs text-white uppercase tracking-widest font-semibold mb-3">Incluye</p>
                        <div className="flex flex-col gap-2">
                          {incluye.map((item, j) => (
                            <div key={j} className="flex items-center gap-2">
                              <CheckCircle2 size={14} className="text-praxia-blue-light flex-shrink-0" />
                              <span className="text-white text-sm">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-praxia-muted uppercase tracking-widest font-semibold mb-2">Plataformas</p>
                        <div className="flex flex-wrap gap-2">
                          {plataformas.map((p) => (
                            <span key={p} className="px-3 py-1 border border-praxia-border rounded-full text-xs text-white bg-praxia-surface">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-praxia-border">
                    <Link
                      to="/contacto"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-sm bg-gradient-blue text-white font-semibold text-sm hover:opacity-90 transition-opacity"
                    >
                      Cotizar este servicio <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 border-t border-praxia-border">
          <div className="container mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-black text-white mb-4">¿No sabes por dónde empezar?</h2>
            <p className="text-praxia-muted mb-8">
              En el diagnóstico estratégico te decimos exactamente qué servicio necesitas y en qué orden.
            </p>
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-sm bg-gradient-blue text-white font-bold hover:opacity-90 transition-opacity glow-blue"
            >
              Solicitar Diagnóstico Gratuito <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
