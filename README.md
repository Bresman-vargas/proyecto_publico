# Baja capacidad de respuesta ante reclamos ciudadanos en la Municipalidad de Santo Domingo

Proyecto para la asignatura enfocado en mejorar la comunicación y los tiempos de respuesta del municipio mediante la implementación de un foro de consultas ciudadanas dinámico y centralizado.

* **Universidad:** Pontificia Universidad Católica de Valparaíso (PUCV)
* **Carrera:** Ingeniería Civil Informática
* **Integrantes:** Bresman Johan Garzon Vargas, Julian Antonio Silva Donoso y Vicente Antonio Mery Arancibia

## Enlace Figma

🔗 [Acceder al Prototipo Interactivo en Figma](https://www.figma.com/design/lkQGNEEKdGcZAMp6o5ma2C/REAL?node-id=64-67&t=2mmxGNX4oZjERyzw-1)

## Instrucciones de ejecución del proyecto

```bash
# Clonar el repositorio
git clone [url]

# Acceder al directorio raíz del proyecto
cd proyecto_publico

# Instalar las dependencias del monorepo
pnpm install

# Levantar el servidor de desarrollo del backend (puerto 4000)
pnpm -F backend dev

# Levantar el servidor de desarrollo del frontend (puerto 5173)
pnpm -F frontend dev
```

> **Nota de desarrollo:** Para acceder a la aplicación sin autenticación real, modificar `DEV_MODE = true` en `apps/frontend/src/context/AuthContext.jsx`. Cambiar `role` en `MOCK_USER` entre `"admin"` y `"user"` para probar ambas vistas.

---

## 1.1 Definición de requerimientos

Para el desarrollo de la plataforma se tomaron en cuenta 2 roles principales:

* **Rol Ciudadano (Usuario):** Persona que utiliza el sistema para explorar foros, crear discusiones, participar en debates y votar en comentarios.
* **Rol Administrador (Personal Municipal):** Funcionario que gestiona los foros temáticos, modera las discusiones, crea encuestas y actualiza el estado de los reclamos.

| Requerimientos Funcionales | Requerimientos No Funcionales |
| :--- | :--- |
| El ciudadano puede explorar foros temáticos y ver sus discusiones activas. | El sistema debe poseer una alta facilidad de uso, permitiendo que un ciudadano publique una discusión en menos de 2 minutos. |
| El ciudadano puede crear una nueva discusión dentro de un foro temático específico. | El sistema debe reflejar los votos y nuevos comentarios con un tiempo de respuesta inferior a 2 segundos. |
| El ciudadano puede comentar en discusiones existentes y votar (Upvote/Downvote) en los comentarios de otros. | La plataforma debe ser completamente responsiva en dispositivos móviles y de escritorio. |
| El ciudadano puede editar o eliminar sus propias discusiones y comentarios. | El acceso a rutas y acciones administrativas debe estar protegido mediante autenticación JWT. |
| El administrador puede crear, editar y cerrar foros temáticos. | Las contraseñas deben almacenarse usando encriptación unidireccional con bcryptjs. |
| El administrador puede cambiar el estado de una discusión (Activo/Inactivo). | El sistema debe implementarse en arquitectura de monorepo con pnpm. |
| El sistema valida los formularios con Zod antes de procesar cualquier dato. | Las validaciones deben ser compartidas entre frontend y backend mediante un paquete local. |

---

## 1.2 Justificación del problema y análisis del usuario objetivo

**Análisis del usuario objetivo**
El usuario objetivo abarca a toda la comunidad de Santo Domingo. Al ser un público demográficamente diverso, el diseño prioriza interfaces limpias, navegación intuitiva y formularios guiados que previenen errores, eliminando la fricción para usuarios con menos experiencia tecnológica.

**Justificación del problema**
Actualmente existe una "Baja Capacidad de Respuesta ante Reclamos Ciudadanos". Los vecinos no cuentan con un canal unificado, transparente y bidireccional para comunicarse con la municipalidad, lo que genera duplicidad de reclamos y sensación de abandono. Este sistema centraliza las inquietudes en foros públicos, permitiendo a la municipalidad gestionar prioridades basadas en la interacción real de la comunidad.

---

## 1.3 Diseño UI/UX y Prototipo en Figma

El prototipo se centra en una experiencia de usuario clara y accesible:

* **Autenticación:** Formularios de Login y Registro con validaciones visuales en tiempo real.
* **Exploración:** Vista de tarjetas (Cards) para navegar entre foros disponibles con buscador en tiempo real.
* **Detalle de Foro:** Vista con banner, estadísticas de discusiones (abiertas/cerradas) y listado de discusiones del foro.
* **Gestión de Discusiones:** Interfaz para leer el hilo de un reclamo, ver su estado (Activo/Cerrado) y participar con comentarios.
* **Panel Administrativo:** Vistas dedicadas para creación y edición de foros y encuestas, protegidas por rol.

---

## 1.4 Arquitectura de Navegación y Experiencia del Usuario

La aplicación utiliza **React Router** para navegación fluida sin recargas (SPA).

* **Rutas públicas:** `/home`, `/login`, `/register`
* **Rutas protegidas (usuarios):** `/explore`, `/discussions`, `/user-comments`, `/forums/:id`, `/settings`
* **Rutas administrativas:** `/forums`, `/newforum`, `/surveys`
* **Diferenciación de roles:** El componente `Sidebar` muestra u oculta la sección ADMIN según `user.role === "admin"`, controlado desde `AuthContext`.
* **Componentes estructurales:** `Layout` global con `Sidebar` persistente y `Header` dinámico que muestra el nombre del usuario autenticado.

---

## 1.5 Creación del proyecto con Vite y React

Proyecto inicializado con **Vite + React + TypeScript** en arquitectura monorepo con `pnpm`.

* **Rendimiento:** Vite permite inicio instantáneo y HMR extremadamente rápido.
* **Estilos:** **Tailwind CSS v4** con variables CSS (`oklch`) para temas dinámicos Light/Dark y colores de acento configurables.
* **Validaciones compartidas:** Paquete local `@proyecto_publico/schemas` con **Zod**, consumido tanto por el frontend (formularios) como por el backend (middlewares), garantizando una única fuente de verdad para las reglas de negocio.

---

## 1.6 Diseño de pantallas principales y estructura

**Backend** (`apps/backend/src`):
- `controllers/` — Lógica de manejo de requests HTTP
- `routes/` — Definición de endpoints REST
- `services/` — Consultas SQL parametrizadas a Supabase
- `middleware/` — Validación JWT y schemas Zod
- `db.js` — Conexión a Supabase con `pg`

**Frontend** (`apps/frontend/src`):
- `pages/` — Vistas por dominio: auth, forums, discussions, comments, surveys
- `components/` — UI reutilizable: InputForm, TextAreaForm, SelectForm, Sidebar, Layout
- `api/` — Configuración Axios y funciones de llamada a endpoints
- `context/` — AuthContext (sesión y roles) y ThemeContext (tema visual)


---

## 2.1 Creación del servidor en Node.js

Servidor implementado con **Express.js** escuchando en el puerto 4000. El archivo `app.js` configura los middlewares globales (CORS, JSON parser, Cookie parser) y registra todos los routers bajo el prefijo `/api`.

```javascript
app.use("/api/auth", auth_router);
app.use("/api", discussion_router);
app.use("/api", comment_router);
app.use("/api", forums_router);
```

---

## 2.2 Configuración y modelado de la base de datos

Base de datos relacional **PostgreSQL** alojada en **Supabase** con el siguiente modelo:

| Tabla | Descripción |
| :--- | :--- |
| `usuarios` | Datos de usuarios con RUT, nombre, email, hash de contraseña y referencias a región/comuna |
| `forums` | Foros temáticos con categoría, título, descripción e imagen |
| `discussions` | Discusiones ciudadanas vinculadas a un foro y usuario, con estado activo/inactivo |
| `comments` | Comentarios anidados con auto-referencia (`parent_comment_id`) para hilos multinivel |
| `comment_votes` | Tabla intermedia para upvotes/downvotes, garantizando un voto por usuario por comentario |
| `surveys` | Encuestas municipales con fecha de inicio y cierre |
| `survey_options` | Opciones de respuesta para cada encuesta con conteo de votos |
| `regiones` / `comunas` | Tablas paramétricas para estandarización geográfica |

---

## 2.3 Desarrollo de API REST

Endpoints implementados con métodos HTTP correctos y respuestas JSON estructuradas:

### Foros
| Método | Endpoint | Descripción | Código |
| :--- | :--- | :--- | :--- |
| GET | `/api/forums` | Obtener todos los foros | 200 |
| POST | `/api/forums` | Crear un nuevo foro | 201 |

### Discusiones
| Método | Endpoint | Descripción | Código |
| :--- | :--- | :--- | :--- |
| GET | `/api/forums/:forumId/discussions` | Obtener discusiones de un foro | 200 |
| GET | `/api/users/:userId/discussions` | Obtener discusiones de un usuario | 200 |
| GET | `/api/discussions/:id` | Obtener una discusión por ID | 200 |
| POST | `/api/discussions` | Crear una discusión | 201 |
| PATCH | `/api/discussions/:id` | Editar una discusión | 200 |
| PATCH | `/api/discussions/:id/status` | Cambiar estado de discusión | 200 |
| DELETE | `/api/discussions/:id` | Eliminar una discusión | 200 |

### Comentarios
| Método | Endpoint | Descripción | Código |
| :--- | :--- | :--- | :--- |
| GET | `/api/discussions/:discussionId/comments` | Obtener comentarios de una discusión | 200 |
| GET | `/api/users/:userId/comments` | Obtener comentarios de un usuario | 200 |
| POST | `/api/comments` | Crear un comentario | 201 |
| POST | `/api/comments/:id/vote` | Votar un comentario (upvote/downvote) | 200 |
| DELETE | `/api/comments/:id` | Eliminar un comentario | 200 |

### Utilidades geográficas
| Método | Endpoint | Descripción | Código |
| :--- | :--- | :--- | :--- |
| GET | `/api/regiones` | Obtener todas las regiones de Chile | 200 |
| GET | `/api/regiones/:id_region/comunas` | Obtener comunas de una región | 200 |

### Autenticación
| Método | Endpoint | Descripción | Código |
| :--- | :--- | :--- | :--- |
| POST | `/api/auth/register` | Registrar nuevo usuario | 201 |
| POST | `/api/auth/login` | Iniciar sesión | 200 |
| POST | `/api/auth/logout` | Cerrar sesión | 200 |
| GET | `/api/auth/verify` | Verificar token JWT | 200 |

## 2.4 Consumo de la API REST desde React con Axios

Instancia global de Axios configurada con `baseURL` y `withCredentials: true` para manejo de cookies JWT.

```typescript
const api = axios.create({
  baseURL: "http://localhost:4000/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
```

Funciones implementadas por dominio en `/api`:

* **`forums.ts`:** `getForumsRequest()`, `createForumRequest()`
* **`discussions.ts`:** `getDiscussionsByForum()`, `getDiscussionId()`, `discussionsByUser()`, `createDiscussion()`, `editDiscussion()`, `editDiscussionState()`, `delateDiscussion()`
* **`comments.ts`:** `getCommentsByDiscussion()`, `getCommentsByUser()`, `createComment()`, `voteComment()`, `deleteComment()`
* **`auth.ts`:** `loginRequest()`, `registerRequest()`, `logoutRequest()`, `verifyTokenRequest()`

Vistas conectadas a la API:
* **`Explore.tsx`:** Carga foros reales desde `GET /api/forums`
* **`NewForum.tsx`:** Crea foros reales via `POST /api/forums` y redirige al listado
* **`ForumDetail.tsx`:** Carga foro y sus discusiones desde `GET /api/forums/:id/discussions`

---

## 2.5 Implementación de autenticación JWT

* Generación de token JWT en login/register almacenado en cookie HttpOnly
* Rutas protegidas en frontend mediante `AuthContext` — redirige a `/login` si no hay sesión activa
* **Diferenciación de roles:** El campo `role` del usuario (`"admin"` / `"user"`) controla el acceso a vistas administrativas
* El `Sidebar` muestra la sección ADMIN solo cuando `user.role === "admin"`, ocultando `/forums` y `/surveys` a usuarios ciudadanos
* El `AppRouter` en `App.tsx` envuelve las rutas privadas en un componente `Layout` que verifica `isAuthenticated` antes de renderizar

---

## 2.6 Validación de usuarios y seguridad

* **Validación de inputs:** Esquemas Zod compartidos en `@proyecto_publico/schemas` para foros, discusiones y comentarios, usados tanto en frontend (formularios) como en backend (middlewares)
* **Hash de contraseñas:** `bcryptjs` para encriptación unidireccional antes de insertar en base de datos
* **Protección SQL:** Consultas parametrizadas con `$1, $2` en todos los servicios, bloqueando inyección SQL
* **CORS:** Configurado para aceptar solo requests desde `FRONTEND_URL` definida en variables de entorno
* **Cookies seguras:** Token JWT almacenado en cookie con `httpOnly` para prevenir acceso desde JavaScript

---

## 2.7 Pruebas funcionales

Pruebas realizadas con **Thunder Client** sobre los endpoints principales:

### GET /api/forums
* **Resultado:** 200 OK — retorna array JSON con todos los foros almacenados en Supabase
![200 OK](https://github.com/user-attachments/assets/81ad9e2d-55bc-45a9-956a-cd9080b63f7a)

### POST /api/forums

* **Resultado:** 201 Created — retorna el foro creado con su ID asignado
![201_OK](https://github.com/user-attachments/assets/aa1579bf-d8ea-4ba4-aa4b-8ccc4b76eba8)


### GET /api/comments
**Resultado:** 200 OK — retorna array JSON con todos los comentarios almacenados en Supabase por usuario
![200 OK](https://github.com/user-attachments/assets/2a08a7ea-853c-40c5-8adf-9cfb6be7d07b)


### POST /api/comments
**Resultado:** 201 Created — retorna el comentario creado con su ID asignado
![201 OK](https://github.com/user-attachments/assets/f44418c5-f8fc-48c8-9231-5377375c38bf)

### GET /api/discussions
**Resultado:** 200 OK — retorna array JSON con todas las discusiones almacenadas en Supabase
![200 OK](https://github.com/user-attachments/assets/3e7efd1e-6c03-4020-932d-7598d9c86c87)


### POST /api/discussions
**Resultado:** 201 Created — retorna la discusión creada con su ID asignado
![201 OK](https://github.com/user-attachments/assets/830d0244-51c0-46ef-bb42-187370c7209e)
