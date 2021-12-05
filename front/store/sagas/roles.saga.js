import { takeEvery } from 'redux-saga/effects';
import { bindAsyncActions } from '../../common/store/helpers';
import {
  getUserOwnRoles, getUserOwnRolesAsync,
  createRole, createRoleAsync,
  editRole, editRoleAsync,
  deleteRole, deleteRoleAsync,
  clearAllRolesError, clearAllRolesErrorAsync
} from '../actions/roles.actions';
import rolesApi from '../../common/api/roles.api';

function plugeWorker() {
  return true;
}

export function* rolesSaga() {
  yield takeEvery(getUserOwnRoles, bindAsyncActions(getUserOwnRolesAsync)(rolesApi.getUserOwnRoles));
  yield takeEvery(createRole, bindAsyncActions(createRoleAsync)(rolesApi.createOwnRole));
  yield takeEvery(editRole, bindAsyncActions(editRoleAsync)(rolesApi.EditOwnRole));
  yield takeEvery(deleteRole, bindAsyncActions(deleteRoleAsync)(rolesApi.deleteOwnRole));
  yield takeEvery(clearAllRolesError, bindAsyncActions(clearAllRolesErrorAsync)(plugeWorker));

}