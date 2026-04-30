import BackButton from "@/components/BackButton";
import { getCustomer } from "@/lib/queries/getCustomer";
import * as Sentry from "@sentry/nextjs";
import CustomerForm from "./_components/CustomerForm";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const { customerId } = await searchParams;

  if (!customerId) return { title: "Nuevo cliente" };
  return { title: `Editar cliente #${customerId}` };
}

const CustomerFormPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const { customerId } = await searchParams;
  let customer = null;
  let isManager: boolean | undefined = false;

  if (customerId) {
    try {
      const { getPermission } = getKindeServerSession();
      const managerPermission = await getPermission("manager");
      isManager = managerPermission?.isGranted;

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

    return <CustomerForm customer={customer} isManager={isManager} />;
  }

  return <CustomerForm isManager={isManager} />;
};

export default CustomerFormPage;
