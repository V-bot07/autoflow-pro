import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "@/components/Stub";

export const Route = createFileRoute("/about")({
  component: () => <Stub title="About the Clinic" />,
});
