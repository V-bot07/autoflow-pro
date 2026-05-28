import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Award, Gauge, Shield, Timer } from "lucide-react";
import { PageShell } from "@/components/SiteFrame";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Shubham Auto Clinic & Garage" },
      { name: "description", content: "Meet Malay Parikh and the precision-led workshop process behind Shubham Auto Clinic & Garage." },
      { property: "og:title", content: "About Shubham Auto Clinic & Garage" },
      { property: "og:description", content: "A premium Vadodara workshop for car and bike diagnostics, restoration, and performance servicing." },
    ],
  }),
  component: AboutPage,
});

const values = [
  { icon: Gauge, label: "Calibrated diagnostics", body: "Every vehicle starts with measured inspection, sensor scan, and symptom mapping." },
  { icon: Shield, label: "Transparent service", body: "Work orders, pricing, and repair status stay visible from intake to delivery." },
  { icon: Timer, label: "Fast bay movement", body: "Service routing keeps everyday maintenance and emergency repairs moving cleanly." },
  { icon: Award, label: "Owner-led quality", body: "Malay Parikh sets the workshop standard for fit, finish, and mechanical discipline." },
];

function AboutPage() {
  const { data: settings } = useQuery({ queryKey: ["site_settings", "about"], queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data });
  const { data: staff = [] } = useQuery({ queryKey: ["staff", "about"], queryFn: async () => (await supabase.from("staff").select("name,role,active").eq("active", true)).data ?? [] });

  return (
    <PageShell eyebrow="Owner led workshop" title="About the Clinic" cta={{ to: "/contact", label: "Visit Workshop" }}>
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-8 max-w-3xl text-lg leading-relaxed text-muted-foreground">{settings?.about_story}</p>
            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {values.map((item) => {
                const Icon = item.icon;
                return <article key={item.label} className="bg-background p-7"><Icon className="mb-5 size-6 text-primary" /><h2 className="mb-3 font-display text-2xl uppercase italic">{item.label}</h2><p className="text-sm leading-relaxed text-muted-foreground">{item.body}</p></article>;
              })}
            </div>
          </div>
          <aside className="metallic-surface border border-border p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary">Technical Lead</p>
            <h2 className="mt-3 font-display text-5xl uppercase italic">{settings?.owner_name ?? "Malay Parikh"}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Premium mechanical care for bikes and cars from a workshop built around accuracy, communication, and disciplined bay operations.</p>
            <div className="mt-8 space-y-4 border-t border-border pt-8">
              {staff.map((member) => <div key={member.name} className="flex justify-between gap-4 text-sm"><span>{member.name}</span><span className="text-right text-muted-foreground">{member.role}</span></div>)}
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
