"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v4";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { insertTicketSchema } from "@/zod-schemas/ticket";
import { FieldGroup } from "@/components/ui/field";
import InputField from "@/components/inputs/InputField";
import TextArea from "@/components/inputs/TextArea";
import { Button } from "@/components/ui/button";
import CheckBoxInput from "@/components/inputs/CheckBoxInput";
import { insertCustomerSchema } from "@/zod-schemas/customer";
import SelectInputField from "@/components/inputs/SelectInputField";
import { saveTicketAction } from "@/app/actions/saveTicketAction";
import DisplayServerActionResponse from "@/components/DisplayServerActionResponse";

type Props = {
  ticket?: z.infer<typeof insertTicketSchema>;
  customer: z.infer<typeof insertCustomerSchema>;
  techs?: {
    id: string;
    description: string;
  }[];
  isEditable?: boolean;
  isManager?: boolean | undefined;
};

const TicketForm = ({
  customer,
  ticket,
  techs,
  isEditable = true,
  isManager = false,
}: Props) => {
  const defaultValues: z.infer<typeof insertTicketSchema> = {
    id: ticket?.id ?? "(Nuevo)",
    customerId: ticket?.customerId ?? customer.id,
    title: ticket?.title ?? "",
    description: ticket?.description ?? "",
    completed: ticket?.completed ?? false,
    tech: ticket?.tech.toLowerCase() ?? "new-ticket@example.com",
  };

  const form = useForm<z.infer<typeof insertTicketSchema>>({
    mode: "onBlur",
    resolver: zodResolver(insertTicketSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isPending: isSaving,
    reset: resetSaveAction,
  } = useAction(saveTicketAction, {
    onSuccess({ data }) {
      if (data?.message) {
        toast("Operación exitosa", {
          classNames: {
            toast: "!bg-black/90",
            title: "!text-white !font-bold text-lg",
            description: "!text-white text-sm",
          },
          description: data?.message,
          duration: 5000,
        });
      }
    },
    onError({ error }) {
      toast("Error", {
        classNames: {
          toast: "!bg-red-700",
          title: "!text-black !font-bold text-lg",
          description: "!text-black text-sm",
        },
        description: "No se pudo guardar",
        duration: 5000,
      });
    },
  });

  async function submitForm(data: z.infer<typeof insertTicketSchema>) {
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          {ticket?.id && isEditable
            ? `Editar ticket #${ticket.id}`
            : ticket?.id
              ? `Ver ticket #${ticket.id}`
              : "Nuevo ticket"}
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
                disabled={!isEditable}
              />
            )}
          />
          {isManager && techs ? (
            <Controller
              name="tech"
              control={form.control}
              render={({ field, fieldState }) => (
                <SelectInputField
                  field={field}
                  fieldState={fieldState}
                  label="Asignar ticket"
                  dataArray={[
                    {
                      id: "new-ticket@example.com",
                      description: "new-ticket@example.com",
                    },
                    ...techs,
                  ]}
                />
              )}
            />
          ) : (
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
          )}

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
                disabled={!isEditable}
              />
            )}
          />

          {ticket?.id ? (
            <Controller
              name="completed"
              control={form.control}
              render={({ field, fieldState }) => (
                <CheckBoxInput
                  field={field}
                  fieldState={fieldState}
                  label="Estado"
                  message="¿Ticket completado?"
                  disabled={!isEditable}
                />
              )}
            />
          ) : null}
          {isEditable ? (
            <div className="flex gap-2">
              <Button
                type="submit"
                className="w-3/4"
                variant="default"
                title="Guardar"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Guardando
                  </>
                ) : (
                  "Guardar"
                )}
              </Button>
              <Button
                type="button"
                variant="destructive"
                title="Reset"
                onClick={() => {
                  form.reset(defaultValues);
                  resetSaveAction();
                }}
              >
                Limpiar
              </Button>
            </div>
          ) : null}
        </FieldGroup>
      </form>
    </div>
  );
};

export default TicketForm;
