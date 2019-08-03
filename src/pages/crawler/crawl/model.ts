import { AnyAction, Reducer } from 'redux';

import { EffectsCommandMap } from 'dva';
import { queryRuleById, crawlByRule, importPost } from './service';
import { TableListItem } from '../rule/data';

export interface StateType {
  rule?: TableListItem;
  data?: any;
  importMsg?: any
}

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: StateType) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: StateType;
  effects: {
    fetchRuleById: Effect;
    crawl: Effect;
    importPost: Effect;
  };
  reducers: {
    show: Reducer<StateType>;
    crawled: Reducer<StateType>;
    imported: Reducer<StateType>;
  };
}

const Model: ModelType = {
  namespace: 'crawlerCrawl',

  state: {
    rule: undefined,
    data: [],
    importMsg: ''
  },

  effects: {
    *fetchRuleById({ payload }, { call, put }) {
      const response = yield call(queryRuleById, payload);

      yield put({
        type: 'show',
        payload: response,
      });
    },
    *crawl({ payload, callback }, { call, put }) {
      const response = yield call(crawlByRule, payload);

      yield put({
        type: 'crawled',
        payload: response.data,
      });
      if (callback) callback(response);
    },
    *importPost({ payload, callback }, { call, put }) {
      console.log('====================================');
      console.log(payload);
      console.log('====================================');
      const response = yield call(importPost, payload);

      yield put({
        type: 'imported',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    show(state, { payload }) {
      return {
        ...state,
        rule: payload,
      };
    },

    crawled( state, action ) {
      return {
        ...state,
        data: action.payload,
      };
    },

    imported( state, action ) {
      return {
        ...state,
        importMsg: action.payload,
      };
    },
  },
};

export default Model;
