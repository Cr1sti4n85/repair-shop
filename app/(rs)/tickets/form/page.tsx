import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import { getTicket } from "@/lib/queries/getTicket";
import * as Sentry from "@sentry/nextjs";
import TicketForm from "./_components/TicketForm";

const TicketFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { customerId, ticketId } = await searchParams;
  let customer = null;
  let ticket = null;
  let customerWithTicket = null;

  try {
    if (customerId) {
      customer = await getCustomer(parseInt(customerId));
    }
    if (ticketId) {
      ticket = await getTicket(parseInt(ticketId));
      if (ticket) {
        customerWithTicket = await getCustomer(ticket.customerId);
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      Sentry.captureException(err);
      throw err;
    }
  }

  if (!customerId && !ticketId) {
    return (
      <>
        <h2 className="text-2xl mb-2">
          Se necesita ID de cliente o ID de ticket para cargar el formulario
        </h2>
        <BackButton title="Volver" variant={"default"} />
      </>
    );
  }

  //New ticket form
  if (customerId) {
    if (!customer) {
      return (
        <>
          <h2 className="text-2xl mb-2">Cliente #{customerId} no encontrado</h2>
          <BackButton title="Volver" variant={"default"} />
        </>
      );
    }
    if (!customer.active) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            El cliente #{customerId} no está activo
          </h2>
          <BackButton title="Volver" variant={"default"} />
        </>
      );
    }
    return <TicketForm customer={customer} />;
  }

  //Edit ticket
  if (ticketId) {
    if (!ticket || !customerWithTicket) {
      return (
        <>
          <h2 className="text-2xl mb-2">Ticket #{ticketId} no encontrado</h2>
          <BackButton title="Volver" variant={"default"} />
        </>
      );
    }
    return <TicketForm customer={customerWithTicket} ticket={ticket} />;
  }
};

export default TicketFormPage;
