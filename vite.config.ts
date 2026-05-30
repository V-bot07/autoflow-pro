// @lovable.dev/vite-tanstack-config already includes the following - do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const ssrInlineDependencies = ["tslib", "@supabase/supabase-js", "@supabase/auth-js"];

export default defineConfig({
  vite: {
    ssr: {
      noExternal: ssrInlineDependencies,
    },
    environments: {
      ssr: {
        resolve: {
          noExternal: ssrInlineDependencies,
        },
      },
    },
  },
  nitro: {
    preset: "vercel",
    noExternals: ssrInlineDependencies,
    vercel: {
      functions: {
        runtime: "nodejs20.x",
      },
    },
    output: {
      dir: ".vercel/output",
      publicDir: ".vercel/output/static",
      serverDir: ".vercel/output/functions/__server.func",
    },
  },
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this.
    server: { entry: "server" },
  },
});
