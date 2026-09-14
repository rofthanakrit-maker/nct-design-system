import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  // lucide-react is a devDependency, not a dependency: the forty glyphs index.ts
  // re-exports are inlined, code and types, so neither an app nor design-sync's
  // NctSlides global has to resolve it.
  dts: { resolve: ["lucide-react"] },
  clean: true,
  sourcemap: false,
  external: ["react", "react-dom", "react/jsx-runtime"],
  noExternal: ["lucide-react"],
  // CSS ships as source (package.json exports "./styles.css"); design-sync's
  // cssEntry points at src/styles.css and follows its @import closure.
  injectStyle: false,
});
