# AGENTS.md — reglas de entorno para agentes de IA en este repo

Este repositorio contiene **dos proyectos sin relación entre sí**. Léelo
completo antes de tocar código — evita mezclar convenciones o borrar algo
del proyecto que no te pidieron tocar.

---

## 1. Praxia Digital Architects (sitio existente, raíz `/`)

Sitio de consultoría/arquitectura digital, ya construido y en producción
(Vite + React + TypeScript + Tailwind + shadcn/ui). Vive en `src/pages/Index.tsx`,
`Metodologia.tsx`, `Servicios.tsx`, `Contacto.tsx`, `Recursos.tsx`, `Gracias.tsx`,
componentes en `src/components/` (Navbar, Footer, ROICalculator, etc.) y su
propio design system en `src/index.css` (tokens `--praxia-*`) y
`tailwind.config.ts` (paleta `praxia`).

**Regla:** no modifiques ni borres nada de Praxia salvo que te lo pidan
explícitamente. Es contenido real, no un placeholder ni un proyecto de
prueba — coexiste en este repo con El Dulcero por decisión del usuario, no
por accidente.

---

## 2. El Dulcero (proyecto activo)

Dulcería y organizadora de fiestas infantiles en La Laguna. Es el proyecto
en el que se está trabajando activamente.

### 2.1 Historial de decisiones (importante, no las repitas)

1. **Brief original**: landing "El Dulcero" pedía stack Next.js + Supabase +
   generación de imágenes con gpt-image-1.
2. **Se descartó Next.js**: el repo ya era una SPA Vite + React; migrar a
   Next.js hubiera sido una reescritura riesgosa de un sitio con Praxia ya
   en producción. Se construyó en su lugar un prototipo **React/Vite SPA**
   en la ruta `/el-dulcero`, con Supabase llamado directo desde el cliente
   (en vez de server actions), y con **fallback automático a
   `localStorage`** cuando no hay credenciales de Supabase configuradas.
3. **Prototipo React construido y verificado** (branch
   `claude/el-dulcero-landing-ntciqi`): las 13 secciones del brief y las 6
   herramientas funcionales (renderizador temático, calendario de
   disponibilidad, agendador de cita, creador de bolos, creador de centros
   de mesa, creador de itinerario) — con estado real, cálculo de precio en
   vivo, y persistencia. Verificado con `tsc`, `eslint`, `vitest`, build de
   producción y un smoke test con navegador headless. **Este prototipo
   sigue en el repo y funciona** (ver §2.2), pero fue **superado** por la
   decisión del punto 4 — no lo tomes como el plan vigente para producción,
   trátalo como referencia/fallback salvo que el usuario diga lo contrario.
4. **Pivote a Odoo Community (decisión vigente)**: el usuario decidió
   construir el sitio de producción **dentro del Website Builder nativo de
   Odoo**, no como SPA headless. Motivo — seguridad:
   - Un SPA separado que llama directo a un backend tipo Odoo necesitaría
     credenciales de un usuario real de Odoo embebidas en el JS del
     navegador (visibles en devtools), o un endpoint RPC abierto a
     internet. Odoo no tiene un equivalente a "anon key + RLS por tabla"
     de Supabase.
   - El Website Builder nativo de Odoo resuelve esto: las páginas se
     renderizan del lado del servidor, los formularios públicos corren
     como el usuario **"Public"** (restringido, sin credenciales
     expuestas), con token CSRF automático y con el modelo/campos que
     puede tocar cada formulario definidos explícitamente por un admin.
   - Trade-off aceptado: se pierde la interactividad rica del SPA (cálculo
     de precio instantáneo, itinerario arrastrable) salvo que se
     reconstruya con snippets custom en OWL (el framework JS de Odoo)
     dentro de un módulo propio.
   - Si en algún momento se retoma el patrón headless, la capa de
     seguridad correcta es una **API intermedia delgada** (Node/Python)
     que guarde las credenciales reales de Odoo del lado del servidor y
     exponga solo endpoints específicos — nunca RPC directo desde el
     navegador.

**No propongas de nuevo "migrar a Next.js" ni "llamar a Odoo directo desde
el SPA sin capa intermedia"** — ya se evaluaron y se descartaron por las
razones de arriba.

### 2.2 Prototipo React (`/el-dulcero`) — estado actual

Sigue en el repo, funcional, como referencia:

- Página: `src/pages/ElDulcero.tsx`, ruta registrada en `src/App.tsx`.
- Componentes: `src/components/eldulcero/*` (13 secciones + botón flotante
  de WhatsApp).
- Datos estáticos (temas, planes, precios, testimonios, actividades):
  `src/data/eldulcero/*`.
- Cliente Supabase tipado + fallback local: `src/integrations/eldulcero/*`.
- Helpers (WhatsApp, formato de moneda, `localStorage`): `src/lib/eldulcero/*`.
- Esquema SQL de referencia (Postgres/Supabase): `supabase/schema.sql` —
  útil como documentación del modelo de datos aunque el backend final sea
  Odoo, ya que varias tablas (`citas`, `cotizaciones`) mapean conceptualmente
  a modelos de Odoo (`crm.lead`, `sale.order`).
- Tema visual propio, aislado del de Praxia vía la clase `.eldulcero-theme`
  en `src/index.css` (fuerza variables shadcn en modo claro, sin importar
  el modo oscuro global de Praxia) y tokens `dulce.*` en `tailwind.config.ts`.
- Tests: `src/test/eldulcero-pricing.test.ts` (calculadoras de precio).

No lo borres sin que el usuario lo pida explícitamente — puede servir de
referencia de copy, precios y estructura de contenido al construir las
páginas en Odoo.

### 2.3 Entorno Odoo (trabajo activo)

- Ubicación: `odoo/` (docker-compose + config, no es parte del build de
  Vite/React).
- Stack: **Odoo 19.0 Community** + **Postgres 16**, vía
  `odoo/docker-compose.yml`.
- Setup: `cp odoo/.env.example odoo/.env`, editar contraseñas reales en
  `odoo/.env` y en `odoo/config/odoo.conf` (`admin_passwd`), luego
  `docker compose up -d` desde `odoo/`. UI en `http://localhost:8069`.
- `odoo/addons/` está vacío — ahí va el futuro módulo custom "El Dulcero"
  (theme del sitio + cualquier controlador/modelo propio). **Aún no se ha
  creado ese módulo** — es el siguiente paso pendiente.
- `odoo/.env` y cualquier `odoo.conf.local` están en `.gitignore` — nunca
  commitear contraseñas reales.

**Reglas de seguridad específicas de Odoo, no las relajes sin que el
usuario lo pida:**
- `list_db = True` en `odoo/config/odoo.conf` es solo para desarrollo
  local. Debe pasar a `False` antes de exponer el servidor más allá de la
  máquina local.
- El puerto de administración/RPC (8069) no debe quedar accesible desde
  internet en producción — solo tráfico normal del sitio, idealmente
  detrás de un reverse proxy con HTTPS.
- Cualquier formulario público (Website Forms, Appointments) debe
  restringirse explícitamente a los campos/modelo que necesita — nunca
  dejar que el usuario "Public" tenga acceso amplio a modelos internos
  (facturación, inventario, otros leads).

### 2.4 Convenciones de contenido

- Todo el copy es en español, tono cercano y entusiasta, dirigido a
  papás/mamás organizando la fiesta de sus hijos. Uso generoso de emojis
  temáticos (🎈🎉🍭🎂✨).
- Mobile-first — la mayoría de las visitas son desde celular.
- Número de WhatsApp: sigue siendo un placeholder
  (`src/lib/eldulcero/whatsapp.ts`, constante `WHATSAPP_NUMBER`) —
  reemplázalo por el real antes de publicar cualquier versión (React u
  Odoo).

---

## 3. Notas de entorno / tooling

- **Puerto del dev server de Vite es 8080, no el 5173 por defecto** —
  fijado en `vite.config.ts` (`server.port = 8080`). Si vas a dar
  instrucciones de "abre tu navegador en...", usa `localhost:8080`.
- **Odoo corre en el puerto 8069** por defecto (configurable vía
  `ODOO_PORT` en `odoo/.env`).
- Si esta sesión corre en un entorno remoto/aislado (contenedor en la nube,
  ej. Claude Code en la web) en vez de la máquina del usuario: **acláralo
  explícitamente antes de dar instrucciones de "localhost"** — el
  `localhost` del contenedor remoto no es alcanzable desde el navegador del
  usuario. El usuario de este proyecto trabaja principalmente desde
  Windows (cmd.exe).
- Lockfiles: el repo trae `package-lock.json`, `bun.lock` y `bun.lockb` a
  la vez (herencia de Lovable). `npm install` es el flujo verificado en
  esta sesión.
- Rama de trabajo usada hasta ahora: `claude/el-dulcero-landing-ntciqi`.
