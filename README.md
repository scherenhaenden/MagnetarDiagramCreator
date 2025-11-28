# Canonical Project Model of Venn Diagram Generator

## Purpose
This project provides a dynamic Venn Diagram generator capable of visualizing complex set relationships and intersections. It strictly follows the **Magnetar Canonical Project Model**, ensuring a standardized approach to documentation, planning, and governance. The goal is to provide a robust, maintainable, and well-documented codebase for generating Venn diagrams in web and potentially other environments.

## How to Use This Repository

1.  **Clone the canonical model:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```
2.  **Copy and fill out the project YAML:**
    *   Copy `projects/_template.project.yml` to `projects/venn-diagram-generator.project.yml`.
    *   Fill in the metadata, stakeholders, and initial milestones.
3.  **Replicate the documentation set:**
    *   Ensure all files listed in the "Project Contents" section exist and are populated.
4.  **Follow the Governance Rules:**
    *   Adhere to **WIP limits** (max 2 active tasks).
    *   Follow the **Branching Model** (feature branches, PRs).
    *   Log all blockers in `BLOCKERS.md`.
5.  **Consult the Example:**
    *   Review existing code and documentation to understand the established patterns.

## Project Contents

| File | Purpose |
| :--- | :--- |
| `PLAN.md` | **Project tasks & milestones.** The central schedule and backlog. |
| `BITACORA.md` | **Chronological logbook.** Immutable record of all events. |
| `REQUIREMENTS.md` | **Functional & non-functional specs.** detailed requirements. |
| `ARCHITECTURE.md` | **System/module structure.** High-level design and diagrams. |
| `RULES.md` | **Naming & workflow standards.** The definitive ruleset. |
| `STATUS.md` | **Health summary & progress stats.** Daily/Weekly snapshot. |
| `TESTING.md` | **Test coverage & reporting rules.** QA strategy. |
| `BLOCKERS.md` | **Documented blockers & escalation paths.** Impediment tracking. |
| `BRANCHING_MODEL.md` | Governance reference for Git workflow. |
| `WIP_GUIDELINES.md` | Governance reference for work-in-progress limits. |

## Progress Model Overview

This project tracks progress through strict state transitions. Every task flows through the following lifecycle:

`planned` → `ready` → `in_progress` → `in_review` → `done`

**Crucial:** Every state change **must** be recorded in `BITACORA.md`. This ensures a complete audit trail of the project's velocity and history.

## YAML Project Schema

The `projects/_template.project.yml` file is the canonical machine-readable schema. It contains:
*   **Metadata:** Project name, description, start date.
*   **Stakeholders:** Roles and responsibilities.
*   **Milestones:** High-level goals with dates.
*   **Tasks:** Granular work items.
*   **Risks:** Identified risks and mitigations.

AI agents and automation tools should parse this file to understand the project's context and configuration.

## Guidance for AI Collaborators

AI agents working on this project must:
1.  **Parse** the project YAML file (`projects/*.project.yml`) to understand context.
2.  **Consult** `PLAN.md` and `STATUS.md` to determine the immediate focus.
3.  **Respect** `RULES.md`, `WIP_GUIDELINES.md`, and `BRANCHING_MODEL.md` without exception.
4.  **Update** `BITACORA.md` immediately after completing any work or changing a task state.

## Applying This Template

To apply this template to a new project:
1.  **Copy** the repository structure.
2.  **Replace** placeholder content in `README.md` and other files with project-specific details.
3.  **Instantiate** a project YAML file in the `projects/` directory.
4.  **Establish** initial milestones in `PLAN.md`.
5.  **Log** the initialization in `STATUS.md` and `BITACORA.md`.

## Validating Canon Compliance

Ensure your project follows the Magnetar canon:
- [ ] All required files (`README`, `PLAN`, `BITACORA`, `RULES`, etc.) exist.
- [ ] The project YAML file exists and validates against the schema.
- [ ] `BITACORA.md` is being updated chronologically.
- [ ] Active branches follow the `BRANCHING_MODEL.md`.
- [ ] Testing and blocker processes match `TESTING.md` and `BLOCKERS.md`.
