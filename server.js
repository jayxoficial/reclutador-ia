// server.js
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { GoogleDocsAPI } = require('./googleDocsAPI');

// Leer configuración y credenciales
const configPath = path.join(__dirname, 'config.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

const apiKey = config.googleDocs.apiKey;
const credentials = config.googleDocs.credentials;

const googleDocsAPI = new GoogleDocsAPI(apiKey, credentials);

const app = express();
app.use(cors());
app.use(express.json());
// Servir archivos estáticos del frontend
app.use(express.static(__dirname));

// Inicializar Google Docs API antes de aceptar peticiones
(async () => {
  await googleDocsAPI.inicializar();
})();

app.post('/api/saveInterview', async (req, res) => {
  const { documentTitle, sections } = req.body;
  try {
    console.log('Intentando crear documento:', documentTitle, sections);
    const result = await googleDocsAPI.crearDocumento({ documentTitle, sections });
    console.log('Documento creado:', result);
    res.json({ success: true, documentUrl: result.documentUrl });
  } catch (error) {
    console.error('Error al crear el documento:', error); // <-- Agrega log detallado
    res.status(500).json({ success: false, error: error.message, stack: error.stack });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
