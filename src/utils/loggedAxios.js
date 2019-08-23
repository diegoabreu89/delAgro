import axios from 'axios';

const instance = ({ token, uid, client }) => axios.create({
  baseURL: 'https://delagro-api.herokuapp.com/api/v1/',
  headers: {
    'access-token': token,
    client,
    uid,
  },
});

export default instance;
