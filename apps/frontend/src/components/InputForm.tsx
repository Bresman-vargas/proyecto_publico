import { IonItem, IonLabel, IonInput, IonText } from "@ionic/react";
import { FieldErrors, Controller } from "react-hook-form";

interface Props {
  name: string;
  label: string;
  placeholder?: string;
  control: any;
  errors: FieldErrors;
  type?: "text" | "number" | "password";
  required?: boolean;
}

const InputForm: React.FC<Props> = ({
  name,
  label,
  placeholder = "",
  control,
  errors,
  type = "text",
  required = false,
}) => {
  return (
    <>
      <IonItem>
        <IonLabel position="stacked">
          {label}
          {required && (
            <span
              style={{
                color: "var(--ion-color-danger, #eb445a)",
                marginLeft: "4px",
              }}
            >
              *
            </span>
          )}
        </IonLabel>
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <IonInput
              {...field}
              type={type}
              onIonInput={(e) => field.onChange(e.detail.value)}
              placeholder={placeholder}
            />
          )}
        />
      </IonItem>
      <div style={{ height: "10px" }}>
        {errors[name] && (
          <IonText color="danger" className="ion-padding-start">
            <small>{errors[name]?.message as string}</small>
          </IonText>
        )}
      </div>
    </>
  );
};

export default InputForm;
