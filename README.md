# ToDoFlota

**Sistema Web de Gestión y Control Integral de Flotas Vehiculares**

## 1. Descripción del proyecto

ToDoFlota es una aplicación web destinada a la gestión y control centralizado de una flota vehicular. Su objetivo es facilitar el registro de vehículos, el seguimiento de mantenimientos, el control de gastos y la consulta de información relevante para la administración de la flota.

## 2. Funcionalidades previstas

- Registro y consulta de vehículos.
- Administración del historial de mantenimientos.
- Registro y clasificación de gastos.
- Control de vencimientos de seguros y patentes.
- Panel principal con indicadores generales.
- Gestión de usuarios y autenticación.

## 3. Tecnologías utilizadas

- **SvelteKit:** framework para el desarrollo web.
- **TypeScript:** lenguaje de programación.
- **Node.js:** entorno de ejecución.
- **Tailwind CSS:** estilos e interfaz visual.
- **PostgreSQL (Neon):** base de datos prevista.
- **Drizzle ORM:** herramienta prevista para la interacción con la base de datos.
- **Git y GitHub:** control de versiones.

## 4. Estado actual del desarrollo

En esta primera etapa se implementaron las siguientes funcionalidades:

- Estructura inicial del proyecto SvelteKit.
- Layout principal con menú de navegación y pie de página.
- Dashboard con indicadores simulados.
- Rutas para vehículos, mantenimientos y gastos.
- Listado de vehículos mediante GET y función `load`.
- Registro de vehículos mediante POST y Form Actions.
- Validaciones básicas del formulario, incluyendo el control de padrón duplicado.
- Se creó un pdf con las capturas de pantallas 

Los datos utilizados en esta etapa son simulados y se almacenan temporalmente en memoria. La conexión con PostgreSQL se realizará en una etapa posterior.

## 5. Ejecución del proyecto

Requisitos: Node.js y npm instalados.

Clonar el repositorio:

```bash
git clone https://github.com/dinonunezpintado/ToDoFlota.git
```

Ingresar a la carpeta:

```bash
cd ToDoFlota
```

Instalar dependencias:

```bash
npm install
```

Ejecutar el servidor de desarrollo:

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:5173
```

## 6. Integrantes

- **Dino Gastón Núñez Pintado:** https://github.com/dinonunezpintado
- **Daniel Enrique Howell Paz:** https://github.com/Daniel211206

## 7. Próximas etapas

- Integración con PostgreSQL mediante Neon y Drizzle ORM.
- Implementación de operaciones CRUD completas.
- Autenticación de usuarios.
- Gestión de vencimientos de seguros y patentes.
- Pruebas y despliegue de la aplicación.

---

**Proyecto académico — Programación Web II**