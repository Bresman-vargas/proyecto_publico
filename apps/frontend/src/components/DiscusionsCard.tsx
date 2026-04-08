import {
  IonCard,
  IonGrid,
  IonRow,
  IonCol,
  IonCardTitle,
  IonText,
  IonChip,
  IonAvatar,
  IonLabel,
  IonIcon,
} from "@ionic/react";

import { heartOutline, chatbubbleEllipsesOutline } from "ionicons/icons";

interface Pros {
  id: string;
  title: string;
  description?: string;
  keywords?: string[];
  userName: string;
  userAvatar?: string;
  likes: number;
  comments?: number;
  createdAt: Date;
  onClick?: () => void;
}

const DiscusionesCard: React.FC<Pros> = ({
  id,
  title,
  description = "",
  keywords = [],
  userName = "Anonymous",
  userAvatar = "https://placehold.net/avatar.svg",
  likes,
  comments,
  createdAt,
  onClick,
}) => {
  return (
    <IonCard
      style={{ borderRadius: "15px", cursor: "pointer" }}
      onClick={onClick}
    >
      <IonGrid>
        <IonRow>
          {/* Columna de Contenido */}
          <IonCol size="12" className="ion-align-self-center ion-padding">
            <IonCardTitle>{title}</IonCardTitle>

            <IonText color="medium">
              <p>{description}</p>
            </IonText>

            <div className="ion-margin-top">
              {keywords.map((tag, index) => (
                <IonChip key={index} color="secondary">
                  #{tag}
                </IonChip>
              ))}
            </div>

            <IonRow className="ion-align-items-center ion-justify-content-between ion-margin-top">
              {/* Autor */}
              <IonChip>
                <IonAvatar>
                  <img alt={userName} src={userAvatar} />
                </IonAvatar>
                <IonLabel>
                  <strong>{userName}</strong>
                  <br />
                </IonLabel>
              </IonChip>

              {/* Estadísticas */}
              <div className="flex-gap">
                <IonText className="flex-gap">
                  <IonIcon icon={heartOutline} /> {likes}
                </IonText>
                <IonText className="flex-gap">
                  <IonIcon icon={chatbubbleEllipsesOutline} /> {comments}
                </IonText>
              </div>
            </IonRow>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonCard>
  );
};

export default DiscusionesCard;
