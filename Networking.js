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
    return response;
  },
  async error => {
    if (error.response.status === 401) {
      await refreshToken()
        .then(async refreshResponse => {
          console.log('Token refreshed!');
          await _storeData(JWToken, refreshResponse.data.access_token);
          return new instance.request(error.config);
        })
        .catch(err => {
          return Promise.reject(err);
        });
    } else {
      return Promise.reject(error);
    }
  },
);

export const handleError = ({navigation, error}) => {
  console.log(error);
  console.log(error.response.data.message);
  if (error.response.status === 401) {
    navigation.navigate('Login');
  }
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
      if (error) {
        throw error;
      }
    });
};

export const requestAuth = async (username, password) => {
  return await axios
    .post(baseUrl + '/login?username=' + username + '&password=' + password)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const requestRegister = async request => {
  return await axios
    .post(baseUrl + '/registration', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const requestPasswordReset = async email => {
  return await axios
    .post(baseUrl + '/password/reset?email=' + email)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getMyself = async () => {
  return await instance
    .get(baseUrl + '/myself')
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const changeEmail = async request => {
  return await instance
    .put(baseUrl + '/myself', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const changePassword = async request => {
  return await instance
    .put(baseUrl + '/password/change', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const changeIcon = data => {
  return instance
    .put(baseUrl + '/user/icon', data, {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getBadges = async () => {
  return await instance
    .get(baseUrl + '/badges')
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getUserBadges = async () => {
  return await instance
    .get(baseUrl + '/user/badges')
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getUserRanking = async () => {
  return await instance
    .get(baseUrl + '/user/ranking')
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getRanking = async page => {
  return await instance
    .get(baseUrl + '/user/ranking/list?page=' + page + '&size=' + 100)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getUserTrainings = async (page, size, type, query) => {
  return await instance
    .get(
      baseUrl +
        '/user/trainings?page=' +
        page +
        '&size=' +
        size +
        '&type=' +
        type +
        '&query=' +
        query,
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getTrainingDetails = async id => {
  return await instance
    .get(baseUrl + '/training/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const saveUserActivity = async (trainingId, time) => {
  return await instance
    .post(baseUrl + '/user/history?training=' + trainingId + '&time=' + time)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getUserActivities = async (year, month) => {
  return await instance
    .get(baseUrl + '/user/history?y=' + year + '&m=' + month)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getUserRequests = async (page, size, status, query) => {
  return await instance
    .get(
      baseUrl +
        '/request/user?page=' +
        page +
        '&size=' +
        size +
        '&status=' +
        status +
        '&query=' +
        query,
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const createRequest = async request => {
  return await instance
    .post(baseUrl + '/request', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const deleteDoneRequests = async () => {
  return await instance
    .delete(baseUrl + '/request')
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const deleteRequest = async id => {
  return await instance
    .delete(baseUrl + '/request/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const deleteTraining = async id => {
  return await instance
    .delete(baseUrl + '/user/training/' + id)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getRequests = async (page, size, status, query) => {
  return await instance
    .get(
      baseUrl +
        '/request/all?page=' +
        page +
        '&size=' +
        size +
        '&status=' +
        status +
        '&query=' +
        query,
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const editRequest = async (requestId, requestBody) => {
  return await instance
    .put(baseUrl + '/request/' + requestId, requestBody)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getTrainings = async (page, size, query) => {
  return await instance
    .get(
      baseUrl +
        '/training/all?page=' +
        page +
        '&size=' +
        size +
        '&query=' +
        query,
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getExercises = async (page, size, query) => {
  return await instance
    .get(
      baseUrl +
        '/exercise/all?page=' +
        page +
        '&size=' +
        size +
        '&query=' +
        query,
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const createTraining = async training => {
  return await instance
    .post(baseUrl + '/training', training)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const addExercises = async (id, exercises) => {
  return await instance
    .post(baseUrl + '/training/' + id + '/exercises', exercises)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const editExercises = async (id, exercises) => {
  return await instance
    .put(baseUrl + '/training/' + id + '/exercises', exercises)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const addTrainingUser = async (userId, trainingId) => {
  return await instance
    .post(
      baseUrl +
        '/user/trainings/add?user=' +
        userId +
        '&training=' +
        trainingId,
    )
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const getUsers = async (page, size, query) => {
  return await instance
    .get(baseUrl + '/users?page=' + page + '&size=' + size + '&query=' + query)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const lockUser = async (id, lock) => {
  return await instance
    .put(baseUrl + '/user/lock?id=' + id, lock)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};

export const initializeRegister = async request => {
  return await instance
    .post(baseUrl + '/registration/user', request)
    .then(response => {
      return response;
    })
    .catch(error => {
      if (error) {
        throw error;
      }
    });
};
