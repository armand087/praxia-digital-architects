import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calculator, TrendingDown, TrendingUp, Clock } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

// ─── Animated counter hook ────────────────────────────────────────────────────
function useAnimatedNumber(target: number, duration = 800) {
  const [value, setValue] = useState(0);
  const prev = useRef(0);

  useEffect(() => {
    const start = prev.current;
    const diff = target - start;
    if (diff === 0) return;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + diff * eased);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
      else prev.current = target;
    }

    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const TOOLS = [
  { id: "excel", label: "Excel / Hojas de cálculo" },
  { id: "whatsapp", label: "WhatsApp Business" },
  { id: "erp", label: "ERP básico" },
  { id: "crm", label: "CRM" },
  { id: "none", label: "Ninguno organizado" },
];

const REVENUE_OPTIONS = [
  { value: 100, label: "$100K MXN" },
  { value: 300, label: "$300K MXN" },
  { value: 500, label: "$500K MXN" },
  { value: 1000, label: "$1M MXN" },
  { value: 3000, label: "$3M MXN" },
  { value: 5000, label: "$5M+ MXN" },
];

// ─── Calculation logic ───────────────────────────────────────────────────────
function calculate(
  teamSize: number,
  revenue: number,
  selectedTools: string[],
  automationLevel: number
) {
  // Hours lost: each team member loses ~3-6 hrs/week on manual coordination
  const baseHoursPerPerson = 5;
  const hoursLostWeekly = teamSize * baseHoursPerPerson;

  // Tool penalty: fewer formal tools = more chaos
  const formalTools = selectedTools.filter((t) => t !== "none" && t !== "whatsapp");
  const hasNone = selectedTools.includes("none");
  const toolPenalty = hasNone ? 1.4 : formalTools.length >= 3 ? 0.7 : formalTools.length >= 1 ? 1.0 : 1.3;

  // Automation bonus: level 1 = no reduction, level 5 = big reduction
  const automationMultiplier = 1 - (automationLevel - 1) * 0.15; // 1.0, 0.85, 0.70, 0.55, 0.40

  // Revenue leakage: 3-8% depending on tools & automation
  const baseLeakage = 0.06;
  const leakageRate = baseLeakage * toolPenalty * automationMultiplier;
  const revenueLeakage = revenue * 1000 * leakageRate;

  // Hour cost (avg MXN): coordination time wasted
  const hourCost = 180;
  const coordinationCost = hoursLostWeekly * hourCost * 4.33 * toolPenalty * automationMultiplier;

  const monthlyCost = Math.round(coordinationCost + revenueLeakage);
  const annualCost = monthlyCost * 12;
  const weeklyHours = Math.round(hoursLostWeekly * toolPenalty * automationMultiplier);
  const potentialRecovery = Math.round(monthlyCost * 0.65);

  return { monthlyCost, annualCost, weeklyHours, potentialRecovery };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ROICalculator() {
  const [teamSize, setTeamSize] = useState(10);
  const [revenue, setRevenue] = useState(300);
  const [selectedTools, setSelectedTools] = useState<string[]>(["excel", "whatsapp"]);
  const [automationLevel, setAutomationLevel] = useState(2);
  const [showResults, setShowResults] = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);

  const results = calculate(teamSize, revenue, selectedTools, automationLevel);

  const animatedMonthlyCost = useAnimatedNumber(showResults ? results.monthlyCost : 0);
  const animatedAnnualCost = useAnimatedNumber(showResults ? results.annualCost : 0);
  const animatedHours = useAnimatedNumber(showResults ? results.weeklyHours : 0, 600);
  const animatedRecovery = useAnimatedNumber(showResults ? results.potentialRecovery : 0);

  const toggleTool = (id: string) => {
    if (id === "none") {
      setSelectedTools((prev) =>
        prev.includes("none") ? prev.filter((t) => t !== "none") : ["none"]
      );
    } else {
      setSelectedTools((prev) => {
        const without = prev.filter((t) => t !== "none");
        return without.includes(id) ? without.filter((t) => t !== id) : [...without, id];
      });
    }
  };

  const handleCalculate = () => {
    setShowResults(true);
    // Scroll to results on mobile
    setTimeout(() => {
      if (window.innerWidth < 768) {
        document.getElementById("roi-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const chartData = [
    { name: "Sin optimizar", valor: results.monthlyCost, fill: "hsl(0 70% 55%)" },
    { name: "Con PRAXIA", valor: results.monthlyCost - results.potentialRecovery, fill: "hsl(214 89% 52%)" },
  ];

  const automationLabels = ["Nulo", "Bajo", "Medio", "Alto", "Avanzado"];

  return (
    <section ref={sectionRef} className="py-24 bg-praxia-surface border-y border-praxia-border relative overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-overlay opacity-20" />

      <div className="container mx-auto max-w-7xl px-6 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-praxia-blue/30 text-xs text-praxia-muted tracking-widest uppercase mb-4">
            <Calculator size={14} className="text-praxia-blue-light" />
            Calculadora de Diagnóstico
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-foreground mb-4">
            ¿Cuánto te cuesta el{" "}
            <span className="text-gradient-blue">desorden operativo</span>?
          </h2>
          <p className="text-praxia-muted max-w-2xl mx-auto text-lg">
            Introduce los datos de tu empresa y descubre cuánto pierdes cada mes por no tener sistemas digitales optimizados.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* ── Inputs ──────────────────────────────────────────────── */}
          <div className="bg-praxia-dark border border-praxia-border rounded-sm p-8 space-y-8">
            {/* Team size slider */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm text-foreground font-semibold">Tamaño del equipo</label>
                <span className="text-praxia-blue-light font-black text-lg">{teamSize} personas</span>
              </div>
              <input
                type="range" min={1} max={50} value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full accent-[hsl(214,89%,52%)] h-2 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-xs text-praxia-muted mt-1">
                <span>1</span><span>25</span><span>50+</span>
              </div>
            </div>

            {/* Revenue dropdown */}
            <div>
              <label className="text-sm text-foreground font-semibold block mb-3">Facturación mensual</label>
              <div className="grid grid-cols-3 gap-2">
                {REVENUE_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setRevenue(opt.value)}
                    className={`py-2.5 px-3 rounded-sm text-sm font-medium border transition-all duration-200 ${
                      revenue === opt.value
                        ? "border-praxia-blue bg-praxia-blue/15 text-praxia-blue-light"
                        : "border-praxia-border bg-praxia-surface text-praxia-muted hover:border-praxia-blue/40"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tools checkboxes */}
            <div>
              <label className="text-sm text-foreground font-semibold block mb-3">Herramientas actuales</label>
              <div className="space-y-2">
                {TOOLS.map((tool) => {
                  const checked = selectedTools.includes(tool.id);
                  return (
                    <button
                      key={tool.id}
                      onClick={() => toggleTool(tool.id)}
                      className={`w-full flex items-center gap-3 py-3 px-4 rounded-sm border text-sm text-left transition-all duration-200 ${
                        checked
                          ? "border-praxia-blue/50 bg-praxia-blue/10 text-foreground"
                          : "border-praxia-border bg-praxia-surface text-praxia-muted hover:border-praxia-blue/30"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-sm border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          checked ? "border-praxia-blue bg-praxia-blue" : "border-praxia-border"
                        }`}
                      >
                        {checked && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      {tool.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Automation level */}
            <div>
              <div className="flex justify-between mb-3">
                <label className="text-sm text-foreground font-semibold">Nivel de automatización</label>
                <span className="text-praxia-blue-light font-bold text-sm">{automationLabels[automationLevel - 1]}</span>
              </div>
              <input
                type="range" min={1} max={5} value={automationLevel}
                onChange={(e) => setAutomationLevel(Number(e.target.value))}
                className="w-full accent-[hsl(214,89%,52%)] h-2 rounded-full cursor-pointer"
              />
              <div className="flex justify-between text-xs text-praxia-muted mt-1">
                {automationLabels.map((l) => (
                  <span key={l}>{l}</span>
                ))}
              </div>
            </div>

            {/* CTA button */}
            <button
              onClick={handleCalculate}
              className="w-full py-4 rounded-sm bg-gradient-blue text-white font-bold text-base hover:opacity-90 hover:scale-[1.02] transition-all glow-blue flex items-center justify-center gap-2"
            >
              <Calculator size={18} />
              Calcular costo del desorden
            </button>
          </div>

          {/* ── Results ─────────────────────────────────────────────── */}
          <div id="roi-results" className="space-y-6">
            {!showResults ? (
              <div className="bg-praxia-dark border border-praxia-border rounded-sm p-12 flex flex-col items-center justify-center text-center min-h-[500px]">
                <div className="w-20 h-20 rounded-full border-2 border-praxia-border bg-praxia-surface flex items-center justify-center mb-6">
                  <Calculator size={32} className="text-praxia-muted" />
                </div>
                <p className="text-praxia-muted text-lg font-medium mb-2">
                  Completa los datos y presiona calcular
                </p>
                <p className="text-praxia-muted/60 text-sm max-w-xs">
                  Obtendrás una estimación del costo mensual que tu empresa pierde por ineficiencia operativa.
                </p>
              </div>
            ) : (
              <>
                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-praxia-dark border border-red-900/40 rounded-sm p-5 col-span-2">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown size={16} className="text-red-400" />
                      <span className="text-praxia-muted text-sm">Costo mensual del desorden</span>
                    </div>
                    <p className="text-4xl md:text-5xl font-black text-red-400">
                      ${animatedMonthlyCost.toLocaleString("es-MX")}
                      <span className="text-lg font-medium text-red-400/60 ml-1">MXN</span>
                    </p>
                  </div>

                  <div className="bg-praxia-dark border border-praxia-border rounded-sm p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={14} className="text-amber-400" />
                      <span className="text-praxia-muted text-xs">Horas/semana perdidas</span>
                    </div>
                    <p className="text-3xl font-black text-amber-400">{animatedHours}</p>
                    <p className="text-xs text-praxia-muted mt-1">hrs en coordinación manual</p>
                  </div>

                  <div className="bg-praxia-dark border border-praxia-border rounded-sm p-5">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingDown size={14} className="text-red-400/70" />
                      <span className="text-praxia-muted text-xs">Costo anual proyectado</span>
                    </div>
                    <p className="text-3xl font-black text-red-400/80">${animatedAnnualCost.toLocaleString("es-MX")}</p>
                    <p className="text-xs text-praxia-muted mt-1">MXN al año</p>
                  </div>
                </div>

                {/* Recovery card */}
                <div className="bg-praxia-dark border border-praxia-blue/40 rounded-sm p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp size={16} className="text-praxia-blue-light" />
                    <span className="text-praxia-muted text-sm">Potencial de recuperación con sistemas</span>
                  </div>
                  <p className="text-4xl font-black text-praxia-blue-light">
                    ${animatedRecovery.toLocaleString("es-MX")}
                    <span className="text-lg font-medium text-praxia-blue/60 ml-1">MXN/mes</span>
                  </p>
                  <p className="text-xs text-praxia-muted mt-2">
                    Basado en resultados promedio de empresas con implementación completa.
                  </p>
                </div>

                {/* Comparative bar chart */}
                <div className="bg-praxia-dark border border-praxia-border rounded-sm p-6">
                  <p className="text-foreground font-semibold mb-1">Comparativo mensual</p>
                  <p className="text-xs text-praxia-muted mb-4">Costo operativo actual vs con sistemas optimizados</p>
                  <ResponsiveContainer width="100%" height={180}>
                    <BarChart data={chartData} layout="vertical" barCategoryGap="30%">
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--praxia-border))" horizontal={false} />
                      <XAxis
                        type="number"
                        tick={{ fill: "hsl(var(--praxia-text-muted))", fontSize: 11 }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        tick={{ fill: "hsl(var(--praxia-text-muted))", fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        width={110}
                      />
                      <Tooltip
                        formatter={(value: number) => [`$${value.toLocaleString("es-MX")} MXN`, "Costo mensual"]}
                        contentStyle={{
                          background: "hsl(var(--praxia-surface))",
                          border: "1px solid hsl(var(--praxia-border))",
                          borderRadius: 4,
                          color: "hsl(var(--foreground))",
                        }}
                      />
                      <Bar dataKey="valor" radius={[0, 4, 4, 0]} barSize={28}>
                        {chartData.map((entry, i) => (
                          <Cell key={i} fill={entry.fill} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CTA */}
                <Link
                  to="/contacto"
                  className="flex items-center justify-center gap-2 py-4 rounded-sm bg-gradient-blue text-white font-bold text-base hover:opacity-90 hover:scale-[1.02] transition-all glow-blue"
                >
                  Agenda tu diagnóstico estratégico gratuito <ArrowRight size={16} />
                </Link>

                <p className="text-center text-xs text-praxia-muted">
                  * Estimación basada en promedios de industria. El diagnóstico real se realiza en la consulta estratégica.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
