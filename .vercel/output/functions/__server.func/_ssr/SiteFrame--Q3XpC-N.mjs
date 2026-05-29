import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { G as Gauge, a as ArrowRight } from "../_libs/lucide-react.mjs";
const navItems = [
  { to: "/services", label: "Services" },
  { to: "/track", label: "Track" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" }
];
function SiteHeader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex h-20 max-w-7xl items-center justify-between px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid size-10 -skew-x-12 place-items-center bg-primary", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "skew-x-12 font-display text-xl text-primary-foreground", children: "S" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-none", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-2xl uppercase", children: "Shubham Auto" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] uppercase tracking-widest text-muted-foreground", children: "Malay Parikh Performance" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-8 text-xs font-bold uppercase tracking-widest md:flex", children: [
      navItems.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: item.to, className: "hover:text-primary", activeProps: { className: "text-primary" }, children: item.label }, item.to)),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "bg-primary px-6 py-2.5 text-primary-foreground hover:bg-foreground", children: "Book Service" })
    ] })
  ] }) });
}
function PageShell({ eyebrow, title, children, cta }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden border-b border-border px-6 py-20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "gauge-line absolute inset-0 opacity-20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-5 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "size-3" }),
              " ",
              eyebrow
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-5xl uppercase italic leading-none md:text-8xl", children: title })
          ] }),
          cta && /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: cta.to, className: "inline-flex w-fit items-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground", children: [
            cta.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
          ] })
        ] })
      ] }),
      children
    ] })
  ] });
}
export {
  PageShell as P
};
