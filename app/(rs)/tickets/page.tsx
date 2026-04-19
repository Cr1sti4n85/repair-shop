import TicketSearch from "./TicketSearch";
import { getOpenTickets } from "@/lib/queries/getOpenTickets";
import { getTicketSearchResults } from "@/lib/queries/getTicketSearchResults";
import TicketTable from "./TicketTable";

export const metadata = {
  title: "Buscar ticket",
};

const Tickets = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { searchText } = await searchParams;
  if (!searchText) {
    const results = await getOpenTickets();
    return (
      <>
        <TicketSearch />
        {results.length ? <TicketTable data={results} /> : null}
      </>
    );
  }
  const results = await getTicketSearchResults(searchText);
  return (
    <>
      <TicketSearch />
      {results.length ? <TicketTable data={results} /> : null}
    </>
  );
};

export default Tickets;
