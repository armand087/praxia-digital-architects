

## Calculadora de Diagnóstico ROI — Diseño Funcional

### Concepto
Un widget interactivo en el homepage donde el visitante ingresa datos básicos de su empresa y recibe una estimación del **costo operativo del desorden** — cuánto dinero pierde mensualmente por no tener sistemas digitales optimizados.

### Flujo del Usuario

```text
┌─────────────────────────────────────┐
│  PASO 1: Inputs del usuario         │
│                                     │
│  • Tamaño del equipo (slider 1-50+) │
│  • Facturación mensual (dropdown)   │
│  • Herramientas actuales (checkboxes│
│    : Excel, WhatsApp, ERP básico,   │
│      CRM, Ninguno organizado)       │
│  • Nivel de automatización (1-5)    │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  PASO 2: Cálculo (frontend)         │
│                                     │
│  Fórmula simplificada:              │
│  costoDesorden =                    │
│    (equipo × horasPerdidas × costo) │
│    + (facturación × %fuga)          │
│    - (bonusAutomatización)          │
└──────────────┬──────────────────────┘
               ▼
┌─────────────────────────────────────┐
│  PASO 3: Resultados visuales        │
│                                     │
│  • Costo mensual estimado perdido   │
│  • Costo anual proyectado           │
│  • Horas/semana desperdiciadas      │
│  • Barra comparativa: Con vs Sin    │
│    sistemas optimizados             │
│  • CTA: "Agenda tu diagnóstico      │
│    estratégico gratuito"            │
└─────────────────────────────────────┘
```

### Lógica del Cálculo

| Variable | Fuente | Impacto |
|----------|--------|---------|
| Tamaño equipo | Slider | Más personas = más horas perdidas en coordinación manual |
| Facturación | Dropdown | Base para estimar % de fuga por ineficiencia (3-8%) |
| Herramientas | Checkboxes | Menos herramientas formales = mayor penalización |
| Automatización | Slider 1-5 | Nivel bajo multiplica el costo; nivel alto lo reduce |

**Ejemplo**: Equipo de 10 personas, $300K MXN facturación, solo Excel y WhatsApp, automatización nivel 2 → resultado: ~$45,000 MXN/mes en costos ocultos de desorden.

### Ubicación
Nueva sección en el homepage, entre "Casos & Resultados" y el "CTA Final". Diseño con tarjeta oscura/clara (adaptada al tema), animaciones suaves en los resultados, y gráfica de barras comparativa usando Recharts.

### Detalles Técnicos
- Todo client-side, sin backend
- Componente `ROICalculator` nuevo dentro de `Index.tsx`
- Animación de conteo incremental en los números resultado
- Responsive: inputs apilados en móvil, lado a lado en desktop

