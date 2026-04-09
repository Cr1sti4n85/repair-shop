import { createInsertSchema, createSelectSchema } from "drizzle-zod";

import { customers } from "@/db/schema";
import { z } from "zod/v4";

export const insertCustomerSchema = createInsertSchema(customers, {
  id: z.any(),
  firstName: (schema) => schema.min(1, "El nombre es obligatorio"),
  lastName: (schema) => schema.min(1, "El apellido es obligatorio"),
  email: z.email("Correo electrónico no válido"),
  phone: (schema) => schema.regex(/^\d{9}$/, "Número de teléfono no válido"),
  address1: (schema) => schema.min(1, "Dirección 1 obligatoria"),
  city: (schema) => schema.min(1, "La ciudad es obligatoria"),
  region: (schema) => schema.min(1, "La región es obligatoria"),
  notes: (schema) => schema.min(1, "Escribe alguna descripción adicional"),
});

export const selectCustomerSchema = createSelectSchema(customers);
