import { readdirSync } from "node:fs";
import { resolve } from "node:path";
import { defineConfig } from "vite";
import path from "path";

function getScriptEntries() {
  const entries: Record<string, string> = {};
  const userScriptsDir = path.join(__dirname, "user-scripts");

  for (const file of readdirSync(userScriptsDir)) {
    if (!file.endsWith(".ts")) continue;

    const name = file.replace(/\.ts$/, "");
    entries[name] = resolve(userScriptsDir, file);
  }

  return entries;
}

export default defineConfig({
  build: {
    minify: false,
    lib: {
      entry: getScriptEntries(),
      formats: ["cjs"],
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    outDir: "compiled",
    emptyOutDir: false,
    rollupOptions: {
      external: ["obsidian"],
    },
  },
});
