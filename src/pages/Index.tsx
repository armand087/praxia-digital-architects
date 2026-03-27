import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronRight,
  BarChart3,
  Zap,
  Database,
  GitBranch,
  LayoutDashboard,
  Users,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Target,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ROICalculator from "@/components/ROICalculator";
import heroBg from "@/assets/hero-bg.jpg";
import problemaBg from "@/assets/problema-bg.jpg";
import dashboardPreview from "@/assets/dashboard-preview.jpg";
import teamStrategy from "@/assets/team-strategy.jpg";
import architectureBg from "@/assets/architecture-bg.jpg";

// ─── Scroll reveal hook ───────────────────────────────────────────────────────
function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add("visible"); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const painPoints = [
  "CRM desconectado.",
  "Procesos manuales.",
  "Información dispersa.",
  "Falta de métricas reales.",
  "Dependencia del 'talento' en lugar del sistema.",
];

const solutions = [
  { icon: Users, label: "CRM estructurado con seguimiento automatizado" },
  { icon: Database, label: "ERP para control administrativo y financiero" },
  { icon: Zap, label: "Automatizaciones comerciales" },
  { icon: GitBranch, label: "Integraciones entre plataformas" },
  { icon: LayoutDashboard, label: "Dashboards ejecutivos en tiempo real" },
  { icon: CheckCircle2, label: "Implementación con acompañamiento" },
];

const metodologia = [
  { num: "01", title: "Diagnóstico Estratégico", desc: "Analizamos tu operación actual, identificamos cuellos de botella y oportunidades de mejora con datos reales." },
  { num: "02", title: "Diseño de Arquitectura Digital", desc: "Diseñamos el sistema completo: qué herramientas, cómo se conectan, qué automatizamos y qué medimos." },
  { num: "03", title: "Implementación en Software Robusto", desc: "Configuramos e implementamos cada plataforma con flujos probados y documentación para tu equipo." },
  { num: "04", title: "Medición y Dashboards", desc: "Construimos los indicadores que importan. Tu operación, visible en tiempo real desde cualquier dispositivo." },
  { num: "05", title: "Optimización Continua", desc: "Revisamos resultados, ajustamos procesos y escalamos lo que funciona. Sin estancamiento." },
];

const servicios = [
  {
    title: "Implementación de CRM",
    icon: Users,
    desc: "Configuramos tu CRM desde cero con pipelines, automatizaciones y seguimiento de prospectos.",
    resultado: "Pipeline comercial visible, seguimiento automático y cierre de ventas medible.",
    empresa: "Empresas con equipo comercial de 3+ personas sin CRM o con CRM mal configurado.",
  },
  {
    title: "Automatización Comercial",
    icon: Zap,
    desc: "Automatizamos seguimientos, notificaciones, asignación de leads y flujos de comunicación.",
    resultado: "Reducción de tareas manuales y respuesta inmediata a prospectos.",
    empresa: "Negocios con alto volumen de leads que se pierden por falta de seguimiento.",
  },
  {
    title: "ERP y Control Administrativo",
    icon: Database,
    desc: "Implementamos sistemas de gestión administrativa, financiera y operativa integrados.",
    resultado: "Visibilidad total de la operación y reducción de errores administrativos.",
    empresa: "Empresas en crecimiento que operan con hojas de cálculo o sistemas desconectados.",
  },
  {
    title: "Dashboards Ejecutivos",
    icon: LayoutDashboard,
    desc: "Construimos tableros de control con los KPIs que realmente importan para tu negocio.",
    resultado: "Decisiones basadas en datos, no en suposiciones.",
    empresa: "Dirección y gerencia que necesita visibilidad clara de la operación.",
  },
  {
    title: "Arquitectura Digital con IA",
    icon: BarChart3,
    desc: "Integramos inteligencia artificial en flujos operativos: clasificación, predicción y asistencia automática.",
    resultado: "Eficiencia operativa con tecnología de vanguardia adaptada a tu contexto.",
    empresa: "Empresas listas para el siguiente nivel con datos organizados y operación estable.",
  },
];

// Demo dashboard data
const revenueData = [
  { mes: "Ene", antes: 320, despues: 420 },
  { mes: "Feb", antes: 310, despues: 480 },
  { mes: "Mar", antes: 295, despues: 510 },
  { mes: "Abr", antes: 330, despues: 580 },
  { mes: "May", antes: 340, despues: 640 },
  { mes: "Jun", antes: 350, despues: 720 },
];

const leadsData = [
  { mes: "Ene", leads: 42, cerrados: 8 },
  { mes: "Feb", leads: 58, cerrados: 14 },
  { mes: "Mar", leads: 71, cerrados: 22 },
  { mes: "Abr", leads: 89, cerrados: 31 },
  { mes: "May", leads: 104, cerrados: 41 },
  { mes: "Jun", leads: 127, cerrados: 58 },
];

const kpiCards = [
  { label: "Conversión de leads", before: "8.2%", after: "24.7%", icon: Target, up: true },
  { label: "Tiempo de respuesta", before: "48 hrs", after: "2.3 hrs", icon: Activity, up: false },
  { label: "Ingresos mensuales", before: "$320K", after: "$720K MXN", icon: TrendingUp, up: true },
];

const sectores = ["Servicios B2B", "Distribuidoras", "Inmobiliarias", "Consultoras", "Agencias", "Manufactura"];


// ─── Dashboard Demo ───────────────────────────────────────────────────────────
function DashboardDemo() {
  const ref = useScrollReveal();
  return (
    <section className="py-24 bg-praxia-dark relative overflow-hidden">
      {/* Dashboard background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
        style={{ backgroundImage: `url(${dashboardPreview})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-praxia-dark/95 via-praxia-dark/80 to-praxia-dark" />
      <div className="container mx-auto max-w-7xl px-6 fade-in-up relative" ref={ref}>
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-4">
            Demo — Vista de cliente
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Así ve tu empresa después de implementar
          </h2>
          <p className="text-praxia-muted max-w-xl mx-auto">
            Un dashboard ejecutivo real con los KPIs que importan. Esto es lo que construimos para ti.
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {kpiCards.map((kpi) => (
            <div key={kpi.label} className="bg-praxia-surface/80 backdrop-blur-sm border border-praxia-border rounded-sm p-5 hover:border-praxia-blue/40 transition-all duration-300 hover:-translate-y-0.5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-praxia-muted uppercase tracking-widest">{kpi.label}</span>
                <kpi.icon size={16} className="text-praxia-muted" />
              </div>
              <div className="flex items-end gap-3">
                <div>
                  <p className="text-xs text-praxia-muted mb-0.5">Antes</p>
                  <p className="text-lg font-semibold text-foreground line-through opacity-50">{kpi.before}</p>
                </div>
                <div>
                  <p className="text-xs text-praxia-muted mb-0.5">Después</p>
                  <p className={`text-2xl font-black ${kpi.up ? "text-emerald-400" : "text-praxia-blue-light"}`}>{kpi.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-praxia-surface/80 backdrop-blur-sm border border-praxia-border rounded-sm p-6">
            <p className="text-foreground font-semibold mb-1">Ingresos Mensuales (MXN)</p>
            <p className="text-xs text-praxia-muted mb-4">Comparativo antes vs después de implementación</p>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorAntes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(220 15% 45%)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(220 15% 45%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDespues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(214 89% 52%)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="hsl(214 89% 52%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--praxia-border))" />
                <XAxis dataKey="mes" tick={{ fill: "hsl(var(--praxia-text-muted))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--praxia-text-muted))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--praxia-surface))", border: "1px solid hsl(var(--praxia-border))", borderRadius: 4, color: "hsl(var(--foreground))" }} />
                <Area type="monotone" dataKey="antes" stroke="hsl(220 15% 45%)" fill="url(#colorAntes)" name="Antes" />
                <Area type="monotone" dataKey="despues" stroke="hsl(214 89% 52%)" fill="url(#colorDespues)" name="Después" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-praxia-surface/80 backdrop-blur-sm border border-praxia-border rounded-sm p-6">
            <p className="text-foreground font-semibold mb-1">Pipeline Comercial</p>
            <p className="text-xs text-praxia-muted mb-4">Leads generados vs cerrados por mes</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={leadsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--praxia-border))" />
                <XAxis dataKey="mes" tick={{ fill: "hsl(var(--praxia-text-muted))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "hsl(var(--praxia-text-muted))", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--praxia-surface))", border: "1px solid hsl(var(--praxia-border))", borderRadius: 4, color: "hsl(var(--foreground))" }} />
                <Bar dataKey="leads" fill="hsl(220 15% 35%)" name="Leads" radius={[2, 2, 0, 0]} />
                <Bar dataKey="cerrados" fill="hsl(214 89% 52%)" name="Cerrados" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <p className="text-center text-xs text-praxia-muted mt-6 border border-praxia-border rounded-sm py-2 px-4 inline-block mx-auto block">
          * Datos de demostración. Resultados reales varían según industria y punto de partida.
        </p>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Index() {
  const problemaRef = useScrollReveal();
  const solucionRef = useScrollReveal();
  const metodoRef = useScrollReveal();
  const serviciosRef = useScrollReveal();
  const difRef = useScrollReveal();
  const casosRef = useScrollReveal();

  return (
    <>
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-praxia-black">
        {/* Background image with overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, hsl(var(--praxia-black) / 0.8), hsl(var(--praxia-black) / 0.7), hsl(var(--praxia-black)))" }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 grid-overlay opacity-40" />
        {/* Scan line */}
        <div className="scan-line" />
        {/* Gradient blobs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-praxia-blue/15 blur-3xl pointer-events-none float" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-praxia-blue-light/10 blur-3xl pointer-events-none" style={{ animationDelay: "3s" }} />

        <div className="relative container mx-auto max-w-5xl px-6 text-center pt-24 pb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-praxia-border bg-praxia-surface/60 backdrop-blur-sm text-xs text-praxia-muted tracking-widest uppercase mb-8 stagger-child">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-blue" />
            Diagnóstico gratuito disponible
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight mb-6 tracking-tight stagger-child">
            <span className="text-foreground">Transformamos tu negocio</span>
            <br />
            <span className="shimmer-text">en un sistema digital</span>
            <br />
            <span className="text-foreground">medible y escalable</span>
          </h1>

          <p className="text-lg md:text-xl text-praxia-muted max-w-2xl mx-auto mb-10 leading-relaxed stagger-child">
            Estrategia, automatización y tecnología aplicada para empresas que quieren operar con orden y crecer con datos.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center stagger-child">
            <Link
              to="/contacto"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-gradient-blue text-white font-bold text-base hover:opacity-90 hover:scale-105 transition-all glow-blue"
            >
              Agendar Diagnóstico Estratégico <ArrowRight size={18} />
            </Link>
            <Link
              to="/metodologia"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm border border-praxia-border bg-praxia-surface/40 backdrop-blur-sm text-foreground font-semibold text-base hover:border-praxia-blue/60 hover:bg-praxia-surface/60 transition-all"
            >
              Ver Cómo Trabajamos <ChevronRight size={18} />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-praxia-border/50 flex flex-wrap justify-center gap-8 text-praxia-muted text-sm stagger-child">
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-praxia-blue-light" /> Sin dependencia tecnológica</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-praxia-blue-light" /> Implementación en 30–90 días</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={14} className="text-praxia-blue-light" /> Software de alto soporte</div>
          </div>
        </div>
      </section>

      {/* ── PROBLEMA ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-praxia-dark relative overflow-hidden">
        {/* Imagen de fondo: escritorio caótico */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${problemaBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-praxia-dark via-praxia-dark/80 to-praxia-dark" />
        <div className="absolute inset-0 dot-grid opacity-30" />
        <div className="container mx-auto max-w-5xl px-6 relative fade-in-up" ref={problemaRef}>
          <div>
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full border border-red-900/40 text-xs text-red-400 tracking-widest uppercase mb-6">
                El problema real
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6">
                La mayoría de las empresas no tiene un sistema, tiene parches.
              </h2>
            </div>

            <div className="grid gap-3 max-w-2xl mx-auto mb-12">
              {painPoints.map((point, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 border border-red-900/30 bg-red-950/10 rounded-sm hover:border-red-700/50 hover:bg-red-950/20 transition-all duration-300 group"
                >
                  <AlertTriangle size={18} className="text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-foreground font-semibold text-lg">{point}</span>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-2xl md:text-3xl font-black text-foreground">
                Eso no es crecimiento.{" "}
                <span className="text-red-400">Es improvisación.</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SOLUCIÓN ──────────────────────────────────────────────────────── */}
      <section className="py-24 bg-praxia-black relative overflow-hidden">
        {/* Team image side panel */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
            style={{ backgroundImage: `url(${teamStrategy})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-praxia-black via-praxia-black/60 to-transparent" />
        </div>
        <div className="container mx-auto max-w-7xl px-6 fade-in-up relative" ref={solucionRef}>
          <div>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-4">
                Nuestra propuesta
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
                Diseñamos e implementamos sistemas reales.
              </h2>
              <p className="text-praxia-muted max-w-xl mx-auto">
                No consultamos. No recomendamos. Implementamos. Y medimos cada paso.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {solutions.map(({ icon: Icon, label }, i) => (
                <div
                  key={i}
                  className="group flex items-center gap-4 p-5 border border-praxia-border bg-praxia-surface rounded-sm hover:border-praxia-blue/50 hover:bg-praxia-surface-2 hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-sm bg-praxia-blue/10 border border-praxia-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-praxia-blue/20 group-hover:scale-110 transition-all">
                    <Icon size={18} className="text-praxia-blue-light" />
                  </div>
                  <span className="text-foreground font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── METODOLOGÍA ───────────────────────────────────────────────────── */}
      <section className="py-24 bg-praxia-dark relative overflow-hidden">
        {/* Architecture background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${architectureBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-praxia-dark/90 to-praxia-dark" />
        <div className="container mx-auto max-w-5xl px-6 fade-in-up relative" ref={metodoRef}>
          <div>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-4">
                Proceso
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Nuestro Método</h2>
              <p className="text-praxia-muted max-w-xl mx-auto">
                Un proceso probado en 5 fases que transforma tu operación en un sistema medible.
              </p>
            </div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-praxia-blue via-praxia-blue/30 to-transparent" />

              <div className="flex flex-col gap-8">
                {metodologia.map((fase, i) => (
                  <div key={i} className="flex gap-8 md:gap-12 items-start group">
                    <div className="flex-shrink-0 w-16 md:w-24 flex flex-col items-center">
                      <div className="w-8 h-8 rounded-full border-2 border-praxia-blue bg-praxia-black flex items-center justify-center z-10 group-hover:bg-praxia-blue/20 group-hover:scale-110 transition-all">
                        <span className="text-praxia-blue text-xs font-black">{i + 1}</span>
                      </div>
                    </div>
                    <div className="flex-1 pb-8 border-b border-praxia-border/30 group-hover:border-praxia-blue/20 transition-colors">
                      <span className="text-praxia-blue text-xs font-mono mb-1 block">{fase.num}</span>
                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-praxia-blue-light transition-colors">{fase.title}</h3>
                      <p className="text-praxia-muted leading-relaxed">{fase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-12 text-center">
              <Link
                to="/metodologia"
                className="inline-flex items-center gap-2 text-praxia-blue-light font-semibold hover:gap-3 transition-all"
              >
                Ver metodología completa <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ROI CALCULATOR ────────────────────────────────────────────────── */}
      <ROICalculator />

      {/* ── SERVICIOS ─────────────────────────────────────────────────────── */}
      <section className="py-24 bg-praxia-black">
        <div className="container mx-auto max-w-7xl px-6 fade-in-up" ref={serviciosRef}>
          <div>
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-4">
                Servicios
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Lo que implementamos</h2>
              <p className="text-praxia-muted max-w-xl mx-auto">
                Cada servicio está diseñado para resolver un problema concreto con resultados medibles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {servicios.map(({ title, icon: Icon, desc, resultado, empresa }, i) => (
                <div
                  key={i}
                  className="group flex flex-col border border-praxia-border bg-praxia-surface rounded-sm p-6 hover:border-praxia-blue/40 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="w-10 h-10 rounded-sm bg-praxia-blue/10 border border-praxia-blue/20 flex items-center justify-center mb-4 group-hover:bg-praxia-blue/20 transition-colors">
                    <Icon size={18} className="text-praxia-blue-light" />
                  </div>
                  <h3 className="text-foreground font-bold text-lg mb-3">{title}</h3>
                  <p className="text-praxia-muted text-sm mb-4 flex-1">{desc}</p>
                  <div className="border-t border-praxia-border pt-4 space-y-2">
                    <div>
                      <span className="text-xs text-praxia-blue tracking-widest uppercase font-semibold">Resultado</span>
                      <p className="text-foreground text-sm mt-1">{resultado}</p>
                    </div>
                    <div>
                      <span className="text-xs text-praxia-muted tracking-widest uppercase font-semibold">Ideal para</span>
                      <p className="text-praxia-muted text-sm mt-1">{empresa}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/servicios"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-sm border border-praxia-border text-foreground font-semibold hover:border-praxia-blue/60 hover:bg-praxia-surface/40 transition-all"
              >
                Ver todos los servicios <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIADOR ─────────────────────────────────────────────────── */}
      <section className="py-24 bg-praxia-surface border-y border-praxia-border relative overflow-hidden">
        {/* Architecture background */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-8"
          style={{ backgroundImage: `url(${architectureBg})` }}
        />
        <div className="absolute inset-0 grid-overlay opacity-30" />
        <div className="container mx-auto max-w-4xl px-6 text-center relative fade-in-up" ref={difRef}>
          <span className="inline-block px-3 py-1 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-8">
            Por qué PRAXIA
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-8 leading-tight">
            No somos soporte técnico.
            <br />
            <span className="text-gradient-blue">Somos arquitectura estratégica.</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-left mt-12">
            {[
              { title: "Software de alto soporte", body: "Implementamos en plataformas con documentación pública robusta y ecosistema activo." },
              { title: "Sin dependencia", body: "No generamos dependencia. Creamos sistemas que tu equipo puede operar de forma autónoma." },
              { title: "Sistemas, no proyectos", body: "Entregamos operación, no código. Cada implementación es un sistema vivo y medible." },
            ].map(({ title, body }, i) => (
              <div key={i} className="border border-praxia-border rounded-sm p-6 bg-praxia-dark hover:border-praxia-blue/40 hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-2 h-2 rounded-full bg-praxia-blue mb-4 group-hover:scale-150 transition-transform" />
                <h3 className="text-foreground font-bold mb-2 group-hover:text-praxia-blue-light transition-colors">{title}</h3>
                <p className="text-praxia-muted text-sm">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DASHBOARD DEMO ────────────────────────────────────────────────── */}
      <DashboardDemo />

      {/* ── CASOS / RESULTADOS ────────────────────────────────────────────── */}
      <section className="py-24 bg-praxia-surface border-t border-praxia-border">
        <div className="container mx-auto max-w-7xl px-6 fade-in-up" ref={casosRef}>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full border border-amber-900/40 text-xs text-amber-400 tracking-widest uppercase mb-4">
              Casos — Demo
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">Resultados reales</h2>
            <p className="text-praxia-muted max-w-xl mx-auto">
              Ejemplos representativos de transformaciones típicas en empresas que operaban con desorden.
            </p>
          </div>

          {/* Before / After cards */}
          <div className="grid md:grid-cols-3 gap-5 mb-16">
            {[
              {
                sector: "Distribuidora B2B",
                before: "Sin CRM. 80% del seguimiento por WhatsApp. Pérdida de leads.",
                after: "Pipeline automatizado. 3x conversión en 60 días.",
                metric: "+182%",
                metricLabel: "en cierre de ventas",
              },
              {
                sector: "Consultora de servicios",
                before: "ERP manual en Excel. Errores contables. Sin visibilidad de proyectos.",
                after: "ERP implementado. Facturas automáticas. Dashboard por proyecto.",
                metric: "-67%",
                metricLabel: "en tiempo administrativo",
              },
              {
                sector: "Inmobiliaria",
                before: "Leads de 5 fuentes sin centralizar. Tiempo de respuesta: 2 días.",
                after: "Central de leads integrada. Respuesta automática en minutos.",
                metric: "0.3 hrs",
                metricLabel: "tiempo de respuesta promedio",
              },
            ].map((caso, i) => (
              <div key={i} className="border border-amber-900/20 bg-amber-950/5 rounded-sm p-6">
                <span className="inline-block px-2 py-0.5 rounded border border-amber-900/30 text-amber-500 text-[10px] tracking-widest uppercase mb-3">
                  Demo • {caso.sector}
                </span>
                <div className="text-4xl font-black text-praxia-blue-light mb-1">{caso.metric}</div>
                <div className="text-praxia-muted text-xs mb-4">{caso.metricLabel}</div>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs text-red-400 font-semibold uppercase tracking-wider mb-1">Antes</p>
                    <p className="text-praxia-muted text-sm">{caso.before}</p>
                  </div>
                  <div>
                    <p className="text-xs text-emerald-400 font-semibold uppercase tracking-wider mb-1">Después</p>
                    <p className="text-foreground text-sm">{caso.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Sectors */}
          <div className="text-center">
            <p className="text-praxia-muted text-sm mb-4 uppercase tracking-widest">Sectores que atendemos</p>
            <div className="flex flex-wrap justify-center gap-3">
              {sectores.map((s) => (
                <span
                  key={s}
                  className="px-4 py-1.5 border border-praxia-border rounded-full text-sm text-foreground bg-praxia-surface"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ─────────────────────────────────────────────────────── */}
      <section className="py-32 bg-praxia-black relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-praxia-blue/8 blur-3xl pointer-events-none" />
        <div className="container mx-auto max-w-3xl px-6 text-center relative">
          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 leading-tight">
            Si tu empresa quiere operar como sistema,{" "}
            <span className="text-gradient-blue">hablemos.</span>
          </h2>
          <p className="text-praxia-muted text-lg mb-10 max-w-xl mx-auto">
            Una llamada de 30 minutos para entender tu operación y decirte qué tan rápido podemos transformarla.
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-3 px-10 py-5 rounded-sm bg-gradient-blue text-white font-bold text-lg hover:opacity-90 transition-all glow-blue"
          >
            Agendar Diagnóstico Gratuito <ArrowRight size={20} />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
