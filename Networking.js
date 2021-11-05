import axios from 'axios';
import {_retrieveData, _storeData} from './AsyncStorageManager';

const baseUrl = 'http://192.168.0.10:8080/api/v1';
export const JWToken = 'JWT';
export const RefreshToken = 'Refresh';
export const USER = 'USER';

let refreshInstance = axios.create();

refreshInstance.interceptors.request.use(
  async config => {
    let token = await _retrieveData(RefreshToken);
    config.headers.Authorization = 'Bearer ' + token;
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

let instance = axios.create();

instance.interceptors.request.use(
  async config => {
    let token = await _retrieveData(JWToken);
    config.headers.Authorization = 'Bearer ' + token;
    config.headers.Accept = '*/*';
    config.headers.HTTP2_HEADER_CONTENT_TYPE = 'application/json';
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  response => {
    if (response.status === 401) {
      alert('Not authorized');
    }
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.response.data.message.startsWith('The Token has expired')
    ) {
      await refreshToken()
        .then(async refreshResponse => {
          console.log('Token refreshed!');
          await _storeData(JWToken, refreshResponse.data.access_token);
          return new Promise(resolve => resolve(instance(originalRequest)));
        })
        .catch(err => {
          console.log('401 Interceptor: ' + err);
          return Promise.reject(err);
        });
    } else {
      return Promise.reject(error);
    }
  },
);

export const requestAuth = async (username, password) => {
  return await axios
    .post(baseUrl + '/login?username=' + username + '&password=' + password)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const requestRegister = async request => {
  return await axios
    .post(baseUrl + '/registration', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const requestPasswordReset = async email => {
  return await axios
    .post(baseUrl + '/password/reset?email=' + email)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getMyself = async () => {
  return await instance
    .get(baseUrl + '/myself')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getBadges = async () => {
  return await instance
    .get(baseUrl + '/user/badges')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserRanking = async () => {
  return await instance
    .get(baseUrl + '/user/ranking')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getRanking = async page => {
  return await instance
    .get(baseUrl + '/user/ranking/list?page=' + page + '&size=' + 30)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getWelcome = async () => {
  return await instance
    .get(baseUrl + '/welcome')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const changePassword = async request => {
  return await instance
    .post(baseUrl + '/password/change', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const refreshToken = () => {
  return refreshInstance
    .get(baseUrl + '/token/refresh', {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getTrainingsByUser = async () => {
  return await instance
    .get(baseUrl + '/user/trainings')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getStandardTrainings = async () => {
  return await instance
    .get(baseUrl + '/training/type/Standard')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getTrainingDetails = async id => {
  return await instance
    .get(baseUrl + '/training/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const saveUserActivity = async (trainingId, time) => {
  return await instance
    .post(baseUrl + '/user/history?training=' + trainingId + '&time=' + time)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserActivities = async (year, month) => {
  return await instance
    .get(baseUrl + '/user/history?y=' + year + '&m=' + month)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getUserRequests = async () => {
  return await instance
    .get(baseUrl + '/request/user')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const createRequest = async request => {
  return await instance
    .post(baseUrl + '/request', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const deleteDoneRequests = async () => {
  return await instance
    .delete(baseUrl + '/request')
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const deleteRequest = async id => {
  return await instance
    .delete(baseUrl + '/request/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const deleteTraining = async id => {
  return await instance
    .delete(baseUrl + '/user/training/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};

export const getRequests = async page => {
  return await instance
    .get(baseUrl + '/request/all?page=' + page + '&size=' + 30)
    .then(response => {
      return response;
    })
    .catch(error => {
      throw error;
    });
};
