import request from '../utils/request';
import { myRequest } from '../utils/common';
import { host } from '../utils/host';



export async function fetch({ payload }) {
  console.log("fetch");
  return request(host+'api/db/messages/list', myRequest({ payload, method: 'POST' }));
}
