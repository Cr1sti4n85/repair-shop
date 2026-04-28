import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { NeonDbError } from "@neondatabase/serverless";

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(error, utils) {
    const { clientInput, metadata } = utils;
    if (error.constructor.name === "DrizzleQueryError") {
      const { code, detail } = error.cause as NeonDbError;
      if (code === "23505") {
        return `Entrada duplicada: ${detail}`;
      }
    }
    Sentry.captureException(error, (scope) => {
      scope.clear();
      scope.setContext("serverError", { message: error.message });
      scope.setContext("metadata", { actionName: metadata?.actionName });
      scope.setContext("clientInput", { clientInput });
      return scope;
    });
    if (
      error.constructor.name === "DrizzleQueryError" ||
      error.constructor.name === "NeonDbError"
    ) {
      return "Database error: Los datos no se guardaron. Se notificará a soporte.";
    }
    return error.message;
  },
});
