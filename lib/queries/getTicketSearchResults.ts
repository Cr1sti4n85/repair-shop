import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { eq, ilike, or } from "drizzle-orm";

export async function getTicketSearchResults(searchtext: string) {
  const results = await db
    .select({
      ticketData: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .where(
      or(
        ilike(tickets.title, `%${searchtext}%`),
        ilike(tickets.description, `%${searchtext}%`),
        ilike(tickets.tech, `%${searchtext}%`),
        ilike(customers.firstName, `%${searchtext}%`),
        ilike(customers.lastName, `%${searchtext}%`),
        ilike(customers.email, `%${searchtext}%`),
        ilike(customers.phone, `%${searchtext}%`),
        ilike(customers.address1, `%${searchtext}%`),
        ilike(customers.address2, `%${searchtext}%`),
        ilike(customers.city, `%${searchtext}%`),
        ilike(customers.region, `%${searchtext}%`),
      ),
    );
  return results;
}
