/**
 * Keeps the claude.ai/design project's original namespace working.
 *
 * The project `NCT Design System` (7648d84e-…) was hand-built against
 * `window.NCTDesignSystem_7648d8`, and its 26 slide pages, 3 deck templates
 * and 52 cards all reach for that name. design-sync normalizes `globalName`
 * the way the app derives a namespace, which drops the underscore, so the
 * converter bundle publishes `window.NCTDesignSystem7648d8` instead. Without
 * this alias every one of those pages would resolve an undefined global.
 *
 * The getter is lazy on purpose: the IIFE assigns the real global in its
 * footer, long after this module has evaluated.
 *
 * Wired in through `extraEntries` in .design-sync/config.json. It lives
 * outside `web/` because that package declares `sideEffects: ["*.css"]`,
 * which would let the bundler drop a side-effect-only module.
 */
export const __dsNamespaceAlias = /* @__NOINLINE__ */ (() => {
  const name = "NCTDesignSystem_7648d8";
  if (typeof window !== "undefined" && !(name in window)) {
    Object.defineProperty(window, name, {
      configurable: true,
      get: () => window.NCTDesignSystem7648d8,
    });
  }
  return name;
})();
