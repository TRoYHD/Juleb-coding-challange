import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import TodoPage from './pages/TodoPage';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/todos" component={TodoPage} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/todos" />} />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;