import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CalendarPlus } from "lucide-react";
import { toast } from "sonner";
import { PageShell } from "@/components/SiteFrame";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Service — Shubham Auto Clinic & Garage" },
      { name: "description", content: "Book a car or bike service appointment with Shubham Auto Clinic & Garage." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  const { data: services = [] } = useQuery({ queryKey: ["services", "booking"], queryFn: async () => (await supabase.from("services").select("id,name,price").eq("active", true).order("display_order")).data ?? [] });
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const service = services.find((item) => item.id === form.get("service_id"));
    setSubmitting(true);
    const { data, error } = await supabase.from("bookings").insert({
      customer_name: String(form.get("customer_name")),
      phone: String(form.get("phone")),
      email: String(form.get("email") || ""),
      vehicle_type: String(form.get("vehicle_type")),
      vehicle_info: String(form.get("vehicle_info") || ""),
      service_id: service?.id,
      service_name: service?.name,
      scheduled_at: new Date(String(form.get("scheduled_at"))).toISOString(),
      problem: String(form.get("problem") || ""),
    }).select("booking_no").single();
    setSubmitting(false);
    if (error) toast.error("Booking channel failed. Please check the form and retry.");
    else { toast.success(`Booking created: ${data.booking_no}`); event.currentTarget.reset(); }
  };

  return (
    <PageShell eyebrow="Workshop intake" title="Book Service" cta={{ to: "/track", label: "Track Repair" }}>
      <section className="px-6 py-16">
        <form onSubmit={submit} className="mx-auto grid max-w-5xl gap-5 metallic-surface border border-border p-8 md:grid-cols-2">
          <Field name="customer_name" label="Customer Name" required />
          <Field name="phone" label="Phone" required />
          <Field name="email" label="Email" type="email" />
          <label><span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Vehicle Type</span><select name="vehicle_type" className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary"><option value="car">Car</option><option value="bike">Bike</option><option value="scooter">Scooter</option></select></label>
          <Field name="vehicle_info" label="Vehicle Details" placeholder="Honda City / RE Classic / GJ plate" />
          <label><span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Service</span><select name="service_id" required className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary">{services.map((service) => <option key={service.id} value={service.id}>{service.name} — ₹{Number(service.price).toLocaleString("en-IN")}</option>)}</select></label>
          <Field name="scheduled_at" label="Preferred Slot" type="datetime-local" required />
          <label className="md:col-span-2"><span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Problem / Request</span><textarea name="problem" rows={5} className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /></label>
          <button disabled={submitting} className="inline-flex items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground disabled:opacity-60 md:col-span-2"><CalendarPlus className="size-4" />{submitting ? "Creating" : "Create Booking"}</button>
        </form>
      </section>
    </PageShell>
  );
}

function Field({ label, name, type = "text", required = false, placeholder = "" }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return <label><span className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</span><input name={name} type={type} required={required} placeholder={placeholder} className="w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" /></label>;
}
