import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PageShell } from "./SiteFrame--Q3XpC-N.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
import { G as Gauge, m as Shield, r as Timer, b as Award } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
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
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const values = [{
  icon: Gauge,
  label: "Calibrated diagnostics",
  body: "Every vehicle starts with measured inspection, sensor scan, and symptom mapping."
}, {
  icon: Shield,
  label: "Transparent service",
  body: "Work orders, pricing, and repair status stay visible from intake to delivery."
}, {
  icon: Timer,
  label: "Fast bay movement",
  body: "Service routing keeps everyday maintenance and emergency repairs moving cleanly."
}, {
  icon: Award,
  label: "Owner-led quality",
  body: "Malay Parikh sets the workshop standard for fit, finish, and mechanical discipline."
}];
function AboutPage() {
  const {
    data: settings
  } = useQuery({
    queryKey: ["site_settings", "about"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data
  });
  const {
    data: staff = []
  } = useQuery({
    queryKey: ["staff", "about"],
    queryFn: async () => (await supabase.from("staff").select("name,role,active").eq("active", true)).data ?? []
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { eyebrow: "Owner led workshop", title: "About the Clinic", cta: {
    to: "/contact",
    label: "Visit Workshop"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground", children: settings?.about_story }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-px border border-border bg-border md:grid-cols-2", children: values.map((item) => {
        const Icon = item.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "bg-background p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mb-5 size-6 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 font-display text-2xl uppercase italic", children: item.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-muted-foreground", children: item.body })
        ] }, item.label);
      }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "metallic-surface border border-border p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-primary", children: "Technical Lead" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-5xl uppercase italic", children: settings?.owner_name ?? "Malay Parikh" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-sm leading-relaxed text-muted-foreground", children: "Premium mechanical care for bikes and cars from a workshop built around accuracy, communication, and disciplined bay operations." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-4 border-t border-border pt-8", children: staff.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: member.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right text-muted-foreground", children: member.role })
      ] }, member.name)) })
    ] })
  ] }) }) });
}
export {
  AboutPage as component
};
