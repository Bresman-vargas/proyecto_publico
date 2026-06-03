# Baja capacidad de respuesta ante reclamos ciudadanos en la Municipalidad de Santo Domingo

Proyecto para la asignatura enfocado en mejorar la comunicación y los tiempos de respuesta del municipio mediante la implementación de un foro de consultas ciudadanas dinámico y centralizado.

## Datos

* **Universidad:** Pontificia Universidad Católica de Valparaíso (PUCV)
* **Carrera:** Ingeniería Civil Informática
* **Integrantes:** Bresman Johan Garzon Vargas, Julian Antonio Silva Donoso y Vicente Antonio Mery Arancibia

## Enlace Figma

🔗 [Acceder al Prototipo Interactivo en Figma](https://www.figma.com/design/lkQGNEEKdGcZAMp6o5ma2C/REAL?node-id=64-67&t=2mmxGNX4oZjERyzw-1)

## Instrucciones de ejecución del proyecto

* Clonar el repositorio: `git clone [url]`
* Acceder al directorio raíz del proyecto: `cd proyecto_publico`
* Instalar las dependencias del monorepo: `pnpm install`
* Levantar el servidor de desarrollo del backend: `pnpm -F backend dev`
* Levantar el servidor de desarrollo del frontend: `pnpm -F frontend dev`

## [EP 1.1] Definición de requerimientos

Para el desarrollo de la plataforma se tomaron en cuenta 2 roles principales:

* **Rol Ciudadano (Usuario):** Persona que utiliza el sistema para proponer ideas, reportar incidentes, participar en discusiones y votar en comentarios.
* **Rol Administrador (Personal Municipal):** Funcionario que gestiona los foros temáticos, modera las discusiones, crea encuestas y actualiza el estado de los reclamos.

| Requerimientos Funcionales | Requerimientos No Funcionales |
| :--- | :--- |
| **RF 1:** El ciudadano puede crear una nueva discusión (reclamo o propuesta) dentro de un foro temático específico. | **RNF 1:** El sistema debe poseer una alta facilidad de uso, permitiendo que un ciudadano publique una discusión en menos de 2 minutos. |
| **RF 2:** El ciudadano es capaz de comentar en discusiones existentes y votar (Upvote/Downvote) en los comentarios de otros. | **RNF 2:** El sistema debe reflejar los votos y nuevos comentarios con un tiempo de respuesta inferior a 2 segundos en la interfaz. |
| **RF 3:** El ciudadano puede editar o eliminar sus propias discusiones y comentarios. | **RNF 3:** La plataforma web debe ser completamente responsiva, garantizando una correcta visualización en dispositivos móviles y de escritorio. |
| **RF 4:** El administrador tiene la capacidad de crear, editar y cerrar foros temáticos y encuestas. | **RNF 4:** El acceso a las rutas y acciones administrativas debe estar protegido mediante autenticación con tokens JWT (JSON Web Tokens). |
| **RF 5:** El administrador puede cambiar el estado de una discusión (Activo/Inactivo) indicando si el reclamo ha sido resuelto. | **RNF 5:** Las contraseñas de los usuarios deben ser almacenadas utilizando encriptación unidireccional (Bcrypt). |
| **RF 6:** El sistema debe validar que la información ingresada en los formularios cumpla con los formatos correctos (RUT, email, longitud de texto) antes de procesarla. | **RNF 6:** El sistema debe implementarse utilizando una arquitectura de monorepo para facilitar el despliegue conjunto de API y Cliente. |

## [EP 1.2] Justificación del problema y análisis del usuario objetivo

**Análisis del usuario objetivo**
El usuario objetivo abarca a toda la comunidad de Santo Domingo. Al ser un público demográficamente diverso, el diseño prioriza interfaces limpias, navegación intuitiva (Dark/Light mode) y formularios guiados que previenen errores de usuario, eliminando la fricción para aquellos con menos experiencia tecnológica.

**Justificación del problema**
Actualmente existe una "Baja Capacidad de Respuesta ante Reclamos Ciudadanos". Los vecinos no cuentan con un canal unificado, transparente y bidireccional para comunicarse con la municipalidad, lo que genera duplicidad de reclamos y sensación de abandono. Este sistema propone centralizar las inquietudes en foros públicos, permitiendo a la municipalidad gestionar prioridades basadas en la interacción real de la comunidad (votos y comentarios), agilizando los tiempos de respuesta.

## [EP 1.3] Diseño UI/UX y Prototipo en Figma

El prototipo se centra en una experiencia de usuario clara y accesible. Se han diseñado múltiples pantallas considerando la usabilidad:

* **Pantalla de Autenticación:** Formularios de Login y Registro con validaciones visuales.
* **Pantallas de Exploración:** Vistas de tarjetas (Cards) para navegar entre foros y encuestas disponibles.
* **Gestión de Discusiones:** Interfaz detallada para leer el hilo de un reclamo, ver su estado (Pendiente/Resuelto) y participar en la caja de comentarios anidada.
* **Panel Administrativo:** Vistas dedicadas para la creación de encuestas y la habilitación de nuevas temáticas municipales.

## [EP 1.4] Arquitectura de Navegación y Experiencia del Usuario

La aplicación utiliza **React Router** para asegurar una navegación fluida sin recargas de página (SPA).

* **Rutas principales:** `/home` (Landing page), `/login`, `/register`.
* **Rutas protegidas (Usuarios):** `/explore` (Foros), `/discussions` (Mis reclamos), `/user-comments`.
* **Rutas administrativas:** `/forums` (Gestión de foros), `/surveys` (Encuestas).
* **Componentes estructurales:** Se utiliza un componente `Layout` global que envuelve las rutas privadas, manteniendo un `Sidebar` persistente y un `Header` dinámico, asegurando que el usuario nunca pierda el contexto de dónde se encuentra.

## [EP 1.5] Creación del proyecto con Vite y React

A diferencia de otros enfoques, este proyecto fue inicializado utilizando **Vite** con **React** y **TypeScript**, estructurado dentro de un monorepo administrado por `pnpm`.

* **Rendimiento:** Vite permite un inicio de servidor de desarrollo instantáneo y un Hot Module Replacement (HMR) extremadamente rápido.
* **Estilos:** Se integró **Tailwind CSS v4** para el estilizado basado en utilidades, permitiendo crear temas dinámicos (Light/Dark y colores de acento configurables) de manera nativa mediante variables CSS (`oklch`).
* **Validaciones compartidas:** Se creó un paquete local `@proyecto_publico/schemas` utilizando **Zod**, el cual es consumido tanto por el frontend (formularios) como por el backend (middlewares), garantizando una única fuente de verdad para las reglas de negocio.

## [EP 1.6] Diseño de pantallas principales y estructura

El código del cliente (`apps/frontend/src`) mantiene un orden estricto:

* `/pages`: Contiene las vistas completas divididas por dominio (auth, forums, discussions, comments, surveys).
* `/components`: Almacena componentes de UI reutilizables como `ButtonLoading`, `InputForm`, `CommentItem` y tarjetas de contenido.
* `/api`: Centraliza la configuración de Axios y las llamadas a los distintos endpoints del backend.
* `/context`: Maneja los estados globales de la aplicación, como la sesión del usuario (`AuthContext`) y la apariencia visual (`ThemeContext`).

## [EP 2.2] Configuración y modelado de la base de datos

Se diseñó una base de datos relacional en **PostgreSQL** (alojada en Supabase) para garantizar la persistencia e integridad de las participaciones ciudadanas. Algunas de las decisiones clave fueron:

* **Trazabilidad de interacciones:** Se implementaron las tablas `comments` y la tabla intermedia `comment_votes` para manejar una lógica robusta de upvotes y downvotes, asegurando que un usuario solo pueda emitir un voto por comentario.
* **Comentarios anidados:** La tabla de comentarios utiliza un modelo de auto-referencia (`parent_comment_id`) que permite crear hilos de discusión de múltiples niveles.
* **Estandarización geográfica:** Las ubicaciones de los usuarios están normalizadas mediante tablas de referencias paramétricas (`regiones` y `comunas`).
* **Seguridad:** Las contraseñas nunca se almacenan en texto plano; se utiliza `bcryptjs` para el hashing antes de la inserción en la base de datos.
