import { getCurrentTheme, colors, darkColors, toggleTheme } from './theme.js';
import { parseVennCode } from './parser.js';
import { generateDynamicDiagram } from './renderer.js';

export function generateLegend(data) {
    const setKeys = Object.keys(data.sets);
    const currentTheme = getCurrentTheme();
    const currentColors = currentTheme === 'dark' ? darkColors : colors;
    let legend = '';

    setKeys.forEach((key, index) => {
        const color = currentColors[index % currentColors.length];
        legend += `
                <div class="legend-item">
                    <div class="legend-color" style="background-color: ${color};"></div>
                    <span>${key}: ${data.sets[key].label}</span>
                </div>
            `;
    });

    return legend;
}

export function generateStats(data) {
    const setKeys = Object.keys(data.sets);
    const intersectionKeys = Object.keys(data.intersections);

    let totalElements = 0;
    Object.values(data.sets).forEach(set => totalElements += set.value);
    Object.values(data.intersections).forEach(value => totalElements += value);

    const stats = `
            <div class="stat-item">
                <strong>Conjuntos:</strong> ${setKeys.length}
            </div>
            <div class="stat-item">
                <strong>Intersecciones:</strong> ${intersectionKeys.length}
            </div>
            <div class="stat-item">
                <strong>Total de elementos:</strong> ${totalElements}
            </div>
            <div class="stat-item">
                <strong>Intersección más compleja:</strong> ${intersectionKeys.reduce((a, b) => a.length > b.length ? a : b, '')}
            </div>
        `;

    return stats;
}

export function generateDiagram() {
    const code = document.getElementById('codeInput').value;
    const errorDiv = document.getElementById('errorMessage');
    const titleDiv = document.getElementById('diagramTitle');
    const contentDiv = document.getElementById('diagramContent');
    const legendDiv = document.getElementById('legend');
    const infoPanel = document.getElementById('infoPanel');
    const statsDiv = document.getElementById('stats');

    try {
        const data = parseVennCode(code);

        if (!data.title) {
            throw new Error('Falta el título del diagrama');
        }

        if (Object.keys(data.sets).length === 0) {
            throw new Error('No se encontraron conjuntos válidos');
        }

        titleDiv.textContent = data.title;

        const svg = generateDynamicDiagram(data);
        const legend = generateLegend(data);
        const stats = generateStats(data);

        contentDiv.innerHTML = svg;
        legendDiv.innerHTML = legend;
        statsDiv.innerHTML = stats;

        infoPanel.style.display = 'block';
        errorDiv.style.display = 'none';

    } catch (error) {
        errorDiv.textContent = 'Error: ' + error.message;
        errorDiv.style.display = 'block';
        contentDiv.innerHTML = '';
        legendDiv.innerHTML = '';
        infoPanel.style.display = 'none';
    }
}

export function clearDiagram() {
    document.getElementById('codeInput').value = '';
    document.getElementById('diagramContent').innerHTML = '';
    document.getElementById('legend').innerHTML = '';
    document.getElementById('diagramTitle').textContent = 'Tu diagrama aparecerá aquí';
    document.getElementById('infoPanel').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

export function loadExample(element) {
    document.getElementById('codeInput').value = element.textContent.trim();
    generateDiagram();
}

// Make functions available globally for HTML event handlers
window.generateDiagram = generateDiagram;
window.clearDiagram = clearDiagram;
window.loadExample = loadExample;
window.toggleTheme = () => toggleTheme(generateDiagram);

// Generar diagrama inicial
window.onload = function() {
    document.body.setAttribute('data-theme', 'dark');
    const button = document.querySelector('.theme-toggle');
    if (button) button.innerHTML = '☀️ Tema Claro';
    generateDiagram();
};
