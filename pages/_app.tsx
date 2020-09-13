import "../node_modules/bootstrap/scss/bootstrap.scss";
import "../styles/styles.scss";
import { Provider } from 'react-redux';
import persistedStore from "../utils/redux/store";
import { PersistGate } from 'redux-persist/integration/react';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={persistedStore.store}>
      <PersistGate loading={null} persistor={persistedStore.persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  )
}

export default MyApp;