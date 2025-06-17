class EntrevistaChatbot {
    constructor() {
        this.preguntas = [
            "Cuéntame un poco sobre ti y tu experiencia profesional.",
            "¿Qué te atrajo de esta posición y a nuestra empresa?",
            "¿Cuáles dirías que son tus mayores fortalezas?",
            "¿Y cuáles consideras tus mayores debilidades?",
            "¿Dónde te ves dentro de 3 a 5 años?",
            "¿Cómo manejas la presión y los plazos ajustados?",
            "Describe una situación en la que hayas cometido un error en el trabajo. ¿Cómo lo manejaste?",
            "Cuéntame sobre un desafío profesional significativo que hayas enfrentado y cómo lo superaste.",
            "¿Prefieres trabajar en equipo o de forma individual? ¿Por qué?",
            "¿Cómo manejas los desacuerdos o conflictos con compañeros de trabajo o superiores?",
            "¿Qué te motiva en el trabajo?",
            "¿Qué haces para asegurar la calidad en tu trabajo?",
            "¿Alguna vez has tenido que adaptarte a un cambio importante en el trabajo? ¿Cómo lo hiciste?",
            "¿Qué papel juega la retroalimentación en tu desarrollo profesional?",
            "¿Qué harías en tus primeros 90 días si fueras contratado para este puesto?",
            "¿Qué valor añadido crees que puedes aportar a nuestro equipo?",
            "¿Cómo equilibras tu vida personal y profesional?",
            "Si hablaras con tu último jefe, ¿qué diría él/ella sobre ti?",
            "¿Qué estrategias usas para mantenerte productivo bajo presión?",
            "¿Qué acciones tomarías para integrarte eficazmente a un nuevo equipo de trabajo?"
        ];
        this.respuestas = [];
        this.nombreCandidato = '';
        this.preguntaActual = -1;
        this.esperandoNombre = true;
    }

    iniciarEntrevista() {
        return "¡Hola! Soy tu asistente virtual de reclutamiento. Vamos a realizar una entrevista que nos ayudará a conocerte mejor. Para comenzar, ¿podrías decirme tu nombre completo?";
    }

    procesarRespuesta(respuesta) {
        if (this.esperandoNombre) {
            this.nombreCandidato = respuesta.trim();
            this.esperandoNombre = false;
            this.preguntaActual = 0;
            return `Perfecto, ${this.nombreCandidato}. Ahora vamos a comenzar con la entrevista. Te haré 20 preguntas, una por una. Tómate tu tiempo para responder.\n\n**Pregunta 1:** ${this.preguntas[0]}`;
        }

        if (this.preguntaActual >= 0 && this.preguntaActual < this.preguntas.length) {
            // Guardar la respuesta actual
            this.respuestas.push({
                pregunta: this.preguntas[this.preguntaActual],
                respuesta: respuesta.trim()
            });

            this.preguntaActual++;

            // Verificar si hemos terminado todas las preguntas
            if (this.preguntaActual >= this.preguntas.length) {
                return this.finalizarEntrevista();
            }

            // Hacer la siguiente pregunta
            return `Gracias por tu respuesta. \n\n**Pregunta ${this.preguntaActual + 1}:** ${this.preguntas[this.preguntaActual]}`;
        }

        return "Ha ocurrido un error. Por favor, reinicia la entrevista.";
    }

    async finalizarEntrevista() {
        try {
            // Llamar a la API de Google Docs
            await this.guardarEnGoogleDocs();
            return `¡Excelente, ${this.nombreCandidato}! Hemos completado la entrevista. Todas tus respuestas han sido guardadas correctamente en nuestro sistema. \n\nMuchas gracias por tu tiempo y por compartir tu experiencia con nosotros. Estaremos en contacto contigo pronto con los siguientes pasos del proceso de selección. \n\n¡Que tengas un excelente día!`;
        } catch (error) {
            console.error('Error al guardar en Google Docs:', error);
            return `${this.nombreCandidato}, hemos completado la entrevista, pero hubo un problema técnico al guardar tus respuestas. Nuestro equipo técnico revisará esto y se pondrá en contacto contigo. ¡Gracias por tu paciencia!`;
        }
    }

    async guardarEnGoogleDocs() {
        const documentTitle = `Entrevista – ${this.nombreCandidato}`;
        const sections = this.respuestas;
        // Llamada real al backend usando fetch
        const response = await fetch('/api/saveInterview', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ documentTitle, sections })
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Error al guardar en Google Docs');
        }
        return await response.json();
    }

    reiniciar() {
        this.respuestas = [];
        this.nombreCandidato = '';
        this.preguntaActual = -1;
        this.esperandoNombre = true;
    }
}