import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "@/components/Stub";

export const Route = createFileRoute("/track")({
  component: () => <Stub title="Track Your Repair" />,
});
