"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertTicketSchema } from "@/zod-schemas/ticket";
import z from "zod/v4";
import { FieldGroup } from "@/components/ui/field";

import InputField from "@/components/inputs/InputField";
import TextArea from "@/components/inputs/TextArea";
import { insertCustomerSchema } from "@/zod-schemas/customer";
import { Button } from "@/components/ui/button";
import CheckBoxInput from "@/components/inputs/CheckBoxInput";

type Props = {
  ticket?: z.infer<typeof insertTicketSchema>;
  customer: z.infer<typeof insertCustomerSchema>;
};

const TicketForm = ({ customer, ticket }: Props) => {
  const defaultValues: z.infer<typeof insertTicketSchema> = {
    id: ticket?.id ?? "(Nuevo)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech ?? "new-ticket@example.com",
  };

  const form = useForm<z.infer<typeof insertTicketSchema>>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  async function submitForm(data: z.infer<typeof insertTicketSchema>) {
    console.log({ data });
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id ? "Editar" : "Nuevo"} Formulario de ticket{" "}
          {ticket?.id && `#${ticket.id}`}
        </h2>
      </div>

      <form
        id="form-tickets"
        onSubmit={form.handleSubmit(submitForm)}
        className="flex flex-col md:flex-row gap-4 md:gap-8"
      >
        <FieldGroup className="flex flex-col gap-4 w-full max-w-xs">
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Título"
                placeholder="Ingresa el título"
              />
            )}
          />
          <Controller
            name="tech"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Asignado a"
                placeholder="Ingresa email de personal asignado"
                disabled={true}
              />
            )}
          />
          <div className="mt-4 space-y-2">
            <h3 className="text-lg">Información del cliente</h3>
            <hr className="w-4/5" />
            <p>
              {customer.firstName} {customer.lastName}
            </p>
            <p>{customer.address1}</p>
            {customer.address2 && <p>{customer.address2}</p>}
            <p>
              {customer.city}, {customer.region}
            </p>
            <hr className="w-4/5" />
            <p>Email: {customer.email}</p>
            <p>Teléfono: {customer.phone}</p>
          </div>
        </FieldGroup>

        <FieldGroup className="flex flex-col gap-4 w-full max-w-xs">
          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextArea
                field={field}
                fieldState={fieldState}
                label="Descripción"
                className="h-96"
              />
            )}
          />

          <Controller
            name="completed"
            control={form.control}
            render={({ field, fieldState }) => (
              <CheckBoxInput
                field={field}
                fieldState={fieldState}
                label="Estado"
                message="Ticket completado"
              />
            )}
          />

          <div className="flex gap-2">
            <Button
              type="submit"
              className="w-3/4"
              variant="default"
              title="Guardar"
            >
              Guardar
            </Button>
            <Button
              type="button"
              variant="destructive"
              title="Reset"
              onClick={() => form.reset(defaultValues)}
            >
              Limpiar
            </Button>
          </div>
        </FieldGroup>
      </form>
    </div>
  );
};

export default TicketForm;
