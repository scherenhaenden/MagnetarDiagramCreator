import { generateDynamicDiagram } from '../src/renderer.js';
import { jest } from '@jest/globals';

// Mock theme module
jest.unstable_mockModule('../src/theme.js', () => ({
    getCurrentTheme: () => 'light',
    colors: ['red', 'blue'],
    darkColors: ['darkred', 'darkblue']
}));

// We need to import the module AFTER mocking for ESM
const { generateDynamicDiagram: generatedDiagram } = await import('../src/renderer.js');


describe('generateDynamicDiagram', () => {
    test('should generate SVG for valid input', () => {
        const data = {
            title: 'Test',
            sets: {
                A: { label: 'Set A', value: 10 },
                B: { label: 'Set B', value: 10 }
            },
            intersections: {
                AB: 5
            }
        };

        const svg = generatedDiagram(data);
        expect(svg).toContain('<svg');
        expect(svg).toContain('Set A');
        expect(svg).toContain('Set B');
        expect(svg).toContain('class="venn-svg"');
    });

    test('should throw error for no sets', () => {
        const data = {
            title: 'Empty',
            sets: {},
            intersections: {}
        };
        expect(() => generatedDiagram(data)).toThrow('No se encontraron conjuntos válidos');
    });
});
