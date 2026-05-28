import { createFileRoute, Link } from "@tanstack/react-router";

function Stub({ title }: { title: string }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-primary text-[10px] font-bold uppercase tracking-widest mb-4">Module In Calibration</p>
        <h1 className="font-display text-5xl uppercase italic mb-6">{title}</h1>
        <p className="text-muted-foreground text-sm mb-8">This section is being assembled. Returning to the workshop floor.</p>
        <Link to="/" className="inline-flex bg-primary text-primary-foreground px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white">← Back to Home</Link>
      </div>
    </div>
  );
}

export const ServicesRoute = createFileRoute("/services")({ component: () => <Stub title="Services Catalog" /> });
export const BookRoute = createFileRoute("/book")({ component: () => <Stub title="Book a Service" /> });
export const TrackRoute = createFileRoute("/track")({ component: () => <Stub title="Track Your Repair" /> });
export const AboutRoute = createFileRoute("/about")({ component: () => <Stub title="About the Clinic" /> });
export const ContactRoute = createFileRoute("/contact")({ component: () => <Stub title="Contact" /> });
export const AdminRoute = createFileRoute("/admin")({ component: () => <Stub title="Admin Panel" /> });
