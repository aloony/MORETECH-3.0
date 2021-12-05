import { createActionFactory } from '../../common/store/helpers';

const factory = createActionFactory('USERS');

export const getCurrentAccountInfo = factory.create('GET_CURRENT_ACCOUNT_INFO');
export const getCurrentAccountInfoAsync = factory.createAsync('GET_CURRENT_ACCOUNT_INFO_ASYNC');

export const searchUsers = factory.create('SEARCH_USERS');
export const searchUsersAsync = factory.createAsync('SEARCH_USERS_ASYNC');

export const clearAllUserErrors = factory.create('CLEAR_ALL_ERRORS');
export const clearAllUserErrorsAsync = factory.createAsync('CLEAR_ALL_ERRORS_ASYNC');