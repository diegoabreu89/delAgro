import firebase from 'react-native-firebase';
import { Service } from 'axios-middleware';
import axios from 'axios';

const service = new Service(axios);

service.register({
  onRequest(config) {
    let newConfig = config;
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
    return newConfig;
  },
});

const instance = ({ token, uid, client }) => {
  axios.create({
    baseURL: 'http://delagro-api.herokuapp.com/api/v1/',
    headers: {
      'access-token': token,
      client,
      uid,
    },
  });
};

export default instance;
