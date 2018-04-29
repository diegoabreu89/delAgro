// import { AsyncStorage } from 'react-native';
import RNFetchBlob from 'react-native-fetch-blob';

import axiosCustom from '../utils/axios';
import { navigateToHomeLoggedIn } from '../reducers/rootNavigatorReducer';

const initialState = {
  allLots: [],
  selected: null,
  contacts: [],
};

export const IS_FETCHING = 'IS_FETCHING';
export const ALL_LOTS_SUCCESS = 'ALL_LOTS_SUCCESS';
export const ALL_LOTS_FAILURE = 'ALL_LOTS_FAILURE';
export const SET_ERROR = 'SET_ERROR';
export const SELECT_LOT = 'SELECT_LOT';
export const UPLOAD_PENDING = 'UPLOAD_PENDING';
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS';
export const UPLOAD_FAILURE = 'UPLOAD_FAILURE';
export const SET_CONTACTS = 'SET_CONTACTS';

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ALL_LOTS_SUCCESS:
      return {
        ...state,
        allLots: action.lots,
        isFetching: false,
      };
    case ALL_LOTS_FAILURE:
      return { ...state, token: null, loggedIn: false, error: action.error };
    case SET_ERROR:
      return { ...state, error: action.error };
    case SELECT_LOT:
      return { ...state, selected: action.lot };
    case UPLOAD_PENDING:
      return { ...state, uploading: true };
    case UPLOAD_SUCCESS:
      return { ...state, uploading: false };
    case UPLOAD_FAILURE:
      return { ...state, uploading: false, uploadFailure: true, uploadError: action.uploadError };
    case SET_CONTACTS:
      return { ...state, contacts: action.contacts };
    default:
      return state;
  }
}

export function fetching() {
  return { type: IS_FETCHING };
}

export function allLotsSuccess(lots) {
  return { type: ALL_LOTS_SUCCESS, lots };
}

export function setError({ error }) {
  return { type: SET_ERROR, error };
}

export function selectLot(lot) {
  return { type: SELECT_LOT, lot };
}

export function uploadSuccess() {
  return { type: UPLOAD_SUCCESS };
}

export function uploadPending() {
  return { type: UPLOAD_PENDING };
}

export function uploadFailure(error) {
  return { type: UPLOAD_SUCCESS, uploadError: error };
}

export function setContacts(contacts) {
  return { type: SET_CONTACTS, contacts };
}

export function fetchAllLots() {
  return (dispatch) => {
    dispatch(fetching());
    return axiosCustom.get('/lots')
      .then((response) => {
        dispatch(allLotsSuccess(response.data));
      })
      .catch(error => dispatch(setError({ error })));
  };
}

export function submitLot({
  category_id,
  breed_id,
  quantity,
  price,
  video: videoUrl,
  weight,
  description,
}) {
  return (dispatch, getState) => {
    const { token, uid, client } = getState().session.creds;
    const headers = {
      'access-token': token,
      'client': client, // eslint-disable-line
      'uid': uid, // eslint-disable-line
      'Content-Type': 'multipart/form-data',
    };
    const cutVideo = videoUrl.slice(7);
    RNFetchBlob.fetch('POST', 'http://delagro-api.herokuapp.com/api/v1/lots', headers, [
      { name: 'video', data: RNFetchBlob.wrap(cutVideo), type: 'video/quicktime', filename: 'avatar-png.png' },
      { name: 'breed_id', data: breed_id },
      { name: 'quantity', data: quantity },
      { name: 'price', data: price },
      { name: 'weight', data: weight },
      { name: 'state', data: 'artigas' },
      { name: 'category_id', data: category_id },
      { name: 'description', data: description },
    ])
      .then(() => dispatch(uploadSuccess()))
      .catch(error => uploadFailure(error));
    return dispatch(navigateToHomeLoggedIn());
  };
}
