import { Link } from "@tanstack/react-router";
import { ArrowRight, Gauge } from "lucide-react";

const navItems = [
  { to: "/services", label: "Services" },
  { to: "/track", label: "Track" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3">
          <div className="grid size-10 -skew-x-12 place-items-center bg-primary">
            <span className="skew-x-12 font-display text-xl text-primary-foreground">S</span>
          </div>
          <div className="leading-none">
            <p className="font-display text-2xl uppercase">Shubham Auto</p>
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Malay Parikh Performance</p>
          </div>
        </Link>
        <div className="hidden items-center gap-8 text-xs font-bold uppercase tracking-widest md:flex">
          {navItems.map((item) => (
            <Link key={item.to} to={item.to} className="hover:text-primary" activeProps={{ className: "text-primary" }}>
              {item.label}
            </Link>
          ))}
          <Link to="/book" className="bg-primary px-6 py-2.5 text-primary-foreground hover:bg-foreground">
            Book Service
          </Link>
          <Link to="/admin" className="text-muted-foreground hover:text-primary">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export function PageShell({ eyebrow, title, children, cta }: { eyebrow: string; title: string; children: React.ReactNode; cta?: { to: string; label: string } }) {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden border-b border-border px-6 py-20">
          <div className="gauge-line absolute inset-0 opacity-20" />
          <div className="relative mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-5 inline-flex items-center gap-2 border border-primary/30 bg-primary/5 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">
                <Gauge className="size-3" /> {eyebrow}
              </p>
              <h1 className="font-display text-5xl uppercase italic leading-none md:text-8xl">{title}</h1>
            </div>
            {cta && (
              <Link to={cta.to} className="inline-flex w-fit items-center gap-3 bg-primary px-6 py-4 text-xs font-bold uppercase tracking-widest text-primary-foreground hover:bg-foreground">
                {cta.label}<ArrowRight className="size-4" />
              </Link>
            )}
          </div>
        </section>
        {children}
      </main>
    </div>
  );
}