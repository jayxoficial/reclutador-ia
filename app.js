// Instancia del chatbot
let chatbot = new EntrevistaChatbot();
let esperandoRespuesta = false;

// Elementos del DOM
const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const mensajeInicial = document.getElementById('mensajeInicial');

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    inicializarChatbot();
    configurarEventos();
});

function inicializarChatbot() {
    const mensajeInicio = chatbot.iniciarEntrevista();
    mensajeInicial.innerHTML = formatearMensaje(mensajeInicio);
    actualizarProgreso();
}

function configurarEventos() {
    // Enviar con Enter (pero permitir Shift+Enter para nueva línea)
    userInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            enviarRespuesta();
        }
    });

    // Auto-resize del textarea
    userInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
    });
}

async function enviarRespuesta() {
    const respuesta = userInput.value.trim();
    
    if (!respuesta || esperandoRespuesta) {
        return;
    }

    // Deshabilitar input mientras se procesa
    esperandoRespuesta = true;
    sendButton.disabled = true;
    userInput.disabled = true;

    // Mostrar mensaje del usuario
    agregarMensaje(respuesta, 'user');
    userInput.value = '';
    userInput.style.height = 'auto';

    // Simular tiempo de procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Procesar respuesta
    const respuestaChatbot = await chatbot.procesarRespuesta(respuesta);
    
    // Mostrar respuesta del chatbot
    agregarMensaje(respuestaChatbot, 'bot');
    
    // Actualizar progreso
    actualizarProgreso();

    // Rehabilitar input
    esperandoRespuesta = false;
    sendButton.disabled = false;
    userInput.disabled = false;
    userInput.focus();
}

function agregarMensaje(mensaje, tipo) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${tipo}-message`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.innerHTML = formatearMensaje(mensaje);
    
    messageDiv.appendChild(contentDiv);
    chatContainer.appendChild(messageDiv);
    
    // Scroll al final
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function formatearMensaje(mensaje) {
    // Convertir **texto** a <strong>texto</strong>
    return mensaje.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                 .replace(/\n/g, '<br>');
}

function actualizarProgreso() {
    const totalPreguntas = 20;
    let progreso = 0;
    let textoProgreso = '';

    if (chatbot.esperandoNombre) {
        progreso = 0;
        textoProgreso = 'Esperando nombre del candidato...';
    } else if (chatbot.preguntaActual >= 0 && chatbot.preguntaActual < totalPreguntas) {
        progreso = ((chatbot.preguntaActual + 1) / totalPreguntas) * 100;
        textoProgreso = `Pregunta ${chatbot.preguntaActual + 1} de ${totalPreguntas}`;
    } else if (chatbot.preguntaActual >= totalPreguntas) {
        progreso = 100;
        textoProgreso = 'Entrevista completada ✅';
    }

    progressFill.style.width = progreso + '%';
    progressText.textContent = textoProgreso;
}

// Función para reiniciar la entrevista
function reiniciarEntrevista() {
    if (confirm('¿Estás seguro de que quieres reiniciar la entrevista? Se perderán todas las respuestas.')) {
        chatbot.reiniciar();
        chatContainer.innerHTML = '';
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message bot-message';
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.innerHTML = formatearMensaje(chatbot.iniciarEntrevista());
        messageDiv.appendChild(contentDiv);
        chatContainer.appendChild(messageDiv);
        
        actualizarProgreso();
        userInput.focus();
    }
}