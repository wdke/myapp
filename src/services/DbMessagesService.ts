import request from '../utils/request';
import { myRequest } from '../utils/common';
import { host } from '../utils/host';


// 数据列表
export async function fetch({ payload }) {
  console.log('fetch');
  return request('api/db/messages/list', myRequest({ payload, method: 'POST' }));
}


//删除数据
export async function del({ payload: id }) {
  return request('api/db/messages/remove/' + id, myRequest({ payload: id, method: 'POST' }));
}

//删除数据
export async function update({ payload}) {
  return request('api/db/messages/update', myRequest({ payload, method: 'POST' }));
}


//新增
export async function add({ payload }) {
  return request('api/db/messages/insert', myRequest({ payload, method: 'POST' }));
}
