import { test, expect } from '@playwright/test';

test.describe('Venn Diagram Generator Smoke Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the local server
        await page.goto('http://localhost:8080');
    });

    test('should load the page and generate a default diagram', async ({ page }) => {
        await expect(page).toHaveTitle(/Generador Dinámico de Diagramas de Venn/);
        await expect(page.locator('#diagramTitle')).toHaveText(/Ecosistema de Desarrollo Multiplataforma/);
        const svg = page.locator('svg.venn-svg');
        await expect(svg).toBeVisible();
    });

    test('should toggle theme', async ({ page }) => {
        const themeButton = page.locator('.theme-toggle');

        // Initial state check (assuming default is dark based on script)
        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');

        // Click toggle
        await themeButton.click();

        // Check if theme changed
        await expect(page.locator('body')).not.toHaveAttribute('data-theme', 'dark');
        await expect(themeButton).toHaveText(/Tema Oscuro/);

        // Click again
        await themeButton.click();
        await expect(page.locator('body')).toHaveAttribute('data-theme', 'dark');
        await expect(themeButton).toHaveText(/Tema Claro/);
    });

    test('should load an example', async ({ page }) => {
        const example = page.locator('.example-code').first();
        await example.click();

        await expect(page.locator('#diagramTitle')).toHaveText(/Mascotas en el vecindario/);

        // Use a more specific selector
        const setALabel = page.locator('.label-text').filter({ hasText: 'Gatos' });
        await expect(setALabel).toBeVisible();
    });

    test('should clear diagram', async ({ page }) => {
        await page.locator('.clear-btn').click();
        await expect(page.locator('#codeInput')).toBeEmpty();
        await expect(page.locator('#diagramContent')).toBeEmpty();
        await expect(page.locator('#diagramTitle')).toHaveText('Tu diagrama aparecerá aquí');
    });
});
