"use client";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod/v4";
import { useAction } from "next-safe-action/hooks";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { saveCustomerAction } from "@/app/actions/saveCustomerAction";
import { FieldGroup } from "@/components/ui/field";
import { Button } from "@/components/ui/button";
import InputField from "@/components/inputs/InputField";
import TextArea from "@/components/inputs/TextArea";
import SelectInputField from "@/components/inputs/SelectInputField";
import CheckBoxInput from "@/components/inputs/CheckBoxInput";
import DisplayServerActionResponse from "@/components/DisplayServerActionResponse";
import { insertCustomerSchema } from "@/zod-schemas/customer";
import { regionsArray } from "@/constants/regionsArray";

type Props = {
  customer?: z.infer<typeof insertCustomerSchema>;
};

const CustomerForm = ({ customer }: Props) => {
  const { getPermission, isLoading } = useKindeBrowserClient();
  const isManager = !isLoading && getPermission("manager")?.isGranted;

  const defaultValues: z.infer<typeof insertCustomerSchema> = {
    id: customer?.id ?? 0,
    firstName: customer?.firstName ?? "",
    lastName: customer?.lastName ?? "",
    email: customer?.email ?? "",
    phone: customer?.phone ?? "",
    address1: customer?.address1 ?? "",
    address2: customer?.address2 ?? "",
    city: customer?.city ?? "",
    region: customer?.region ?? "",
    notes: customer?.notes ?? "",
    active: customer?.active ?? true,
  };

  const form = useForm<z.infer<typeof insertCustomerSchema>>({
    mode: "onBlur",
    resolver: zodResolver(insertCustomerSchema),
    defaultValues,
  });

  const {
    execute: executeSave,
    result: saveResult,
    isExecuting: isSaving,
    reset: resetSaveAction,
  } = useAction(saveCustomerAction, {
    onSuccess({ data }) {
      toast("Operación exitosa", {
        classNames: {
          toast: "!bg-black/90",
          title: "!text-white !font-bold text-lg",
          description: "!text-white text-sm",
        },
        description: data?.message,
        duration: 5000,
      });
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

  async function submitForm(data: z.infer<typeof insertCustomerSchema>) {
    executeSave(data);
  }

  return (
    <div className="flex flex-col gap-1 sm:px-8">
      <DisplayServerActionResponse result={saveResult} />
      <div>
        <h2 className="text-2xl font-bold">
          Formulario para {customer?.id ? "editar" : "nuevo"} cliente{" "}
          {customer?.id && `#${customer.id}`}
        </h2>
      </div>

      <form
        id="form-customer"
        onSubmit={form.handleSubmit(submitForm)}
        className="flex flex-col md:flex-row gap-4 md:gap-8"
      >
        <FieldGroup className="flex flex-col gap-4 w-full max-w-xs">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Nombre"
                placeholder="Ingresa el nombre"
              />
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Apellido"
                placeholder="Ingresa el apellido"
              />
            )}
          />
          <Controller
            name="address1"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Dirección"
                placeholder="Ingresa  dirección"
              />
            )}
          />
          <Controller
            name="address2"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Dirección 2"
                placeholder="Ingresa direccón 2"
              />
            )}
          />
          <Controller
            name="city"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Ciudad"
                placeholder="Ingresa ciudad"
              />
            )}
          />
          <Controller
            name="region"
            control={form.control}
            render={({ field, fieldState }) => (
              <SelectInputField
                field={field}
                fieldState={fieldState}
                label="Región"
                dataArray={regionsArray}
              />
            )}
          />
        </FieldGroup>
        <FieldGroup className="flex flex-col gap-4 w-full max-w-xs">
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Email"
                placeholder="Ingresa email"
              />
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <InputField
                field={field}
                fieldState={fieldState}
                label="Teléfono"
                placeholder="Ingresa número de contacto"
              />
            )}
          />
          <Controller
            name="notes"
            control={form.control}
            render={({ field, fieldState }) => (
              <TextArea
                field={field}
                fieldState={fieldState}
                label="Notas"
                className="h-40"
              />
            )}
          />
          {isLoading ? (
            <p>Loading...</p>
          ) : isManager && customer?.id ? (
            <Controller
              name="active"
              control={form.control}
              render={({ field, fieldState }) => (
                <CheckBoxInput
                  field={field}
                  fieldState={fieldState}
                  label="Estado"
                  message="¿Usuario activo?"
                />
              )}
            />
          ) : null}

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
        </FieldGroup>
      </form>
    </div>
  );
};

export default CustomerForm;
