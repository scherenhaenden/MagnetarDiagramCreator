// Colores predefinidos para los conjuntos
export const colors = [
    'rgba(255, 99, 132, 0.6)',   // Rosa
    'rgba(54, 162, 235, 0.6)',   // Azul
    'rgba(255, 206, 86, 0.6)',   // Amarillo
    'rgba(75, 192, 192, 0.6)',   // Verde agua
    'rgba(153, 102, 255, 0.6)',  // Púrpura
    'rgba(255, 159, 64, 0.6)',   // Naranja
    'rgba(199, 199, 199, 0.6)',  // Gris
    'rgba(83, 102, 255, 0.6)',   // Azul índigo
    'rgba(255, 99, 255, 0.6)',   // Magenta
    'rgba(99, 255, 132, 0.6)'    // Verde lima
];

export const darkColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)',
    'rgba(199, 199, 199, 0.7)',
    'rgba(83, 102, 255, 0.7)',
    'rgba(255, 99, 255, 0.7)',
    'rgba(99, 255, 132, 0.7)'
];

let currentTheme = 'dark';

export function getCurrentTheme() {
    return currentTheme;
}

export function setCurrentTheme(theme) {
    currentTheme = theme;
}

export function toggleTheme(generateDiagramCallback) {
    const body = document.body;
    const button = document.querySelector('.theme-toggle');

    if (currentTheme === 'light') {
        body.setAttribute('data-theme', 'dark');
        button.innerHTML = '☀️ Tema Claro';
        currentTheme = 'dark';
    } else {
        body.removeAttribute('data-theme');
        button.innerHTML = '🌙 Tema Oscuro';
        currentTheme = 'light';
    }

    // Regenerar diagrama si existe
    if (document.getElementById('diagramContent').innerHTML && typeof generateDiagramCallback === 'function') {
        generateDiagramCallback();
    }
}
