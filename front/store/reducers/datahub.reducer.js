import { handleActions } from 'redux-actions';

import {
  getDatahubDataAsync,
  sendCreatedatasetTaskAsync,
  changeDataCatalogPathAsync,
  pickDataSetAsync,
  changeMenuAsync,
  changeSettingsAsync,
  clearSendTaskStateAsync,
  clearPickedDatasetsAsync,
  clearAllDathubErrorAsync
} from '../actions/datahub.actions';

const initialState = {
  menu: "catalog",
  settings: {
    dateFrom: new Date(),
    dateTo: new Date(),
    rowsCount: 100,
    isPrivate: false,
    price: 0,
    roles: [],
    rules: []
  },
  datasets: {
    all: [],
    picked: []
  },
  dataCatalog: {
    all: [],
    path: ''
  },
  taskSended: false,
  error: null
};

export default handleActions({
  [getDatahubDataAsync.success]: (s, a) => ({
    ...s,
    datasets: {
      ...s.datasets,
      all: a.payload.data && a.payload.data.success ? a.payload.data.datasets : []
    },
    dataCatalog: {
      all: a.payload.data && a.payload.data.success ? a.payload.data.dataCatalog : [],
      path: s.dataCatalog.path
    }, error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : 'Что-то пошло не так'
  }),
  [getDatahubDataAsync.failed]: (s, a) => ({ ...s, state: null, error: 'Что-то пошло не так' }),
  [changeDataCatalogPathAsync.success]: (s, a) => ({ ...s, dataCatalog: { ...s.dataCatalog, path: a.payload } }),
  [sendCreatedatasetTaskAsync.success]: (s, a) => ({ ...s, datasets: { ...s.datasets, picked: [] }, settings: { dateFrom: new Date(), dateTo: new Date(), rowsCount: 100, isPrivate: false, price: 0, roles: [], rules: [] }, taskSended: a.payload.data && a.payload.data.success ? true : false }),
  [sendCreatedatasetTaskAsync.failed]: (s, a) => ({ ...s, taskSended: false, error: 'Что-то пошло не так' }),
  [pickDataSetAsync.success]: (s, a) => ({ ...s, datasets: { ...s.datasets, picked: s.datasets.picked.find(v => v.urn == a.payload) ? s.datasets.picked.filter(v => v.urn != a.payload) : [...s.datasets.picked, s.datasets.all.find(v => v.urn == a.payload)] } }),
  [pickDataSetAsync.failed]: (s, a) => ({ ...s, state: null, error: 'Что-то пошло не так' }),
  [changeMenuAsync.success]: (s, a) => ({ ...s, menu: a.payload }),
  [changeMenuAsync.failed]: (s, a) => ({ ...s, menu: 'catalog', error: 'Что-то пошло не так' }),
  [changeSettingsAsync.success]: (s, a) => ({ ...s, settings: { ...s.settings, [a.payload.name]: a.payload.value } }),
  [changeSettingsAsync.failed]: (s, a) => ({ ...s, settings: { dateFrom: new Date(), dateTo: new Date(), rowsCount: 100, isPrivate: false, price: 0, members: [], rules: [] }, error: 'Что-то пошло не так' }),
  [clearSendTaskStateAsync.success]: (s, a) => ({ ...s, taskSended: false }),
  [clearSendTaskStateAsync.failed]: (s, a) => ({ ...s, taskSended: false, error: 'Что-то пошло не так' }),
  [clearPickedDatasetsAsync.success]: (s, a) => ({ ...s, datasets: { ...s.datasets, picked: [] } }),
  [clearPickedDatasetsAsync.failed]: (s, a) => ({ ...s, state: null, error: 'Что-то пошло не так' }),
  [clearAllDathubErrorAsync.success]: (s, a) => ({ ...s, error: null }),
  [clearAllDathubErrorAsync.failed]: (s, a) => ({ ...s, error: null }),
}, initialState);
