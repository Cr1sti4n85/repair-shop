import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Field, FieldDescription, FieldError, FieldLabel } from "../ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "../ui/input-group";

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

const TextArea = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  fieldState,
  label,
  className,
  placeholder,
  disabled = false,
}: Props<TFieldValues, TName>) => {
  return (
    <Field data-invalid={fieldState.invalid}>
      <FieldLabel htmlFor="form-text">{label}</FieldLabel>
      <InputGroup>
        <InputGroupTextarea
          {...field}
          id="form-text"
          placeholder={placeholder}
          rows={10}
          className={`disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
          aria-invalid={fieldState.invalid}
          disabled={disabled}
        />
        <InputGroupAddon align="block-end"></InputGroupAddon>
      </InputGroup>
      <FieldDescription>Incluye información relevante</FieldDescription>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </Field>
  );
};

export default TextArea;
