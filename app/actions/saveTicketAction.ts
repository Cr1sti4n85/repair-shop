"use server";
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import { insertTicketSchema } from "@/zod-schemas/ticket";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import z from "zod/v4";

export const saveTicketAction = actionClient
  .metadata({
    actionName: "saveTicketAction",
  })
  .inputSchema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: z.infer<typeof insertTicketSchema>;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();
      if (!isAuth) redirect("/login");

      if (ticket.id === "(Nuevo)") {
        const result = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            description: ticket.description,
            tech: ticket.tech,
          })
          .returning({ insertedId: tickets.id });

        return {
          message: `Ticket con ID #${result[0].insertedId} creado exitosamente`,
        };
      }

      const result = await db
        .update(tickets)
        .set({
          customerId: ticket.customerId,
          title: ticket.title,
          description: ticket.description,
          tech: ticket.tech,
          completed: ticket.completed,
        })
        .where(eq(tickets.id, ticket.id))
        .returning({ updatedId: tickets.id });

      return {
        message: `Ticket con ID #${result[0].updatedId} actualizado exitosamente`,
      };
    },
  );
