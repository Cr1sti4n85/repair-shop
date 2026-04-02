"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <div>
      <h2>Ocurrió un problema!</h2>
      <button onClick={() => unstable_retry()}>Inténtalo nuevamente</button>
    </div>
  );
}
