import CustomerSearch from "./CustomerSearch";
import { getCustomerSearchResults } from "@/lib/queries/getCustomerSearchResults";

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
  //  query db
  const results = await getCustomerSearchResults(searchText);
  console.log(results);
  return (
    <>
      <CustomerSearch />
      <p>{JSON.stringify(results)}</p>
    </>
  );
};

export default Customers;
