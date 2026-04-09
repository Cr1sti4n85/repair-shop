import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  label: string;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
};

const InputField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  fieldState,
  label,
  className,
  placeholder,
  disabled,
}: Props<TFieldValues, TName>) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="form-input">{label}</FieldLabel>
      <Input
        {...field}
        id="form-input"
        aria-invalid={fieldState.invalid}
        placeholder={placeholder}
        autoComplete="off"
        className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-green-500 disabled:opacity-75 ${className}`}
        disabled={disabled}
      />
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};

export default InputField;
