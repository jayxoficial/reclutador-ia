# Proyecto Final de Inteligencia Artificial: Reclutador IA

Este repositorio contiene el proyecto final del Diplomado de Inteligencia Artificial. Se trata de un sistema inteligente que ayuda a las empresas a analizar y depurar aplicaciones de empleo, optimizando el proceso de reclutamiento mediante automatización, procesamiento de lenguaje natural e integración con herramientas como Firebase y Google APIs.

---

## 🎯 Objetivo del Proyecto

Optimizar el proceso de selección de personal con inteligencia artificial, permitiendo:

- Carga masiva de currículums en PDF.
- Extracción automática de datos relevantes.
- Análisis automatizado de perfiles según criterios definidos.
- Selección del mejor candidato con respaldo de datos.
- Generación de informes y notificación automática.

---

## ⚙️ Características del Sistema

- **Interfaz intuitiva y visual**, adaptable a distintos dispositivos.
- **Carga y previsualización de CVs** antes del procesamiento.
- **Campos personalizables** para definir los requisitos del puesto:
  - Área
  - Nivel académico
  - Experiencia
  - Habilidades
  - Idiomas
  - Otros requisitos
- **Automatización del análisis y selección** del candidato ideal.
- **Notificación por correo electrónico** al candidato seleccionado.
- **Informe para empleador** con análisis detallado del perfil elegido.

---

## 🛠️ Tecnologías Utilizadas

- Firebase (Autenticación, Hosting, Firestore/Realtime Database)
- Node.js + Express.js
- HTML, CSS, JavaScript
- Google Drive API
- Google Sheets API
- Procesamiento de lenguaje natural (PLN)

---

## 🗂️ Estructura del Proyecto

```
├── public/
├── app.js
├── server.js
├── chatbot.js
├── config.json
├── firebase.json
├── googleDocsAPI.js
├── index.html
├── package.json
├── README.md
```

---

## 🧪 Instrucciones para ejecutar

```bash
# Clonar el repositorio
git clone https://github.com/jayxoficial/reclutador-ia
cd reclutador-ia

# Instalar dependencias
npm install

# Ejecutar el servidor local
node server.js
```

Abre `http://localhost:3000` en tu navegador.

---

## ✅ Estado del Proyecto

**Completado ✔**
