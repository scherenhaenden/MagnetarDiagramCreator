import { parseVennCode } from '../src/parser.js';

describe('parseVennCode', () => {
    test('should parse simple diagram with title and sets', () => {
        const code = `
            title My Diagram
            A [Set A]: 10
            B [Set B]: 20
        `;
        const result = parseVennCode(code);
        expect(result.title).toBe('My Diagram');
        expect(result.sets).toEqual({
            A: { label: 'Set A', value: 10 },
            B: { label: 'Set B', value: 20 }
        });
        expect(result.intersections).toEqual({});
    });

    test('should parse diagram with intersections', () => {
        const code = `
            title Intersect
            A [A]: 10
            B [B]: 10
            AB: 5
        `;
        const result = parseVennCode(code);
        expect(result.intersections).toEqual({
            AB: 5
        });
    });

    test('should handle extra whitespace', () => {
        const code = `
            title   Trim This
            A   [  Label  ]  :   10
        `;
        const result = parseVennCode(code);
        expect(result.title).toBe('Trim This');
        expect(result.sets.A).toEqual({ label: '  Label  ', value: 10 });
    });
});
