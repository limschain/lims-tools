import request from '../../../utils/request';

export async function queryRuleById(params: any) {
  return request('/rule/' + params.id, {
    method: 'Get',
    data: {
      ...params
    },
  });
}

export async function crawlByRule(params: any) {
  return request('/rule/crawl', {
    method: 'POST',
    data: {
      ...params
    },
  });
}

export async function importPost(params: any) {
  return request('/rule/importPost', {
    method: 'POST',
    data: {
      ...params
    },
  });
}
