import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageShell } from "./SiteFrame--Q3XpC-N.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
import { S as Search, o as ShieldCheck } from "../_libs/lucide-react.mjs";
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
function TrackPage() {
  const [bookingNo, setBookingNo] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [result, setResult] = reactExports.useState(null);
  const [message, setMessage] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const lookup = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setResult(null);
    const {
      data,
      error
    } = await supabase.from("bookings").select("booking_no,customer_name,phone,vehicle_info,service_name,scheduled_at,status,progress_stage,problem").eq("booking_no", bookingNo.trim().toUpperCase()).eq("phone", phone.trim()).maybeSingle();
    setLoading(false);
    if (error) setMessage("Unable to read the repair channel right now.");
    else if (!data) setMessage("No matching repair order found. Check your booking number and phone.");
    else setResult(data);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { eyebrow: "Repair order telemetry", title: "Track Repair", children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: lookup, className: "metallic-surface border border-border p-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-6 text-sm leading-relaxed text-muted-foreground", children: "Enter the booking number received after service booking and the same phone number used at intake." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Booking No" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: bookingNo, onChange: (e) => setBookingNo(e.target.value), required: true, placeholder: "SAC-123456", className: "mb-5 w-full border border-border bg-background px-4 py-3 text-sm uppercase outline-none focus:border-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Phone" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: phone, onChange: (e) => setPhone(e.target.value), required: true, placeholder: "+91 8469018032", className: "mb-6 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { disabled: loading, className: "inline-flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground disabled:opacity-60", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4" }),
        " ",
        loading ? "Scanning" : "Track Order"
      ] }),
      message && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-5 text-sm text-muted-foreground", children: message })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border border-border bg-card p-8", children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8 flex items-center justify-between gap-6 border-b border-border pb-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-primary", children: result.booking_no }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-2 font-display text-4xl uppercase italic", children: result.progress_stage })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-10 text-primary" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-5 text-sm md:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Customer", value: result.customer_name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Status", value: result.status }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Vehicle", value: result.vehicle_info ?? "Vehicle intake pending" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Service", value: result.service_name ?? "General inspection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Scheduled", value: new Date(result.scheduled_at).toLocaleString("en-IN") }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Issue", value: result.problem ?? "Workshop diagnosis pending" })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-80 flex-col justify-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-primary", children: "Awaiting Signal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-3 font-display text-5xl uppercase italic", children: "Repair telemetry appears here." })
    ] }) })
  ] }) }) });
}
function Info({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "break-words font-bold", children: value })
  ] });
}
export {
  TrackPage as component
};
