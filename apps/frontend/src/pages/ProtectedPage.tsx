import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonChip,
  IonAvatar,
  IonLabel,
  IonText,
  IonIcon,
  IonCardTitle,
  IonButton,
  IonItem,
} from "@ionic/react";

import { heartOutline } from "ionicons/icons";

import { useAuth } from "../context/AuthContext";
import DiscusionesCard from "../components/DiscusionsCard";

interface Discussion {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  userName: string;
  userAvatar: string;
  likes: number;
  comments: number;
  createdAt: Date;
}

const discussions: Discussion[] = [
  {
    id: "701",
    title: "Baches críticos en Av. Central",
    description:
      "Hay tres hoyos enormes que están dañando los neumáticos de los vecinos.",
    keywords: ["vialidad", "seguridad", "denuncia"],
    userName: "VecinoAtento",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Carlos",
    likes: 34,
    comments: 12,
    createdAt: new Date("2026-04-01"),
  },
  {
    id: "702",
    title: "Falta de iluminación en Parque Norte",
    description:
      "Desde hace una semana las luminarias LED no encienden después de las 20:00.",
    keywords: ["iluminación", "parque", "seguridad"],
    userName: "MariaLuz",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Maria",
    likes: 156,
    comments: 45,
    createdAt: new Date("2026-04-03"),
  },
  {
    id: "703",
    title: "Microbasural en esquina Los Olivos",
    description:
      "Gente de otros sectores viene a dejar escombros y restos de poda.",
    keywords: ["aseo", "medioambiente", "comuna"],
    userName: "EcoVecino",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Juan",
    likes: 89,
    comments: 20,
    createdAt: new Date("2026-04-05"),
  },
  {
    id: "704",
    title: "Ruidos molestos por obras nocturnas",
    description:
      "La constructora del centro sigue trabajando pasada la medianoche.",
    keywords: ["ruido", "normativa", "fiscalización"],
    userName: "NoDuermo",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Sofi",
    likes: 42,
    comments: 8,
    createdAt: new Date("2026-04-06"),
  },
  {
    id: "705",
    title: "Semaforización necesaria en cruce escolar",
    description:
      "Es urgente un semáforo frente al colegio San José por el alto flujo vehicular.",
    keywords: ["transito", "colegio", "prevención"],
    userName: "PadrePreocupado",
    userAvatar: "https://api.dicebear.com/9.x/avataaars/svg?seed=Pedro",
    likes: 210,
    comments: 67,
    createdAt: new Date("2026-04-07"),
  },
];

const ProtectedPage: React.FC = () => {
  const { logout, user } = useAuth();

  const tocar = (id: any) => {
    console.log(id);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <div className="toolbar-center-container">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButtons>
            <IonTitle>Hola {user ? `${user.nombre} 👋` : "invitado"}</IonTitle>
            <IonItem slot="end">
              <IonButton fill="outline" onClick={() => logout()}>
                Logout
              </IonButton>
            </IonItem>
          </div>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="container">
          <IonText color="dark">
            <h1 className="ion-padding-start">Discusiones Recientes:</h1>
          </IonText>

    
          <IonGrid>
            <IonRow>
              {discussions.map((item) => (
                <IonCol size="12" sizeLg="6" key={item.id}>
                  <DiscusionesCard
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    keywords={item.keywords}
                    userName={item.userName}
                    likes={item.likes}
                    comments={item.comments}
                    createdAt={item.createdAt}
                    onClick={() => tocar(item.id)}
                  />
                </IonCol>
              ))}
            </IonRow>
          </IonGrid>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProtectedPage;
