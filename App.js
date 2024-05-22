import {GestureHandlerRootView} from 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/routes/RootNavigator';
import {Provider} from 'react-redux';
import {store} from './src/reducers/rootReducer';
import {PersistGate} from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';

const persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView>
          <RootNavigator />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
