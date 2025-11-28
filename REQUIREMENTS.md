# Requirements for Venn Diagram Generator

## Functional Requirements

### Core Functionality
*   **[Must-Have]** The system must parse a custom text-based Venn diagram description syntax.
*   **[Must-Have]** The system must render accurate Venn diagrams for 1 to 5 sets using SVG.
*   **[Must-Have]** The system must handle intersections between any combination of sets.
*   **[Should-Have]** The system should allow exporting the diagram as a PNG image.
*   **[Could-Have]** The system could support interactive tooltips on intersection areas.

### User Interface
*   **[Must-Have]** The interface must provide a text area for inputting the diagram code.
*   **[Must-Have]** The interface must display the generated diagram in real-time or upon clicking "Generate".
*   **[Should-Have]** The interface should support dark and light themes.

## Non-Functional Requirements

### Portability & Compatibility
*   **[Must-Have]** The core logic must be decoupled from the DOM to allow usage in Node.js environments.
*   **[Must-Have]** The code must be compatible with modern browsers (Chrome, Firefox, Safari, Edge).

### Performance
*   **[Should-Have]** Diagram generation should take less than 200ms for diagrams with up to 5 sets.

### Maintenance
*   **[Must-Have]** Code must be documented and follow standard linting rules.
