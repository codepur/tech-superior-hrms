import axios from './instance';
import * as auth from '../auth';
import apiKeys from './apiKeys';

const getUrlByKey = (key) => {
  return apiKeys[key];
};

class API {
  // eslint-disable-next-line lines-around-comment
  /**
   * auth2 login api
   * @param {string} url String
   * @param {object} payload Object
   * @param {object} action Object e.g {type: 'AUTH', dispatch: function(){} }
   * @returns {Promise<void>} void
   */

  static apiGet = async (key, args) => {
    if (typeof args === 'string') {
      return axios.get(getUrlByKey(key) + args, {
        withCredentials: false,
      });
    }
    return axios.get(getUrlByKey(key), {
      data: args,
      withCredentials: false,
    });
  };

  static apiGetByKey = async (key, args, query) => {
    if (typeof args === 'string') {
      return axios.get(getUrlByKey(key) + args, {
        withCredentials: false,
      });
    }
    return axios.get(`${getUrlByKey(key)}/query?${query}`, {
      data: args,
      withCredentials: false,
    });
  };

  static apiPost = async (key, args, headers) => {
    return axios.post(getUrlByKey(key), args, headers);
  };

  static apiPostUrl = async (key, dynamicUrl, args) => {
    return axios.post(getUrlByKey(key) + dynamicUrl, args);
  };

  static apiPut = async (key, args) => {
    if (typeof args === 'string') {
      return axios.put(getUrlByKey(key) + args, {
        withCredentials: false,
      });
    }
    return axios.put(getUrlByKey(key), args, {
      withCredentials: false,
    });
  };

  static apiPutUrl = async (key, dynamicUrl, args) => {
    return axios.put(getUrlByKey(key) + dynamicUrl, args);
  };

  static apiUploadFile = async (key, args, configs) => {
    return axios.post(getUrlByKey(key), args, configs);
  };

  static apiUpdateFile = async (key, dynamicUrl, args, configs) => {
    return axios.put(getUrlByKey(key) + dynamicUrl, args, configs);
  };

  static apiDelete = async (key, args) => {
    return axios.delete(getUrlByKey(key), args);
  };

  static apiDeleteUrl = async (key, dynamicUrl, args) => {
    return axios.delete(getUrlByKey(key) + dynamicUrl, { data: args });
  };

  static apiDeletePost = async (key, args) => {
    return axios.delete(getUrlByKey(key), { data: args });
  };

  static setCSRF = (csrfToken, sessionid) => {
    const CSRF_COOKIE = sessionid;
    if (process.browser) {
      localStorage.setItem('web_token', CSRF_COOKIE);
      axios.defaults.headers.common['X-CSRFToken'] = CSRF_COOKIE;
    }
  };

  static apiDownloadFile = async (key, args, configs) => {
    return axios.get(`${getUrlByKey(key)}/${args}`, configs);
  };
}

export default API;

// # interceptors
axios.interceptors.request.use(
  (configs) => {
    // const loading = true;
    return configs;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use( 
  (response) => {
    // const loading = false;
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // eslint-disable-next-line no-console
    
      auth.logout();
    }
    return Promise.reject(error);
  }
);

export const setAuthorization = () => {
  // to consider major cookies security
  axios.defaults.withCredentials = false;
  axios.defaults.headers.common.authorization =
    process.browser && localStorage.getItem('accessToken') ? localStorage.getItem('accessToken') : '';
  axios.defaults.headers.common.Platform = `HRMS`;
  axios.defaults.headers.common[`Version`] = '1.0.0';
  axios.defaults.headers.common.version = 'v1'; // API VERSION
};
setAuthorization();
