import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { P as PageShell } from "./SiteFrame--Q3XpC-N.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
import { d as CalendarPlus } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
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
function BookPage() {
  const {
    data: services = []
  } = useQuery({
    queryKey: ["services", "booking"],
    queryFn: async () => (await supabase.from("services").select("id,name,price").eq("active", true).order("display_order")).data ?? []
  });
  const [submitting, setSubmitting] = reactExports.useState(false);
  const submit = async (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const service = services.find((item) => item.id === form.get("service_id"));
    setSubmitting(true);
    const {
      data,
      error
    } = await supabase.from("bookings").insert({
      customer_name: String(form.get("customer_name")),
      phone: String(form.get("phone")),
      email: String(form.get("email") || ""),
      vehicle_type: String(form.get("vehicle_type")),
      vehicle_info: String(form.get("vehicle_info") || ""),
      service_id: service?.id,
      service_name: service?.name,
      scheduled_at: new Date(String(form.get("scheduled_at"))).toISOString(),
      problem: String(form.get("problem") || "")
    }).select("booking_no").single();
    setSubmitting(false);
    if (error) toast.error("Booking channel failed. Please check the form and retry.");
    else {
      toast.success(`Booking created: ${data.booking_no}`);
      event.currentTarget.reset();
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { eyebrow: "Workshop intake", title: "Book Service", cta: {
    to: "/track",
    label: "Track Repair"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: submit, className: "mx-auto grid max-w-5xl gap-5 metallic-surface border border-border p-8 md:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "customer_name", label: "Customer Name", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "phone", label: "Phone", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "email", label: "Email", type: "email" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Vehicle Type" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { name: "vehicle_type", className: "w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "car", children: "Car" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bike", children: "Bike" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "scooter", children: "Scooter" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "vehicle_info", label: "Vehicle Details", placeholder: "Honda City / RE Classic / GJ plate" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Service" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("select", { name: "service_id", required: true, className: "w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary", children: services.map((service) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: service.id, children: [
        service.name,
        " — ₹",
        Number(service.price).toLocaleString("en-IN")
      ] }, service.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { name: "scheduled_at", label: "Preferred Slot", type: "datetime-local", required: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "md:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Problem / Request" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { name: "problem", rows: 5, className: "w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: submitting, className: "inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground disabled:opacity-60 md:col-span-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarPlus, { className: "size-4" }),
      submitting ? "Creating" : "Create Booking"
    ] })
  ] }) }) });
}
function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { name, type, required, placeholder, className: "w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" })
  ] });
}
export {
  BookPage as component
};
