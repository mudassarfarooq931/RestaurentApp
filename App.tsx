import store from '@redux/store';
import Routes from '@routes/routes';
import React from 'react';
import {ToastProvider} from 'react-native-toast-notifications';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <ToastProvider>
      <Provider store={store.store}>
        <PersistGate loading={null} persistor={store.persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    </ToastProvider>
  );
}

export default App;
