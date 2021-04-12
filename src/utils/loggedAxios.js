import firebase from 'react-native-firebase';
import { Service } from 'axios-middleware';
import axios from 'axios';

const service = new Service(axios);

service.register({
  onRequest(config) {
    let newConfig = config;
    return firebase.messaging().getToken()
      .then((fcmToken) => {
        if (fcmToken) {
          newConfig = {
            ...newConfig,
            headers: {
              ...newConfig.headers,
              'device-token': fcmToken,
            },
          };
        }
        console.log(newConfig);
        return newConfig;
      });
  },
});

const instance = ({ token, uid, client }) => {
  axios.create({
    baseURL: 'https://delagro-api.herokuapp.com/api/v1/',
    headers: {
      'access-token': token,
      client,
      uid,
    },
  });
};

export default instance;
