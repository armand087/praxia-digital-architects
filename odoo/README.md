# El Dulcero — Odoo Community (Docker)

Entorno local de Odoo 19 Community + Postgres para construir el sitio de
"El Dulcero" con el creador de sitios nativo de Odoo (Website Builder),
en vez del SPA en React/Supabase.

## Requisitos

- Docker Desktop (Windows/Mac) o Docker Engine + Compose plugin (Linux).
- Puerto `8069` libre en tu máquina (o cambia `ODOO_PORT` en `.env`).

## Levantarlo

```bash
cd odoo
cp .env.example .env
# Edita .env y cambia DB_PASSWORD por una contraseña real.
# Edita config/odoo.conf y cambia admin_passwd también.

docker compose up -d
```

La primera vez tarda uno o dos minutos en inicializar. Cuando esté listo,
abre:

```
http://localhost:8069
```

Vas a caer en la pantalla de "Create Database" (gestor de bases de datos):
crea tu base de datos ahí (nombre, email/usuario admin, contraseña, y marca
"Demo data" en No si no la quieres). Con eso ya tienes Odoo Community
corriendo, listo para instalar el módulo **Website** y empezar a construir
el sitio.

## Apagarlo / reiniciarlo

```bash
# Apaga los contenedores, conserva los datos (la base de datos sigue ahí)
docker compose down

# Vuelve a levantar con los mismos datos
docker compose up -d

# Borra TODO (contenedores + datos) — empieza de cero
docker compose down -v
```

## Estructura

- `docker-compose.yml` — define los dos contenedores: `db` (Postgres 16) y
  `odoo` (Odoo Community).
- `.env` (no se sube a git) — contraseñas y versión de Odoo. Cámbialo antes
  de correr `docker compose up`.
- `config/odoo.conf` — configuración de Odoo montada dentro del contenedor
  (contraseña maestra, ruta de addons, etc).
- `addons/` — aquí va el módulo custom que construyamos para El Dulcero
  (el "El Dulcero" theme/website + los formularios/controladores públicos).
  Está vacío por ahora — es el siguiente paso.

## Seguridad — ten esto en cuenta

- Este `docker-compose.yml` está pensado para desarrollo local, expuesto
  solo en tu máquina. No lo publiques tal cual a internet sin: contraseñas
  fuertes, `list_db = False` en `odoo.conf`, HTTPS vía un reverse proxy, y
  revisar los permisos del usuario "Public" antes de habilitar cualquier
  formulario público.
- El puerto XML-RPC/JSON-RPC de administración (el mismo 8069) no debe
  quedar accesible desde internet en producción — solo el tráfico normal
  del sitio web debería estar expuesto, idealmente detrás de un proxy.
