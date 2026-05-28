import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { BarChart3, Boxes, CalendarClock, FileText, IndianRupee, Settings, ShieldAlert, Users, Wrench } from "lucide-react";
import { PageShell } from "@/components/SiteFrame";
import { supabase } from "@/integrations/supabase/client";

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
  const { data: settings } = useQuery({ queryKey: ["admin", "settings"], queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data });
  const { data: bookings = [] } = useQuery({ queryKey: ["admin", "bookings"], queryFn: async () => (await supabase.from("bookings").select("booking_no,customer_name,service_name,status,scheduled_at,vehicle_info").order("created_at", { ascending: false }).limit(8)).data ?? [] });
  const { data: services = [] } = useQuery({ queryKey: ["admin", "services"], queryFn: async () => (await supabase.from("services").select("name,price,active").order("display_order")).data ?? [] });
  const { data: inventory = [] } = useQuery({ queryKey: ["admin", "inventory"], queryFn: async () => (await supabase.from("inventory").select("name,qty,low_threshold,unit_price").order("qty", { ascending: true })).data ?? [] });
  const { data: staff = [] } = useQuery({ queryKey: ["admin", "staff"], queryFn: async () => (await supabase.from("staff").select("name,role,active,salary").order("name")).data ?? [] });
  const { data: invoices = [] } = useQuery({ queryKey: ["admin", "invoices"], queryFn: async () => (await supabase.from("invoices").select("invoice_no,customer_name,total,status,created_at").order("created_at", { ascending: false }).limit(6)).data ?? [] });
  const { data: expenses = [] } = useQuery({ queryKey: ["admin", "expenses"], queryFn: async () => (await supabase.from("expenses").select("category,amount,expense_date").order("expense_date", { ascending: false }).limit(6)).data ?? [] });

  const revenue = invoices.reduce((sum, item) => sum + Number(item.total ?? 0), 0);
  const expenseTotal = expenses.reduce((sum, item) => sum + Number(item.amount ?? 0), 0);
  const lowStock = inventory.filter((item) => item.qty <= item.low_threshold).length;

  return (
    <PageShell eyebrow="Garage command center" title="Admin Panel" cta={{ to: "/", label: "Public Site" }}>
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 border border-primary/30 bg-primary/5 p-5 text-sm text-muted-foreground">
            <ShieldAlert className="mb-3 size-5 text-primary" /> Admin data is protected by backend roles. Sign in with an admin account to manage private records; public visitors can only create and track bookings.
          </div>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            <Metric icon={CalendarClock} label="Bookings" value={bookings.length.toString()} />
            <Metric icon={Wrench} label="Services" value={services.length.toString()} />
            <Metric icon={IndianRupee} label="Invoice Total" value={`₹${revenue.toLocaleString("en-IN")}`} />
            <Metric icon={Boxes} label="Low Stock" value={lowStock.toString()} />
          </div>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <Panel title="Site Content Editor" icon={Settings}><InfoRow label="Shop" value={settings?.shop_name ?? "—"} /><InfoRow label="Phone" value={settings?.phone ?? "—"} /><InfoRow label="Address" value={settings?.address ?? "—"} /><InfoRow label="Hours" value={settings?.working_hours ?? "—"} /></Panel>
            <Panel title="Bookings" icon={CalendarClock}>{bookings.length ? bookings.map((b) => <InfoRow key={b.booking_no} label={`${b.booking_no} · ${b.status}`} value={`${b.customer_name} — ${b.service_name ?? "General"}`} />) : <Empty />}</Panel>
            <Panel title="Services" icon={Wrench}>{services.map((s) => <InfoRow key={s.name} label={s.name} value={`₹${Number(s.price).toLocaleString("en-IN")} · ${s.active ? "Active" : "Hidden"}`} />)}</Panel>
            <Panel title="Inventory" icon={Boxes}>{inventory.slice(0, 8).map((i) => <InfoRow key={i.name} label={i.name} value={`${i.qty} units · low at ${i.low_threshold}`} />)}</Panel>
            <Panel title="Billing" icon={FileText}>{invoices.length ? invoices.map((i) => <InfoRow key={i.invoice_no} label={`${i.invoice_no} · ${i.status}`} value={`${i.customer_name} — ₹${Number(i.total).toLocaleString("en-IN")}`} />) : <Empty />}</Panel>
            <Panel title="Expenses" icon={IndianRupee}>{expenses.length ? expenses.map((e, index) => <InfoRow key={`${e.category}-${index}`} label={e.category} value={`₹${Number(e.amount).toLocaleString("en-IN")} · ${e.expense_date}`} />) : <Empty />}</Panel>
            <Panel title="Staff" icon={Users}>{staff.map((s) => <InfoRow key={s.name} label={s.name} value={`${s.role} · ${s.active ? "Active" : "Inactive"}`} />)}</Panel>
            <Panel title="Analytics" icon={BarChart3}><InfoRow label="Gross invoices" value={`₹${revenue.toLocaleString("en-IN")}`} /><InfoRow label="Recent expenses" value={`₹${expenseTotal.toLocaleString("en-IN")}`} /><InfoRow label="Inventory value" value={`₹${inventory.reduce((sum, item) => sum + Number(item.qty) * Number(item.unit_price), 0).toLocaleString("en-IN")}`} /><Link to="/book" className="mt-5 inline-flex bg-primary px-5 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground">Create Booking</Link></Panel>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Metric({ icon: Icon, label, value }: { icon: any; label: string; value: string }) { return <div className="bg-background p-6"><Icon className="mb-5 size-5 text-primary" /><p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p><p className="mt-2 font-display text-4xl uppercase italic">{value}</p></div>; }
function Panel({ title, icon: Icon, children }: { title: string; icon: any; children: React.ReactNode }) { return <section className="border border-border bg-card p-6"><div className="mb-6 flex items-center justify-between border-b border-border pb-4"><h2 className="font-display text-3xl uppercase italic">{title}</h2><Icon className="size-5 text-primary" /></div><div className="space-y-4">{children}</div></section>; }
function InfoRow({ label, value }: { label: string; value: string }) { return <div className="flex justify-between gap-5 border-b border-border/60 pb-3 text-sm last:border-0"><span className="break-words font-bold">{label}</span><span className="max-w-[55%] break-words text-right text-muted-foreground">{value}</span></div>; }
function Empty() { return <p className="text-sm text-muted-foreground">No records yet.</p>; }
