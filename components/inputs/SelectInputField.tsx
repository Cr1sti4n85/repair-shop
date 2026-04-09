import React from "react";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "../ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

type DataObj = {
  id: string;
  description: string;
};

type Props<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  label: string;
  dataArray: DataObj[];
  className?: string;
  placeholder?: string;
};

const SelectInputField = <
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  field,
  fieldState,
  dataArray,
  label,
  className,
  placeholder,
}: Props<TFieldValues, TName>) => {
  return (
    <Field orientation="responsive" data-invalid={fieldState.invalid}>
      <FieldContent>
        <FieldLabel htmlFor="form-select-region">{label}</FieldLabel>
        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
      </FieldContent>
      <Select
        name={field.name}
        value={field.value}
        onValueChange={field.onChange}
      >
        <SelectTrigger
          id="form-select-region"
          aria-invalid={fieldState.invalid}
          className={`w-full max-w-xs ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="auto">Auto</SelectItem>
          {dataArray.map((item) => (
            <SelectItem key={`${item.id}`} value={item.description}>
              {item.description}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Field>
  );
};

export default SelectInputField;
