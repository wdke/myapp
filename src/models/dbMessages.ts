import { message } from 'antd';

import * as dbMessagesApi from '../services/DbMessagesService';
import { history } from '@@/core/history';
import { host } from '@/utils/host';
import dbMessages from '@/pages/dbMessages';


export default {
  namespace: 'dbMessages',
  state: {
    list: [

      { name: 'dva', id: 'dva' },
      { name: 'antd', id: 'antd' },
    ],
    host: '127.0.0.1',
    dbName: 'test',
    dbUsername: 'root',
    dbPassword: 'root',
    dbPort: '3306',
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {

    * fetch({ query }, { call, put }) {
      const { data } = yield call(dbMessagesApi.fetch, { payload: { ...query } });

      if (200 == data.code) {

        console.log('data::', JSON.stringify(data.data));
        yield put({ type: 'save', payload: { list: data.data } });
      } else {
        message.error(data.code + ':' + data.msg);
      }
    },

    * del({ payload: id }, { call }) {
      console.log('del');
      const { data } = yield call(dbMessagesApi.del, { payload: id });
      if (data.code === 200) {
        message.success(data.msg);

        // 跳转到指定路由
        history.push('/dbMessages');

      } else {
        message.error(data.msg);
      }
    },


    * update({ payload }, { call }) {
      console.log('del');
      const { data } = yield call(dbMessagesApi.update, { payload });
      if (data.code === 200) {
        message.success(data.msg);

        // 跳转到指定路由
        history.push('/dbMessages');

      } else {
        message.error(data.msg);
      }
    },
    * add({ payload }, { call, put }) {
      const { data } = yield call(dbMessagesApi.add, { payload });
      if (data.code === 200) {
        message.success(data.msg);

        // 跳转到指定路由
        history.push('/dbMessages');

      } else {
        message.error(data.msg);
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dbMessages') {

          // put({ type: 'save', payload: { host: query.host } });
          dispatch({ type: 'fetch', query });
        }

        if (pathname === '/dbMessages/add') {

          // put({ type: 'save', payload: { host: query.host } });
          console.log('query::' + JSON.stringify(query));
          dispatch({ type: 'save', payload: query });

          // yield put({ type: 'save', payload: { list: data.data } });
        }
      });
    },
  },
};
