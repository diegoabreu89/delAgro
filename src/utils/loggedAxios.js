import firebase from 'react-native-firebase';
import axios from 'axios';

const instance = ({ token, uid, client }) => {
  firebase.messaging().getToken()
    .then((fcmToken) => {
      if (fcmToken) {
        axios.create({
          baseURL: 'http://delagro-api.herokuapp.com/api/v1/',
          headers: {
            'access-token': token,
            client,
            uid,
            device_token: fcmToken,
          },
        });
      } else {
        axios.create({
          baseURL: 'http://delagro-api.herokuapp.com/api/v1/',
          headers: {
            'access-token': token,
            client,
            uid,
          },
        });
      }
    });
};

export default instance;
