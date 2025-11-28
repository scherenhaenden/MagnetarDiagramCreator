# Testing Strategy for Venn Diagram Generator

## Types of Tests
1.  **Unit Tests:**
    *   Focus on `parseVennCode` to ensure correct data extraction from text.
    *   Focus on `generateCirclePositions` to verify coordinate calculations.
    *   Tools: Jest (planned).
2.  **Integration Tests:**
    *   Verify that valid input produces valid SVG output strings.
3.  **End-to-End (E2E) Tests:**
    *   Verify the web interface loads, accepts input, and renders the diagram visibly.
    *   Tools: Playwright or Cypress (future).

## Code Coverage
*   **Target:** 80% coverage for Core Logic modules.

## Bug Reporting Process
1.  Open an Issue (or create a card in the project board).
2.  Label as `bug`.
3.  Provide reproduction steps and the input code that caused the failure.
4.  Link to a created `blocker` in `BLOCKERS.md` if it halts development.
