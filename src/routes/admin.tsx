import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import { BarChart3, Boxes, CalendarClock, FileText, IndianRupee, Settings, ShieldAlert, Users, Wrench, Pencil, Plus, Trash2 } from "lucide-react";
import { PageShell } from "@/components/SiteFrame";
import { supabase } from "@/integrations/supabase/client";
import { sendWhatsAppInvoicePdf } from "@/lib/api/whatsapp.functions";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Shubham Auto Clinic & Garage" },
      { name: "description", content: "Garage management admin dashboard for bookings, billing, inventory, expenses, staff, services, and analytics." },
      { property: "og:title", content: "Admin Dashboard — Shubham Auto Clinic" },
      { property: "og:description", content: "Operational command center for Shubham Auto Clinic & Garage." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const queryClient = useQueryClient();

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("admin_auth") === "true";
    }
    return false;
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Edit Site Settings State
  const [isEditingSettings, setIsEditingSettings] = useState(false);
  const [savingSettings, setSavingSettings] = useState(false);
  const [editForm, setEditForm] = useState({
    shop_name: "",
    phone: "",
    address: "",
    working_hours: "",
    owner_name: "",
    about_story: "",
  });

  // CRUD State for dynamic modal
  const [editItem, setEditItem] = useState<{
    type: "booking" | "service" | "inventory" | "invoice" | "expense" | "staff";
    id: string;
    data: any;
  } | null>(null);
  const [editFormFields, setEditFormFields] = useState<any>({});
  const [savingRecord, setSavingRecord] = useState(false);
  const [deletingRecord, setDeletingRecord] = useState(false);
  const [processingBookings, setProcessingBookings] = useState<Record<string, "approved" | "rejected" | "completed">>({});
  const [localBillingBookings, setLocalBillingBookings] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      return JSON.parse(localStorage.getItem("admin_billing_queue") || "[]");
    } catch {
      return [];
    }
  });
  const [localInvoicePayments, setLocalInvoicePayments] = useState<Record<string, { status: string; total: number; vehicleExpense?: number }>>(() => {
    if (typeof window === "undefined") return {};

    try {
      return JSON.parse(localStorage.getItem("admin_invoice_payments") || "{}");
    } catch {
      return {};
    }
  });
  const [localInventory, setLocalInventory] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      return JSON.parse(localStorage.getItem("admin_inventory_items") || "[]");
    } catch {
      return [];
    }
  });
  const [localExpenses, setLocalExpenses] = useState<any[]>(() => {
    if (typeof window === "undefined") return [];

    try {
      return JSON.parse(localStorage.getItem("admin_expense_items") || "[]");
    } catch {
      return [];
    }
  });

  // Queries
  const { data: settings } = useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data
  });
  const { data: bookings = [] } = useQuery({ queryKey: ["admin", "bookings"], queryFn: async () => (await supabase.from("bookings").select("*").order("created_at", { ascending: false }).limit(8)).data ?? [] });
  const { data: services = [] } = useQuery({ queryKey: ["admin", "services"], queryFn: async () => (await supabase.from("services").select("*").order("display_order")).data ?? [] });
  const { data: inventory = [] } = useQuery({ queryKey: ["admin", "inventory"], queryFn: async () => (await supabase.from("inventory").select("*").order("qty", { ascending: true })).data ?? [] });
  const { data: staff = [] } = useQuery({ queryKey: ["admin", "staff"], queryFn: async () => (await supabase.from("staff").select("*").order("name")).data ?? [] });
  const { data: invoices = [] } = useQuery({ queryKey: ["admin", "invoices"], queryFn: async () => (await supabase.from("invoices").select("*").order("created_at", { ascending: false })).data ?? [] });
  const { data: completedBillingBookings = [] } = useQuery({
    queryKey: ["admin", "billing-bookings"],
    queryFn: async () => (await supabase
      .from("bookings")
      .select("*")
      .eq("status", "completed")
      .order("created_at", { ascending: false })
      .limit(20)).data ?? []
  });
  const { data: expenses = [] } = useQuery({ queryKey: ["admin", "expenses"], queryFn: async () => (await supabase.from("expenses").select("*").order("expense_date", { ascending: false })).data ?? [] });
  const inventoryRows = [
    ...localInventory,
    ...inventory,
  ].filter((item, index, allItems) => allItems.findIndex((candidate) => candidate.id === item.id) === index);
  const expenseRows = [
    ...localExpenses,
    ...expenses,
  ].filter((item, index, allItems) => allItems.findIndex((candidate) => candidate.id === item.id) === index);

  const isBookingPaid = (booking: any) => {
    const invoiceNo = `INV-${booking.booking_no}`;
    const localStatus = localInvoicePayments[invoiceNo]?.status;
    const invoiceStatus = invoices.find((invoice) => invoice.invoice_no === invoiceNo)?.status;

    return localStatus === "paid" || invoiceStatus === "paid";
  };
  const activeBookings = bookings.filter((booking) => !isBookingPaid(booking));

  const billingBookingCandidates = [
    ...localBillingBookings,
    ...completedBillingBookings,
    ...activeBookings.filter((booking) => booking.status === "completed" || processingBookings[booking.id] === "completed"),
  ].filter((booking, index, allBookings) => allBookings.findIndex((item) => item.id === booking.id) === index);

  const billingRows = [
    ...invoices
      .filter((invoice) => (localInvoicePayments[invoice.invoice_no]?.status ?? invoice.status) !== "paid")
      .map((invoice) => ({ type: "invoice" as const, data: invoice })),
    ...billingBookingCandidates
      .filter((booking) => {
        const invoiceNo = `INV-${booking.booking_no}`;
        const paymentStatus = localInvoicePayments[invoiceNo]?.status ?? booking.billing_status;

        return paymentStatus !== "paid" && !invoices.some((invoice) => invoice.invoice_no === invoiceNo);
      })
      .map((booking) => ({ type: "completedBooking" as const, data: booking })),
  ];
  const paidInvoiceRevenue = invoices.reduce((sum, invoice) => {
    const localPayment = localInvoicePayments[invoice.invoice_no];

    if (localPayment) return sum;

    return invoice.status === "paid" ? sum + Number(invoice.total ?? 0) : sum;
  }, 0);
  const paidLocalRevenue = Object.values(localInvoicePayments).reduce((sum, payment) => (
    payment.status === "paid" ? sum + Number(payment.total ?? 0) : sum
  ), 0);
  const vehicleExpenseTotal = Object.values(localInvoicePayments).reduce((sum, payment) => (
    sum + Number(payment.vehicleExpense ?? 0)
  ), 0);
  const paidBillingRevenue = billingBookingCandidates.reduce((sum, booking) => (
    booking.billing_status === "paid" && !localInvoicePayments[`INV-${booking.booking_no}`]
      ? sum + Number(booking.billing_total ?? 0)
      : sum
  ), 0);

  // Computed values for Analytics
  const revenue = paidInvoiceRevenue + paidLocalRevenue + paidBillingRevenue;
  const expenseTotal = expenseRows.reduce((sum, item) => sum + Number(item.amount ?? 0), 0) + vehicleExpenseTotal;
  const lowStock = inventoryRows.filter((item) => item.qty <= item.low_threshold).length;
  const inventoryValue = inventoryRows.reduce((sum, item) => sum + Number(item.qty) * Number(item.unit_price), 0);
  const profit = revenue - expenseTotal - inventoryValue;

  // Chart range selection state: 6 months or 12 months
  const [chartMonths, setChartMonths] = useState(6);

  // Robust date parser helper
  const parseDate = (dateStr?: string) => {
    if (!dateStr) return new Date();
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      const [year, month, day] = dateStr.split("-").map(Number);
      return new Date(year, month - 1, day);
    }
    const parsed = new Date(dateStr);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  };

  // Helper to generate the last N months
  const getMonthRange = (monthsCount: number) => {
    const list = [];
    const now = new Date();
    for (let i = monthsCount - 1; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      list.push({
        label: d.toLocaleString("en-US", { month: "short", year: "numeric" }), // "Jan 2026"
        year: d.getFullYear(),
        month: d.getMonth(),
      });
    }
    return list;
  };

  const initialRange = getMonthRange(6);

  // Selected month state
  const [selectedMonthLabel, setSelectedMonthLabel] = useState(() => {
    return initialRange[initialRange.length - 1]?.label || "";
  });

  // Build chart data
  const monthsRange = getMonthRange(chartMonths);
  const chartData = monthsRange.map(m => {
    // 1. Paid Invoice Revenue for this month
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

    // Paid local payments for this month
    const localPaymentRevenueForMonth = Object.entries(localInvoicePayments).reduce((sum, [invoiceNo, payment]) => {
      if (payment.status === "paid") {
        let paymentDate = new Date(); // Fallback if no date is found
        const matchingInvoice = invoices.find(inv => inv.invoice_no === invoiceNo);
        if (matchingInvoice) {
          paymentDate = parseDate(matchingInvoice.created_at);
        } else {
          const bookingNo = invoiceNo.replace("INV-", "");
          const matchingBooking = billingBookingCandidates.find(b => b.booking_no === bookingNo);
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

    // Paid completed billing bookings for this month
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

    // 2. Expenses for this month
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
        let expenseDate = new Date();
        const matchingInvoice = invoices.find(inv => inv.invoice_no === invoiceNo);
        if (matchingInvoice) {
          expenseDate = parseDate(matchingInvoice.created_at);
        } else {
          const bookingNo = invoiceNo.replace("INV-", "");
          const matchingBooking = billingBookingCandidates.find(b => b.booking_no === bookingNo);
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

    // 3. Cumulative Inventory Value at end of this month
    const monthEnd = new Date(m.year, m.month + 1, 0, 23, 59, 59, 999);
    const monthInventoryValue = inventoryRows.reduce((sum, item) => {
      const dateStr = item.created_at || item.expense_date || new Date().toISOString();
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
      inventoryValue: monthInventoryValue,
    };
  });

  // Find the selected month's data in chartData
  const activeMonthData = chartData.find(d => d.month === selectedMonthLabel) || chartData[chartData.length - 1];

  const pieData = activeMonthData ? [
    { name: "Gross Invoices", value: activeMonthData.grossInvoices, color: "oklch(0.82 0.17 86)" }, // High-vis yellow
    { name: "Recent Expenses", value: activeMonthData.recentExpenses, color: "oklch(0.6 0.22 27)" }, // Rose red
    { name: "Inventory Value", value: activeMonthData.inventoryValue, color: "oklch(0.62 0.15 220)" }, // Electric blue
  ] : [];

  const totalValue = pieData.reduce((sum, item) => sum + item.value, 0);

  const handleLogin = (e: React.FormEvent) => {
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

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings?.id) return;
    setSavingSettings(true);
    try {
      const { error } = await supabase
        .from("site_settings")
        .update({
          shop_name: editForm.shop_name,
          phone: editForm.phone,
          address: editForm.address,
          working_hours: editForm.working_hours,
          owner_name: editForm.owner_name,
          about_story: editForm.about_story,
        })
        .eq("id", settings.id);

      if (error) throw error;

      toast.success("Site settings updated successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin", "settings"] });
      queryClient.invalidateQueries({ queryKey: ["site_settings"] });
      setIsEditingSettings(false);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to update site settings: " + err.message);
    } finally {
      setSavingSettings(false);
    }
  };

  const handleApproveBooking = async (booking: any) => {
    setProcessingBookings(prev => ({ ...prev, [booking.id]: "approved" }));
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "confirmed" })
        .eq("id", booking.id);

      if (error) throw error;

      toast.success(`Booking ${booking.booking_no} approved!`);
      queryClient.invalidateQueries({ queryKey: ["admin"] });

      // Clean customer phone number
      const cleanPhone = booking.phone.replace(/\D/g, "");
      const formattedPhone = cleanPhone.length === 10 ? `91${cleanPhone}` : cleanPhone;

      // Construct WhatsApp message text
      const messageText = `Hello ${booking.customer_name}, your booking at Shubham Auto Clinic for ${booking.service_name || "General Service"} has been approved!`;
      const waLink = `https://wa.me/${formattedPhone}?text=${encodeURIComponent(messageText)}`;

      // Open in a new tab to send WhatsApp message
      if (formattedPhone) {
        window.open(waLink, "_blank");
      }
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to approve booking: " + err.message);
      setProcessingBookings(prev => {
        const copy = { ...prev };
        delete copy[booking.id];
        return copy;
      });
    }
  };

  const handleRejectBooking = async (booking: any) => {
    if (!confirm(`Are you sure you want to reject booking ${booking.booking_no}?`)) return;
    setProcessingBookings(prev => ({ ...prev, [booking.id]: "rejected" }));
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status: "cancelled" })
        .eq("id", booking.id);

      if (error) throw error;

      toast.success(`Booking ${booking.booking_no} rejected.`);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to reject booking: " + err.message);
      setProcessingBookings(prev => {
        const copy = { ...prev };
        delete copy[booking.id];
        return copy;
      });
    }
  };

  const handleCompleteBooking = async (booking: any) => {
    setProcessingBookings(prev => ({ ...prev, [booking.id]: "completed" }));
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

      const { error } = await supabase
        .from("bookings")
        .update({ status: "completed" })
        .eq("id", booking.id);

      if (error) throw error;

      const { error: invoiceError } = await supabase
        .from("invoices")
        .upsert({
          invoice_no: invoiceNo,
          customer_name: booking.customer_name,
          customer_phone: booking.phone,
          vehicle_info: booking.vehicle_info || null,
          items: [{
            booking_no: booking.booking_no,
            service_name: booking.service_name || "General Service",
            amount: serviceAmount,
          }],
          subtotal: serviceAmount,
          gst_rate: 0,
          gst_amount: 0,
          total: serviceAmount,
          status: "unpaid",
          notes: `Billing request from completed booking ${booking.booking_no}${booking.problem ? `: ${booking.problem}` : ""}`,
        }, { onConflict: "invoice_no" });

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
      queryClient.invalidateQueries({ queryKey: ["admin"] });
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to send booking to billing: " + err.message);
      setProcessingBookings(prev => {
        const copy = { ...prev };
        delete copy[booking.id];
        return copy;
      });
    }
  };

  const getBillingInvoiceNo = (row: { type: "invoice" | "completedBooking"; data: any }) => (
    row.type === "invoice" ? row.data.invoice_no : `INV-${row.data.booking_no}`
  );

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

  const handleVehicleExpense = (row: { type: "invoice" | "completedBooking"; data: any }) => {
    const invoiceNo = getBillingInvoiceNo(row);
    const currentPayment = localInvoicePayments[invoiceNo];
    const vehicleExpense = promptVehicleExpense(Number(currentPayment?.vehicleExpense ?? row.data.vehicle_expense ?? row.data.billing_expense ?? 0));

    if (vehicleExpense === null) return;

    setLocalInvoicePayments((current) => {
      const previous = current[invoiceNo] ?? {
        status: row.data.status ?? row.data.billing_status ?? "unpaid",
        total: Number(row.data.total ?? row.data.billing_total ?? 0),
      };
      const next = { ...current, [invoiceNo]: { ...previous, vehicleExpense } };
      localStorage.setItem("admin_invoice_payments", JSON.stringify(next));
      return next;
    });

    if (row.type === "completedBooking") {
      setLocalBillingBookings((current) => {
        const updatedBooking = {
          ...row.data,
          billing_expense: vehicleExpense,
        };
        const next = [updatedBooking, ...current.filter((item) => item.id !== row.data.id)];
        localStorage.setItem("admin_billing_queue", JSON.stringify(next));
        return next;
      });
    }

    toast.success("Vehicle expense saved.");
  };

  const sendPaidInvoiceToCustomer = async (
    row: { type: "invoice" | "completedBooking"; data: any },
    payment: { status: string; total: number; vehicleExpense?: number }
  ) => {
    const invoiceNo = getBillingInvoiceNo(row);
    const customerName = row.data.customer_name || "Customer";
    const customerPhone = row.data.phone || row.data.customer_phone || "";
    const bookingNo = row.type === "completedBooking"
      ? row.data.booking_no
      : row.data.items?.[0]?.booking_no || "N/A";
    const serviceName = row.type === "completedBooking"
      ? row.data.service_name || "General Service"
      : row.data.items?.[0]?.service_name || "Vehicle Service";
    const vehicleInfo = row.data.vehicle_info || "Vehicle";
    const shopName = settings?.shop_name || "Shubham Auto Clinic";
    const shopPhone = settings?.phone || "";
    const shopAddress = settings?.address || "";
    const today = new Date().toLocaleDateString("en-IN");

    const doc = new jsPDF();
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
          pdfBase64,
        },
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

  const handleBillingPaid = async (row: { type: "invoice" | "completedBooking"; data: any }, paid: boolean) => {
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
      const nextPayment = { status: paid ? "paid" : "unpaid", total, vehicleExpense, date: new Date().toISOString() };

      if (paid) {
        await sendPaidInvoiceToCustomer(row, nextPayment);
      }

      setLocalInvoicePayments((current) => {
        const next = { ...current, [invoiceNo]: nextPayment };
        localStorage.setItem("admin_invoice_payments", JSON.stringify(next));
        return next;
      });

      const { error } = await supabase
        .from("invoices")
        .update({ status: nextPayment.status, total })
        .eq("id", row.data.id);

      if (error) {
        console.warn("Invoice payment status stored locally because Supabase update failed.", error);
      }

      toast.success(paid ? "Invoice marked as paid." : "Invoice marked as unpaid.");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      return;
    }

    const nextPayment = { status: paid ? "paid" : "unpaid", total, vehicleExpense, date: new Date().toISOString() };

    if (paid) {
      await sendPaidInvoiceToCustomer(row, nextPayment);
    }

    setLocalInvoicePayments((current) => {
      const next = { ...current, [invoiceNo]: nextPayment };
      localStorage.setItem("admin_invoice_payments", JSON.stringify(next));
      return next;
    });

    setLocalBillingBookings((current) => {
      const updatedBooking = {
        ...row.data,
        billing_status: nextPayment.status,
        billing_total: total,
        billing_expense: vehicleExpense,
      };
      const next = paid
        ? current.filter((item) => item.id !== row.data.id)
        : [updatedBooking, ...current.filter((item) => item.id !== row.data.id)];
      localStorage.setItem("admin_billing_queue", JSON.stringify(next));
      return next;
    });

    if (paid) {
      const { error } = await supabase
        .from("invoices")
        .upsert({
          invoice_no: invoiceNo,
          customer_name: row.data.customer_name,
          customer_phone: row.data.phone,
          vehicle_info: row.data.vehicle_info || null,
          items: [{
            booking_no: row.data.booking_no,
            service_name: row.data.service_name || "General Service",
            amount: total,
          }],
          subtotal: total,
          gst_rate: 0,
          gst_amount: 0,
          total,
          status: "paid",
          notes: `Paid billing from completed booking ${row.data.booking_no}. Vehicle expenses: ₹${vehicleExpense.toLocaleString("en-IN")}${row.data.problem ? `: ${row.data.problem}` : ""}`,
        }, { onConflict: "invoice_no" });

      if (error) {
        console.warn("Paid invoice stored locally because Supabase insert failed.", error);
      }
    }

    toast.success(paid ? "Billing request marked as paid." : "Billing request marked as unpaid.");
    queryClient.invalidateQueries({ queryKey: ["admin"] });
  };

  // Default initial field values for new records
  const getInitialFields = (type: string) => {
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
          scheduled_at: new Date(Date.now() + 86400000).toISOString().slice(0, 16), // tomorrow
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
          invoice_no: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
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
          expense_date: new Date().toISOString().split("T")[0],
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

  const handleOpenAdd = (type: "booking" | "service" | "inventory" | "invoice" | "expense" | "staff") => {
    const fields = getInitialFields(type);
    setEditFormFields(fields);
    setEditItem({ type, id: "", data: fields });
  };

  const handleOpenEdit = (type: "booking" | "service" | "inventory" | "invoice" | "expense" | "staff", item: any) => {
    let formattedFields = { ...item };
    if (type === "booking" && item.scheduled_at) {
      formattedFields.scheduled_at = new Date(item.scheduled_at).toISOString().slice(0, 16);
    }
    setEditFormFields(formattedFields);
    setEditItem({ type, id: item.id, data: item });
  };

  const saveLocalInventory = (item: any) => {
    setLocalInventory((current) => {
      const next = [item, ...current.filter((existing) => existing.id !== item.id)];
      localStorage.setItem("admin_inventory_items", JSON.stringify(next));
      return next;
    });
  };

  const saveLocalExpense = (item: any) => {
    setLocalExpenses((current) => {
      const next = [item, ...current.filter((existing) => existing.id !== item.id)];
      localStorage.setItem("admin_expense_items", JSON.stringify(next));
      return next;
    });
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
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
          notes: editFormFields.notes || null,
        };
        if (isNew) {
          ({ error } = await supabase.from("bookings").insert(payload));
        } else {
          ({ error } = await supabase.from("bookings").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "service") {
        const payload = {
          name: editFormFields.name,
          price: Number(editFormFields.price),
          active: Boolean(editFormFields.active),
          code: editFormFields.code,
          description: editFormFields.description,
          category: editFormFields.category,
          duration_min: Number(editFormFields.duration_min),
        };
        if (isNew) {
          ({ error } = await supabase.from("services").insert(payload));
        } else {
          ({ error } = await supabase.from("services").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "inventory") {
        const payload = {
          name: editFormFields.name,
          qty: Number(editFormFields.qty),
          low_threshold: Number(editFormFields.low_threshold),
          unit_price: Number(editFormFields.unit_price),
        };
        if (isNew) {
          ({ error } = await supabase.from("inventory").insert(payload));
          if (error) {
            console.warn("Inventory record stored locally because Supabase save failed.", error);
            saveLocalInventory({
              id: `local-inventory-${Date.now()}`,
              ...payload,
              created_at: new Date().toISOString(),
            });
            savedLocally = true;
            error = null;
          }
        } else if (editItem.id.startsWith("local-inventory-")) {
          saveLocalInventory({
            id: editItem.id,
            ...payload,
            created_at: editItem.data?.created_at ?? new Date().toISOString(),
          });
          savedLocally = true;
        } else {
          ({ error } = await supabase.from("inventory").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "invoice") {
        const payload = {
          invoice_no: editFormFields.invoice_no,
          customer_name: editFormFields.customer_name,
          total: Number(editFormFields.total),
          status: editFormFields.status,
          notes: editFormFields.notes || null,
        };
        if (isNew) {
          ({ error } = await supabase.from("invoices").insert(payload));
        } else {
          ({ error } = await supabase.from("invoices").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "expense") {
        const payload = {
          category: editFormFields.category,
          amount: Number(editFormFields.amount),
          expense_date: editFormFields.expense_date,
          note: editFormFields.note || null,
        };
        if (isNew) {
          ({ error } = await supabase.from("expenses").insert(payload));
          if (error) {
            console.warn("Expense record stored locally because Supabase save failed.", error);
            saveLocalExpense({
              id: `local-expense-${Date.now()}`,
              ...payload,
              created_at: new Date().toISOString(),
            });
            savedLocally = true;
            error = null;
          }
        } else if (editItem.id.startsWith("local-expense-")) {
          saveLocalExpense({
            id: editItem.id,
            ...payload,
            created_at: editItem.data?.created_at ?? new Date().toISOString(),
          });
          savedLocally = true;
        } else {
          ({ error } = await supabase.from("expenses").update(payload).eq("id", editItem.id));
        }
      } else if (editItem.type === "staff") {
        const payload = {
          name: editFormFields.name,
          role: editFormFields.role,
          active: Boolean(editFormFields.active),
          salary: Number(editFormFields.salary) || null,
        };
        if (isNew) {
          ({ error } = await supabase.from("staff").insert(payload));
        } else {
          ({ error } = await supabase.from("staff").update(payload).eq("id", editItem.id));
        }
      }

      if (error) throw error;

      toast.success(savedLocally ? "Record saved locally." : `Record ${isNew ? "created" : "updated"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      setEditItem(null);
    } catch (err: any) {
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
        ({ error } = await supabase.from("bookings").delete().eq("id", editItem.id));
      } else if (editItem.type === "service") {
        ({ error } = await supabase.from("services").delete().eq("id", editItem.id));
      } else if (editItem.type === "inventory") {
        if (editItem.id.startsWith("local-inventory-")) {
          setLocalInventory((current) => {
            const next = current.filter((item) => item.id !== editItem.id);
            localStorage.setItem("admin_inventory_items", JSON.stringify(next));
            return next;
          });
        } else {
          ({ error } = await supabase.from("inventory").delete().eq("id", editItem.id));
        }
      } else if (editItem.type === "invoice") {
        ({ error } = await supabase.from("invoices").delete().eq("id", editItem.id));
      } else if (editItem.type === "expense") {
        if (editItem.id.startsWith("local-expense-")) {
          setLocalExpenses((current) => {
            const next = current.filter((item) => item.id !== editItem.id);
            localStorage.setItem("admin_expense_items", JSON.stringify(next));
            return next;
          });
        } else {
          ({ error } = await supabase.from("expenses").delete().eq("id", editItem.id));
        }
      } else if (editItem.type === "staff") {
        ({ error } = await supabase.from("staff").delete().eq("id", editItem.id));
      }

      if (error) throw error;

      toast.success("Record deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["admin"] });
      setEditItem(null);
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to delete record: " + err.message);
    } finally {
      setDeletingRecord(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <PageShell eyebrow="Authorized access only" title="Diag Intake" cta={{ to: "/", label: "Public Site" }}>
        <section className="px-6 py-24 flex items-center justify-center min-h-[60vh]">
          <div className="w-full max-w-md metallic-surface border border-border p-8 relative">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary animate-pulse" />

            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                <span className="size-1.5 bg-primary animate-blink" /> Access Level: Level 2
              </span>
              <h2 className="font-display text-3xl uppercase italic tracking-tight">Admin Console Login</h2>
              <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
                Unlock diagnostic logs, service records, billing, inventory, and site parameters.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              {loginError && (
                <div className="border border-red-500/30 bg-red-950/20 p-4 text-xs text-red-400 font-bold uppercase tracking-wider">
                  ⚠️ {loginError}
                </div>
              )}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Username</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-primary outline-none transition-colors"
                  placeholder="Enter operator username"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-background border border-border px-4 py-3 text-sm text-foreground focus:border-primary outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-primary hover:bg-white text-primary-foreground hover:text-black py-4 text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-3"
              >
                Authenticate Diagnostics
              </button>
            </form>
          </div>
        </section>
      </PageShell>
    );
  }

  return (
    <PageShell eyebrow="Garage command center" title="Admin Panel" cta={{ to: "/", label: "Public Site" }}>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 p-5 border border-border bg-card">
            <div className="flex items-center gap-3">
              <ShieldAlert className="size-5 text-primary animate-pulse" />
              <div>
                <p className="text-sm font-bold uppercase tracking-wider">Secure Connection Active</p>
                <p className="text-xs text-muted-foreground">Admin session active. Disconnect when finished.</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="px-5 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/25 text-xs font-bold uppercase tracking-widest transition-colors"
            >
              Sign Out Session
            </button>
          </div>

          {/* Metric Dashboard */}
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            <Metric icon={CalendarClock} label="Bookings" value={activeBookings.length.toString()} />
            <Metric icon={Wrench} label="Services" value={services.length.toString()} />
            <Metric icon={IndianRupee} label="Invoice Total" value={`₹${revenue.toLocaleString("en-IN")}`} />
            <Metric icon={Boxes} label="Low Stock" value={lowStock.toString()} />
          </div>

          {/* Admin Panels */}
          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            {/* Site Settings Editor */}
            <Panel title="Site Content Editor" icon={Settings}>
              {isEditingSettings ? (
                <form onSubmit={handleSaveSettings} className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Shop Name</label>
                    <input
                      type="text"
                      value={editForm.shop_name}
                      onChange={e => setEditForm({ ...editForm, shop_name: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Owner Name</label>
                    <input
                      type="text"
                      value={editForm.owner_name}
                      onChange={e => setEditForm({ ...editForm, owner_name: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Phone</label>
                    <input
                      type="text"
                      value={editForm.phone}
                      onChange={e => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Working Hours</label>
                    <input
                      type="text"
                      value={editForm.working_hours}
                      onChange={e => setEditForm({ ...editForm, working_hours: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Address</label>
                    <input
                      type="text"
                      value={editForm.address}
                      onChange={e => setEditForm({ ...editForm, address: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">About Story</label>
                    <textarea
                      rows={3}
                      value={editForm.about_story}
                      onChange={e => setEditForm({ ...editForm, about_story: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors resize-none"
                      required
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={savingSettings}
                      className="flex-1 bg-primary text-primary-foreground hover:bg-white hover:text-black py-2.5 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                    >
                      {savingSettings ? "Saving..." : "Save"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingSettings(false)}
                      className="flex-1 border border-border hover:bg-card py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <InfoRow label="Shop" value={settings?.shop_name ?? "—"} />
                  <InfoRow label="Owner" value={settings?.owner_name ?? "—"} />
                  <InfoRow label="Phone" value={settings?.phone ?? "—"} />
                  <InfoRow label="Hours" value={settings?.working_hours ?? "—"} />
                  <InfoRow label="Address" value={settings?.address ?? "—"} />
                  <InfoRow label="Story" value={settings?.about_story ? `${settings.about_story.slice(0, 45)}...` : "—"} />
                  <button
                    onClick={() => {
                      setEditForm({
                        shop_name: settings?.shop_name ?? "",
                        phone: settings?.phone ?? "",
                        address: settings?.address ?? "",
                        working_hours: settings?.working_hours ?? "",
                        owner_name: settings?.owner_name ?? "",
                        about_story: settings?.about_story ?? "",
                      });
                      setIsEditingSettings(true);
                    }}
                    className="w-full mt-4 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 py-2.5 text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Edit Site Settings
                  </button>
                </>
              )}
            </Panel>

            {/* Bookings panel */}
            <Panel title="Bookings" icon={CalendarClock} onAdd={() => handleOpenAdd("booking")}>
              {activeBookings.length ? activeBookings.map((b) => {
                const localStatus = processingBookings[b.id]
                  ? (
                    processingBookings[b.id] === "approved" ? "confirmed" :
                      processingBookings[b.id] === "completed" ? "completed" :
                        "cancelled"
                  )
                  : b.status;
                return (
                  <div key={b.booking_no} className="border-b border-border/60 pb-4 last:border-0 last:pb-0 group">
                    <div className="flex justify-between items-start gap-4">
                      <div className="min-w-0">
                        <span className="font-bold text-sm flex items-center gap-2">
                          {b.booking_no}
                          <span className={`uppercase text-[9px] px-1.5 py-0.5 rounded font-mono font-bold ${localStatus === "pending" ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30" :
                            localStatus === "confirmed" ? "bg-green-500/20 text-green-400 border border-green-500/30" :
                              localStatus === "completed" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                                "bg-red-500/20 text-red-400 border border-red-500/30"
                            }`}>{localStatus === "confirmed" ? "approved" : localStatus === "cancelled" ? "rejected" : localStatus}</span>
                        </span>
                        <span className="text-muted-foreground text-sm block mt-1">{b.customer_name} — {b.service_name ?? "General"}</span>
                        {b.vehicle_info && <span className="text-[11px] text-muted-foreground/80 block mt-0.5">Vehicle: {b.vehicle_info}</span>}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEdit("booking", b)}
                          className="opacity-40 hover:opacity-100 hover:text-primary transition-opacity p-1.5"
                          title="Edit Record"
                        >
                          <Pencil className="size-3.5" />
                        </button>
                      </div>
                    </div>

                    {localStatus === "pending" && (
                      <div className="flex gap-2 mt-3 pl-0">
                        <button
                          onClick={() => handleApproveBooking(b)}
                          className="px-3 py-1 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/20 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectBooking(b)}
                          className="px-3 py-1 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    )}

                    {["pending", "confirmed", "in_progress"].includes(localStatus) && (
                      <div className="mt-3 pl-0 flex flex-col gap-1.5 border border-primary/20 bg-primary/5 p-3 rounded">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">⚙️ Service is Done?</span>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleCompleteBooking(b)}
                            className="px-3 py-1 bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border border-green-500/20 text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => toast.info(`Booking ${b.booking_no} remains in active queue.`)}
                            className="px-3 py-1 border border-border hover:bg-card text-muted-foreground hover:text-foreground text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                          >
                            No
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                );
              }) : <Empty />}
            </Panel>

            {/* Services panel */}
            <Panel title="Services" icon={Wrench} onAdd={() => handleOpenAdd("service")}>
              {services.map((s) => (
                <EditableRow
                  key={s.id}
                  label={s.name}
                  value={`₹${Number(s.price).toLocaleString("en-IN")} · ${s.active ? "Active" : "Hidden"}`}
                  onEdit={() => handleOpenEdit("service", s)}
                />
              ))}
            </Panel>

            {/* Inventory panel */}
            <Panel title="Inventory" icon={Boxes} onAdd={() => handleOpenAdd("inventory")}>
              {inventoryRows.slice(0, 8).map((i) => (
                <EditableRow
                  key={i.id}
                  label={i.name}
                  value={`${i.qty} units · low threshold: ${i.low_threshold}`}
                  onEdit={() => handleOpenEdit("inventory", i)}
                />
              ))}
            </Panel>

            {/* Invoices (Billing) panel */}
            <Panel title="Billing" icon={FileText} onAdd={() => handleOpenAdd("invoice")}>
              {billingRows.length ? billingRows.map((row) => {
                if (row.type === "invoice") {
                  const i = row.data;
                  const localPayment = localInvoicePayments[i.invoice_no];
                  const status = localPayment?.status ?? i.status;
                  const total = localPayment?.total ?? Number(i.total ?? 0);
                  const vehicleExpense = Number(localPayment?.vehicleExpense ?? i.vehicle_expense ?? 0);

                  return (
                    <BillingPaymentRow
                      key={i.id}
                      label={`${i.invoice_no} · ${status}`}
                      value={`${i.customer_name} — ₹${total.toLocaleString("en-IN")}`}
                      expense={vehicleExpense}
                      paid={status === "paid"}
                      onExpense={() => handleVehicleExpense(row)}
                      onPaid={() => handleBillingPaid(row, true)}
                      onUnpaid={() => handleBillingPaid(row, false)}
                      onEdit={() => handleOpenEdit("invoice", i)}
                    />
                  );
                }

                const b = row.data;
                const matchedService = services.find((service) => service.id === b.service_id || service.name === b.service_name);
                const invoiceNo = `INV-${b.booking_no}`;
                const localPayment = localInvoicePayments[invoiceNo];
                const serviceAmount = Number(b.billing_total ?? matchedService?.price ?? 0);
                const billingStatus = localPayment?.status ?? b.billing_status ?? "unpaid";
                const vehicleExpense = Number(localPayment?.vehicleExpense ?? b.billing_expense ?? 0);

                return (
                  <BillingPaymentRow
                    key={`billing-${b.id}`}
                    label={`${b.booking_no} · ${billingStatus}`}
                    value={`${b.customer_name} — ₹${serviceAmount.toLocaleString("en-IN")}`}
                    expense={vehicleExpense}
                    paid={billingStatus === "paid"}
                    onExpense={() => handleVehicleExpense(row)}
                    onPaid={() => handleBillingPaid(row, true)}
                    onUnpaid={() => handleBillingPaid(row, false)}
                    onEdit={() => {
                      setEditFormFields({
                        invoice_no: `INV-${b.booking_no}`,
                        customer_name: b.customer_name,
                        total: serviceAmount,
                        status: "unpaid",
                        notes: `Billing request from completed booking ${b.booking_no}${b.problem ? `: ${b.problem}` : ""}`,
                        vehicle_info: b.vehicle_info || "",
                      });
                      setEditItem({ type: "invoice", id: "", data: b });
                    }}
                  />
                );
              }) : <Empty />}
            </Panel>

            {/* Expenses panel */}
            <Panel title="Expenses" icon={IndianRupee} onAdd={() => handleOpenAdd("expense")}>
              {expenseRows.length ? expenseRows.slice(0, 6).map((e, index) => (
                <EditableRow
                  key={e.id || `${e.category}-${index}`}
                  label={e.category}
                  value={`₹${Number(e.amount).toLocaleString("en-IN")} · ${e.expense_date}`}
                  onEdit={() => handleOpenEdit("expense", e)}
                />
              )) : <Empty />}
            </Panel>

            {/* Staff panel */}
            <Panel title="Staff" icon={Users} onAdd={() => handleOpenAdd("staff")}>
              {staff.map((s) => (
                <EditableRow
                  key={s.id}
                  label={s.name}
                  value={`${s.role} · ${s.active ? "Active" : "Inactive"}`}
                  onEdit={() => handleOpenEdit("staff", s)}
                />
              ))}
            </Panel>

            {/* Analytics Summary */}
            <Panel title="Analytics" icon={BarChart3} className="lg:col-span-2">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Statistics Cards */}
                <div className="space-y-4">
                  <div className="p-4 border border-border bg-background/50 rounded">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Gross invoices</span>
                    <span className="text-2xl font-mono font-bold text-foreground">₹{revenue.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-4 border border-border bg-background/50 rounded">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Recent expenses</span>
                    <span className="text-2xl font-mono font-bold text-foreground">₹{expenseTotal.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-4 border border-border bg-background/50 rounded">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Inventory value</span>
                    <span className="text-2xl font-mono font-bold text-foreground">₹{inventoryValue.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-4 border border-border bg-background/50 rounded">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-1">Profit</span>
                    <span className={`text-2xl font-mono font-bold block ${profit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                      {profit < 0 ? `-₹${Math.abs(profit).toLocaleString("en-IN")}` : `₹${profit.toLocaleString("en-IN")}`}
                    </span>
                  </div>
                  <div className="pt-2 flex gap-3">
                    <Link to="/book" className="flex-1 text-center bg-primary px-4 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-white hover:text-black transition-colors">Create Booking</Link>
                  </div>
                </div>

                {/* Monthly Chart Card */}
                <div className="lg:col-span-2 border border-border bg-background/40 p-5 rounded relative flex flex-col justify-between min-h-[350px]">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary animate-pulse">📊 System Breakdown</span>
                      <h4 className="text-xs text-muted-foreground font-bold uppercase tracking-wider mt-0.5">Month-Wise Category Shares</h4>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {/* Month Dropdown Select */}
                      <select
                        value={selectedMonthLabel}
                        onChange={(e) => setSelectedMonthLabel(e.target.value)}
                        className="bg-background border border-border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground outline-none focus:border-primary cursor-pointer w-full sm:w-auto"
                      >
                        {monthsRange.map(m => (
                          <option key={m.label} value={m.label}>{m.label}</option>
                        ))}
                      </select>
                      
                      {/* Range Buttons */}
                      <div className="flex border border-border bg-background">
                        <button
                          onClick={() => {
                            setChartMonths(6);
                            const nextRange = getMonthRange(6);
                            if (!nextRange.some(m => m.label === selectedMonthLabel)) {
                              setSelectedMonthLabel(nextRange[nextRange.length - 1]?.label);
                            }
                          }}
                          className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${chartMonths === 6 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          6M
                        </button>
                        <button
                          onClick={() => {
                            setChartMonths(12);
                            const nextRange = getMonthRange(12);
                            if (!nextRange.some(m => m.label === selectedMonthLabel)) {
                              setSelectedMonthLabel(nextRange[nextRange.length - 1]?.label);
                            }
                          }}
                          className={`px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider transition-colors ${chartMonths === 12 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                        >
                          12M
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center flex-1">
                    {/* Pie Chart Element */}
                    <div className="relative h-[220px] w-full flex items-center justify-center">
                      {totalValue > 0 ? (
                        <>
                          <ChartContainer
                            config={{
                              grossInvoices: { label: "Gross Invoices", color: "oklch(0.82 0.17 86)" },
                              recentExpenses: { label: "Recent Expenses", color: "oklch(0.6 0.22 27)" },
                              inventoryValue: { label: "Inventory Value", color: "oklch(0.62 0.15 220)" },
                            }}
                            className="h-full w-full"
                          >
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={85}
                                  paddingAngle={4}
                                  dataKey="value"
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.3)" strokeWidth={1} />
                                  ))}
                                </Pie>
                                <ChartTooltip
                                  content={
                                    <ChartTooltipContent
                                      indicator="dot"
                                      formatter={(value, name) => (
                                        <div className="flex justify-between items-center gap-4 w-full">
                                          <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{name}:</span>
                                          <span className="font-mono font-bold text-foreground">₹{Number(value).toLocaleString("en-IN")}</span>
                                        </div>
                                      )}
                                    />
                                  }
                                />
                              </PieChart>
                            </ResponsiveContainer>
                          </ChartContainer>
                          {/* Inner center text */}
                          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
                            <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">Month Net</span>
                            <span className={`text-sm font-mono font-bold ${((activeMonthData?.grossInvoices || 0) - (activeMonthData?.recentExpenses || 0)) >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                              ₹{((activeMonthData?.grossInvoices || 0) - (activeMonthData?.recentExpenses || 0)).toLocaleString("en-IN")}
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center h-full text-center p-6 border border-dashed border-border rounded bg-background/20 w-full">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">No Activity</span>
                          <p className="text-[11px] text-muted-foreground max-w-[200px] leading-relaxed">No invoices, expenses, or inventory records are associated with this month.</p>
                        </div>
                      )}
                    </div>

                    {/* Detailed Legend breakdown */}
                    <div className="space-y-3.5">
                      {pieData.map((item, idx) => {
                        const pct = totalValue > 0 ? ((item.value / totalValue) * 100).toFixed(1) : "0";
                        return (
                          <div key={item.name} className="p-3 border border-border bg-background/30 rounded flex items-center justify-between gap-4">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="size-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
                              <div className="min-w-0">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-foreground block truncate">{item.name}</span>
                                <span className="text-[10px] text-muted-foreground font-mono">{pct}% share</span>
                              </div>
                            </div>
                            <span className="font-mono font-bold text-xs text-foreground shrink-0">₹{item.value.toLocaleString("en-IN")}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        </div>
      </section>

      {/* Unified Edit/Add Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-lg bg-card border border-border p-8 metallic-surface my-8">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-primary animate-pulse" />

            <div className="mb-6 flex justify-between items-start">
              <div>
                <span className="inline-flex items-center gap-2 px-2.5 py-0.5 border border-primary/30 bg-primary/5 text-primary text-[9px] font-bold uppercase tracking-widest mb-2 animate-pulse">
                  🔧 System Module: {editItem.type.toUpperCase()}
                </span>
                <h3 className="font-display text-3xl uppercase italic tracking-tight">
                  {editItem.id ? `Edit ${editItem.type}` : `Add ${editItem.type}`}
                </h3>
              </div>
              {editItem.id && (
                <button
                  type="button"
                  onClick={handleDeleteRecord}
                  disabled={deletingRecord}
                  className="p-2 border border-red-500/20 hover:border-red-500 bg-red-950/10 hover:bg-red-950/20 text-red-400 transition-colors rounded-sm"
                  title="Delete Record"
                >
                  <Trash2 className="size-4" />
                </button>
              )}
            </div>

            <form onSubmit={handleSaveRecord} className="space-y-4 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">

              {editItem.type === "booking" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Customer Name" value={editFormFields.customer_name || ""} onChange={val => setEditFormFields({ ...editFormFields, customer_name: val })} required />
                    <Field label="Phone" value={editFormFields.phone || ""} onChange={val => setEditFormFields({ ...editFormFields, phone: val })} required />
                  </div>
                  <Field label="Email" type="email" value={editFormFields.email || ""} onChange={val => setEditFormFields({ ...editFormFields, email: val })} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Vehicle Type</label>
                      <select
                        value={editFormFields.vehicle_type || "car"}
                        onChange={e => setEditFormFields({ ...editFormFields, vehicle_type: e.target.value })}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                      >
                        <option value="car">Car</option>
                        <option value="bike">Bike</option>
                        <option value="scooter">Scooter</option>
                      </select>
                    </div>
                    <Field label="Vehicle Details" value={editFormFields.vehicle_info || ""} onChange={val => setEditFormFields({ ...editFormFields, vehicle_info: val })} placeholder="Make / Model / Year" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Service Type</label>
                      <select
                        value={editFormFields.service_id || ""}
                        onChange={e => {
                          const selected = services.find(s => s.id === e.target.value);
                          setEditFormFields({
                            ...editFormFields,
                            service_id: e.target.value,
                            service_name: selected ? selected.name : ""
                          });
                        }}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                      >
                        <option value="">General Service / None</option>
                        {services.map(s => (
                          <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                      </select>
                    </div>
                    <Field label="Scheduled Slot" type="datetime-local" value={editFormFields.scheduled_at || ""} onChange={val => setEditFormFields({ ...editFormFields, scheduled_at: val })} required />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</label>
                      <select
                        value={editFormFields.status || "pending"}
                        onChange={e => setEditFormFields({ ...editFormFields, status: e.target.value })}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Progress Stage</label>
                      <select
                        value={editFormFields.progress_stage || "intake"}
                        onChange={e => setEditFormFields({ ...editFormFields, progress_stage: e.target.value })}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                      >
                        <option value="intake">Intake / Diagnostics</option>
                        <option value="parts">Awaiting Parts</option>
                        <option value="repair">Active Repair</option>
                        <option value="testing">Testing / Calibration</option>
                        <option value="ready">Ready for Intake</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Problem / Request</label>
                    <textarea
                      rows={2}
                      value={editFormFields.problem || ""}
                      onChange={e => setEditFormFields({ ...editFormFields, problem: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Staff Notes</label>
                    <textarea
                      rows={2}
                      value={editFormFields.notes || ""}
                      onChange={e => setEditFormFields({ ...editFormFields, notes: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {editItem.type === "service" && (
                <>
                  <Field label="Service Name" value={editFormFields.name || ""} onChange={val => setEditFormFields({ ...editFormFields, name: val })} required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Diagnostic Code" value={editFormFields.code || ""} onChange={val => setEditFormFields({ ...editFormFields, code: val })} required />
                    <Field label="Base Price (₹)" type="number" value={editFormFields.price || 0} onChange={val => setEditFormFields({ ...editFormFields, price: val })} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Category" value={editFormFields.category || "general"} onChange={val => setEditFormFields({ ...editFormFields, category: val })} required />
                    <Field label="Duration Limit (minutes)" type="number" value={editFormFields.duration_min || 60} onChange={val => setEditFormFields({ ...editFormFields, duration_min: val })} required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={editFormFields.description || ""}
                      onChange={e => setEditFormFields({ ...editFormFields, description: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="srv_active"
                      checked={Boolean(editFormFields.active)}
                      onChange={e => setEditFormFields({ ...editFormFields, active: e.target.checked })}
                      className="size-4 border border-border rounded accent-primary bg-background cursor-pointer"
                    />
                    <label htmlFor="srv_active" className="text-[10px] font-bold uppercase tracking-widest text-foreground cursor-pointer select-none">Listed / Active on Public Form</label>
                  </div>
                </>
              )}

              {editItem.type === "inventory" && (
                <>
                  <Field label="Spare Part / Item Name" value={editFormFields.name || ""} onChange={val => setEditFormFields({ ...editFormFields, name: val })} required />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Field label="Current Qty" type="number" value={editFormFields.qty || 0} onChange={val => setEditFormFields({ ...editFormFields, qty: val })} required />
                    <Field label="Low Stock Threshold" type="number" value={editFormFields.low_threshold || 5} onChange={val => setEditFormFields({ ...editFormFields, low_threshold: val })} required />
                    <Field label="Unit Price (₹)" type="number" value={editFormFields.unit_price || 0} onChange={val => setEditFormFields({ ...editFormFields, unit_price: val })} required />
                  </div>
                </>
              )}

              {editItem.type === "invoice" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Invoice ID" value={editFormFields.invoice_no || ""} onChange={val => setEditFormFields({ ...editFormFields, invoice_no: val })} required />
                    <Field label="Customer Name" value={editFormFields.customer_name || ""} onChange={val => setEditFormFields({ ...editFormFields, customer_name: val })} required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Gross Amount (₹)" type="number" value={editFormFields.total || 0} onChange={val => setEditFormFields({ ...editFormFields, total: val })} required />
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Status</label>
                      <select
                        value={editFormFields.status || "unpaid"}
                        onChange={e => setEditFormFields({ ...editFormFields, status: e.target.value })}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                      >
                        <option value="unpaid">Unpaid</option>
                        <option value="partially_paid">Partially Paid</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Billing Notes</label>
                    <textarea
                      rows={2}
                      value={editFormFields.notes || ""}
                      onChange={e => setEditFormFields({ ...editFormFields, notes: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {editItem.type === "expense" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Expense Category</label>
                      <select
                        value={editFormFields.category || "parts"}
                        onChange={e => setEditFormFields({ ...editFormFields, category: e.target.value })}
                        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none"
                      >
                        <option value="parts">Spare Parts</option>
                        <option value="tools">Workshop Tools</option>
                        <option value="salary">Staff Salary</option>
                        <option value="rent">Rent / Bay Space</option>
                        <option value="utilities">Power / Utility bill</option>
                        <option value="marketing">Promotions / Ads</option>
                        <option value="other">Other Expenses</option>
                      </select>
                    </div>
                    <Field label="Record Date" type="date" value={editFormFields.expense_date || ""} onChange={val => setEditFormFields({ ...editFormFields, expense_date: val })} required />
                  </div>
                  <Field label="Total Cost (₹)" type="number" value={editFormFields.amount || 0} onChange={val => setEditFormFields({ ...editFormFields, amount: val })} required />
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">Memo</label>
                    <textarea
                      rows={2}
                      value={editFormFields.note || ""}
                      onChange={e => setEditFormFields({ ...editFormFields, note: e.target.value })}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none resize-none"
                    />
                  </div>
                </>
              )}

              {editItem.type === "staff" && (
                <>
                  <Field label="Name" value={editFormFields.name || ""} onChange={val => setEditFormFields({ ...editFormFields, name: val })} required />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Field label="Role / Title" value={editFormFields.role || ""} onChange={val => setEditFormFields({ ...editFormFields, role: val })} required />
                    <Field label="Salary (₹ / month)" type="number" value={editFormFields.salary || 0} onChange={val => setEditFormFields({ ...editFormFields, salary: val })} required />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="staff_active"
                      checked={Boolean(editFormFields.active)}
                      onChange={e => setEditFormFields({ ...editFormFields, active: e.target.checked })}
                      className="size-4 border border-border rounded accent-primary bg-background cursor-pointer"
                    />
                    <label htmlFor="staff_active" className="text-[10px] font-bold uppercase tracking-widest text-foreground cursor-pointer select-none">Active bay assignment</label>
                  </div>
                </>
              )}

              <div className="flex gap-4 pt-4 border-t border-border mt-6">
                <button
                  type="submit"
                  disabled={savingRecord}
                  className="flex-1 bg-primary text-primary-foreground hover:bg-white hover:text-black py-3 text-xs font-bold uppercase tracking-widest transition-colors disabled:opacity-50"
                >
                  {savingRecord ? "Saving..." : "Save Record"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditItem(null)}
                  className="flex-1 border border-border hover:bg-card py-3 text-xs font-bold uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </PageShell>
  );
}

// Subcomponents
function Metric({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="bg-background p-6">
      <Icon className="mb-5 size-5 text-primary" />
      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-2 font-display text-4xl uppercase italic">{value}</p>
    </div>
  );
}

function Panel({ title, icon: Icon, children, onAdd, className }: { title: string; icon: any; children: React.ReactNode; onAdd?: () => void; className?: string }) {
  return (
    <section className={`border border-border bg-card p-6 ${className || ""}`}>
      <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
        <h2 className="font-display text-3xl uppercase italic">{title}</h2>
        <div className="flex items-center gap-3">
          {onAdd && (
            <button
              onClick={onAdd}
              className="p-1 border border-primary/20 hover:border-primary bg-primary/5 hover:bg-primary/10 text-primary transition-colors rounded-sm"
              title={`Add new ${title.toLowerCase()}`}
            >
              <Plus className="size-4" />
            </button>
          )}
          <Icon className="size-5 text-primary" />
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-5 border-b border-border/60 pb-3 text-sm last:border-0">
      <span className="break-words font-bold">{label}</span>
      <span className="max-w-[55%] break-words text-right text-muted-foreground">{value}</span>
    </div>
  );
}

function EditableRow({ label, value, onEdit }: { label: string; value: string; onEdit?: () => void }) {
  return (
    <div className="flex justify-between items-center gap-5 border-b border-border/60 pb-3 text-sm last:border-0 group">
      <div className="flex flex-col min-w-0">
        <span className="break-words font-bold">{label}</span>
      </div>
      <div className="flex items-center gap-2 max-w-[65%] min-w-0">
        <span className="break-words text-right text-muted-foreground truncate">{value}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            className="opacity-40 group-hover:opacity-100 hover:text-primary transition-opacity p-0.5 flex-shrink-0"
            title="Edit record"
          >
            <Pencil className="size-3" />
          </button>
        )}
      </div>
    </div>
  );
}

function BillingPaymentRow({
  label,
  value,
  expense,
  paid,
  onExpense,
  onPaid,
  onUnpaid,
  onEdit,
}: {
  label: string;
  value: string;
  expense: number;
  paid: boolean;
  onExpense: () => void;
  onPaid: () => void;
  onUnpaid: () => void;
  onEdit?: () => void;
}) {
  return (
    <div className="border-b border-border/60 pb-4 text-sm last:border-0 group">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="break-words font-bold">{label}</span>
          <span className="mt-1 block break-words text-muted-foreground">{value}</span>
        </div>
        {onEdit && (
          <button
            onClick={onEdit}
            className="opacity-40 group-hover:opacity-100 hover:text-primary transition-opacity p-0.5 flex-shrink-0"
            title="Edit record"
          >
            <Pencil className="size-3" />
          </button>
        )}
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Expenses?</span>
        <button
          type="button"
          onClick={onExpense}
          className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border border-primary/20 bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          {expense > 0 ? `₹${expense.toLocaleString("en-IN")}` : "Add"}
        </button>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Paid?</span>
        <button
          type="button"
          onClick={onPaid}
          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border ${paid ? "bg-green-500 text-white border-green-500" : "bg-green-500/10 hover:bg-green-500 text-green-400 hover:text-white border-green-500/20"}`}
        >
          Yes
        </button>
        <button
          type="button"
          onClick={onUnpaid}
          className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors border ${!paid ? "bg-red-500 text-white border-red-500" : "bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border-red-500/20"}`}
        >
          No
        </button>
      </div>
    </div>
  );
}

function Empty() {
  return <p className="text-sm text-muted-foreground">No records yet.</p>;
}

function Field({ label, value, onChange, type = "text", required = false, placeholder = "" }: { label: string; value: any; onChange: (val: any) => void; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full bg-background border border-border px-3 py-2 text-sm text-foreground focus:border-primary outline-none transition-colors"
        required={required}
        placeholder={placeholder}
      />
    </div>
  );
}
