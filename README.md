# Prompt Manager

Prompt Manager es una aplicación web para gestionar, organizar y compartir prompts para modelos de lenguaje. Permite a los usuarios crear categorías, prompts, comandos y parámetros en una estructura jerárquica, facilitando la organización y reutilización de prompts efectivos.

## 🚀 Tecnologías Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase (Autenticación), Airtable (Base de datos)
- **Herramientas de desarrollo**: Vite, ESLint
- **Despliegue**: Firebase Hosting

## 📋 Requisitos Previos

- Node.js (versión 14 o superior)
- npm o yarn
- Cuenta en Firebase
- Cuenta en Airtable

## 🔧 Instalación y Configuración

1. **Clonar el repositorio**

```bash
git clone https://github.com/abdeneve/prompt-manager.git
cd prompt-manager
```

2. **Instalar dependencias**

```bash
npm install
# o
yarn install
```

3. **Configurar variables de entorno**

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```
# Firebase
VITE_API_KEY=tu_api_key_de_firebase
VITE_AUTH_DOMAIN=tu_auth_domain
VITE_PROJECT_ID=tu_project_id
VITE_STORAGE_BUCKET=tu_storage_bucket
VITE_MESSAGING_SENDER_ID=tu_messaging_sender_id
VITE_APP_ID=tu_app_id

# Airtable
VITE_AIRTABLE_API_KEY=tu_api_key_de_airtable
VITE_AIRTABLE_BASE_ID=tu_base_id
VITE_AIRTABLE_CATEGORIES_TABLE_ID=tu_categories_table_id
VITE_AIRTABLE_PROMPTS_TABLE_ID=tu_prompts_table_id
VITE_AIRTABLE_COMMANDS_TABLE_ID=tu_commands_table_id
VITE_AIRTABLE_PARAMETERS_TABLE_ID=tu_parameters_table_id
```

4. **Iniciar el servidor de desarrollo**

```bash
npm run dev
# o
yarn dev
```

5. **Construir para producción**

```bash
npm run build
# o
yarn build
```

## 📊 Estructura de la Base de Datos (Airtable)

La aplicación utiliza Airtable como base de datos con las siguientes tablas:

1. **Categories**: Categorías para organizar prompts
   - CategoryId: Identificador único
   - Name: Nombre de la categoría
   - Description: Descripción de la categoría

2. **Prompts**: Prompts asociados a categorías
   - PromptId: Identificador único
   - CategoryId: ID de la categoría a la que pertenece
   - Objective: Objetivo del prompt
   - Description: Descripción detallada
   - Url_video_reference: URL de referencia (opcional)

3. **Commands**: Comandos asociados a prompts
   - CommandId: Identificador único
   - PromptId: ID del prompt al que pertenece
   - Sequence: Orden de secuencia
   - Name: Nombre del comando
   - Command: Texto del comando/prompt

4. **Parameters**: Parámetros asociados a comandos
   - ParameterId: Identificador único
   - CommandId: ID del comando al que pertenece
   - Sequence: Orden de secuencia
   - Name: Nombre del parámetro
   - Value: Valor del parámetro

## 🌟 Características Principales

- **Autenticación de usuarios**: Registro e inicio de sesión mediante Firebase
- **Gestión de categorías**: Crear y organizar categorías para prompts
- **Gestión de prompts**: Crear prompts con objetivos y descripciones
- **Gestión de comandos**: Crear comandos asociados a prompts con secuencia ordenada
- **Gestión de parámetros**: Crear parámetros para personalizar comandos
- **Búsqueda**: Buscar prompts por objetivo
- **Interfaz responsive**: Diseño adaptable para dispositivos móviles y de escritorio
- **Copiar al portapapeles**: Copiar comandos con un solo clic

## 🔐 Configuración de Firebase

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita la autenticación por correo electrónico/contraseña
3. Obtén las credenciales de configuración para tu aplicación web
4. Configura las reglas de seguridad según tus necesidades

## 📋 Configuración de Airtable

1. Crea una cuenta en [Airtable](https://airtable.com/)
2. Crea una base con las tablas mencionadas anteriormente
3. Obtén tu API Key y los IDs de la base y tablas
4. Configura los permisos de acceso según tus necesidades

## 🚀 Despliegue

La aplicación está configurada para ser desplegada en Firebase Hosting:

```bash
# Instalar Firebase CLI si no lo tienes
npm install -g firebase-tools

# Iniciar sesión en Firebase
firebase login

# Inicializar el proyecto de Firebase (si no lo has hecho)
firebase init

# Construir la aplicación
npm run build

# Desplegar a Firebase Hosting
firebase deploy
```

## 🤝 Contribución

Las contribuciones son bienvenidas. Por favor, sigue estos pasos:

1. Haz un fork del repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 📞 Contacto

Si tienes preguntas o sugerencias, no dudes en contactarme:

- Email: [abdeneve.salazar@gmail.com](mailto:abdeneve.salazar@gmail.com)
- GitHub: [abdeneve](https://github.com/abdeneve)
- LinkedIn: [abdeneve](https://www.linkedin.com/in/abdeneve/)

---