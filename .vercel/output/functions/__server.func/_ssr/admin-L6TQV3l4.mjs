import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery } from "../_libs/tanstack__react-query.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { j as jspdf_node_minExports } from "../_libs/jspdf.mjs";
import { P as PageShell } from "./SiteFrame--Q3XpC-N.mjs";
import { s as supabase } from "./client-BzfFPu0Z.mjs";
import { a as createServerFn, T as TSS_SERVER_FUNCTION, g as getServerFnById } from "./server-9d_IR8iD.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import "../_libs/seroval.mjs";
import { n as ShieldAlert, C as CalendarClock, W as Wrench, I as IndianRupee, c as Boxes, l as Settings, P as Pencil, F as FileText, U as Users, e as ChartColumn, s as Trash2, k as Plus } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, a as PieChart, P as Pie, C as Cell, T as Tooltip } from "../_libs/recharts.mjs";
import { o as objectType, s as stringType } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
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
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/html2canvas.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "../_libs/lodash.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/react-is.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/react-smooth.mjs";
import "../_libs/prop-types.mjs";
import "../_libs/fast-equals.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/recharts-scale.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
var createSsrRpc = (functionId) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const sendInvoiceSchema = objectType({
  phone: stringType().min(5),
  filename: stringType().min(1),
  caption: stringType().min(1),
  pdfBase64: stringType().min(1)
});
const sendWhatsAppInvoicePdf = createServerFn({
  method: "POST"
}).inputValidator(sendInvoiceSchema).handler(createSsrRpc("15c063ea822cba8d4660da48eea48425d7b15e3f8912e7a5fcd13b794115b3cf"));
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const THEMES = { light: "", dark: ".dark" };
const ChartContext = reactExports.createContext(null);
function useChart() {
  const context = reactExports.useContext(ChartContext);
  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }
  return context;
}
const ChartContainer = reactExports.forwardRef(({ id, className, children, config, ...props }, ref) => {
  const uniqueId = reactExports.useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContext.Provider, { value: { config }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-chart": chartId,
      ref,
      className: cn(
        "flex aspect-video justify-center text-xs [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50 [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border [&_.recharts-dot[stroke='#fff']]:stroke-transparent [&_.recharts-layer]:outline-none [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border [&_.recharts-radial-bar-background-sector]:fill-muted [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border [&_.recharts-sector[stroke='#fff']]:stroke-transparent [&_.recharts-sector]:outline-none [&_.recharts-surface]:outline-none",
        className
      ),
      ...props,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ChartStyle, { id: chartId, config }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { children })
      ]
    }
  ) });
});
ChartContainer.displayName = "Chart";
const ChartStyle = ({ id, config }) => {
  const colorConfig = Object.entries(config).filter(([, config2]) => config2.theme || config2.color);
  if (!colorConfig.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "style",
    {
      dangerouslySetInnerHTML: {
        __html: Object.entries(THEMES).map(
          ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig.map(([key, itemConfig]) => {
            const color = itemConfig.theme?.[theme] || itemConfig.color;
            return color ? `  --color-${key}: ${color};` : null;
          }).join("\n")}
}
`
        ).join("\n")
      }
    }
  );
};
const ChartTooltip = Tooltip;
const ChartTooltipContent = reactExports.forwardRef(
  ({
    active,
    payload,
    className,
    indicator = "dot",
    hideLabel = false,
    hideIndicator = false,
    label,
    labelFormatter,
    labelClassName,
    formatter,
    color,
    nameKey,
    labelKey
  }, ref) => {
    const { config } = useChart();
    const tooltipLabel = reactExports.useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }
      const [item] = payload;
      const key = `${labelKey || item?.dataKey || item?.name || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value = !labelKey && typeof label === "string" ? config[label]?.label || label : itemConfig?.label;
      if (labelFormatter) {
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-medium", labelClassName), children: labelFormatter(value, payload) });
      }
      if (!value) {
        return null;
      }
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-medium", labelClassName), children: value });
    }, [label, labelFormatter, payload, hideLabel, labelClassName, config, labelKey]);
    if (!active || !payload?.length) {
      return null;
    }
    const nestLabel = payload.length === 1 && indicator !== "dot";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref,
        className: cn(
          "grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl",
          className
        ),
        children: [
          !nestLabel ? tooltipLabel : null,
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-1.5", children: payload.filter((item) => item.type !== "none").map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex w-full flex-wrap items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
                  indicator === "dot" && "items-center"
                ),
                children: formatter && item?.value !== void 0 && item.name ? formatter(item.value, item.name, item, index, item.payload) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                  itemConfig?.icon ? /* @__PURE__ */ jsxRuntimeExports.jsx(itemConfig.icon, {}) : !hideIndicator && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "shrink-0 rounded-[2px] border-(--color-border) bg-(--color-bg)",
                        {
                          "h-2.5 w-2.5": indicator === "dot",
                          "w-1": indicator === "line",
                          "w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
                          "my-0.5": nestLabel && indicator === "dashed"
                        }
                      ),
                      style: {
                        "--color-bg": indicatorColor,
                        "--color-border": indicatorColor
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center"
                      ),
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1.5", children: [
                          nestLabel ? tooltipLabel : null,
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: itemConfig?.label || item.name })
                        ] }),
                        item.value && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-medium tabular-nums text-foreground", children: item.value.toLocaleString() })
                      ]
                    }
                  )
                ] })
              },
              item.dataKey
            );
          }) })
        ]
      }
    );
  }
);
ChartTooltipContent.displayName = "ChartTooltip";
const ChartLegendContent = reactExports.forwardRef(({ className, hideIcon = false, payload, verticalAlign = "bottom", nameKey }, ref) => {
  const { config } = useChart();
  if (!payload?.length) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn(
        "flex items-center justify-center gap-4",
        verticalAlign === "top" ? "pb-3" : "pt-3",
        className
      ),
      children: payload.filter((item) => item.type !== "none").map((item) => {
        const key = `${nameKey || item.dataKey || "value"}`;
        const itemConfig = getPayloadConfigFromPayload(config, item, key);
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "flex items-center gap-1.5 [&>svg]:h-3 [&>svg]:w-3 [&>svg]:text-muted-foreground"
            ),
            children: [
              itemConfig?.icon && !hideIcon ? /* @__PURE__ */ jsxRuntimeExports.jsx(itemConfig.icon, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-2 w-2 shrink-0 rounded-[2px]",
                  style: {
                    backgroundColor: item.color
                  }
                }
              ),
              itemConfig?.label
            ]
          },
          item.value
        );
      })
    }
  );
});
ChartLegendContent.displayName = "ChartLegend";
function getPayloadConfigFromPayload(config, payload, key) {
  if (typeof payload !== "object" || payload === null) {
    return void 0;
  }
  const payloadPayload = "payload" in payload && typeof payload.payload === "object" && payload.payload !== null ? payload.payload : void 0;
  let configLabelKey = key;
  if (key in payload && typeof payload[key] === "string") {
    configLabelKey = payload[key];
  } else if (payloadPayload && key in payloadPayload && typeof payloadPayload[key] === "string") {
    configLabelKey = payloadPayload[key];
  }
  return configLabelKey in config ? config[configLabelKey] : config[key];
}
function AdminPage() {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = reactExports.useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_auth") === "true";
    }
    return false;
  });
  const [username, setUsername] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loginError, setLoginError] = reactExports.useState("");
  const [isEditingSettings, setIsEditingSettings] = reactExports.useState(false);
  const [savingSettings, setSavingSettings] = reactExports.useState(false);
  const [editForm, setEditForm] = reactExports.useState({
    shop_name: "",
    phone: "",
    address: "",
    working_hours: "",
    owner_name: "",
    about_story: ""
  });
  const [editItem, setEditItem] = reactExports.useState(null);
  const [editFormFields, setEditFormFields] = reactExports.useState({});
  const [savingRecord, setSavingRecord] = reactExports.useState(false);
  const [deletingRecord, setDeletingRecord] = reactExports.useState(false);
  const [processingBookings, setProcessingBookings] = reactExports.useState({});
  const [localBillingBookings, setLocalBillingBookings] = reactExports.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("admin_billing_queue") || "[]");
    } catch {
      return [];
    }
  });
  const [localInvoicePayments, setLocalInvoicePayments] = reactExports.useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return JSON.parse(localStorage.getItem("admin_invoice_payments") || "{}");
    } catch {
      return {};
    }
  });
  const [localInventory, setLocalInventory] = reactExports.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("admin_inventory_items") || "[]");
    } catch {
      return [];
    }
  });
  const [localExpenses, setLocalExpenses] = reactExports.useState(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem("admin_expense_items") || "[]");
    } catch {
      return [];
    }
  });
  const {
    data: settings
  } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data
  });
  const {
    data: bookings = []
  } = useQuery({
    queryKey: ["admin", "bookings"],
    queryFn: async () => (await supabase.from("bookings").select("*").order("created_at", {
      ascending: false
    }).limit(8)).data ?? []
  });
  const {
    data: services = []
  } = useQuery({
    queryKey: ["admin", "services"],
    queryFn: async () => (await supabase.from("services").select("*").order("display_order")).data ?? []
  });
  const {
    data: inventory = []
  } = useQuery({
    queryKey: ["admin", "inventory"],
    queryFn: async () => (await supabase.from("inventory").select("*").order("qty", {
      ascending: true
    })).data ?? []
  });
  const {
    data: staff = []
  } = useQuery({
    queryKey: ["admin", "staff"],
    queryFn: async () => (await supabase.from("staff").select("*").order("name")).data ?? []
  });
  const {
    data: invoices = []
  } = useQuery({
    queryKey: ["admin", "invoices"],
    queryFn: async () => (await supabase.from("invoices").select("*").order("created_at", {
      ascending: false
    })).data ?? []
  });
  const {
    data: completedBillingBookings = []
  } = useQuery({
    queryKey: ["admin", "billing-bookings"],
    queryFn: async () => (await supabase.from("bookings").select("*").eq("status", "completed").order("created_at", {
      ascending: false
    }).limit(20)).data ?? []
  });
  const {
    data: expenses = []
  } = useQuery({
    queryKey: ["admin", "expenses"],
    queryFn: async () => (await supabase.from("expenses").select("*").order("expense_date", {
      ascending: false
    })).data ?? []
  });
  const inventoryRows = [...localInventory, ...inventory].filter((item, index, allItems) => allItems.findIndex((candidate) => candidate.id === item.id) === index);
  const expenseRows = [...localExpenses, ...expenses].filter((item, index, allItems) => allItems.findIndex((candidate) => candidate.id === item.id) === index);
  const isBookingPaid = (booking) => {
    const invoiceNo = `INV-${booking.booking_no}`;
    const localStatus = localInvoicePayments[invoiceNo]?.status;
    const invoiceStatus = invoices.find((invoice) => invoice.invoice_no === invoiceNo)?.status;
    return localStatus === "paid" || invoiceStatus === "paid";
  };
  const activeBookings = bookings.filter((booking) => !isBookingPaid(booking));
  const billingBookingCandidates = [...localBillingBookings, ...completedBillingBookings, ...activeBookings.filter((booking) => booking.status === "completed" || processingBookings[booking.id] === "completed")].filter((booking, index, allBookings) => allBookings.findIndex((item) => item.id === booking.id) === index);
  const billingRows = [...invoices.filter((invoice) => (localInvoicePayments[invoice.invoice_no]?.status ?? invoice.status) !== "paid").map((invoice) => ({
    type: "invoice",
    data: invoice
  })), ...billingBookingCandidates.filter((booking) => {
    const invoiceNo = `INV-${booking.booking_no}`;
    const paymentStatus = localInvoicePayments[invoiceNo]?.status ?? booking.billing_status;
    return paymentStatus !== "paid" && !invoices.some((invoice) => invoice.invoice_no === invoiceNo);
  }).map((booking) => ({
    type: "completedBooking",
    data: booking
  }))];
  const paidInvoiceRevenue = invoices.reduce((sum, invoice) => {
    const localPayment = localInvoicePayments[invoice.invoice_no];
    if (localPayment) return sum;
    return invoice.status === "paid" ? sum + Number(invoice.total ?? 0) : sum;
  }, 0);
  const paidLocalRevenue = Object.values(localInvoicePayments).reduce((sum, payment) => payment.status === "paid" ? sum + Number(payment.total ?? 0) : sum, 0);
  const vehicleExpenseTotal = Object.values(localInvoicePayments).reduce((sum, payment) => sum + Number(payment.vehicleExpense ?? 0), 0);
  const paidBillingRevenue = billingBookingCandidates.reduce((sum, booking) => booking.billing_status === "paid" && !localInvoicePayments[`INV-${booking.booking_no}`] ? sum + Number(booking.billing_total ?? 0) : sum, 0);
  const revenue = paidInvoiceRevenue + paidLocalRevenue + paidBillingRevenue;
  const expenseTotal = expenseRows.reduce((sum, item) => sum + Number(item.amount ?? 0), 0) + vehicleExpenseTotal;
  const lowStock = inventoryRows.filter((item) => item.qty <= item.low_threshold).length;
  const inventoryValue = inventoryRows.reduce((sum, item) => sum + Number(item.qty) * Number(item.unit_price), 0);
  const profit = revenue - expenseTotal - inventoryValue;
  const [chartMonths, setChartMonths] = reactExports.useState(6);
  const parseDate = (dateStr) => {
    if (!dateStr) return /* @__PURE__ */ new Date();
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? /* @__PURE__ */ new Date() : parsed;
  };
  const getMonthRange = (monthsCount) => {
    const list = [];
    const now = /* @__PURE__ */ new Date();
    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      list.push({
        label: d.toLocaleString("en-US", {
          month: "short",
          year: "numeric"
        }),
        // "Jan 2026"
        year: d.getFullYear(),
        month: d.getMonth()
      });
    }
    return list;
  };
  const initialRange = getMonthRange(6);
  const [selectedMonthLabel, setSelectedMonthLabel] = reactExports.useState(() => {
    return initialRange[initialRange.length - 1]?.label || "";
  });
  const monthsRange = getMonthRange(chartMonths);
  const chartData = monthsRange.map((m) => {
    const invoiceRevenueForMonth = invoices.reduce((sum, invoice) => {
      const date = parseDate(invoice.created_at);
      if (date.getFullYear() === m.year && date.getMonth() === m.month) {
        const localPayment = localInvoicePayments[invoice.invoice_no];
        if (!localPayment && invoice.status === "paid") {
          return sum + Number(invoice.total ?? 0);
        }
      }
      return sum;
    }, 0);
    const localPaymentRevenueForMonth = Object.entries(localInvoicePayments).reduce((sum, [invoiceNo, payment]) => {
      if (payment.status === "paid") {
        let paymentDate = /* @__PURE__ */ new Date();
        const matchingInvoice = invoices.find((inv) => inv.invoice_no === invoiceNo);
        if (matchingInvoice) {
          paymentDate = parseDate(matchingInvoice.created_at);
        } else {
          const bookingNo = invoiceNo.replace("INV-", "");
          const matchingBooking = billingBookingCandidates.find((b) => b.booking_no === bookingNo);
          if (matchingBooking) {
            paymentDate = parseDate(matchingBooking.created_at);
          } else if (payment.date) {
            paymentDate = parseDate(payment.date);
          }
        }
        if (paymentDate.getFullYear() === m.year && paymentDate.getMonth() === m.month) {
          return sum + Number(payment.total ?? 0);
        }
      }
      return sum;
    }, 0);
    const billingRevenueForMonth = billingBookingCandidates.reduce((sum, booking) => {
      if (booking.billing_status === "paid" && !localInvoicePayments[`INV-${booking.booking_no}`]) {
        const date = parseDate(booking.created_at);
        if (date.getFullYear() === m.year && date.getMonth() === m.month) {
          return sum + Number(booking.billing_total ?? 0);
        }
      }
      return sum;
    }, 0);
    const monthRevenue = invoiceRevenueForMonth + localPaymentRevenueForMonth + billingRevenueForMonth;
    const supabaseExpensesForMonth = expenses.reduce((sum, item) => {
      const date = parseDate(item.expense_date || item.created_at);
      if (date.getFullYear() === m.year && date.getMonth() === m.month) {
        return sum + Number(item.amount ?? 0);
      }
      return sum;
    }, 0);
    const localExpensesForMonth = localExpenses.reduce((sum, item) => {
      const date = parseDate(item.expense_date || item.created_at);
      if (date.getFullYear() === m.year && date.getMonth() === m.month) {
        return sum + Number(item.amount ?? 0);
      }
      return sum;
    }, 0);
    const vehicleExpensesForMonth = Object.entries(localInvoicePayments).reduce((sum, [invoiceNo, payment]) => {
      if (payment.vehicleExpense) {
        let expenseDate = /* @__PURE__ */ new Date();
        const matchingInvoice = invoices.find((inv) => inv.invoice_no === invoiceNo);
        if (matchingInvoice) {
          expenseDate = parseDate(matchingInvoice.created_at);
        } else {
          const bookingNo = invoiceNo.replace("INV-", "");
          const matchingBooking = billingBookingCandidates.find((b) => b.booking_no === bookingNo);
          if (matchingBooking) {
            expenseDate = parseDate(matchingBooking.created_at);
          } else if (payment.date) {
            expenseDate = parseDate(payment.date);
          }
        }
        if (expenseDate.getFullYear() === m.year && expenseDate.getMonth() === m.month) {
          return sum + Number(payment.vehicleExpense ?? 0);
        }
      }
      return sum;
    }, 0);
    const monthExpenses = supabaseExpensesForMonth + localExpensesForMonth + vehicleExpensesForMonth;
    const monthEnd = new Date(m.year, m.month + 1, 0, 23, 59, 59, 999);
    const monthInventoryValue = inventoryRows.reduce((sum, item) => {
      const dateStr = item.created_at || item.expense_date || (/* @__PURE__ */ new Date()).toISOString();
      const date = parseDate(dateStr);
      if (date <= monthEnd) {
        return sum + Number(item.qty) * Number(item.unit_price);
      }
      return sum;
    }, 0);
    return {
      month: m.label,
      grossInvoices: monthRevenue,
      recentExpenses: monthExpenses,
      inventoryValue: monthInventoryValue
    };
  });
  const activeMonthData = chartData.find((d) => d.month === selectedMonthLabel) || chartData[chartData.length - 1];
  const pieData = activeMonthData ? [
    {
      name: "Gross Invoices",
      value: activeMonthData.grossInvoices,
      color: "oklch(0.82 0.17 86)"
    },
    // High-vis yellow
    {
      name: "Recent Expenses",
      value: activeMonthData.recentExpenses,
      color: "oklch(0.6 0.22 27)"
    },
    // Rose red
    {
      name: "Inventory Value",
      value: activeMonthData.inventoryValue,
      color: "oklch(0.62 0.15 220)"
    }
    // Electric blue
  ] : [];
  const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      sessionStorage.setItem("admin_auth", "true");
      setIsAuthenticated(true);
      setLoginError("");
      toast.success("Diagnostics Access Granted.");
    } else {
      setLoginError("Invalid system diagnostics access token or identity code.");
      toast.error("Access Denied.");
    }
  };
  const handleSignOut = () => {
    sessionStorage.removeItem("admin_auth");
    setIsAuthenticated(false);
    toast.success("Disconnected admin console session.");
  };
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    if (!settings?.id) return;
    setSavingSettings(true);
    try {
      const {
        error
      } = await supabase.from("site_settings").update({
        shop_name: editForm.shop_name,
        phone: editForm.phone,
        address: editForm.address,
        working_hours: editForm.working_hours,
        owner_name: editForm.owner_name,
        about_story: editForm.about_story
      }).eq("id", settings.id);
      if (error) throw error;
      toast.success("Site settings updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["admin", "settings"]
      });
      queryClient.invalidateQueries({
        queryKey: ["site_settings"]
      });
      setIsEditingSettings(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update site settings: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };
  const handleApproveBooking = async (booking) => {
    setProcessingBookings((prev) => ({
      ...prev,
      [booking.id]: "approved"
    }));
    try {
      const {
        error
      } = await supabase.from("bookings").update({
        status: "confirmed"
      }).eq("id", booking.id);
      if (error) throw error;
      toast.success(`Booking ${booking.booking_no} approved!`);
      queryClient.invalidateQueries({
        queryKey: ["admin"]
      });
      const cleanPhone = booking.phone.replace(/\D/g, "");
      const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
      const messageText = `Hello ${booking.customer_name}, your booking at Shubham Auto Clinic for ${booking.service_name || "General Service"} has been approved!`;
      const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`;
      if (formattedPhone) {
        window.open(waLink, "_blank");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve booking: " + err.message);
      setProcessingBookings((prev) => {
        const copy = {
          ...prev
        };
        delete copy[booking.id];
        return copy;
      });
    }
  };
  const handleRejectBooking = async (booking) => {
    if (!confirm(`Are you sure you want to reject booking ${booking.booking_no}?`)) return;
    setProcessingBookings((prev) => ({
      ...prev,
      [booking.id]: "rejected"
    }));
    try {
      const {
        error
      } = await supabase.from("bookings").update({
        status: "cancelled"
      }).eq("id", booking.id);
      if (error) throw error;
      toast.success(`Booking ${booking.booking_no} rejected.`);
      queryClient.invalidateQueries({
        queryKey: ["admin"]
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject booking: " + err.message);
      setProcessingBookings((prev) => {
        const copy = {
          ...prev
        };
        delete copy[booking.id];
        return copy;
      });
    }
  };
  const handleCompleteBooking = async (booking) => {
    setProcessingBookings((prev) => ({
      ...prev,
      [booking.id]: "completed"
    }));
    const addToLocalBillingQueue = () => {
      setLocalBillingBookings((current) => {
        const next = [booking, ...current.filter((item) => item.id !== booking.id)];
        localStorage.setItem("admin_billing_queue", JSON.stringify(next));
        return next;
      });
    };
    addToLocalBillingQueue();
    try {
      const matchedService = services.find((service) => service.id === booking.service_id || service.name === booking.service_name);
      const serviceAmount = Number(matchedService?.price ?? 0);
      const invoiceNo = `INV-${booking.booking_no}`;
      const {
        error
      } = await supabase.from("bookings").update({
        status: "completed"
      }).eq("id", booking.id);
      if (error) throw error;
      const {
        error: invoiceError
      } = await supabase.from("invoices").upsert({
        invoice_no: invoiceNo,
        customer_name: booking.customer_name,
        customer_phone: booking.phone,
        vehicle_info: booking.vehicle_info || null,
        items: [{
          booking_no: booking.booking_no,
          service_name: booking.service_name || "General Service",
          amount: serviceAmount
        }],
        subtotal: serviceAmount,
        gst_rate: 0,
        gst_amount: 0,
        total: serviceAmount,
        status: "unpaid",
        notes: `Billing request from completed booking ${booking.booking_no}${booking.problem ? `: ${booking.problem}` : ""}`
      }, {
        onConflict: "invoice_no"
      });
      if (invoiceError) {
        console.warn("Invoice draft could not be saved, showing completed booking in Billing instead.", invoiceError);
      } else {
        setLocalBillingBookings((current) => {
          const next = current.filter((item) => item.id !== booking.id);
          localStorage.setItem("admin_billing_queue", JSON.stringify(next));
          return next;
        });
      }
      toast.success(`Booking ${booking.booking_no} sent to Billing!`);
      queryClient.invalidateQueries({
        queryKey: ["admin"]
      });
    } catch (err) {
      console.error(err);
      toast.error("Failed to send booking to billing: " + err.message);
      setProcessingBookings((prev) => {
        const copy = {
          ...prev
        };
        delete copy[booking.id];
        return copy;
      });
    }
  };
  const getBillingInvoiceNo = (row) => row.type === "invoice" ? row.data.invoice_no : `INV-${row.data.booking_no}`;
  const promptVehicleExpense = (currentExpense = 0) => {
    const input = prompt("Expenses done for this vehicle", currentExpense ? String(currentExpense) : "0");
    if (input === null) return null;
    const vehicleExpense = Number(input);
    if (!Number.isFinite(vehicleExpense) || vehicleExpense < 0) {
      toast.error("Please enter a valid vehicle expense.");
      return null;
    }
    return vehicleExpense;
  };
  const handleVehicleExpense = (row) => {
    const invoiceNo = getBillingInvoiceNo(row);
    const currentPayment = localInvoicePayments[invoiceNo];
    const vehicleExpense = promptVehicleExpense(Number(currentPayment?.vehicleExpense ?? row.data.vehicle_expense ?? row.data.billing_expense ?? 0));
    if (vehicleExpense === null) return;
    setLocalInvoicePayments((current) => {
      const previous = current[invoiceNo] ?? {
        status: row.data.status ?? row.data.billing_status ?? "unpaid",
        total: Number(row.data.total ?? row.data.billing_total ?? 0)
      };
      const next = {
        ...current,
        [invoiceNo]: {
          ...previous,
          vehicleExpense
        }
      };
      localStorage.setItem("admin_invoice_payments", JSON.stringify(next));
      return next;
    });
    if (row.type === "completedBooking") {
      setLocalBillingBookings((current) => {
        const updatedBooking = {
          ...row.data,
          billing_expense: vehicleExpense
        };
        const next = [updatedBooking, ...current.filter((item) => item.id !== row.data.id)];
        localStorage.setItem("admin_billing_queue", JSON.stringify(next));
        return next;
      });
    }
    toast.success("Vehicle expense saved.");
  };
  const sendPaidInvoiceToCustomer = async (row, payment) => {
    const invoiceNo = getBillingInvoiceNo(row);
    const customerName = row.data.customer_name || "Customer";
    const customerPhone = row.data.phone || row.data.customer_phone || "";
    const bookingNo = row.type === "completedBooking" ? row.data.booking_no : row.data.items?.[0]?.booking_no || "N/A";
    const serviceName = row.type === "completedBooking" ? row.data.service_name || "General Service" : row.data.items?.[0]?.service_name || "Vehicle Service";
    const vehicleInfo = row.data.vehicle_info || "Vehicle";
    const shopName = settings?.shop_name || "Shubham Auto Clinic";
    const shopPhone = settings?.phone || "";
    const shopAddress = settings?.address || "";
    const today = (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN");
    const doc = new jspdf_node_minExports.jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(shopName, 14, 18);
    doc.setFontSize(12);
    doc.text("Paid Invoice", 14, 28);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    if (shopAddress) doc.text(shopAddress, 14, 36);
    if (shopPhone) doc.text(`Phone: ${shopPhone}`, 14, 43);
    doc.setDrawColor(220);
    doc.line(14, 50, 196, 50);
    doc.setFont("helvetica", "bold");
    doc.text(`Invoice: ${invoiceNo}`, 14, 60);
    doc.text(`Date: ${today}`, 140, 60);
    doc.setFont("helvetica", "normal");
    doc.text(`Customer: ${customerName}`, 14, 72);
    doc.text(`Phone: ${customerPhone || "N/A"}`, 14, 80);
    doc.text(`Booking: ${bookingNo}`, 14, 88);
    doc.text(`Vehicle: ${vehicleInfo}`, 14, 96);
    doc.setDrawColor(220);
    doc.line(14, 106, 196, 106);
    doc.setFont("helvetica", "bold");
    doc.text("Description", 14, 116);
    doc.text("Amount", 170, 116);
    doc.setFont("helvetica", "normal");
    doc.text(serviceName, 14, 126);
    doc.text(`Rs. ${payment.total.toLocaleString("en-IN")}`, 170, 126);
    doc.setDrawColor(220);
    doc.line(14, 136, 196, 136);
    doc.setFont("helvetica", "bold");
    doc.text("Invoice Total", 130, 148);
    doc.text(`Rs. ${payment.total.toLocaleString("en-IN")}`, 170, 148);
    doc.text("Status", 130, 158);
    doc.text("PAID", 170, 158);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Your vehicle is ready for delivery. Thank you for choosing us.", 14, 178);
    const filename = `${invoiceNo}.pdf`;
    const pdfBase64 = doc.output("datauristring").split(",")[1];
    const cleanPhone = String(customerPhone).replace(/\D/g, "");
    const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;
    const messageText = `Hello ${customerName}, your vehicle is ready at ${shopName}. Your invoice ${invoiceNo} is paid. Total: Rs. ${payment.total.toLocaleString("en-IN")}. Please collect your vehicle.`;
    if (!formattedPhone) {
      doc.save(filename);
      toast.info("Invoice PDF downloaded. Customer phone number is missing.");
      return;
    }
    try {
      const result = await sendWhatsAppInvoicePdf({
        data: {
          phone: formattedPhone,
          filename,
          caption: messageText,
          pdfBase64
        }
      });
      if (result.ok) {
        toast.success("Invoice PDF sent directly on WhatsApp.");
        return;
      }
      doc.save(filename);
      window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(`${messageText} PDF invoice has been generated.`)}`, "_blank");
      toast.error(`${result.message} PDF downloaded and WhatsApp message opened instead.`);
    } catch (error) {
      console.error(error);
      doc.save(filename);
      window.open(`https://wa.me/${formattedPhone}?text=${encodeURIComponent(`${messageText} PDF invoice has been generated.`)}`, "_blank");
      toast.error("Direct WhatsApp PDF send failed. PDF downloaded and message opened instead.");
    }
  };
  const handleBillingPaid = async (row, paid) => {
    let total = Number(row.data.billing_total ?? row.data.total ?? 0);
    const invoiceNo = getBillingInvoiceNo(row);
    const currentPayment = localInvoicePayments[invoiceNo];
    let vehicleExpense = Number(currentPayment?.vehicleExpense ?? row.data.vehicle_expense ?? row.data.billing_expense ?? 0);
    if (paid) {
      const input = prompt("Invoice Total", total ? String(total) : "");
      if (input === null) return;
      total = Number(input);
      if (!Number.isFinite(total) || total < 0) {
        toast.error("Please enter a valid invoice total.");
        return;
      }
      const expenseInput = promptVehicleExpense(vehicleExpense);
      if (expenseInput === null) return;
      vehicleExpense = expenseInput;
    }
    if (row.type === "invoice") {
      const nextPayment2 = {
        status: paid ? "paid" : "unpaid",
        total,
        vehicleExpense,
        date: (/* @__PURE__ */ new Date()).toISOString()
      };
      if (paid) {
        await sendPaidInvoiceToCustomer(row, nextPayment2);
      }
      setLocalInvoicePayments((current) => {
        const next = {
          ...current,
          [invoiceNo]: nextPayment2
        };
        localStorage.setItem("admin_invoice_payments", JSON.stringify(next));
        return next;
      });
      const {
        error
      } = await supabase.from("invoices").update({
        status: nextPayment2.status,
        total
      }).eq("id", row.data.id);
      if (error) {
        console.warn("Invoice payment status stored locally because Supabase update failed.", error);
      }
      toast.success(paid ? "Invoice marked as paid." : "Invoice marked as unpaid.");
      queryClient.invalidateQueries({
        queryKey: ["admin"]
      });
      return;
    }
    const nextPayment = {
      status: paid ? "paid" : "unpaid",
      total,
      vehicleExpense,
      date: (/* @__PURE__ */ new Date()).toISOString()
    };
    if (paid) {
      await sendPaidInvoiceToCustomer(row, nextPayment);
    }
    setLocalInvoicePayments((current) => {
      const next = {
        ...current,
        [invoiceNo]: nextPayment
      };
      localStorage.setItem("admin_invoice_payments", JSON.stringify(next));
      return next;
    });
    setLocalBillingBookings((current) => {
      const updatedBooking = {
        ...row.data,
        billing_status: nextPayment.status,
        billing_total: total,
        billing_expense: vehicleExpense
      };
      const next = paid ? current.filter((item) => item.id !== row.data.id) : [updatedBooking, ...current.filter((item) => item.id !== row.data.id)];
      localStorage.setItem("admin_billing_queue", JSON.stringify(next));
      return next;
    });
    if (paid) {
      const {
        error
      } = await supabase.from("invoices").upsert({
        invoice_no: invoiceNo,
        customer_name: row.data.customer_name,
        customer_phone: row.data.phone,
        vehicle_info: row.data.vehicle_info || null,
        items: [{
          booking_no: row.data.booking_no,
          service_name: row.data.service_name || "General Service",
          amount: total
        }],
        subtotal: total,
        gst_rate: 0,
        gst_amount: 0,
        total,
        status: "paid",
        notes: `Paid billing from completed booking ${row.data.booking_no}. Vehicle expenses: ₹${vehicleExpense.toLocaleString("en-IN")}${row.data.problem ? `: ${row.data.problem}` : ""}`
      }, {
        onConflict: "invoice_no"
      });
      if (error) {
        console.warn("Paid invoice stored locally because Supabase insert failed.", error);
      }
    }
    toast.success(paid ? "Billing request marked as paid." : "Billing request marked as unpaid.");
    queryClient.invalidateQueries({
      queryKey: ["admin"]
    });
  };
  const getInitialFields = (type) => {
    switch (type) {
      case "booking":
        return {
          customer_name: "",
          phone: "",
          email: "",
          vehicle_type: "car",
          vehicle_info: "",
          service_id: "",
          service_name: "",
          scheduled_at: new Date(Date.now() + 864e5).toISOString().slice(0, 16),
          // tomorrow
          problem: "",
          status: "pending",
          progress_stage: "intake",
          notes: ""
        };
      case "service":
        return {
          name: "",
          price: 0,
          active: true,
          code: `SVC-${Math.floor(100 + Math.random() * 900)}`,
          description: "",
          category: "general",
          duration_min: 60
        };
      case "inventory":
        return {
          name: "",
          qty: 0,
          low_threshold: 5,
          unit_price: 0
        };
      case "invoice":
        return {
          invoice_no: `INV-${Math.floor(1e3 + Math.random() * 9e3)}`,
          customer_name: "",
          total: 0,
          status: "unpaid",
          notes: "",
          vehicle_info: ""
        };
      case "expense":
        return {
          category: "parts",
          amount: 0,
          expense_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
          note: ""
        };
      case "staff":
        return {
          name: "",
          role: "Technician",
          active: true,
          salary: 0
        };
      default:
        return {};
    }
  };
  const handleOpenAdd = (type) => {
    const fields = getInitialFields(type);
    setEditFormFields(fields);
    setEditItem({
      type,
      id: "",
      data: fields
    });
  };
  const handleOpenEdit = (type, item) => {
    let formattedFields = {
      ...item
    };
    if (type === "booking" && item.scheduled_at) {
      formattedFields.scheduled_at = new Date(item.scheduled_at).toISOString().slice(0, 16);
    }
    setEditFormFields(formattedFields);
    setEditItem({
      type,
      id: item.id,
      data: item
    });
  };
  const saveLocalInventory = (item) => {
    setLocalInventory((current) => {
      const next = [item, ...current.filter((existing) => existing.id !== item.id)];
      localStorage.setItem("admin_inventory_items", JSON.stringify(next));
      return next;
    });
  };
  const saveLocalExpense = (item) => {
    setLocalExpenses((current) => {
      const next = [item, ...current.filter((existing) => existing.id !== item.id)];
      localStorage.setItem("admin_expense_items", JSON.stringify(next));
      return next;
    });
  };
  const handleSaveRecord = async (e) => {
    e.preventDefault();
    if (!editItem) return;
    setSavingRecord(true);
    try {
      const isNew = !editItem.id;
      let error;
      let savedLocally = false;
      if (editItem.type === "booking") {
        const payload = {
          customer_name: editFormFields.customer_name,
          phone: editFormFields.phone,
          email: editFormFields.email || null,
          vehicle_type: editFormFields.vehicle_type,
          vehicle_info: editFormFields.vehicle_info || null,
          service_id: editFormFields.service_id || null,
          service_name: editFormFields.service_name || null,
          scheduled_at: new Date(editFormFields.scheduled_at).toISOString(),
          problem: editFormFields.problem || null,
          status: editFormFields.status,
          progress_stage: editFormFields.progress_stage,
          notes: editFormFields.notes || null
        };
        if (isNew) {
          ({
            error
          } = await supabase.from("bookings").insert(payload));
        } else {
          ({
            error
          } = await supabase.from("bookings").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "service") {
        const payload = {
          name: editFormFields.name,
          price: Number(editFormFields.price),
          active: Boolean(editFormFields.active),
          code: editFormFields.code,
          description: editFormFields.description,
          category: editFormFields.category,
          duration_min: Number(editFormFields.duration_min)
        };
        if (isNew) {
          ({
            error
          } = await supabase.from("services").insert(payload));
        } else {
          ({
            error
          } = await supabase.from("services").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "inventory") {
        const payload = {
          name: editFormFields.name,
          qty: Number(editFormFields.qty),
          low_threshold: Number(editFormFields.low_threshold),
          unit_price: Number(editFormFields.unit_price)
        };
        if (isNew) {
          ({
            error
          } = await supabase.from("inventory").insert(payload));
          if (error) {
            console.warn("Inventory record stored locally because Supabase save failed.", error);
            saveLocalInventory({
              id: `local-inventory-${Date.now()}`,
              ...payload,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            });
            savedLocally = true;
            error = null;
          }
        } else if (editItem.id.startsWith("local-inventory-")) {
          saveLocalInventory({
            id: editItem.id,
            ...payload,
            created_at: editItem.data?.created_at ?? (/* @__PURE__ */ new Date()).toISOString()
          });
          savedLocally = true;
        } else {
          ({
            error
          } = await supabase.from("inventory").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "invoice") {
        const payload = {
          invoice_no: editFormFields.invoice_no,
          customer_name: editFormFields.customer_name,
          total: Number(editFormFields.total),
          status: editFormFields.status,
          notes: editFormFields.notes || null
        };
        if (isNew) {
          ({
            error
          } = await supabase.from("invoices").insert(payload));
        } else {
          ({
            error
          } = await supabase.from("invoices").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "expense") {
        const payload = {
          category: editFormFields.category,
          amount: Number(editFormFields.amount),
          expense_date: editFormFields.expense_date,
          note: editFormFields.note || null
        };
        if (isNew) {
          ({
            error
          } = await supabase.from("expenses").insert(payload));
          if (error) {
            console.warn("Expense record stored locally because Supabase save failed.", error);
            saveLocalExpense({
              id: `local-expense-${Date.now()}`,
              ...payload,
              created_at: (/* @__PURE__ */ new Date()).toISOString()
            });
            savedLocally = true;
            error = null;
          }
        } else if (editItem.id.startsWith("local-expense-")) {
          saveLocalExpense({
            id: editItem.id,
            ...payload,
            created_at: editItem.data?.created_at ?? (/* @__PURE__ */ new Date()).toISOString()
          });
          savedLocally = true;
        } else {
          ({
            error
          } = await supabase.from("expenses").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "staff") {
        const payload = {
          name: editFormFields.name,
          role: editFormFields.role,
          active: Boolean(editFormFields.active),
          salary: Number(editFormFields.salary) || null
        };
        if (isNew) {
          ({
            error
          } = await supabase.from("staff").insert(payload));
        } else {
          ({
            error
          } = await supabase.from("staff").update(payload).eq("id", editItem.id));
        }
      }
      if (error) throw error;
      toast.success(savedLocally ? "Record saved locally." : `Record ${isNew ? "created" : "updated"} successfully!`);
      queryClient.invalidateQueries({
        queryKey: ["admin"]
      });
      setEditItem(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save: " + err.message);
    } finally {
      setSavingRecord(false);
    }
  };
  const handleDeleteRecord = async () => {
    if (!editItem?.id) return;
    if (!confirm(`Are you sure you want to delete this ${editItem.type}?`)) return;
    setDeletingRecord(true);
    try {
      let error;
      if (editItem.type === "booking") {
        ({
          error
        } = await supabase.from("bookings").delete().eq("id", editItem.id));
      } else if (editItem.type === "service") {
        ({
          error
        } = await supabase.from("services").delete().eq("id", editItem.id));
      } else if (editItem.type === "inventory") {
        if (editItem.id.startsWith("local-inventory-")) {
          setLocalInventory((current) => {
            const next = current.filter((item) => item.id !== editItem.id);
            localStorage.setItem("admin_inventory_items", JSON.stringify(next));
            return next;
          });
        } else {
          ({
            error
          } = await supabase.from("inventory").delete().eq("id", editItem.id));
        }
      } else if (editItem.type === "invoice") {
        ({
          error
        } = await supabase.from("invoices").delete().eq("id", editItem.id));
      } else if (editItem.type === "expense") {
        if (editItem.id.startsWith("local-expense-")) {
          setLocalExpenses((current) => {
            const next = current.filter((item) => item.id !== editItem.id);
            localStorage.setItem("admin_expense_items", JSON.stringify(next));
            return next;
          });
        } else {
          ({
            error
          } = await supabase.from("expenses").delete().eq("id", editItem.id));
        }
      } else if (editItem.type === "staff") {
        ({
          error
        } = await supabase.from("staff").delete().eq("id", editItem.id));
      }
      if (error) throw error;
      toast.success("Record deleted successfully!");
      queryClient.invalidateQueries({
        queryKey: ["admin"]
      });
      setEditItem(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete record: " + err.message);
    } finally {
      setDeletingRecord(false);
    }
  };
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PageShell, { eyebrow: "Authorized access only", title: "Diag Intake", cta: {
      to: "/",
      label: "Public Site"
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-24 flex items-center justify-center min-h-[60vh]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md metallic-surface border border-border p-8 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-[3px] bg-primary animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-1.5 bg-primary animate-blink" }),
          " Access Level: Level 2"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl uppercase italic tracking-tight", children: "Admin Console Login" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-2 leading-relaxed", children: "Unlock diagnostic logs, service records, billing, inventory, and site parameters." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-5", children: [
        loginError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-400 font-bold uppercase tracking-wider", children: [
          "⚠️ ",
          loginError
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2", children: "Username" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: username, onChange: (e) => setUsername(e.target.value), className: "w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-primary outline-none transition-colors", placeholder: "Enter operator username" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2", children: "Password" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), className: "w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-primary outline-none transition-colors", placeholder: "••••••••" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "w-full bg-primary hover:bg-white text-primary-foreground hover:text-black py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3", children: "Authenticate Diagnostics" })
      ] })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageShell, { eyebrow: "Garage command center", title: "Admin Panel", cta: {
    to: "/",
    label: "Public Site"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "px-6 py-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-5 border border-border bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "size-5 text-primary animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold uppercase tracking-wider", children: "Secure Connection Active" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Admin session active. Disconnect when finished." })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleSignOut, className: "px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 text-xs font-bold uppercase tracking-widest transition-colors", children: "Sign Out Session" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: CalendarClock, label: "Bookings", value: activeBookings.length.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: Wrench, label: "Services", value: services.length.toString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: IndianRupee, label: "Invoice Total", value: `₹${revenue.toLocaleString("en-IN")}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Metric, { icon: Boxes, label: "Low Stock", value: lowStock.toString() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid gap-8 lg:grid-cols-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Site Content Editor", icon: Settings, children: isEditingSettings ? /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveSettings, className: "space-y-4 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Shop Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editForm.shop_name, onChange: (e) => setEditForm({
              ...editForm,
              shop_name: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Owner Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editForm.owner_name, onChange: (e) => setEditForm({
              ...editForm,
              owner_name: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editForm.phone, onChange: (e) => setEditForm({
              ...editForm,
              phone: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Working Hours" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editForm.working_hours, onChange: (e) => setEditForm({
              ...editForm,
              working_hours: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", value: editForm.address, onChange: (e) => setEditForm({
              ...editForm,
              address: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "About Story" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editForm.about_story, onChange: (e) => setEditForm({
              ...editForm,
              about_story: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors resize-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 pt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: savingSettings, className: "flex-1 bg-primary text-primary-foreground hover:bg-white hover:text-black py-2.5 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50", children: savingSettings ? "Saving..." : "Save" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setIsEditingSettings(false), className: "flex-1 border border-border hover:bg-card py-2.5 text-xs font-bold uppercase tracking-widest transition-colors", children: "Cancel" })
          ] })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Shop", value: settings?.shop_name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Owner", value: settings?.owner_name ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Phone", value: settings?.phone ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Hours", value: settings?.working_hours ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Address", value: settings?.address ?? "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(InfoRow, { label: "Story", value: settings?.about_story ? `${settings.about_story.slice(0, 45)}...` : "—" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
            setEditForm({
              shop_name: settings?.shop_name ?? "",
              phone: settings?.phone ?? "",
              address: settings?.address ?? "",
              working_hours: settings?.working_hours ?? "",
              owner_name: settings?.owner_name ?? "",
              about_story: settings?.about_story ?? ""
            });
            setIsEditingSettings(true);
          }, className: "w-full mt-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors", children: "Edit Site Settings" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Bookings", icon: CalendarClock, onAdd: () => handleOpenAdd("booking"), children: activeBookings.length ? activeBookings.map((b) => {
          const localStatus = processingBookings[b.id] ? processingBookings[b.id] === "approved" ? "confirmed" : processingBookings[b.id] === "completed" ? "completed" : "cancelled" : b.status;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-4 last:border-0 last:pb-0 group", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold text-sm flex items-center gap-2", children: [
                  b.booking_no,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `uppercase text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${localStatus === "pending" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" : localStatus === "confirmed" ? "bg-green-500/20 text-green-400 border border-green-500/30" : localStatus === "completed" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" : "bg-red-500/20 text-red-400 border border-red-500/30"}`, children: localStatus === "confirmed" ? "approved" : localStatus === "cancelled" ? "rejected" : localStatus })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground text-sm block mt-1", children: [
                  b.customer_name,
                  " — ",
                  b.service_name ?? "General"
                ] }),
                b.vehicle_info && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-muted-foreground/80 block mt-0.5", children: [
                  "Vehicle: ",
                  b.vehicle_info
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleOpenEdit("booking", b), className: "opacity-40 hover:opacity-100 hover:text-primary transition-opacity p-1.5", title: "Edit Record", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3.5" }) }) })
            ] }),
            localStatus === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mt-3 pl-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleApproveBooking(b), className: "px-3 py-1 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/20 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer", children: "Approve" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleRejectBooking(b), className: "px-3 py-1 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer", children: "Reject" })
            ] }),
            ["pending", "confirmed", "in_progress"].includes(localStatus) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 pl-0 flex flex-col gap-1.5 border border-primary/20 bg-primary/5 p-3 rounded", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse", children: "⚙️ Service is Done?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleCompleteBooking(b), className: "px-3 py-1 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/20 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer", children: "Yes" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => toast.info(`Booking ${b.booking_no} remains in active queue.`), className: "px-3 py-1 border border-border hover:bg-card text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer", children: "No" })
              ] })
            ] })
          ] }, b.booking_no);
        }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Services", icon: Wrench, onAdd: () => handleOpenAdd("service"), children: services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditableRow, { label: s.name, value: `₹${Number(s.price).toLocaleString("en-IN")} · ${s.active ? "Active" : "Hidden"}`, onEdit: () => handleOpenEdit("service", s) }, s.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Inventory", icon: Boxes, onAdd: () => handleOpenAdd("inventory"), children: inventoryRows.slice(0, 8).map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditableRow, { label: i.name, value: `${i.qty} units · low threshold: ${i.low_threshold}`, onEdit: () => handleOpenEdit("inventory", i) }, i.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Billing", icon: FileText, onAdd: () => handleOpenAdd("invoice"), children: billingRows.length ? billingRows.map((row) => {
          if (row.type === "invoice") {
            const i = row.data;
            const localPayment2 = localInvoicePayments[i.invoice_no];
            const status = localPayment2?.status ?? i.status;
            const total = localPayment2?.total ?? Number(i.total ?? 0);
            const vehicleExpense2 = Number(localPayment2?.vehicleExpense ?? i.vehicle_expense ?? 0);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(BillingPaymentRow, { label: `${i.invoice_no} · ${status}`, value: `${i.customer_name} — ₹${total.toLocaleString("en-IN")}`, expense: vehicleExpense2, paid: status === "paid", onExpense: () => handleVehicleExpense(row), onPaid: () => handleBillingPaid(row, true), onUnpaid: () => handleBillingPaid(row, false), onEdit: () => handleOpenEdit("invoice", i) }, i.id);
          }
          const b = row.data;
          const matchedService = services.find((service) => service.id === b.service_id || service.name === b.service_name);
          const invoiceNo = `INV-${b.booking_no}`;
          const localPayment = localInvoicePayments[invoiceNo];
          const serviceAmount = Number(b.billing_total ?? matchedService?.price ?? 0);
          const billingStatus = localPayment?.status ?? b.billing_status ?? "unpaid";
          const vehicleExpense = Number(localPayment?.vehicleExpense ?? b.billing_expense ?? 0);
          return /* @__PURE__ */ jsxRuntimeExports.jsx(BillingPaymentRow, { label: `${b.booking_no} · ${billingStatus}`, value: `${b.customer_name} — ₹${serviceAmount.toLocaleString("en-IN")}`, expense: vehicleExpense, paid: billingStatus === "paid", onExpense: () => handleVehicleExpense(row), onPaid: () => handleBillingPaid(row, true), onUnpaid: () => handleBillingPaid(row, false), onEdit: () => {
            setEditFormFields({
              invoice_no: `INV-${b.booking_no}`,
              customer_name: b.customer_name,
              total: serviceAmount,
              status: "unpaid",
              notes: `Billing request from completed booking ${b.booking_no}${b.problem ? `: ${b.problem}` : ""}`,
              vehicle_info: b.vehicle_info || ""
            });
            setEditItem({
              type: "invoice",
              id: "",
              data: b
            });
          } }, `billing-${b.id}`);
        }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Expenses", icon: IndianRupee, onAdd: () => handleOpenAdd("expense"), children: expenseRows.length ? expenseRows.slice(0, 6).map((e, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditableRow, { label: e.category, value: `₹${Number(e.amount).toLocaleString("en-IN")} · ${e.expense_date}`, onEdit: () => handleOpenEdit("expense", e) }, e.id || `${e.category}-${index}`)) : /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Staff", icon: Users, onAdd: () => handleOpenAdd("staff"), children: staff.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(EditableRow, { label: s.name, value: `${s.role} · ${s.active ? "Active" : "Inactive"}`, onEdit: () => handleOpenEdit("staff", s) }, s.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Panel, { title: "Analytics", icon: ChartColumn, className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-border bg-background/50 rounded", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1", children: "Gross invoices" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-mono font-bold text-foreground", children: [
                "₹",
                revenue.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-border bg-background/50 rounded", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1", children: "Recent expenses" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-mono font-bold text-foreground", children: [
                "₹",
                expenseTotal.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-border bg-background/50 rounded", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1", children: "Inventory value" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-2xl font-mono font-bold text-foreground", children: [
                "₹",
                inventoryValue.toLocaleString("en-IN")
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border border-border bg-background/50 rounded", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1", children: "Profit" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-2xl font-mono font-bold block ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`, children: profit < 0 ? `-₹${Math.abs(profit).toLocaleString("en-IN")}` : `₹${profit.toLocaleString("en-IN")}` })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 flex gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/book", className: "flex-1 text-center bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-white hover:text-black transition-colors", children: "Create Booking" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 border border-border bg-background/40 p-5 rounded relative flex flex-col justify-between min-h-[350px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse", children: "📊 System Breakdown" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs text-muted-foreground font-bold uppercase tracking-wider mt-0.5", children: "Month-Wise Category Shares" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 w-full sm:w-auto", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("select", { value: selectedMonthLabel, onChange: (e) => setSelectedMonthLabel(e.target.value), className: "bg-background border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground outline-none focus:border-primary cursor-pointer w-full sm:w-auto", children: monthsRange.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: m.label, children: m.label }, m.label)) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex border border-border bg-background", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    setChartMonths(6);
                    const nextRange = getMonthRange(6);
                    if (!nextRange.some((m) => m.label === selectedMonthLabel)) {
                      setSelectedMonthLabel(nextRange[nextRange.length - 1]?.label);
                    }
                  }, className: `px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${chartMonths === 6 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: "6M" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
                    setChartMonths(12);
                    const nextRange = getMonthRange(12);
                    if (!nextRange.some((m) => m.label === selectedMonthLabel)) {
                      setSelectedMonthLabel(nextRange[nextRange.length - 1]?.label);
                    }
                  }, className: `px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${chartMonths === 12 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`, children: "12M" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-[220px] w-full flex items-center justify-center", children: totalValue > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContainer, { config: {
                  grossInvoices: {
                    label: "Gross Invoices",
                    color: "oklch(0.82 0.17 86)"
                  },
                  recentExpenses: {
                    label: "Recent Expenses",
                    color: "oklch(0.6 0.22 27)"
                  },
                  inventoryValue: {
                    label: "Inventory Value",
                    color: "oklch(0.62 0.15 220)"
                  }
                }, className: "h-full w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Pie, { data: pieData, cx: "50%", cy: "50%", innerRadius: 60, outerRadius: 85, paddingAngle: 4, dataKey: "value", children: pieData.map((entry, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(Cell, { fill: entry.color, stroke: "rgba(0,0,0,0.3)", strokeWidth: 1 }, `cell-${index}`)) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, { indicator: "dot", formatter: (value, name) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-4 w-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] font-bold uppercase tracking-wider text-muted-foreground", children: [
                      name,
                      ":"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-foreground", children: [
                      "₹",
                      Number(value).toLocaleString("en-IN")
                    ] })
                  ] }) }) })
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-bold uppercase tracking-widest text-muted-foreground", children: "Month Net" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-sm font-mono font-bold ${(activeMonthData?.grossInvoices || 0) - (activeMonthData?.recentExpenses || 0) >= 0 ? "text-emerald-400" : "text-rose-400"}`, children: [
                    "₹",
                    ((activeMonthData?.grossInvoices || 0) - (activeMonthData?.recentExpenses || 0)).toLocaleString("en-IN")
                  ] })
                ] })
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center p-6 border border-dashed border-border rounded bg-background/20 w-full", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "No Activity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground max-w-[200px] leading-relaxed", children: "No invoices, expenses, or inventory records are associated with this month." })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3.5", children: pieData.map((item, idx) => {
                const pct = totalValue > 0 ? (item.value / totalValue * 100).toFixed(1) : "0";
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3 border border-border bg-background/30 rounded flex items-center justify-between gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-2.5 rounded-full flex-shrink-0", style: {
                      backgroundColor: item.color
                    } }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-foreground block truncate", children: item.name }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-muted-foreground font-mono", children: [
                        pct,
                        "% share"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-xs text-foreground shrink-0", children: [
                    "₹",
                    item.value.toLocaleString("en-IN")
                  ] })
                ] }, item.name);
              }) })
            ] })
          ] })
        ] }) })
      ] })
    ] }) }),
    editItem && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-lg bg-card border border-border p-8 metallic-surface my-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 w-full h-[3px] bg-primary animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex justify-between items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2 px-2.5 py-0.5 border border-primary/30 bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest mb-2 animate-pulse", children: [
            "🔧 System Module: ",
            editItem.type.toUpperCase()
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-3xl uppercase italic tracking-tight", children: editItem.id ? `Edit ${editItem.type}` : `Add ${editItem.type}` })
        ] }),
        editItem.id && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: handleDeleteRecord, disabled: deletingRecord, className: "p-2 border border-red-500/20 hover:border-red-500 bg-red-950/10 hover:bg-red-950/20 text-red-400 transition-colors rounded-sm", title: "Delete Record", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSaveRecord, className: "space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar", children: [
        editItem.type === "booking" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Customer Name", value: editFormFields.customer_name || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              customer_name: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", value: editFormFields.phone || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              phone: val
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email", value: editFormFields.email || "", onChange: (val) => setEditFormFields({
            ...editFormFields,
            email: val
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Vehicle Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editFormFields.vehicle_type || "car", onChange: (e) => setEditFormFields({
                ...editFormFields,
                vehicle_type: e.target.value
              }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "car", children: "Car" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "bike", children: "Bike" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "scooter", children: "Scooter" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Vehicle Details", value: editFormFields.vehicle_info || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              vehicle_info: val
            }), placeholder: "Make / Model / Year" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Service Type" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editFormFields.service_id || "", onChange: (e) => {
                const selected = services.find((s) => s.id === e.target.value);
                setEditFormFields({
                  ...editFormFields,
                  service_id: e.target.value,
                  service_name: selected ? selected.name : ""
                });
              }, className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "General Service / None" }),
                services.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: s.id, children: s.name }, s.id))
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Scheduled Slot", type: "datetime-local", value: editFormFields.scheduled_at || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              scheduled_at: val
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editFormFields.status || "pending", onChange: (e) => setEditFormFields({
                ...editFormFields,
                status: e.target.value
              }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "pending", children: "Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "confirmed", children: "Confirmed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "in_progress", children: "In Progress" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "completed", children: "Completed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Progress Stage" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editFormFields.progress_stage || "intake", onChange: (e) => setEditFormFields({
                ...editFormFields,
                progress_stage: e.target.value
              }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "intake", children: "Intake / Diagnostics" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "parts", children: "Awaiting Parts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "repair", children: "Active Repair" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "testing", children: "Testing / Calibration" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "ready", children: "Ready for Intake" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Problem / Request" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editFormFields.problem || "", onChange: (e) => setEditFormFields({
              ...editFormFields,
              problem: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Staff Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editFormFields.notes || "", onChange: (e) => setEditFormFields({
              ...editFormFields,
              notes: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none" })
          ] })
        ] }),
        editItem.type === "service" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Service Name", value: editFormFields.name || "", onChange: (val) => setEditFormFields({
            ...editFormFields,
            name: val
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Diagnostic Code", value: editFormFields.code || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              code: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Base Price (₹)", type: "number", value: editFormFields.price || 0, onChange: (val) => setEditFormFields({
              ...editFormFields,
              price: val
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Category", value: editFormFields.category || "general", onChange: (val) => setEditFormFields({
              ...editFormFields,
              category: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Duration Limit (minutes)", type: "number", value: editFormFields.duration_min || 60, onChange: (val) => setEditFormFields({
              ...editFormFields,
              duration_min: val
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 3, value: editFormFields.description || "", onChange: (e) => setEditFormFields({
              ...editFormFields,
              description: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none", required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "srv_active", checked: Boolean(editFormFields.active), onChange: (e) => setEditFormFields({
              ...editFormFields,
              active: e.target.checked
            }), className: "size-4 border border-border rounded accent-primary bg-background cursor-pointer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "srv_active", className: "text-[10px] font-bold uppercase tracking-widest text-foreground cursor-pointer select-none", children: "Listed / Active on Public Form" })
          ] })
        ] }),
        editItem.type === "inventory" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Spare Part / Item Name", value: editFormFields.name || "", onChange: (val) => setEditFormFields({
            ...editFormFields,
            name: val
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Current Qty", type: "number", value: editFormFields.qty || 0, onChange: (val) => setEditFormFields({
              ...editFormFields,
              qty: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Low Stock Threshold", type: "number", value: editFormFields.low_threshold || 5, onChange: (val) => setEditFormFields({
              ...editFormFields,
              low_threshold: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Unit Price (₹)", type: "number", value: editFormFields.unit_price || 0, onChange: (val) => setEditFormFields({
              ...editFormFields,
              unit_price: val
            }), required: true })
          ] })
        ] }),
        editItem.type === "invoice" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Invoice ID", value: editFormFields.invoice_no || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              invoice_no: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Customer Name", value: editFormFields.customer_name || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              customer_name: val
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Gross Amount (₹)", type: "number", value: editFormFields.total || 0, onChange: (val) => setEditFormFields({
              ...editFormFields,
              total: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Status" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editFormFields.status || "unpaid", onChange: (e) => setEditFormFields({
                ...editFormFields,
                status: e.target.value
              }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "unpaid", children: "Unpaid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "partially_paid", children: "Partially Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "paid", children: "Paid" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "cancelled", children: "Cancelled" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Billing Notes" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editFormFields.notes || "", onChange: (e) => setEditFormFields({
              ...editFormFields,
              notes: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none" })
          ] })
        ] }),
        editItem.type === "expense" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Expense Category" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: editFormFields.category || "parts", onChange: (e) => setEditFormFields({
                ...editFormFields,
                category: e.target.value
              }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "parts", children: "Spare Parts" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "tools", children: "Workshop Tools" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "salary", children: "Staff Salary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "rent", children: "Rent / Bay Space" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "utilities", children: "Power / Utility bill" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "marketing", children: "Promotions / Ads" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "other", children: "Other Expenses" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Record Date", type: "date", value: editFormFields.expense_date || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              expense_date: val
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Total Cost (₹)", type: "number", value: editFormFields.amount || 0, onChange: (val) => setEditFormFields({
            ...editFormFields,
            amount: val
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: "Memo" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 2, value: editFormFields.note || "", onChange: (e) => setEditFormFields({
              ...editFormFields,
              note: e.target.value
            }), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none" })
          ] })
        ] }),
        editItem.type === "staff" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Name", value: editFormFields.name || "", onChange: (val) => setEditFormFields({
            ...editFormFields,
            name: val
          }), required: true }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Role / Title", value: editFormFields.role || "", onChange: (val) => setEditFormFields({
              ...editFormFields,
              role: val
            }), required: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Salary (₹ / month)", type: "number", value: editFormFields.salary || 0, onChange: (val) => setEditFormFields({
              ...editFormFields,
              salary: val
            }), required: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "checkbox", id: "staff_active", checked: Boolean(editFormFields.active), onChange: (e) => setEditFormFields({
              ...editFormFields,
              active: e.target.checked
            }), className: "size-4 border border-border rounded accent-primary bg-background cursor-pointer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "staff_active", className: "text-[10px] font-bold uppercase tracking-widest text-foreground cursor-pointer select-none", children: "Active bay assignment" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 pt-4 border-t border-border mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: savingRecord, className: "flex-1 bg-primary text-primary-foreground hover:bg-white hover:text-black py-3 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50", children: savingRecord ? "Saving..." : "Save Record" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: () => setEditItem(null), className: "flex-1 border border-border hover:bg-card py-3 text-xs font-bold uppercase tracking-widest transition-colors", children: "Cancel" })
        ] })
      ] })
    ] }) })
  ] });
}
function Metric({
  icon: Icon,
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "mb-5 size-5 text-primary" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-display text-4xl uppercase italic", children: value })
  ] });
}
function Panel({
  title,
  icon: Icon,
  children,
  onAdd,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: `border border-border bg-card p-6 ${className || ""}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6 flex items-center justify-between border-b border-border pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl uppercase italic", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        onAdd && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onAdd, className: "p-1 border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary/10 text-primary transition-colors rounded-sm", title: `Add new ${title.toLowerCase()}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5 text-primary" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children })
  ] });
}
function InfoRow({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-5 border-b border-border/60 pb-3 text-sm last:border-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words font-bold", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "max-w-[55%] break-words text-right text-muted-foreground", children: value })
  ] });
}
function EditableRow({
  label,
  value,
  onEdit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-center gap-5 border-b border-border/60 pb-3 text-sm last:border-0 group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words font-bold", children: label }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 max-w-[65%] min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words text-right text-muted-foreground truncate", children: value }),
      onEdit && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onEdit, className: "opacity-40 group-hover:opacity-100 hover:text-primary transition-opacity p-0.5 flex-shrink-0", title: "Edit record", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3" }) })
    ] })
  ] });
}
function BillingPaymentRow({
  label,
  value,
  expense,
  paid,
  onExpense,
  onPaid,
  onUnpaid,
  onEdit
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-b border-border/60 pb-4 text-sm last:border-0 group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words font-bold", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-1 block break-words text-muted-foreground", children: value })
      ] }),
      onEdit && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: onEdit, className: "opacity-40 group-hover:opacity-100 hover:text-primary transition-opacity p-0.5 flex-shrink-0", title: "Edit record", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "size-3" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Expenses?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onExpense, className: "px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground", children: expense > 0 ? `₹${expense.toLocaleString("en-IN")}` : "Add" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold uppercase tracking-widest text-muted-foreground", children: "Paid?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onPaid, className: `px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border ${paid ? "bg-green-500 text-white border-green-500" : "bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border-green-500/20"}`, children: "Yes" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: onUnpaid, className: `px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border ${!paid ? "bg-red-500 text-white border-red-500" : "bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border-red-500/20"}`, children: "No" })
    ] })
  ] });
}
function Empty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No records yet." });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder = ""
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, value, onChange: (e) => onChange(e.target.value), className: "w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors", required, placeholder })
  ] });
}
export {
  AdminPage as component
};
