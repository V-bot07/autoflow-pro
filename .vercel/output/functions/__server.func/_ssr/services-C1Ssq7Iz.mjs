import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PageShell } from "./SiteFrame--Q3XpC-N.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
import { Z as Zap, T as Thermometer, q as Sparkles, p as Siren, g as Droplet, D as Disc, f as Cog, B as Battery, A as Activity } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const ICONS = {
  activity: Activity,
  battery: Battery,
  cog: Cog,
  disc: Disc,
  droplet: Droplet,
  siren: Siren,
  sparkles: Sparkles,
  thermometer: Thermometer,
  zap: Zap
};
function ServicesPage() {
  const {
    data: services = []
  } = useQuery({
    queryKey: ["services", "catalog"],
    queryFn: async () => (await supabase.from("services").select("*").eq("active", true).order("display_order")).data ?? []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { eyebrow: "Service protocol catalog", title: "Diagnostic Layers", cta: {
    to: "/book",
    label: "Book Service"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto grid max-w-7xl gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3", children: services.map((service) => {
      const Icon = ICONS[service.icon ?? "cog"] ?? Cog;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group bg-background p-8 transition-colors hover:bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold uppercase tracking-widest text-primary", children: [
            "Protocol ",
            service.code
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-6 text-muted-foreground transition-colors group-hover:text-primary" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 font-display text-3xl uppercase italic group-hover:text-primary", children: service.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 min-h-20 text-sm leading-relaxed text-muted-foreground", children: service.description }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border-t border-border pt-5 text-xs font-bold uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "₹",
            Number(service.price).toLocaleString("en-IN")
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            service.duration_min,
            " min"
          ] })
        ] })
      ] }, service.id);
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-10 max-w-7xl metallic-surface border border-border p-8 md:flex md:items-center md:justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-primary", children: "Need a custom diagnosis?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 max-w-2xl text-sm text-muted-foreground", children: "Share the symptom, sound, warning light, or ride behavior and the workshop team will map it to the right inspection bay." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "mt-6 inline-flex bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground md:mt-0", children: "Talk to Workshop" })
    ] })
  ] }) });
}
export {
  ServicesPage as component
};
