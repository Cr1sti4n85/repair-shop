import { db } from "@/db";
import { customers } from "@/db/schema";
import { ilike, or } from "drizzle-orm";

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
        ilike(customers.address1, `%${searchtext}%`),
        ilike(customers.address2, `%${searchtext}%`),
        ilike(customers.city, `%${searchtext}%`),
        ilike(customers.region, `%${searchtext}%`),
        ilike(customers.notes, `%${searchtext}%`),
      ),
    );
  return results;
}
