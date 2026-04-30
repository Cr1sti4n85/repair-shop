import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "../ui/field";

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  label: string;
  className?: string;
  disabled?: boolean;
  message?: string;
};

const CheckBoxInput = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  fieldState,
  label,
  className,
  message,
  disabled = false,
}: Props<TFieldValues, TName>) => {
  return (
    <FieldSet className="w-full flex items-center gap-2">
      <FieldLegend variant="label" className="text-base w-1/3 mt-2">
        {label}
      </FieldLegend>
      <FieldGroup data-slot="checkbox-group">
        <Field orientation="horizontal">
          <Checkbox
            id="form-checkbox"
            name={field.name}
            checked={field.value}
            onCheckedChange={field.onChange}
            disabled={disabled}
          />
          <FieldLabel htmlFor="form-checkbox" className="font-normal">
            {message}
          </FieldLabel>
        </Field>
      </FieldGroup>
      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
    </FieldSet>
  );
};

export default CheckBoxInput;
