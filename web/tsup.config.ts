import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  clean: true,
  sourcemap: false,
  external: ["react", "react-dom", "react/jsx-runtime"],
  // CSS ships as source (package.json exports "./styles.css"); design-sync's
  // cssEntry points at src/styles.css and follows its @import closure.
  injectStyle: false,
});
