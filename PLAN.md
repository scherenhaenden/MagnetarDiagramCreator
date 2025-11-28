# Canonical Plan of Venn Diagram Generator

## Introduction
This plan captures the project's milestones, tasks, estimates, and status. Its tabular structure must be kept intact to allow for parsing by humans and machines.

## Milestones Overview Table

| Milestone ID | Name | Target Date | Description | Completion Criteria |
| :--- | :--- | :--- | :--- | :--- |
| `ms-01` | Project Initialization | 2024-05-30 | Establish project structure and governance. | All Magnetar files created and committed. |
| `ms-02` | Node.js Migration | 2024-06-15 | Convert to a Node.js project for portability. | `package.json` exists, tests configured, build script working. |
| `ms-03` | Feature Expansion | 2024-07-01 | Add export to PNG and advanced styling. | SVG to PNG export working, new color themes added. |

## Task Backlog Table

| Task ID | Milestone | Title | Owner | Effort (pts) | Weight (%) | State | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `task-101` | `ms-01` | Create Magnetar Files | Jules | 5 | 20% | `in_progress` | Creating README, RULES, etc. |
| `task-102` | `ms-01` | Initialize Project YAML | Jules | 2 | 10% | `planned` | `projects/venn.project.yml` |
| `task-201` | `ms-02` | Initialize npm | TBD | 1 | 5% | `planned` | `npm init -y` |
| `task-202` | `ms-02` | Setup Jest | TBD | 3 | 10% | `planned` | Configure test runner |
| `task-203` | `ms-02` | Refactor Main Logic | TBD | 8 | 25% | `planned` | Extract pure functions from `main.js` |

## Effort Summary

*   **Total effort:** 19 pts
*   **Completed:** 0 pts
*   **In progress:** 5 pts
*   **Remaining:** 14 pts

## State Definitions

*   **`planned`**: Scheduled in the backlog.
*   **`ready`**: Requirements clear, ready to be worked on.
*   **`in_progress`**: Actively being worked on.
*   **`blocked`**: Cannot proceed due to external factors.
*   **`in_review`**: Code submitted for review.
*   **`done`**: Completed and verified.

## Change Management
This document must be updated whenever tasks change state or scope. All changes must be reflected in the project's YAML file and logged in `BITACORA.md`.
