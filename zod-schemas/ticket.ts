import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { tickets } from "@/db/schema";
import { z } from "zod/v4";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("(Nuevo)")]),
  title: (schema) => schema.min(1, "El título es obligatorio"),
  description: (schema) => schema.min(1, "La descripción es obligatoria"),
  tech: z.email("Correo electrónico no válido"),
});

export const selectTicketSchema = createSelectSchema(tickets);
