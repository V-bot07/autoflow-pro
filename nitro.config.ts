import { defineNitroConfig } from "nitro/config";

const ssrInlineDependencies = [
  "tslib",
  "@supabase/supabase-js",
  "@supabase/auth-js",
  "@supabase/postgrest-js",
  "@supabase/realtime-js",
  "@supabase/storage-js",
];

export default defineNitroConfig({
  externals: {
    inline: ssrInlineDependencies,
  },
});
