import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "@/components/Stub";

export const Route = createFileRoute("/services")({
  component: () => <Stub title="Services Catalog" />,
});
