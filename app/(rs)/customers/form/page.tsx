import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "./_components/CustomerForm";

const CustomerFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { customerId } = await searchParams;
  let customer = null;

  if (customerId) {
    try {
      customer = await getCustomer(parseInt(customerId));
    } catch (err) {
      if (err instanceof Error) {
        Sentry.captureException(err);
        throw err;
      }
    }
  }

  if (customerId) {
    if (!customer) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            ID de cliente {customerId} no encontrado
          </h2>
          <BackButton title="Volver" variant={"default"} />
        </>
      );
    }

    return <CustomerForm customer={customer} />;
  }

  return <CustomerForm />;
};

export default CustomerFormPage;
