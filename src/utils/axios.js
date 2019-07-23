import firebase from 'react-native-firebase';
import axios from 'axios';
import { Service } from 'axios-middleware';
import { store } from '../containers/App';

import { PUBLIC_KEY } from '../constants';

const service = new Service(axios);

service.register({
  onRequest(config) {
    const token = store && store.getState() && store.getState().session && store.getState().session.creds ? store.getState().session.creds.token : null;
    let newConfig = config;
    if (token) {
      firebase.messaging().getToken()
        .then((fcmToken) => {
          if (fcmToken) {
            newConfig = {
              ...newConfig,
              headers: {
                ...newConfig.headers,
                device_token: fcmToken,
              } };
          }
        });
    }
    return newConfig;
  },
});

const instance = axios.create({
  baseURL: 'http://delagro-api.herokuapp.com/api/v1/',
  headers: { 'access-token': PUBLIC_KEY },
});

export default instance;
