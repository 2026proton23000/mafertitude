// Configuration globale
const CONFIG = {
    phone: "51934735936",
    name: "La Lechería de Mafer"
};

document.addEventListener('DOMContentLoaded', () => {
    console.log(`${CONFIG.name} cargado correctamente.`);
    
    // 1. Effet élégant sur le header au scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = "0.8rem 5%";
            header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
        } else {
            header.style.padding = "1.5rem 5%";
            header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
        }
    });

    // 2. Marquer le lien de navigation actif
    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll('nav a').forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.borderBottom = "2px solid var(--cow-black)";
            link.style.color = "var(--gold)";
        }
    });
});

/**
 * Fonction utilitaire pour envoyer sur WhatsApp
 * @param {string} message - Le texte à envoyer
 */
function sendToMafer(message) {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${CONFIG.phone}?text=${encoded}`, '_blank');
}
