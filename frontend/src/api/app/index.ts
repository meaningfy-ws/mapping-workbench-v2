import axios, { Method } from 'axios';
import { STORAGE_KEY as ACCESS_TOKEN_STORAGE_KEY } from 'src/contexts/auth/jwt/auth-provider';

const METHOD = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
};
const getUrl = (endpoint) => {
  // return `${this.config.address}${this.config.baseUrl}$
  return `${process.env.MW_BACKEND_HOST}:${process.env.MW_BACKEND_PORT}${endpoint}`;
};

const sessionStorage = () => window.sessionStorage;

const getAccessToken = () => {
  return sessionStorage().getItem(ACCESS_TOKEN_STORAGE_KEY);
};

const addAuth = (headers = null) => {
  headers = headers || {};
  headers['Authorization'] = `Bearer ${getAccessToken()}`;
  return headers;
};

const request = async (
  method: Method,
  endpoint,
  data = null,
  params = null,
  headers = null,
  extraConfig = null
) => {
  // if (!(await this.verifyAuth())) {
  //     history.push(paths.auth.jwt.login);
  //     return;
  // }

  headers = addAuth(headers);

  let config = {
    method: method,
    url: getUrl(endpoint),
    headers: headers,
  };
  if (extraConfig) {
    Object.assign(config, extraConfig);
  }

  if (data !== null) {
    config['data'] = data;
  }
  if (params !== null) {
    config['params'] = params;
    config['paramsSerializer'] = { indexes: null };
  }
  console.log(config);

  return axios
    .request(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(method, 'REQUEST', error.response?.status);
      // $this.processError(error);
      console.error(error, 'error');
      throw error;
    });
};

const get = (endpoint, params = null, headers = null, extraConfig = null) => {
  return request(METHOD.GET as Method, endpoint, null, params, headers, extraConfig);
};

const post = (endpoint, data = {}, params = null, headers = null, extraConfig = null) => {
  return request(METHOD.POST as Method, endpoint, data, params, headers, extraConfig);
};

const create = (endpoint, data, headers = null) => {
  return post(endpoint, data, null, headers);
};

const put = (endpoint, data, headers = {}) => {
  return request(METHOD.PUT as Method, endpoint, data, null, headers);
};

const update = (endpoint, data, headers = {}) => {
  return put(endpoint, data, headers);
};

const deletE = (endpoint, data = null) => {
  return request(METHOD.DELETE as Method, endpoint, data);
};

const api = { delete: deletE, update, put, create, post, get };

export default api;
export { deletE, update, put, create, post, get };
