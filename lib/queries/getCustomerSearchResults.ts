import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function getCustomerSearchResults(searchtext: string) {
  const results = await db
    .select()
    .from(customers)
    .where(
      or(
        ilike(customers.firstName, `%${searchtext}%`),
        ilike(customers.lastName, `%${searchtext}%`),
        ilike(customers.email, `%${searchtext}%`),
        ilike(customers.phone, `%${searchtext}%`),
        ilike(customers.city, `%${searchtext}%`),
        sql`lower(concat(${customers.firstName}, ' ', ${customers.lastName})) LIKE ${`%${searchtext.toLocaleLowerCase().replace(" ", "%")}%`}`,
      ),
    );
  return results;
}
