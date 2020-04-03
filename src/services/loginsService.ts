import request from '@/utils/request';
import { fetch } from '@/utils/common';
import { host } from '../utils/host';

export function login({ payload }) {
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({ ...payload }),
  };
  return request(host + '/api/login', options);
}

export async function changepw({ payload }) {
  return fetch(host + '/api/user/changepw', payload);
}
