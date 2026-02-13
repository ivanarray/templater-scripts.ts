# templater-scripts.ts

TypeScript-based user scripts for the Obsidian Templater plugin.

## Prerequisites

- Obsidian with the Templater plugin installed.
- [Bun](https://bun.com) installed and on your `PATH`.

## Install dependencies

```bash
bun install
```

## Build scripts

Build all Templater scripts from [user-scripts](./user-scripts/) into the [compiled](./compiled/) directory:

```bash
bun run build
```

This produces CommonJS files that can be used as Templater user scripts.

Example: `user-scripts/add-default-properties.ts` → `compiled/add-default-properties.js`.

## TypeScript typings

- Obsidian types are provided by the official `obsidian` package.
- Templater `tp` API is described in [types/templater.d.ts](./types/templater.d.ts) and is based on:
  - Templater repo: `https://github.com/SilentVoid13/Templater`
  - Templater docs: `https://silentvoid13.github.io/Templater/`
