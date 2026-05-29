import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, ArrowRight, Activity, Cog, Thermometer, Disc, Sparkles, Zap, Droplet, Battery, Siren } from "lucide-react";

const ICONS: Record<string, any> = { activity: Activity, cog: Cog, thermometer: Thermometer, disc: Disc, sparkles: Sparkles, zap: Zap, droplet: Droplet, battery: Battery, siren: Siren };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shubham Auto Clinic & Garage — Precision Motoring, Vadodara" },
      { name: "description", content: "Premium automotive workshop. Diagnostics, performance tuning, brakes, detailing, emergency service. Owned by master technician Malay Parikh." },
    ],
  }),
  component: Home,
});

function Home() {
  const { data: settings } = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => (await supabase.from("site_settings").select("*").limit(1).single()).data,
  });
  const { data: services } = useQuery({
    queryKey: ["services"],
    queryFn: async () => (await supabase.from("services").select("*").eq("active", true).order("display_order")).data ?? [],
  });
  const { data: testimonials } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => (await supabase.from("testimonials").select("*").eq("active", true).order("display_order")).data ?? [],
  });
  const { data: promos } = useQuery({
    queryKey: ["promotions"],
    queryFn: async () => (await supabase.from("promotions").select("*").eq("active", true).order("display_order")).data ?? [],
  });

  const stats = (settings?.stats as any[]) ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="size-10 bg-primary grid place-items-center -skew-x-12">
              <span className="font-display text-primary-foreground skew-x-12 text-xl">S</span>
            </div>
            <div className="leading-none">
              <p className="font-display text-2xl tracking-tight uppercase">{settings?.shop_name?.split("&")[0] ?? "Shubham Auto"}</p>
              <p className="text-[10px] text-muted-foreground tracking-widest uppercase">{settings?.owner_name ?? "Malay Parikh"} Performance</p>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold">
            <Link to="/services" className="hover:text-primary transition-colors">Services</Link>
            <Link to="/track" className="hover:text-primary transition-colors">Track</Link>
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
            <Link to="/book" className="px-6 py-2.5 bg-primary text-primary-foreground hover:bg-white transition-colors">Book Service</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 gauge-line opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-8 animate-slide-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-tighter mb-8">
                <span className="size-1.5 bg-primary animate-blink" /> System Status: Ready for Spec
              </div>
              <h1 className="font-display text-6xl md:text-9xl uppercase leading-[0.85] tracking-tighter mb-8 italic">
                {settings?.hero_title?.split(" ").slice(0, -2).join(" ") ?? "Engineered To The"}<br />
                <span className="text-primary">{settings?.hero_title?.split(" ").slice(-2).join(" ") ?? "Last Nm."}</span>
              </h1>
              <p className="max-w-md text-muted-foreground text-sm leading-relaxed mb-10">
                {settings?.hero_subtitle}
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link to="/book" className="px-8 py-4 bg-white text-background font-bold uppercase text-xs tracking-widest flex items-center gap-4 group hover:bg-primary transition-colors">
                  Start Repair Order
                  <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/track" className="px-8 py-4 border border-border font-bold uppercase text-xs tracking-widest hover:border-primary transition-colors">
                  Track Repair
                </Link>
              </div>
            </div>
            <div className="md:col-span-4 animate-slide-up" style={{ animationDelay: "150ms" }}>
              <div className="metallic-surface border border-border p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] text-muted-foreground uppercase">Workshop Load</span>
                  <span className="text-primary text-[10px]">84%</span>
                </div>
                <div className="h-1 bg-white/5 w-full mb-8 relative">
                  <div className="absolute left-0 top-0 h-full bg-primary" style={{ width: "84%" }} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div><p className="text-[10px] text-muted-foreground uppercase">Active Bays</p><p className="text-xl font-bold">12/14</p></div>
                  <div><p className="text-[10px] text-muted-foreground uppercase">Techs Active</p><p className="text-xl font-bold">08</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-32 px-6 border-t border-border bg-card/30">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <h2 className="font-display text-4xl md:text-5xl uppercase italic">Diagnostic Layers</h2>
            <Link to="/services" className="text-[10px] text-muted-foreground uppercase tracking-widest hover:text-primary">All Protocols →</Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {(services ?? []).slice(0, 6).map((s) => {
              const Icon = ICONS[s.icon ?? "cog"] ?? Cog;
              return (
                <div key={s.id} className="bg-background p-10 hover:bg-card transition-colors group">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-primary text-[10px] font-bold">{s.code}</p>
                    <Icon className="size-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-display text-2xl uppercase mb-4 group-hover:text-primary transition-colors">{s.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-8">{s.description}</p>
                  <p className="font-bold text-sm italic">From ₹{Number(s.price).toLocaleString("en-IN")}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-border py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {stats.map((s, i) => (
            <div key={i}>
              <p className="text-primary font-display text-5xl mb-2 italic">{s.value}</p>
              <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PROMOTIONS */}
      {promos && promos.length > 0 && (
        <section className="py-20 px-6 border-b border-border">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-6">
            {promos.map((p) => (
              <div key={p.id} className="metallic-surface border border-border p-8">
                <span className="inline-block bg-primary text-primary-foreground text-[10px] font-bold px-2 py-1 uppercase tracking-widest mb-4">{p.badge}</span>
                <h3 className="font-display text-3xl uppercase italic mb-3">{p.title}</h3>
                <p className="text-muted-foreground text-sm">{p.body}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIAL */}
      {testimonials && testimonials[0] && (
        <section className="py-32 px-6 bg-card">
          <div className="max-w-4xl mx-auto text-center">
            <p className="font-display text-3xl md:text-5xl uppercase italic mb-8 leading-tight text-center">
              "{testimonials[0].quote}"
            </p>
            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
              {testimonials[0].name}{testimonials[0].vehicle ? ` — ${testimonials[0].vehicle}` : ''}
            </p>
          </div>
        </section>
      )}

      {/* FOOTER */}
      <footer className="pt-24 pb-12 px-6 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 mb-20">
            <div>
              <h2 className="font-display text-5xl md:text-6xl uppercase italic mb-8">Visit the <span className="text-primary">Clinic.</span></h2>
              <div className="space-y-6 text-sm">
                <div>
                  <p className="text-muted-foreground uppercase text-[10px] font-bold mb-1">Location</p>
                  <p>{settings?.address}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase text-[10px] font-bold mb-1">Technical Lead</p>
                  <p>{settings?.owner_name}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase text-[10px] font-bold mb-1">Inquiries</p>
                  <p>{settings?.email} | {settings?.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground uppercase text-[10px] font-bold mb-1">Hours</p>
                  <p>{settings?.working_hours}</p>
                </div>
              </div>
            </div>
            {settings?.map_embed_url && (
              <div className="metallic-surface p-1">
                <iframe src={settings.map_embed_url} className="w-full aspect-video grayscale opacity-80" loading="lazy" />
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-12 border-t border-border">
            <p className="text-[10px] text-muted-foreground uppercase">© {new Date().getFullYear()} {settings?.shop_name}. All Systems Nominal.</p>
            <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest">
              <Link to="/about" className="hover:text-primary">Workshop</Link>
              <Link to="/services" className="hover:text-primary">Protocols</Link>
              <Link to="/contact" className="hover:text-primary">Contact</Link>
              <Link to="/admin" className="text-muted-foreground hover:text-primary hover:underline transition-all border border-muted-foreground/30 px-2 py-0.5 rounded">Go to Admin</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* WHATSAPP FLOAT */}
      <a
        href={`https://wa.me/${(settings?.whatsapp ?? "").replace(/\D/g, "")}`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95"
        aria-label="WhatsApp"
      >
        <MessageCircle className="size-6" />
      </a>
    </div>
  );
}
