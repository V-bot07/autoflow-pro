import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
import { a as ArrowRight, p as Siren, B as Battery, g as Droplet, Z as Zap, q as Sparkles, D as Disc, T as Thermometer, f as Cog, A as Activity, i as MessageCircle } from "../_libs/lucide-react.mjs";
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
  cog: Cog,
  thermometer: Thermometer,
  disc: Disc,
  sparkles: Sparkles,
  zap: Zap,
  droplet: Droplet,
  battery: Battery,
  siren: Siren
};
function Home() {
  const {
    data: settings
  } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data
  });
  const {
    data: services
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await supabase.from("services").select("*").eq("active", true).order("display_order")).data ?? []
  });
  const {
    data: testimonials
  } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => (await supabase.from("testimonials").select("*").eq("active", true).order("display_order")).data ?? []
  });
  const {
    data: promos
  } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => (await supabase.from("promotions").select("*").eq("active", true).order("display_order")).data ?? []
  });
  const stats = settings?.stats ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 h-20 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-10 bg-primary grid place-items-center -skew-x-12", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-primary-foreground skew-x-12 text-xl", children: "S" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl tracking-tight uppercase", children: settings?.shop_name?.split("&")[0] ?? "Shubham Auto" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground tracking-widest uppercase", children: [
            settings?.owner_name ?? "Malay Parikh",
            " Performance"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "hover:text-primary transition-colors", children: "Services" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/track", className: "hover:text-primary transition-colors", children: "Track" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-primary transition-colors", children: "About" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-primary transition-colors", children: "Contact" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "px-6 py-2.5 bg-primary text-primary-foreground hover:bg-white transition-colors", children: "Book Service" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative pt-20 pb-32 px-6 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 gauge-line opacity-20 pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto relative", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-12 items-end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-8 animate-slide-up", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-tighter mb-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 bg-primary animate-blink" }),
            " System Status: Ready for Spec"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-8 italic", children: [
            settings?.hero_title?.split(" ").slice(0, -2).join(" ") ?? "Engineered To The",
            /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: settings?.hero_title?.split(" ").slice(-2).join(" ") ?? "Last Nm." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-md text-muted-foreground text-sm leading-relaxed mb-10", children: settings?.hero_subtitle }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/book", className: "px-8 py-4 bg-white text-background font-bold uppercase text-xs tracking-widest flex items-center gap-4 group hover:bg-primary transition-colors", children: [
              "Start Repair Order",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 group-hover:translate-x-1 transition-transform" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/track", className: "px-8 py-4 border border-border font-bold uppercase text-xs tracking-widest hover:border-primary transition-colors", children: "Track Repair" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "md:col-span-4 animate-slide-up", style: {
          animationDelay: "150ms"
        }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metallic-surface border border-border p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center mb-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground uppercase", children: "Workshop Load" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-[10px]", children: "84%" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 bg-white/5 w-full mb-8 relative", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-0 top-0 h-full bg-primary", style: {
            width: "84%"
          } }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase", children: "Active Bays" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: "12/14" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase", children: "Techs Active" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xl font-bold", children: "08" })
            ] })
          ] })
        ] }) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 px-6 border-t border-border bg-card/30", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-end mb-16", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-4xl md:text-5xl uppercase italic", children: "Diagnostic Layers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "text-[10px] text-muted-foreground uppercase tracking-widest hover:text-primary", children: "All Protocols →" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border", children: (services ?? []).slice(0, 6).map((s) => {
        const Icon = ICONS[s.icon ?? "cog"] ?? Cog;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-10 hover:bg-card transition-colors group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary text-[10px] font-bold", children: s.code }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-muted-foreground group-hover:text-primary transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-2xl uppercase mb-4 group-hover:text-primary transition-colors", children: s.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed mb-8", children: s.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-bold text-sm italic", children: [
            "From ₹",
            Number(s.price).toLocaleString("en-IN")
          ] })
        ] }, s.id);
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "border-y border-border py-20 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-primary font-display text-5xl mb-2 italic", children: s.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-muted-foreground uppercase tracking-widest font-bold", children: s.label })
    ] }, i)) }) }),
    promos && promos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 px-6 border-b border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto grid md:grid-cols-2 gap-6", children: promos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "metallic-surface border border-border p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-4", children: p.badge }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl uppercase italic mb-3", children: p.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: p.body })
    ] }, p.id)) }) }),
    testimonials && testimonials[0] && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-32 px-6 bg-card", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display text-3xl md:text-5xl uppercase italic mb-8 leading-tight text-center", children: [
        '"',
        testimonials[0].quote,
        '"'
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-primary text-[10px] font-bold uppercase tracking-[0.3em]", children: [
        testimonials[0].name,
        testimonials[0].vehicle ? ` — ${testimonials[0].vehicle}` : ""
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "pt-24 pb-12 px-6 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-20 mb-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display text-5xl md:text-6xl uppercase italic mb-8", children: [
            "Visit the ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Clinic." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase text-[10px] font-bold mb-1", children: "Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: settings?.address })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase text-[10px] font-bold mb-1", children: "Technical Lead" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: settings?.owner_name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase text-[10px] font-bold mb-1", children: "Inquiries" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
                settings?.email,
                " | ",
                settings?.phone
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground uppercase text-[10px] font-bold mb-1", children: "Hours" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: settings?.working_hours })
            ] })
          ] })
        ] }),
        settings?.map_embed_url && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "metallic-surface p-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("iframe", { src: settings.map_embed_url, className: "w-full aspect-video grayscale opacity-80", loading: "lazy" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-border", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-muted-foreground uppercase", children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " ",
          settings?.shop_name,
          ". All Systems Nominal."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-8 text-[10px] font-bold uppercase tracking-widest", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "hover:text-primary", children: "Workshop" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "hover:text-primary", children: "Protocols" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:text-primary", children: "Contact" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/admin", className: "text-muted-foreground hover:text-primary hover:underline transition-all border border-muted-foreground/30 px-2 py-0.5 rounded", children: "Go to Admin" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `https://wa.me/${(settings?.whatsapp ?? "").replace(/\D/g, "")}`, target: "_blank", rel: "noreferrer", className: "fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95", "aria-label": "WhatsApp", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "size-6" }) })
  ] });
}
export {
  Home as component
};
