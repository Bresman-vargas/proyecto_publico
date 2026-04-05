import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
/* Rutas */
import { routes } from './routes';
import { AuthProvider, useAuth } from './context/AuthContext';
setupIonicReact();

const App: React.FC = () => {
  return (
    <AuthProvider> 
      <AppContent />
    </AuthProvider>
  );
};

const AppContent: React.FC = () => {
  const { isAuthenticated } = useAuth(); 

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          {routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              render={(props) => {
                if (route.private && !isAuthenticated) return <Redirect to="/login" />;
                if (route.restricted && isAuthenticated) return <Redirect to="/prote" />;
                return <route.component {...props} />;
              }}
            />
          ))}
          <Route exact path="/"><Redirect to="/home"/></Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
