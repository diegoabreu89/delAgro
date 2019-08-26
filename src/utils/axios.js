import firebase from 'react-native-firebase';
import axios from 'axios';
import { Service } from 'axios-middleware';
import { store } from '../containers/App';

import { PUBLIC_KEY } from '../constants';

const service = new Service(axios);

service.register({
  onRequest(config) {
    let token = null;
    let client = null;
    let uid = null;
    if (store && store.getState() && store.getState().session && store.getState().session.creds) {
      token = store.getState().session.creds.token;
      client = store.getState().session.creds.client;
      uid = store.getState().session.creds.uid;
    }
    let newConfig = config;
    if (token) {
      return firebase.messaging().getToken()
        .then((fcmToken) => {
          if (fcmToken) {
            newConfig = {
              ...newConfig,
              headers: {
                ...newConfig.headers,
                'device-token': fcmToken,
                client,
                uid,
              },
            };
          }
          console.log(newConfig);
          return newConfig;
        });
    }
    return newConfig;
  },
});

const instance = axios.create({
  baseURL: 'https://delagro-api.herokuapp.com/api/v1/',
  headers: { 'access-token': PUBLIC_KEY },
});

export default instance;
