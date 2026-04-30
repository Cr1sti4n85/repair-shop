import Form from "next/form";
import { Input } from "@/components/ui/input";
import SearchButton from "@/components/SearchButton";

const TicketSearch = () => {
  return (
    <Form action={"/tickets"} className="flex gap-2 items-center">
      <Input
        className="w-full"
        name="searchText"
        type="text"
        placeholder="Buscar tickets"
        autoFocus
      />
      <SearchButton />
    </Form>
  );
};

export default TicketSearch;
