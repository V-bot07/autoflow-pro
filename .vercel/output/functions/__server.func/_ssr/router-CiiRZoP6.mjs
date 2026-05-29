import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider, a as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { b as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, c as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
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
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-DRlSsXhf.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-8xl text-primary italic", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-bold uppercase tracking-widest", children: "System Offline" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for isn't on the diagnostic bus." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "mt-6 inline-flex items-center justify-center bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-white",
        children: "Return to Workshop"
      }
    )
  ] }) });
}
function ErrorComponent({ error, reset }) {
  const router = useRouter();
  console.error(error);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl uppercase italic", children: "System Fault" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: error.message }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => {
          router.invalidate();
          reset();
        },
        className: "mt-6 inline-flex bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-white",
        children: "Retry Diagnostics"
      }
    )
  ] }) });
}
const Route$7 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Shubham Auto Clinic & Garage — Precision Motoring" },
      { name: "description", content: "Premium automotive workshop in Ahmedabad. Diagnostics, performance tuning, detailing & emergency support by Malay Parikh." },
      { name: "author", content: "Shubham Auto Clinic" },
      { property: "og:title", content: "Shubham Auto Clinic & Garage" },
      { property: "og:description", content: "Engineered to the last Nm. Premium garage management by Malay Parikh." },
      { property: "og:type", content: "website" }
    ],
    links: [
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Anton&family=JetBrains+Mono:wght@400;500;700&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", className: "dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "bg-background text-foreground", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function AuthSync() {
  const router = useRouter();
  const qc = useQueryClient();
  reactExports.useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      router.invalidate();
      qc.invalidateQueries();
    });
    return () => subscription.unsubscribe();
  }, [router, qc]);
  return null;
}
function RootComponent() {
  const { queryClient } = Route$7.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(QueryClientProvider, { client: queryClient, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AuthSync, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark", position: "top-right" })
  ] });
}
const $$splitComponentImporter$6 = () => import("./track-Dhl3SwP1.mjs");
const Route$6 = createFileRoute("/track")({
  head: () => ({
    meta: [{
      title: "Track Repair — Shubham Auto Clinic & Garage"
    }, {
      name: "description",
      content: "Track your vehicle service status using booking number and phone number."
    }, {
      property: "og:title",
      content: "Track Your Repair — Shubham Auto Clinic"
    }, {
      property: "og:description",
      content: "Check live repair stage, booking status, and scheduled workshop time."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./services-C1Ssq7Iz.mjs");
const Route$5 = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Services — Shubham Auto Clinic & Garage"
    }, {
      name: "description",
      content: "Premium car and bike workshop services including diagnostics, brakes, detailing, electrical, roadside, and performance work."
    }, {
      property: "og:title",
      content: "Garage Services — Shubham Auto Clinic"
    }, {
      property: "og:description",
      content: "Explore service protocols, pricing, and service durations for Shubham Auto Clinic & Garage."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-PqDkoNvj.mjs");
const Route$4 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Shubham Auto Clinic & Garage"
    }, {
      name: "description",
      content: "Contact Shubham Auto Clinic & Garage in Vadodara for service bookings, diagnostics, emergency repairs, and workshop visits."
    }, {
      property: "og:title",
      content: "Contact Shubham Auto Clinic"
    }, {
      property: "og:description",
      content: "Call, email, WhatsApp, or visit Shubham Auto Clinic & Garage in Vadodara."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./book-D5jaPeKb.mjs");
const Route$3 = createFileRoute("/book")({
  head: () => ({
    meta: [{
      title: "Book Service — Shubham Auto Clinic & Garage"
    }, {
      name: "description",
      content: "Book a car or bike service appointment with Shubham Auto Clinic & Garage."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./admin-BYr8_p6r.mjs");
const Route$2 = createFileRoute("/admin")({
  head: () => ({
    meta: [{
      title: "Admin — Shubham Auto Clinic & Garage"
    }, {
      name: "description",
      content: "Garage management admin dashboard for bookings, billing, inventory, expenses, staff, services, and analytics."
    }, {
      property: "og:title",
      content: "Admin Dashboard — Shubham Auto Clinic"
    }, {
      property: "og:description",
      content: "Operational command center for Shubham Auto Clinic & Garage."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./about-XYIPylkR.mjs");
const Route$1 = createFileRoute("/about")({
  head: () => ({
    meta: [{
      title: "About — Shubham Auto Clinic & Garage"
    }, {
      name: "description",
      content: "Meet Malay Parikh and the precision-led workshop process behind Shubham Auto Clinic & Garage."
    }, {
      property: "og:title",
      content: "About Shubham Auto Clinic & Garage"
    }, {
      property: "og:description",
      content: "A premium Vadodara workshop for car and bike diagnostics, restoration, and performance servicing."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BsArLzqA.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Shubham Auto Clinic & Garage — Precision Motoring, Vadodara"
    }, {
      name: "description",
      content: "Premium automotive workshop. Diagnostics, performance tuning, brakes, detailing, emergency service. Owned by master technician Malay Parikh."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const TrackRoute = Route$6.update({
  id: "/track",
  path: "/track",
  getParentRoute: () => Route$7
});
const ServicesRoute = Route$5.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$7
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$7
});
const BookRoute = Route$3.update({
  id: "/book",
  path: "/book",
  getParentRoute: () => Route$7
});
const AdminRoute = Route$2.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$7
});
const AboutRoute = Route$1.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  AdminRoute,
  BookRoute,
  ContactRoute,
  ServicesRoute,
  TrackRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router;
};
export {
  getRouter
};
