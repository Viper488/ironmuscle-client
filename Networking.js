import axios from 'axios';
import {_retrieveData} from './AsyncStorageManager';

const baseUrl = 'http://192.168.0.10:8080/api/v1';
export const JWToken = 'JWT';

let instance = axios.create();

// Add a request interceptor
instance.interceptors.request.use(
  async config => {
    let token = await _retrieveData(JWToken);
    config.headers.Authorization = 'Bearer ' + token;

    return config;
  },
  function (error) {
    console.log(error);
    return Promise.reject(error);
  },
);

export const requestAuth = async (username, password) => {
  return await axios
    .post(baseUrl + '/authenticate', {username: username, password: password})
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const requestRegister = async request => {
  return await axios
    .post(baseUrl + '/registration', request, {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};

export const getWelcome = async () => {
  return await instance
    .get(baseUrl + '/welcome')
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
    });
};
