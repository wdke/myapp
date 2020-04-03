import { message } from 'antd';

import * as userService from '../services/loginsService';
import { history } from 'umi';


export default {
  namespace: 'logins',
  state: {
    token: '',
    user: {},
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    update(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },

  },
  effects: {


    * login({ payload }, { call, put }) {

      // console.log("login:",values);
      const { data } = yield call(userService.login, { payload });
      console.log('login:', data);
      if (200 == data.code) {
        message.success('登录成功');
        if (window.localStorage) {
          console.log('token:', data.data);
          localStorage.setItem('token', data.data);
        }
        yield put({
          type: 'save',
          payload: {
            ...data.user,
            token: data.token,
          },
        });
        // 跳转到指定路由
        history.push('/dbMessages');

      } else {
        message.error(data.msg);
      }
    },

  },
};
