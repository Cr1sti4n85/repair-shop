import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";
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

  const results = await getCustomerSearchResults(searchText);
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
