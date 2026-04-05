import {
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonCard,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonCol,
  IonTitle,
  IonToolbar,
  IonListHeader,
  IonLabel,
  IonRouterLink,
} from "@ionic/react";

//form
import InputForm from "../../components/InputForm";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@proyecto_publico/schemas";

//auth
import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useIonRouter } from '@ionic/react';

//general
import { lockOpenOutline } from "ionicons/icons";
const Login: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {login, isAuthenticated} = useAuth()
  const router  = useIonRouter()
  
  useEffect(() => {
    if (isAuthenticated) router.push('/prote', 'forward', 'replace')
  }, [isAuthenticated])

  const onSubmit = async (data: any) => {
    await login(data)
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-center-container">
            <IonButtons slot="start">
              <IonBackButton default-href="#"></IonBackButton>
            </IonButtons>
            <IonTitle>Iniciar sesión</IonTitle>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="center">
          <IonCard>
            <form onSubmit={handleSubmit(onSubmit)}>
              <IonGrid>
                <IonRow>
                  <IonCol size="11" sizeMd="9">
                    <IonListHeader className="ion-padding-top">
                      <IonLabel>
                        <h1>¡Bienvenido de nuevo!</h1>
                        <p className="ion-padding-top">
                          ¿No tienes una cuenta?{" "}
                          <IonRouterLink
                            routerLink="/register"
                            style={{
                              fontWeight: "600",
                              textDecoration: "underline",
                              color: "var(--ion-color-primary)",
                            }}
                          >
                            Crea una nueva cuenta
                          </IonRouterLink>
                          , es <strong>GRATIS</strong> y toma menos de 2
                          minutos.
                        </p>
                      </IonLabel>
                    </IonListHeader>
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol size="12">
                    <InputForm
                      name="email"
                      label="Email"
                      placeholder="prueba@prueba.cl"
                      control={control}
                      errors={errors}
                      required={true}
                    />
                  </IonCol>
                  <IonCol size="12">
                    <InputForm
                      name="password"
                      label="Contraseña"
                      placeholder="*******"
                      control={control}
                      errors={errors}
                      required={true}
                    />
                  </IonCol>
                </IonRow>

                <IonRow>
                  <IonCol offsetMd="8" size="12" sizeMd="4">
                    <IonButton
                      expand="block"
                      type="submit"
                      className="ion-margin-top"
                    >
                      <IonIcon slot="start" icon={lockOpenOutline}></IonIcon>
                      Login
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

export default Login;
