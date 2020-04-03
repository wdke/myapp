import { message } from 'antd';

import * as dbMessagesApi from '../services/DbMessagesService';


export default {
  namespace: 'dbMessages',
  state: {
    list: [

      { name: 'dva', id: 'dva' },
      { name: 'antd', id: 'antd' },
    ]
  },
  reducers: {
    save(state, { payload }) { return { ...state, ...payload }; },
    delete(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
    update(state, { payload: id }) {
      return state.filter(item => item.id !== id);
    },
  },
  effects: {

    *fetch({ query }, { call, put}) {
      const { data} = yield call(dbMessagesApi.fetch, { payload: { ...query } });

      if(200==data.code){

        console.log("data::",JSON.stringify(data.data));
        yield put({ type: 'save', payload: { list: data.data} });
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/dbMessages') {
          dispatch({ type: 'fetch', query });
        }
      });
    },
  },
};
