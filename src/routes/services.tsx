import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Activity, Battery, Cog, Disc, Droplet, Siren, Sparkles, Thermometer, Zap } from "lucide-react";
import { PageShell } from "@/components/SiteFrame";
import { supabase } from "@/integrations/supabase/client";

const ICONS: Record<string, any> = { activity: Activity, battery: Battery, cog: Cog, disc: Disc, droplet: Droplet, siren: Siren, sparkles: Sparkles, thermometer: Thermometer, zap: Zap };

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Shubham Auto Clinic & Garage" },
      { name: "description", content: "Premium car and bike workshop services including diagnostics, brakes, detailing, electrical, roadside, and performance work." },
      { property: "og:title", content: "Garage Services — Shubham Auto Clinic" },
      { property: "og:description", content: "Explore service protocols, pricing, and service durations for Shubham Auto Clinic & Garage." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data: services = [] } = useQuery({
    queryKey: ["services", "catalog"],
    queryFn: async () => (await supabase.from("services").select("*").eq("active", true).order("display_order")).data ?? [],
  });

  return (
    <PageShell eyebrow="Service protocol catalog" title="Diagnostic Layers" cta={{ to: "/book", label: "Book Service" }}>
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = ICONS[service.icon ?? "cog"] ?? Cog;
            return (
              <article key={service.id} className="group bg-background p-8 transition-colors hover:bg-card">
                <div className="mb-6 flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Protocol {service.code}</span>
                  <Icon className="size-6 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h2 className="mb-4 font-display text-3xl uppercase italic group-hover:text-primary">{service.name}</h2>
                <p className="mb-8 min-h-20 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                <div className="flex items-center justify-between border-t border-border pt-5 text-xs font-bold uppercase tracking-widest">
                  <span>₹{Number(service.price).toLocaleString("en-IN")}</span>
                  <span className="text-muted-foreground">{service.duration_min} min</span>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mx-auto mt-10 max-w-7xl metallic-surface border border-border p-8 md:flex md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Need a custom diagnosis?</p>
            <p className="mt-3 max-w-2xl text-sm text-muted-foreground">Share the symptom, sound, warning light, or ride behavior and the workshop team will map it to the right inspection bay.</p>
          </div>
          <Link to="/contact" className="mt-6 inline-flex bg-primary px-6 py-3 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground md:mt-0">Talk to Workshop</Link>
        </div>
      </section>
    </PageShell>
  );
}
