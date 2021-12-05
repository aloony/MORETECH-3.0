import { takeEvery } from 'redux-saga/effects';
import { bindAsyncActions } from '../../common/store/helpers';
import {
  getCurrentAccountInfo, getCurrentAccountInfoAsync,
  searchUsers, searchUsersAsync,
  clearAllUserErrors, clearAllUserErrorsAsync
} from '../actions/user.actions';
import authApi from '../../common/api/user.api';

function plugeWorker() {
  return true;
}

export function* userSaga() {
  yield takeEvery(getCurrentAccountInfo, bindAsyncActions(getCurrentAccountInfoAsync)(authApi.getCurrentAccountInfo));
  yield takeEvery(searchUsers, bindAsyncActions(searchUsersAsync)(authApi.searchUserByEmail));
  yield takeEvery(clearAllUserErrors, bindAsyncActions(clearAllUserErrorsAsync)(plugeWorker));

}