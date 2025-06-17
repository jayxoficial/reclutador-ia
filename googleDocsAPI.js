class GoogleDocsAPI {
    constructor(apiKey, credentials) {
        this.apiKey = apiKey;
        this.credentials = credentials;
        this.docs = null;
        this.drive = null;
    }

    async inicializar() {
        // Inicializar la API de Google Docs
        const { google } = require('googleapis');
        const auth = new google.auth.GoogleAuth({
            credentials: this.credentials,
            scopes: [
                'https://www.googleapis.com/auth/documents',
                'https://www.googleapis.com/auth/drive.file'
            ]
        });

        this.docs = google.docs({ version: 'v1', auth });
        this.drive = google.drive({ version: 'v3', auth });
    }

    async crearDocumento({ documentTitle, sections }) {
        try {
            // Crear el documento
            const createResponse = await this.docs.documents.create({
                requestBody: {
                    title: documentTitle
                }
            });

            const documentId = createResponse.data.documentId;

            // Preparar el contenido
            const requests = [];
            let index = 1;

            // Agregar título
            requests.push({
                insertText: {
                    location: { index: index },
                    text: `${documentTitle}\n\nFecha: ${new Date().toLocaleDateString('es-ES')}\n\n`
                }
            });

            // Calcular el nuevo índice
            index += documentTitle.length + `\n\nFecha: ${new Date().toLocaleDateString('es-ES')}\n\n`.length;

            // Agregar cada pregunta y respuesta
            sections.forEach((section, i) => {
                const contenido = `${i + 1}. ${section.pregunta}\n\nRespuesta: ${section.respuesta}\n\n`;
                requests.push({
                    insertText: {
                        location: { index: index },
                        text: contenido
                    }
                });
                index += contenido.length;
            });

            // Aplicar el formato
            await this.docs.documents.batchUpdate({
                documentId: documentId,
                requestBody: {
                    requests: requests
                }
            });

            // Compartir el documento con el usuario principal
            await this.compartirDocumento(documentId, 'feest19@gmail.com');

            console.log(`Documento creado exitosamente: ${documentId}`);
            return {
                success: true,
                documentId: documentId,
                documentUrl: `https://docs.google.com/document/d/${documentId}/edit`
            };

        } catch (error) {
            console.error('Error al crear el documento:', error);
            throw error;
        }
    }

    async compartirDocumento(documentId, email) {
        await this.drive.permissions.create({
            fileId: documentId,
            requestBody: {
                type: 'user',
                role: 'writer', // Cambia a 'reader' si solo quieres lectura
                emailAddress: email
            }
        });
    }
}

// Instancia global
module.exports = { GoogleDocsAPI };