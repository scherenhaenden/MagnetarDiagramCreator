# Branching Model

This project follows a simplified **GitFlow** model.

## Branches

*   **`master`**: The stable, deployable branch.
    *   **Protection:** Requires PR review and passing CI to merge. No direct commits.
*   **`feature/<name>`**: For new features.
    *   Created from: `master`
    *   Merged into: `master` (via PR)
*   **`fix/<name>`**: For bug fixes.
    *   Created from: `master`
    *   Merged into: `master` (via PR)
*   **`chore/<name>`**: For maintenance, docs, or tooling.

## Pull Request Process

1.  Create a branch with a descriptive name.
2.  Implement changes locally.
3.  Push branch to origin.
4.  Open a Pull Request targeting `master`.
5.  Ensure at least one approval is received.
6.  Merge and delete the branch.
