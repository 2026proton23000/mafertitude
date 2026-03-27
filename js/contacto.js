document.addEventListener('DOMContentLoaded', () => {
    // On ne fait rien si on n'est pas sur la page contact
    const contactBtn = document.getElementById('btn-enviar-duda');
    if (!contactBtn) return;

    contactBtn.addEventListener('click', () => {
        const msg = document.getElementById('msg-contacto').value;
        const nombre = document.getElementById('nombre-contacto').value || "un cliente";

        if (!msg) {
            alert("¡Hola! Por favor escribe tu mensaje antes de enviar.");
            return;
        }

        const fullMessage = `Hola Mafer, soy ${nombre}. Tengo una consulta: ${msg}`;
        
        // On utilise la fonction globale définie dans app.js
        sendToMafer(fullMessage);
    });
});