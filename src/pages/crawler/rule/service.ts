import request from '../../../utils/request';
import { TableListParams } from './data.d';

export async function queryRule(params: TableListParams) {
  return request('/rule', {
    params,
  });
}

export async function removeRule(params: any) {
  return request('/rule', {
    method: 'DELETE',
    data: params.key,
  });
}

export async function addRule(params: TableListParams) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}

