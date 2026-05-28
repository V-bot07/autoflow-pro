import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { PageShell } from "@/components/SiteFrame";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Shubham Auto Clinic & Garage" },
      { name: "description", content: "Contact Shubham Auto Clinic & Garage in Vadodara for service bookings, diagnostics, emergency repairs, and workshop visits." },
      { property: "og:title", content: "Contact Shubham Auto Clinic" },
      { property: "og:description", content: "Call, email, WhatsApp, or visit Shubham Auto Clinic & Garage in Vadodara." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data: settings } = useQuery({ queryKey: ["site_settings", "contact"], queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data });
  const cleanPhone = (settings?.whatsapp ?? settings?.phone ?? "").replace(/\D/g, "");
  return (
    <PageShell eyebrow="Workshop comms" title="Contact" cta={{ to: "/book", label: "Book Service" }}>
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-1">
            <ContactTile icon={MapPin} label="Location" value={settings?.address ?? "C-47, Sarasia Talav Road, Purushottam Nagar, Kishanwadi, Vadodara, Gujarat"} />
            <ContactTile icon={Phone} label="Phone" value={settings?.phone ?? "+91 8469018032"} href={`tel:${settings?.phone ?? "+918469018032"}`} />
            <ContactTile icon={Mail} label="Email" value={settings?.email ?? "performance@shubhamauto.in"} href={`mailto:${settings?.email ?? "performance@shubhamauto.in"}`} />
            <ContactTile icon={MessageCircle} label="Hours" value={settings?.working_hours ?? "Mon-Sat 09:00 — 19:00"} />
          </div>
          <div className="metallic-surface border border-border p-1">
            {settings?.map_embed_url ? <iframe src={settings.map_embed_url} className="min-h-[420px] w-full grayscale" loading="lazy" title="Workshop map" /> : <div className="grid min-h-[420px] place-items-center p-8 text-center text-sm text-muted-foreground">Map signal unavailable</div>}
          </div>
        </div>
        <div className="mx-auto mt-8 flex max-w-7xl flex-wrap gap-4">
          <a href={`https://wa.me/${cleanPhone}`} target="_blank" rel="noreferrer" className="bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground">Open WhatsApp</a>
          <Link to="/track" className="border border-border px-6 py-4 text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary">Track Existing Repair</Link>
        </div>
      </section>
    </PageShell>
  );
}

function ContactTile({ icon: Icon, label, value, href }: { icon: any; label: string; value: string; href?: string }) {
  const body = <><Icon className="mb-5 size-6 text-primary" /><p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</p><p className="text-sm font-bold leading-relaxed">{value}</p></>;
  return href ? <a href={href} className="bg-background p-7 hover:bg-card">{body}</a> : <div className="bg-background p-7">{body}</div>;
}
