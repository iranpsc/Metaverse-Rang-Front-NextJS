# Jules GitHub Actions Integration — Status and Handoff

## Status (2026-11-13)

The official Google Jules GitHub Action is:

- Repository: https://github.com/google-labs-code/jules-action
- Action: `google-labs-code/jules-invoke@v1`
- Secret name expected by the action: `JULES_API_KEY`

**Do not add or enable a workflow that invokes this action at this time.**

Google's official Jules changelog announced on 2026-10-29 that Jules would wind down on 2026-12-31 and become read-only after 2026-11-11. This document is dated 2026-11-13, so new coding sessions cannot be relied upon.

Official notice:
https://jules.google/docs/changelog/2026-10-29

## Why the official action cannot currently run

The official action assembles a request and sends:

- Method: `POST`
- Endpoint: `https://jules.googleapis.com/v1alpha/sessions`
- Authentication header: `X-Goog-Api-Key`

This creates a new Jules session. Read-only mode means the action's core operation is no longer available. Adding a GitHub Actions workflow now would create a misleading integration that cannot perform the Issue's requested agent work.

Official action implementation:
https://github.com/google-labs-code/jules-action/blob/main/action.yaml

Official Jules API reference:
https://developers.google.com/jules/api/reference/rest

## Relationship to Issue #125

Issue:
https://github.com/iranpsc/Metaverse-Rang-Front-NextJS/issues/125

Issue #125 requires an isolated environment where an autonomous agent can install dependencies, build the Next.js app, and run the unit, integration, and end-to-end test suites without production credentials.

The repository already has a GitHub Actions workflow at:

`.github/workflows/isolated-tests.yml`

It provisions mock environment variables, copies `.env.example` to `.env.local`, runs unit and integration tests, generates the MSW handler coverage report, starts the mock API, verifies the production build, and runs Playwright suites.

That workflow provides CI validation, but it is not a substitute for an autonomous coding agent.

## Recommended handoff prompt for a supported coding agent

Use the following task with a currently supported coding agent that has repository access:

> Work on GitHub issue #125 in iranpsc/Metaverse-Rang-Front-NextJS, starting from the branch feat/phase-1-isolated-test-infrastructure. First inspect the issue, repository instructions, current branch state, and existing GitHub Actions workflows. Do not push to dev or main. Do not expose, request, or use production secrets. Preserve the existing isolated test architecture and avoid unrelated refactors.
>
> Your goal is to validate and complete Issue #125: ensure .env.example contains safe mock values for required server-side environment variables; ensure no internal service credentials or sensitive values use NEXT_PUBLIC_ variables; verify Vitest and React Testing Library configuration; verify MSW coverage for the intended dynamic API surface; verify Playwright browser installation and crawl/SEO/UI/form/security test commands; and ensure the project can install, build, and test in CI using mocks only.
>
> Run the relevant npm scripts and the existing isolated-tests workflow. Do not hide failures by skipping languages, tests, or routes. Distinguish product defects from missing test coverage and report exact commands, outcomes, and remaining blockers. Make only minimal, issue-scoped changes. Commit changes to a new feature branch and open a pull request targeting dev; never merge it.

## Security note

Keep `JULES_API_KEY` out of source files, workflow literals, logs, and commits. It is currently stored as a GitHub Actions repository secret, but a secret alone cannot restore Jules session creation after the service entered read-only mode. If Jules is no longer used, remove the unused repository secret through GitHub Settings.
