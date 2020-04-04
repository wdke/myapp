import { message } from 'antd';
import { history } from 'umi';
import request from './request';


export const myRequest = ({ payload, method }) => {

  if (window.localStorage) {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
      // 跳转
      history.push('/');
      message.error('用户未登录');
    } else {
      return {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'T-px-Validate-Token': token,
        },
        method,
        body: JSON.stringify({ ...payload }),
      };
    }
  } else {
    message.error('浏览器不支持localStorage');
  }
};


export const fetch = (url, payload, method = 'POST') => {
  return request(url, myRequest({ payload, method }));
};
