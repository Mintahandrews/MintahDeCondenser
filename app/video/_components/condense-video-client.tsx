"use client";

/**
 * Client Component wrapper that lazy-loads CondenseVideo with SSR disabled.
 * Next.js 15 requires `ssr: false` to live in a Client Component, not a
 * Server Component — so this thin wrapper satisfies that requirement.
 */
import dynamic from "next/dynamic";

const CondenseVideo = dynamic(
  () => import("./condense-video"),
  { ssr: false }
);

export default function CondenseVideoClient() {
  return <CondenseVideo />;
}
