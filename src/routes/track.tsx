import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Search, ShieldCheck } from "lucide-react";
import { PageShell } from "@/components/SiteFrame";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/track")({
  head: () => ({
    meta: [
      { title: "Track Repair — Shubham Auto Clinic & Garage" },
      { name: "description", content: "Track your vehicle service status using booking number and phone number." },
      { property: "og:title", content: "Track Your Repair — Shubham Auto Clinic" },
      { property: "og:description", content: "Check live repair stage, booking status, and scheduled workshop time." },
    ],
  }),
  component: TrackPage,
});

type BookingResult = {
  booking_no: string;
  customer_name: string;
  phone: string;
  vehicle_info: string | null;
  service_name: string | null;
  scheduled_at: string;
  status: string;
  progress_stage: string;
  problem: string | null;
};

function TrackPage() {
  const [bookingNo, setBookingNo] = useState("");
  const [phone, setPhone] = useState("");
  const [result, setResult] = useState<BookingResult | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const lookup = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    setResult(null);
    const { data, error } = await supabase
      .from("bookings")
      .select("booking_no,customer_name,phone,vehicle_info,service_name,scheduled_at,status,progress_stage,problem")
      .eq("booking_no", bookingNo.trim().toUpperCase())
      .eq("phone", phone.trim())
      .maybeSingle();
    setLoading(false);
    if (error) setMessage("Unable to read the repair channel right now.");
    else if (!data) setMessage("No matching repair order found. Check your booking number and phone.");
    else setResult(data);
  };

  return (
    <PageShell eyebrow="Repair order telemetry" title="Track Repair">
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <form onSubmit={lookup} className="metallic-surface border border-border p-8">
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">Enter the booking number received after service booking and the same phone number used at intake.</p>
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Booking No</label>
            <input value={bookingNo} onChange={(e) => setBookingNo(e.target.value)} required placeholder="SAC-123456" className="mb-5 w-full border border-border bg-background px-4 py-3 text-sm uppercase outline-none focus:border-primary" />
            <label className="mb-2 block text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required placeholder="+91 8469018032" className="mb-6 w-full border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" />
            <button disabled={loading} className="inline-flex w-full items-center justify-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground disabled:opacity-60">
              <Search className="size-4" /> {loading ? "Scanning" : "Track Order"}
            </button>
            {message && <p className="mt-5 text-sm text-muted-foreground">{message}</p>}
          </form>
          <div className="border border-border bg-card p-8">
            {result ? (
              <div>
                <div className="mb-8 flex items-center justify-between gap-6 border-b border-border pb-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-primary">{result.booking_no}</p>
                    <h2 className="mt-2 font-display text-4xl uppercase italic">{result.progress_stage}</h2>
                  </div>
                  <ShieldCheck className="size-10 text-primary" />
                </div>
                <div className="grid gap-5 text-sm md:grid-cols-2">
                  <Info label="Customer" value={result.customer_name} />
                  <Info label="Status" value={result.status} />
                  <Info label="Vehicle" value={result.vehicle_info ?? "Vehicle intake pending"} />
                  <Info label="Service" value={result.service_name ?? "General inspection"} />
                  <Info label="Scheduled" value={new Date(result.scheduled_at).toLocaleString("en-IN")} />
                  <Info label="Issue" value={result.problem ?? "Workshop diagnosis pending"} />
                </div>
              </div>
            ) : (
              <div className="flex min-h-80 flex-col justify-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Awaiting Signal</p>
                <h2 className="mt-3 font-display text-5xl uppercase italic">Repair telemetry appears here.</h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return <div><p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p><p className="break-words font-bold">{value}</p></div>;
}
