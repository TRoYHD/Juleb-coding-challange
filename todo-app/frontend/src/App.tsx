// src/App.tsx - Simplified version
import React from 'react';
import { IonApp, IonContent, IonPage, IonText, setupIonicReact } from '@ionic/react';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonPage>
      <IonContent className="ion-padding">
        <IonText>
          <h1>Debug Page</h1>
          <p>If you can see this, your app is rendering correctly.</p>
        </IonText>
      </IonContent>
    </IonPage>
  </IonApp>
);

export default App;