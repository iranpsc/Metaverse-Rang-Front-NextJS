"use client";

import CustomErrorPage from "@/components/error/CustomErrorPage";

export default function Error({ error }: { error: Error & { digest?: string } }) {
  const serializedError = {
    message: error?.message ?? "Unknown error",
    stack: error?.stack ?? null,
    name: error?.name ?? "Error",
  };
  return <CustomErrorPage error={serializedError} />;
}
