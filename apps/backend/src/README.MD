#  Estructura del Backend

Este documento detalla la arquitectura del backend y la responsabilidad de cada una de sus partes para mantener un código limpio, escalable y organizado.

De hacerse cambios en la arquitectura del backend estos deben ser añadidos o editados del presente documento.

---

##  Directorios y Componentes

###  Controllers
Su única responsabilidad es **manejar el protocolo HTTP**: recibir la petición (request), extraer los parámetros necesarios, delegar el procesamiento de datos a los Services y enviar la respuesta (response). 
No contienen lógica de base de datos ni cálculos complejos.

###  Services
Contienen la **lógica de negocio pura**. Son los encargados de interactuar con la base de datos, realizar cálculos, encriptar contraseñas y ejecutar las reglas principales de la aplicación. 

###  Middleware
Funciones que actúan como **verificaciones intermedias**. Su uso principal es la autenticación y autorización, permitiendo o denegando el acceso a rutas protegidas antes de que lleguen al controlador.

###  Router
Es el encargado de **definir los endpoints** del backend. Mapea las URLs que el frontend puede solicitar y las vincula con sus respectivos controladores y middlewares.

### Schemas
Se encargan de las **validaciones de datos**. Aseguran que la información recibida cumpla con el formato correcto (tipos de datos, campos obligatorios, longitud) antes de intentar interactuar con la base de datos, usando **Zod 3**.

###  Libs 
Alojan **funciones genéricas y utilitarias** que pueden ser reutilizadas en diferentes partes del proyecto, como configuraciones de servicios externos, utilidades de fecha o tokens.

---

##  Flujo de una Petición
1. **Router**: Recibe la petición (request).
2. **Middleware**: Valida permisos o sesiones.
3. **Schemas**: Valida que los datos enviados sean correctos.
4. **Controller**: Extrae los datos y llama al servicio correspondiente.
5. **Services**: Ejecuta la lógica y retorna los datos procesados.
6. **Controller (Finalización)**: Envía la respuesta final al cliente.

