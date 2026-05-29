import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { P as PageShell } from "./SiteFrame--Q3XpC-N.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
import { h as MapPin, j as Phone, M as Mail, i as MessageCircle } from "../_libs/lucide-react.mjs";
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
function ContactPage() {
  const {
    data: settings
  } = useQuery({
    queryKey: ["site_settings", "contact"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data
  });
  const cleanPhone = (settings?.whatsapp ?? settings?.phone ?? "").replace(/\D/g, "");
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { eyebrow: "Workshop comms", title: "Contact", cta: {
    to: "/book",
    label: "Book Service"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-6 py-16", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactTile, { icon: MapPin, label: "Location", value: settings?.address ?? "C-47, Sarasia Talav Road, Purushottam Nagar, Kishanwadi, Vadodara, Gujarat" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactTile, { icon: Phone, label: "Phone", value: settings?.phone ?? "+91 8469018032", href: `tel:${settings?.phone ?? "+918469018032"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactTile, { icon: Mail, label: "Email", value: settings?.email ?? "performance@shubhamauto.in", href: `mailto:${settings?.email ?? "performance@shubhamauto.in"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContactTile, { icon: MessageCircle, label: "Hours", value: settings?.working_hours ?? "Mon-Sat 09:00 — 19:00" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metallic-surface border border-border p-1", children: settings?.map_embed_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: settings.map_embed_url, className: "min-h-[420px] w-full grayscale", loading: "lazy", title: "Workshop map" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid min-h-[420px] place-items-center p-8 text-center text-sm text-muted-foreground", children: "Map signal unavailable" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-8 flex max-w-7xl flex-wrap gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/${cleanPhone}`, target: "_blank", rel: "noreferrer", className: "bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground", children: "Open WhatsApp" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/track", className: "border border-border px-6 py-4 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary", children: "Track Existing Repair" })
    ] })
  ] }) });
}
function ContactTile({
  icon: Icon,
  label,
  value,
  href
}) {
  const body = /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mb-5 size-6 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold leading-relaxed", children: value })
  ] });
  return href ? /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href, className: "bg-background p-7 hover:bg-card", children: body }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background p-7", children: body });
}
export {
  ContactPage as component
};
