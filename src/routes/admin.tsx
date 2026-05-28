import { createFileRoute } from "@tanstack/react-router";
import { Stub } from "@/components/Stub";

export const Route = createFileRoute("/admin")({
  component: () => <Stub title="Admin Panel" />,
});
