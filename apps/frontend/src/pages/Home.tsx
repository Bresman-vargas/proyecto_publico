import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/react";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-center-container">
            <IonTitle>App Inicio</IonTitle>

            <div className="buttons-group">
              <IonButton
                shape="round"
                fill="outline"
                color="primary"
                routerLink="/login"
              >
                Login
              </IonButton>
              
              <IonButton
                shape="round"
                fill="solid"
                color="primary"
                routerLink="/register"
              >
                Registro
              </IonButton>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className="container">
          <IonHeader collapse="condense">
            <IonToolbar>
              <IonTitle size="large">App Inicio</IonTitle>
            </IonToolbar>
          </IonHeader>

          <div className="ion-padding">
            <h2>Contenido Principal</h2>
            <p>
              Bienvenido a la aplicación. Los botones de acceso están en la
              barra superior.
            </p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
