import React from "react";
import {
  IonContent,
  IonItem,
  IonLabel,
  IonButton,
  IonButtons,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonCheckbox,
  IonCard,
  IonListHeader,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonBackButton,
  IonIcon,
  IonPage,
} from "@ionic/react";
//form
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "@proyecto_publico/schemas";
import InputForm from "../../components/InputForm";

//usado para el auth
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useIonRouter } from '@ionic/react';

//en general
import { personAddOutline } from "ionicons/icons";

const Register: React.FC = () => {

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      nombre: "",
      nombre2: "",
      apellido_paterno: "",
      apellido_materno: "",
      rut_cuerpo: undefined,
      rut_dv: "",
      email: "",
      id_region: 5,
      id_comuna: 65,
      acepta_terminos: false,
      password: "",
    },
  });
  const { registar , isAuthenticated} = useAuth();
  const router = useIonRouter();

  useEffect(() => {
    if (isAuthenticated) router.push('/prote', 'forward', 'replace')
  }, [isAuthenticated])

  const onSubmit = async (data: any) => {
    await registar(data);
  };

  return (
    <IonPage>
      <IonContent>
        <IonHeader>
          <IonToolbar>
            <div className="toolbar-center-container">
              <IonButtons slot="start">
                <IonBackButton default-href="#"></IonBackButton>
              </IonButtons>
              <IonTitle>Crear una cuenta</IonTitle>
            </div>
          </IonToolbar>
        </IonHeader>
        <div className="center">
          <IonCard>
            <form onSubmit={handleSubmit(onSubmit)}>
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    <IonListHeader>
                      <IonLabel color="primary">
                        <h2>Información Personal</h2>
                      </IonLabel>
                    </IonListHeader>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <InputForm
                      name="nombre"
                      label="Primer nombre"
                      placeholder="Bresman"
                      control={control}
                      errors={errors}
                      required={true}
                    ></InputForm>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <InputForm
                      name="nombre2"
                      label="Segundo nombre"
                      placeholder="Opcional"
                      control={control}
                      errors={errors}
                    ></InputForm>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <InputForm
                      name="apellido_paterno"
                      label="Apellido paterno"
                      placeholder="Garzón"
                      control={control}
                      errors={errors}
                      required={true}
                    ></InputForm>
                  </IonCol>
                  <IonCol>
                    <InputForm
                      name="apellido_materno"
                      label="Apellido materno"
                      placeholder="Opcional"
                      control={control}
                      errors={errors}
                    ></InputForm>
                  </IonCol>
                </IonRow>

                <IonRow className="ion-margin-top">
                  <IonCol size="12">
                    <IonListHeader>
                      <IonLabel color="primary">
                        <h2>Contacto y Seguridad</h2>
                      </IonLabel>
                    </IonListHeader>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="8" sizeMd="4">
                    <InputForm
                      name="rut_cuerpo"
                      label="Rut (sin puntos)"
                      placeholder="12345678"
                      control={control}
                      errors={errors}
                      type="number"
                      required={true}
                    ></InputForm>
                  </IonCol>
                  <IonCol size="4" sizeMd="2">
                    <InputForm
                      name="rut_dv"
                      label="DV"
                      placeholder="K"
                      control={control}
                      errors={errors}
                      required={true}
                    ></InputForm>
                  </IonCol>
                  <IonCol size="12" sizeMd="6">
                    <InputForm
                      name="email"
                      label="Email"
                      placeholder="prueba@prueba.com"
                      control={control}
                      errors={errors}
                      required={true}
                    ></InputForm>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12" sizeMd="6">
                    <InputForm
                      name="password"
                      label="Contraseña"
                      placeholder="********"
                      control={control}
                      errors={errors}
                      type="password"
                      required={true}
                    ></InputForm>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol offsetMd="6" size="12" sizeMd="6">
                    <IonItem lines="none" className="ion-margin-top">
                      <Controller
                        control={control}
                        name="acepta_terminos"
                        render={({ field }) => (
                          <IonCheckbox
                            checked={field.value}
                            onIonChange={(e) =>
                              field.onChange(e.detail.checked)
                            }
                          >
                            <IonLabel className="ion-text-end">
                              Acepto los términos y condiciones
                            </IonLabel>
                          </IonCheckbox>
                        )}
                      />
                    </IonItem>
                    {errors.acepta_terminos && (
                      <div className="ion-padding-start">
                        <IonText color="danger">
                          <small>
                            {errors.acepta_terminos.message as string}
                          </small>
                        </IonText>
                      </div>
                    )}
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol offsetMd="8" size="12" sizeMd="4">
                    <IonButton
                      expand="block"
                      type="submit"
                      className="ion-margin-top"
                    >
                      <IonIcon slot="start" icon={personAddOutline}></IonIcon>
                      Finalizar Registro
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </form>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
