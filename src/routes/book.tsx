import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "@/components/Stub";

export const Route = createFileRoute("/book")({
  component: () => <Stub title="Book a Service" />,
});
