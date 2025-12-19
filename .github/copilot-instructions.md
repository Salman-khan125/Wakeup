<!-- Repository-specific Copilot instructions for AI coding agents -->
# Copilot instructions — Wakeup (Vite + React)

Purpose
- Provide targeted, actionable guidance so AI coding agents are productive immediately in this repository.

Big picture
- This is a small Vite + React application using Material UI (MUI). The app is client-only (no backend in repo). See `package.json` scripts for dev/build commands.
- UI layout: `src/App.jsx` is the top-level entry that holds simple UI state (the `selected` item). Navigation is implemented in [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx), which receives `selected` and `setSelected` props and renders the menu.
- Static assets (SVG icons, logo) live under `src/assets` and are referenced via `/src/assets/...` paths in code (Sidebar uses image `src` attributes directly).

Key files & entry points
- Dev & build: [package.json](package.json) — use `npm run dev`, `npm run build`, `npm run preview`, and `npm run lint`.
- Vite config: [vite.config.js](vite.config.js) — standard Vite React plugin enabled.
- App shell: [src/App.jsx](src/App.jsx) — holds the `selected` UI state passed into the Sidebar.
- Sidebar: [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx) — primary example of component patterns (MUI `Drawer`, `List`, image-based icons).

Project conventions & patterns (concrete)
- Files are plain JavaScript React components using `.jsx` extensions and default exports.
- Layout components live in `src/components/layout/`.
- Styling uses MUI `sx` props inline (no CSS-in-JS wrappers needed for quick changes).
- Assets are referenced by absolute `/src/assets/...` paths at runtime — preserve this when moving/renaming assets.
- Prefer small, focused functional components that accept props (see `Sidebar` and `App`).

Developer workflows (how to run & debug)
- Start dev server (HMR): `npm run dev` — opens Vite dev server.
- Build for production: `npm run build` then `npm run preview` to serve the built output locally.
- Lint: `npm run lint` runs ESLint over the repo.

Behavioral notes for code edits
- Changing the selected page: update `src/App.jsx` where `useState("Country")` is declared.
- To add a new menu item: add an object to `menuItems` in [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx) with `text` and `icon` fields. Use existing icons under `src/assets/icons/` or add a new SVG and reference it via the same `/src/assets/icons/...` path.
- When updating the Drawer width or theme colors, modify the `sx` object on the `Drawer` and related elements in `Sidebar.jsx` — styles are centralized there.

What not to assume
- There are no tests or backend services present in the repo; do not add integrations that require a server unless the user requests it.
- The project is JS-only (no TypeScript config present) — avoid introducing type-only workflows without permission.

If you modify files
- Run `npm run dev` to verify UI changes instantly with HMR.
- Run `npm run lint` before opening a PR to check for ESLint issues.

When in doubt, ask the user about desired behavior (new pages, routing, or state management choices). Keep changes minimal and local to `src/` unless the task explicitly requires infra or build changes.

References
- App entry: [src/App.jsx](src/App.jsx)
- Sidebar/menu: [src/components/layout/Sidebar.jsx](src/components/layout/Sidebar.jsx)
- Scripts & deps: [package.json](package.json)

-- End of instructions --
