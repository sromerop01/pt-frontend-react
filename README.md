# BeKind Admin Dashboard - Prueba Técnica

Este proyecto es un panel administrativo desarrollado como parte del reto técnico. Permite gestionar acciones, incluyendo autenticación de usuarios y creación de nuevas categorías con soporte para subida de imágenes.

## Cómo correr el proyecto localmente

### Prerrequisitos
- Node.js (v16 o superior recomendado)
- NPM o Yarn

### Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/sromerop01/prueba-tecnica-be-kind.git
   cd prueba-tecnica-be-kind

2. **Instalar dependencias**
    ```bash
    npm install

3. **Ejecutar en modo desarrollo**
    ```bash
    npm run dev


## Stack Tecnológico
- Core: React + TypeScript (Vite).

- Estilos: Tailwind CSS para replicar el diseño de Figma y agilizar el maquetado.

- Gestión de Formularios: React Hook Form para el manejo de validaciones y rendimiento en inputs.

- Gestión de Estado Global: React Context API para la autenticación y persistencia del token.

- Enrutamiento: React Router DOM v6 con manejo de Rutas Protegidas y Públicas.

- Iconos: Lucide React.

- HTTP Client: Fetch API nativo con manejo de FormData.

## Decisiones Técnicas y Arquitectura
### 1. Estructura de Directorios
Se optó por una arquitectura modular y escalable:

/api: Lógica de conexión con el backend separada de la UI.

/components: Componentes reutilizables (Modales, Tablas, Inputs).

/context: Lógica de autenticación (AuthProvider) para envolver la aplicación.

/pages: Vistas principales correspondientes a las rutas.

### 2. Manejo de Autenticación
Se implemento un Contexto de Autenticación (AuthContext) que provee el estado isAuthenticated. Se crearon componentes ProtectedRoute (para dashboard) y PublicRoute (para login), evitando que un usuario logueado vea el login nuevamente.

### 3. Cambios en el UI
No se usó el input nativo de color. Se implementó un componente controlado que actualiza el valor en React Hook Form mediante setValue, permitiendo validaciones nativas sobre elementos UI personalizados (botones de colores).


## Supuestos y Resolución de Ambigüedades (Backend)
Durante la integración con el endpoint POST /api/v1/actions/admin-add, estas fueron las decisiones tomadas para lograr la integración exitosa:

- Formato del Payload (multipart/form-data): Al requerirse la subida de un logo/imagen, se asumio que el envío no podía ser JSON. Se implementa FormData para enviar datos de texto mezclados con archivos binarios.

- Inferencia de Campos: Basado en la respuesta del endpoint GET, se mapean los campos del formulario:

        name: string

        description: string

        color: string (HEX)

        status: boolean

        icon: FileList


Headers HTTP: Se omitió deliberadamente el header Content-Type: application/json y Content-Type: multipart/form-data en la petición de creación, permitiendo que el navegador establezca automáticamente el boundary correcto para la subida de archivos.

## Funcionalidades Extra
- Feedback Visual: Spinners de carga al enviar formularios y mensajes de error contextuales.

- Validaciones: Todos los campos requeridos y formatos (longitud de texto, selección de color) están validados antes del envío.

- Refresco Automático: Al crear una categoría exitosamente, la tabla se actualiza automáticamente sin recargar la página.