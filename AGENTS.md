# Instructions for AI agents

This repository follows `docs/PLUGIN-DEVELOPMENT-STANDARDS.md` and `docs/PLUGIN-HANDBOOK-COMPLIANCE.md`.
Read both documents before changing architecture, PHP, JavaScript, build tooling, UI, or public APIs.

Mandatory rules:

- Keep the main plugin file limited to metadata, guards, constants, autoloading, and bootstrapping.
- Add WordPress hooks only from classes implementing `MotionForWP\Contracts\Service`.
- Organize `src/` by responsibility; do not add generic layers or helpers for a single use case.
- Use WordPress APIs, capability checks, validation, sanitization, nonces, and late escaping.
- Register blocks from compiled `block.json` metadata on `init`.
- Load assets only in the context where they are used and give them deterministic versions.
- Build admin interfaces from native WordPress components and the shared `plugin-admin` design system. Keep brand overrides in `resources/css/admin-theme.css`.
- Never style global WordPress selectors outside a `.plugin-admin` scope.
- Use the WordPress Plugin Handbook as the primary authority. Before custom code, identify and use the relevant WordPress API or UI component.
- Preserve the existing UX while migrating internals to native APIs. Document every intentional exception.
- Preserve documented hooks, option names, block names, handles, and serialized block attributes unless a migration is supplied.
- Do not introduce Composer unless the plugin has a real PHP dependency or needs development tooling that justifies it.
- Run PHP syntax checks, JavaScript/style linting, a production build, and `git diff --check` before handing off.
- Never edit generated files in `dist/` by hand; update sources and rebuild them.
