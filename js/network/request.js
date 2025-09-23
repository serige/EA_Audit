// @flow

/* CUSTOM MODULES */

import API_CONFIG from '../config/api.config';


/* $FlowFixMe */
const basicRequest = (url: string, data: { headers?: Object }, token?: string) => new Promise((resolve: Function, reject: Function) => {
  let headers = {
    "Content-Type": "application/json",
    ...(data.headers || {}),
  };

  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  fetch(`${API_CONFIG.basicUrl}${url}`, {
    ...data,
    headers,
  })
    .then(response => response.json())
    .then((res: {}) => {
      // console.log("url", url);
      // console.log("q =>", data, "r =>", res);

      resolve(res);
    })
    .catch(reject)
    .finally(() => {

    });
});

export default basicRequest;
