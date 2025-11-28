# Canonical Ruleset of Venn Diagram Generator

## Introduction
These rules codify the **Magnetar Canonical Project Model** standard. The entire project and all contributors (human or AI) must comply with these rules. Any deviation or exception must be formally documented in `BITACORA.md`.

## Naming Conventions

*   **Repositories:** `magnetar-<domain>-<descriptor>` (e.g., `magnetar-viz-venn`).
*   **Branches:** `<type>/<short-description>`
    *   Types: `feature`, `fix`, `chore`, `experiment`, `hotfix`.
    *   Example: `feature/svg-rendering-opt`.
*   **Tasks and Blockers:** `kebab-case`
    *   Tasks: `task-<number>` (e.g., `task-101`).
    *   Blockers: `blocker-<descriptor>` (e.g., `blocker-api-down`).
*   **YAML Keys:** `lower_snake_case`.
*   **File Names:** Must mirror those in the canonical repository (UPPERCASE for root docs).

## Required Files

The following files **must** be included in the project root:
*   `README.md`
*   `PLAN.md`
*   `BITACORA.md`
*   `REQUIREMENTS.md`
*   `ARCHITECTURE.md`
*   `RULES.md`
*   `STATUS.md`
*   `TESTING.md`
*   `BLOCKERS.md`
*   `BRANCHING_MODEL.md`
*   `WIP_GUIDELINES.md`
*   `CONTRIBUTING.md`
*   `projects/<project>.project.yml`

*Any omission requires an explicit exemption logged in `BITACORA.md`.*

## Branching Conventions

*   **`master`**: Immutable release line. Merges require successful CI and documentation updates.
*   **`develop`** (optional): Aggregates completed features before stabilization.
*   **`feature/*`**: Originate from `master` (or `develop`) and must be rebased before merging.
*   **`hotfix/*`**: Start from `master`. Completion must trigger a `STATUS.md` update.
*   **Pull Requests**: Must reference the tasks they affect (e.g., "Fixes task-102") and include `BITACORA.md` entries.

## Allowed Task States

Tasks can only exist in the following states:

1.  **`planned`**: Scheduled but not ready to start.
2.  **`ready`**: Requirements defined, unblocked, ready for pickup.
3.  **`in_progress`**: Work has begun.
4.  **`in_review`**: Work submitted (PR open) and awaiting review.
5.  **`blocked`**: External factor prevents progress.
6.  **`done`**: Merged and verified.

**Transitions:** `ready` → `in_progress` (start work) → `in_review` (PR) → `done` (Merge).

## Work-In-Progress (WIP) Constraints

*   **WIP Limit:** Maximum **2** `in_progress` tasks per individual or AI agent.
*   **Exceptions:** Exceeding this limit requires approval documented in `WIP_GUIDELINES.md` and a log entry in `BITACORA.md`.

## Blocker Lifecycle

1.  **Discovery:** Log in `BLOCKERS.md` (ID, description, severity, owner, timestamp).
2.  **Assessment:** Update risks in `STATUS.md`; note mitigation ideas in `BITACORA.md`.
3.  **Escalation:** Escalate if not resolved within **one business day**.
4.  **Resolution:** Document solution in `BITACORA.md`; update blocker status to `resolved`.
5.  **Retrospective:** Capture lessons learned.

## Documentation Discipline

*   **`BITACORA.md`**: Must chronologically record **every** state change, decision, or exception.
*   **`STATUS.md`**: Must be updated at least **once per day** or after each PR merge.
*   **`PLAN.md`**: The single source of truth for milestones and task assignments.

## AI Agent Responsibilities

1.  **Parse** the project YAML file before acting.
2.  **Do not open PRs** without confirming the task state is `in_review`.
3.  **Document assumptions** in `BITACORA.md` whenever uncertain.

## Compliance and Enforcement

*   **CI Validation:** Continuous Integration should validate the presence and structure of required files.
*   **Audits:** Periodic audits will be conducted to ensure Magnetar compliance.
