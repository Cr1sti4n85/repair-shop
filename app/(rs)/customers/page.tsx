import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
import * as Sentry from "@sentry/nextjs";
import CustomerTable from "./CustomerTable";

export const metadata = {
  title: "Búsqueda de clientes",
};

const Customers = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;
  if (!searchText) {
    return <CustomerSearch />;
  }

  const span = Sentry.startInactiveSpan({
    name: "getCustomerSearchResults-1",
  });
  //  query db
  const results = await getCustomerSearchResults(searchText);
  span.end();
  return (
    <>
      <CustomerSearch />
      {results.length ? (
        <CustomerTable data={results} />
      ) : (
        <p className="mt-4">No hay resultados</p>
      )}
    </>
  );
};

export default Customers;
