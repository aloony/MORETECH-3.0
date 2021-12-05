import { takeEvery } from 'redux-saga/effects';
import { bindAsyncActions } from '../../common/store/helpers';
import {
  getDatahubData, getDatahubDataAsync,
  sendCreatedatasetTask, sendCreatedatasetTaskAsync,
  changeDataCatalogPath, changeDataCatalogPathAsync,
  pickDataSet, pickDataSetAsync,
  changeMenu, changeMenuAsync,
  changeSettings, changeSettingsAsync,
  clearSendTaskState, clearSendTaskStateAsync,
  clearPickedDatasets, clearPickedDatasetsAsync,
  clearAllDathubError, clearAllDathubErrorAsync
} from '../actions/datahub.actions';
import datahubApi from '../../common/api/datahub.api';

function plugeWorker() {
  return true;
}

function pathChangeWorker({ path }) {
  return path;
}

function pickDatasetWorker({ urn }) {
  return urn;
}

function changeMenuWorker({ menu }) {
  return menu;
}

function changeSettingsWorker({ name, value }) {
  return { name, value };
}

export function* datahubSaga() {
  yield takeEvery(getDatahubData, bindAsyncActions(getDatahubDataAsync)(datahubApi.getDatahub));
  yield takeEvery(sendCreatedatasetTask, bindAsyncActions(sendCreatedatasetTaskAsync)(datahubApi.addNewTask));
  yield takeEvery(changeDataCatalogPath, bindAsyncActions(changeDataCatalogPathAsync)(pathChangeWorker));
  yield takeEvery(pickDataSet, bindAsyncActions(pickDataSetAsync)(pickDatasetWorker));
  yield takeEvery(changeMenu, bindAsyncActions(changeMenuAsync)(changeMenuWorker));
  yield takeEvery(changeSettings, bindAsyncActions(changeSettingsAsync)(changeSettingsWorker));
  yield takeEvery(clearSendTaskState, bindAsyncActions(clearSendTaskStateAsync)(plugeWorker));
  yield takeEvery(clearPickedDatasets, bindAsyncActions(clearPickedDatasetsAsync)(plugeWorker));
  yield takeEvery(clearAllDathubError, bindAsyncActions(clearAllDathubErrorAsync)(plugeWorker));

}
