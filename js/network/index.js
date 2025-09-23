// @flow

import API_CONFIG from '../config/api.config';

import request from './request';

/* $FlowFixMe */
export const signin = (data: { email: string, password: string }) =>
  new Promise((resolve: Function, reject: Function) => {
    request(API_CONFIG.signin, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res: {}) => {
        // console.log('signin res:', res);
        if (res.token && res.status === "SUCCESS") {
          resolve(res.token);
        } else {
          reject(res);
        }
      })
      .catch(reject);
  });

/* $FlowFixMe */
export const submit = (token: string, data: {}) =>
  new Promise((resolve: Function, reject: Function) => {
    request(API_CONFIG.submit, {
      method: "POST",
      body: JSON.stringify(data),
    }, token)
      .then((res: {}) => {
        // console.log('submit res:', res);
        if (res.status === "SUCCESS") {
          resolve(res);
        } else {
          reject(res);
        }
      })
      .catch(reject);
  });
