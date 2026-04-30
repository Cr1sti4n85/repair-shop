"use server";
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { customers } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertCustomerSchema } from "@/zod-schemas/customer";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import z from "zod/v4";

export const saveCustomerAction = actionClient
  .metadata({
    actionName: "saveCustomerAction",
  })
  .inputSchema(insertCustomerSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: customer,
    }: {
      parsedInput: z.infer<typeof insertCustomerSchema>;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();
      if (!isAuth) redirect("/login");

      if (customer.id === 0) {
        const result = await db
          .insert(customers)
          .values({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email.toLowerCase(),
            phone: customer.phone,
            address1: customer.address1,
            ...(customer.address2?.trim()
              ? { address2: customer.address2 }
              : { address2: "" }),
            city: customer.city,
            region: customer.region,
            ...(customer.notes?.trim()
              ? { notes: customer.notes }
              : { notes: "" }),
          })
          .returning({ insertedId: customers.id });

        return {
          message: `cliente con ID #${result[0].insertedId} creado exitosamente`,
        };
      }

      //existing customer
      const result = await db
        .update(customers)
        .set({
          firstName: customer.firstName,
          lastName: customer.lastName,
          email: customer.email.toLowerCase(),
          phone: customer.phone,
          address1: customer.address1,
          address2: customer.address2?.trim() ?? null,
          city: customer.city,
          region: customer.region,
          notes: customer.notes?.trim() ?? null,
        })
        .where(eq(customers.id, customer.id))
        .returning({ updatedId: customers.id });

      return {
        message: `Cliente con ID #${result[0].updatedId} actualizado exitosamente`,
      };
    },
  );
