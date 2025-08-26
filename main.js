let currentTheme = 'dark';

// Colores predefinidos para los conjuntos
const colors = [
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

const darkColors = [
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

function toggleTheme() {
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
    if (document.getElementById('diagramContent').innerHTML) {
        generateDiagram();
    }
}

function parseVennCode(code) {
    const lines = code.trim().split('\n');
    const data = {
        title: '',
        sets: {},
        intersections: {}
    };

    for (let line of lines) {
        line = line.trim();

        if (line.startsWith('title ')) {
            data.title = line.substring(6).trim();
        } else if (line.match(/^[A-Z] \[.+\]: \d+$/)) {
            const match = line.match(/^([A-Z]) \[(.+)\]: (\d+)$/);
            if (match) {
                data.sets[match[1]] = {
                    label: match[2],
                    value: parseInt(match[3])
                };
            }
        } else if (line.match(/^[A-Z]{2,}: \d+$/)) {
            const match = line.match(/^([A-Z]{2,}): (\d+)$/);
            if (match) {
                data.intersections[match[1]] = parseInt(match[2]);
            }
        }
    }

    return data;
}

function generateCirclePositions(numSets, hasIntersections) {
    const positions = [];
    const centerX = 400;
    const centerY = 300;
    const svgWidth = 800;
    const svgHeight = 600;
    const margin = 80; // Margen desde los bordes

    // Calcular radio adaptativo basado en número de conjuntos y espacio disponible
    let radius;
    if (numSets <= 2) {
        radius = Math.min(100, (svgWidth - margin * 2) / 4);
    } else if (numSets <= 4) {
        radius = Math.min(80, (svgWidth - margin * 2) / 6);
    } else if (numSets <= 6) {
        radius = Math.min(60, (svgWidth - margin * 2) / 8);
    } else {
        radius = Math.min(45, (svgWidth - margin * 2) / 10);
    }

    if (numSets === 1) {
        positions.push({ x: centerX, y: centerY, r: radius });
    } else if (numSets === 2) {
        const spacing = hasIntersections ? radius * 0.7 : radius * 2.2;
        positions.push({ x: centerX - spacing, y: centerY, r: radius });
        positions.push({ x: centerX + spacing, y: centerY, r: radius });
    } else if (numSets === 3) {
        const spacing = hasIntersections ? radius * 0.8 : radius * 2.5;
        positions.push({ x: centerX - spacing, y: centerY - spacing * 0.6, r: radius });
        positions.push({ x: centerX + spacing, y: centerY - spacing * 0.6, r: radius });
        positions.push({ x: centerX, y: centerY + spacing, r: radius });
    } else {
        // Para 4 o más conjuntos, usar distribución circular
        const angleStep = (2 * Math.PI) / numSets;
        let layoutRadius;

        if (hasIntersections) {
            // Con intersecciones: círculos más cerca
            layoutRadius = Math.max(radius * 1.5, 80);
        } else {
            // Sin intersecciones: calcular distancia para evitar superposición
            const minDistance = radius * 2.2; // Distancia mínima entre centros
            const circumference = numSets * minDistance;
            layoutRadius = Math.max(circumference / (2 * Math.PI), 120);

            // Asegurar que no se salga del área visible
            const maxAvailableRadius = Math.min((svgWidth - margin * 2) / 2, (svgHeight - margin * 2) / 2) - radius;
            layoutRadius = Math.min(layoutRadius, maxAvailableRadius);
        }

        for (let i = 0; i < numSets; i++) {
            const angle = i * angleStep - Math.PI / 2;
            positions.push({
                x: centerX + Math.cos(angle) * layoutRadius,
                y: centerY + Math.sin(angle) * layoutRadius,
                r: radius
            });
        }
    }

    return positions;
}

function calculateIntersectionPosition(sets, positions, numSets) {
    let x = 0, y = 0;
    for (let set of sets) {
        const index = set.charCodeAt(0) - 65; // A=0, B=1, etc.
        x += positions[index].x;
        y += positions[index].y;
    }
    let intersectionX = x / sets.length;
    let intersectionY = y / sets.length;

    // Mover el punto de intersección hacia el centro del SVG para mejorar la visibilidad
    const centerX = 400;
    const centerY = 300;
    const factor = 0.3 + (numSets - sets.length) * 0.1;
    intersectionX += (centerX - intersectionX) * factor;
    intersectionY += (centerY - intersectionY) * factor;

    return { x: intersectionX, y: intersectionY };
}

function adjustForSeparation(positions, setKeys, connections) {
    const iterations = 100;
    const repulsion = 0.5;

    for (let iter = 0; iter < iterations; iter++) {
        let changed = false;
        for (let i = 0; i < setKeys.length; i++) {
            for (let j = i + 1; j < setKeys.length; j++) {
                const key1 = setKeys[i];
                const key2 = setKeys[j];

                const connectionKey = [key1, key2].sort().join('');
                const areConnected = connections.has(connectionKey);

                if (!areConnected) {
                    const pos1 = positions[i];
                    const pos2 = positions[j];

                    const dx = pos2.x - pos1.x;
                    const dy = pos2.y - pos1.y;
                    const distance = Math.sqrt(dx * dx + dy * dy) || 0.1;
                    const minDistance = pos1.r + pos2.r + 20; // Radius sum + buffer

                    if (distance < minDistance) {
                        changed = true;
                        const overlap = minDistance - distance;
                        const adjustX = (dx / distance) * overlap * 0.5 * repulsion;
                        const adjustY = (dy / distance) * overlap * 0.5 * repulsion;

                        pos1.x -= adjustX;
                        pos1.y -= adjustY;
                        pos2.x += adjustX;
                        pos2.y += adjustY;
                    }
                }
            }
        }
        if (!changed) break; // Stop if system is stable
    }

    // Add a centering step at the end
    const centerX = 400;
    const centerY = 300;
    let totalX = 0, totalY = 0;
    positions.forEach(p => { totalX += p.x; totalY += p.y; });
    const avgX = totalX / positions.length;
    const avgY = totalY / positions.length;
    const shiftX = centerX - avgX;
    const shiftY = centerY - avgY;

    positions.forEach(p => {
        p.x += shiftX;
        p.y += shiftY;
    });
}

function generateDynamicDiagram(data) {
    const setKeys = Object.keys(data.sets);
    const numSets = setKeys.length;

    if (numSets === 0) {
        throw new Error('No se encontraron conjuntos válidos');
    }

    // Detectar si hay intersecciones
    const hasIntersections = Object.keys(data.intersections).length > 0;
    const positions = generateCirclePositions(numSets, hasIntersections);

    // If there are intersections, adjust positions to separate non-intersecting sets.
    if (hasIntersections && numSets > 1) {
        const connections = new Set();
        Object.keys(data.intersections).forEach(key => {
            const sets = key.split('');
            if (sets.length > 1) {
                for (let i = 0; i < sets.length; i++) {
                    for (let j = i + 1; j < sets.length; j++) {
                        connections.add([sets[i], sets[j]].sort().join(''));
                    }
                }
            }
        });
        adjustForSeparation(positions, setKeys, connections);
    }

    // Ajustar tamaño del SVG según número de conjuntos
    let svgWidth = 800;
    let svgHeight = 600;
    if (numSets > 6) {
        svgWidth = 1000;
        svgHeight = 750;
    } else if (numSets > 4) {
        svgWidth = 900;
        svgHeight = 675;
    }
    const currentColors = currentTheme === 'dark' ? darkColors : colors;

    let svg = `<svg class="venn-svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">`;

    // Generar círculos
    setKeys.forEach((key, index) => {
        const pos = positions[index];
        const color = currentColors[index % currentColors.length];
        svg += `<circle cx="${pos.x}" cy="${pos.y}" r="${pos.r}"
                               fill="${color}"
                               stroke="var(--circle-stroke)"
                               stroke-width="2"/>`;
    });

    // Generar etiquetas de conjuntos
    setKeys.forEach((key, index) => {
        const pos = positions[index];
        const labelOffset = pos.r + 25;
        let labelX = pos.x;
        let labelY = pos.y - labelOffset;

        // Ajustar posición de etiqueta según el número de conjuntos
        if (numSets === 2) {
            labelY = pos.y - labelOffset;
        } else if (numSets === 3) {
            if (index < 2) {
                labelY = pos.y - labelOffset;
            } else {
                labelY = pos.y + labelOffset + 10;
            }
        } else if (numSets > 3) {
            // Para múltiples conjuntos, posicionar etiquetas radialmente
            const angle = (index * 2 * Math.PI / numSets) - Math.PI / 2;
            const distance = pos.r + 35;
            labelX = pos.x + Math.cos(angle) * distance;
            labelY = pos.y + Math.sin(angle) * distance;
        }

        svg += `<text x="${labelX}" y="${labelY}" class="label-text">${data.sets[key].label}</text>`;
    });

    // Generar valores exclusivos de cada conjunto
    setKeys.forEach((key, index) => {
        const pos = positions[index];
        let valueX = pos.x;
        let valueY = pos.y;

        // Ajustar posición para conjuntos múltiples
        if (numSets > 2) {
            const angle = (index * 2 * Math.PI / numSets) - Math.PI / 2;
            valueX = pos.x + Math.cos(angle) * (pos.r * 0.6);
            valueY = pos.y + Math.sin(angle) * (pos.r * 0.6);
        }

        svg += `<text x="${valueX}" y="${valueY}" class="circle-text">${data.sets[key].value}</text>`;
    });

    // Generar intersecciones
    Object.keys(data.intersections).forEach(intersection => {
        const sets = intersection.split('');
        const pos = calculateIntersectionPosition(sets, positions, numSets);

        svg += `<text x="${pos.x}" y="${pos.y}" class="intersection-text">${data.intersections[intersection]}</text>`;
    });

    svg += '</svg>';
    return svg;
}

function generateLegend(data) {
    const setKeys = Object.keys(data.sets);
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

function generateStats(data) {
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

function generateDiagram() {
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

function clearDiagram() {
    document.getElementById('codeInput').value = '';
    document.getElementById('diagramContent').innerHTML = '';
    document.getElementById('legend').innerHTML = '';
    document.getElementById('diagramTitle').textContent = 'Tu diagrama aparecerá aquí';
    document.getElementById('infoPanel').style.display = 'none';
    document.getElementById('errorMessage').style.display = 'none';
}

function loadExample(element) {
    document.getElementById('codeInput').value = element.textContent.trim();
    generateDiagram();
}

// Generar diagrama inicial
window.onload = function() {
    document.body.setAttribute('data-theme', 'dark');
    const button = document.querySelector('.theme-toggle');
    if (button) button.innerHTML = '☀️ Tema Claro';
    generateDiagram();
};
