import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react';
import RootNavigator from './src/routes/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/reducers/rootReducer';

function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <RootNavigator />
      </GestureHandlerRootView>
    </Provider>
  );
}


export default App;
