import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { eq, ilike, or, sql, asc } from "drizzle-orm";

export type TicketSearchResultsType = Awaited<
  ReturnType<typeof getTicketSearchResults>
>;

export async function getTicketSearchResults(searchtext: string) {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchtext}%`),
        ilike(tickets.tech, `%${searchtext}%`),
        ilike(customers.email, `%${searchtext}%`),
        ilike(customers.phone, `%${searchtext}%`),
        ilike(customers.city, `%${searchtext}%`),
        ilike(customers.region, `%${searchtext}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${searchtext.toLocaleLowerCase().replace(" ", "%")}%`}`,
      ),
    )
    .orderBy(asc(tickets.createdAt));
  return results;
}
