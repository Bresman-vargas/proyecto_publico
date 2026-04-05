import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

import { useAuth } from "../context/AuthContext";

const ProtectedPage: React.FC = ({ component: Component, ...rest }: any) => {
  const { logout } = useAuth();
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Hola</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <p>HOLA</p>
        <IonButton onClick={() => logout()}>Cerrar sesión</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default ProtectedPage;
