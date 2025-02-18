import axios, { Method } from 'axios';

const METHOD = {
  GET: 'get',
  POST: 'post',
  PATCH: 'patch',
  PUT: 'put',
  DELETE: 'delete',
};

const getUrl = (endpoint) => {
  // return `${this.config.address}${this.config.baseUrl}$
  return endpoint;
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

  // headers = this.addAuth(headers);

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
  // let $this = this;
  return axios
    .request(config)
    .then((response) => response.data)
    .catch((error) => {
      console.log(method, 'REQUEST', error.response?.status);
      // $this.processError(error);
      console.log(error, 'error');
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

const patch = (endpoint, data, headers = {}) => {
  return request(METHOD.PATCH as Method, endpoint, data, null, headers);
};

const update = (endpoint, data, headers = {}) => {
  return patch(endpoint, data, headers);
};

const deletE = (endpoint, data = null) => {
  return request(METHOD.DELETE as Method, endpoint, data);
};


export { deletE, update, patch, create, post, get };;
