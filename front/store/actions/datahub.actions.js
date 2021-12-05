import { createActionFactory } from '../../common/store/helpers';

const factory = createActionFactory('DATAHUB');

export const getDatahubData = factory.create('GET_DATAHUB_DATA');
export const getDatahubDataAsync = factory.createAsync('GET_DATAHUB_DATA_ASYNC');

export const changeDataCatalogPath = factory.create('CHANGE_DATA_CATALOG_PATH');
export const changeDataCatalogPathAsync = factory.createAsync('CHANGE_DATA_CATALOG_PATH_ASYNC');

export const pickDataSet = factory.create('PICK_DATASET');
export const pickDataSetAsync = factory.createAsync('PICK_DATASET_ASYNC');

export const changeMenu = factory.create('CHANGE_MENU');
export const changeMenuAsync = factory.createAsync('CHANGE_MENU_ASYNC');

export const changeSettings = factory.create('CHANGE_SETTINGS');
export const changeSettingsAsync = factory.createAsync('CHANGE_SETTINGS_ASYNC');

export const sendCreatedatasetTask = factory.create('SEND_DATASENT_TASK');
export const sendCreatedatasetTaskAsync = factory.createAsync('SEND_DATASENT_TASK_ASYNC');

export const clearSendTaskState = factory.create('CLEAR_SEND_TASK_STATE');
export const clearSendTaskStateAsync = factory.createAsync('CLEAR_SEND_TASK_STATE_ASYNC');

export const clearPickedDatasets = factory.create('CLEAR_PICKED_DATASETS');
export const clearPickedDatasetsAsync = factory.createAsync('CLEAR_PICKED_DATASETS_ASYNC');

export const clearAllDathubError = factory.create('CLEAR_ALL_ERRORS');
export const clearAllDathubErrorAsync = factory.createAsync('CLEAR_ALL_ERRORS_ASYNC');