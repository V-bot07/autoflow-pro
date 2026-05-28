import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "@/components/Stub";

export const Route = createFileRoute("/contact")({
  component: () => <Stub title="Contact" />,
});
