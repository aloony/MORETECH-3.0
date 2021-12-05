import { handleActions } from 'redux-actions';

import {
  getUserOwnRolesAsync,
  createRoleAsync,
  editRoleAsync,
  deleteRoleAsync,
  clearAllRolesErrorAsync,
} from '../actions/roles.actions';

const initialState = {
  state: [],
  error: null
};

export default handleActions({
  [getUserOwnRolesAsync.success]: (s, a) => ({ ...s, state: a.payload.data && a.payload.data.success ? a.payload.data.roles : [], error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : 'Что-то пошло не так' }),
  [getUserOwnRolesAsync.failed]: (s, a) => ({ ...s, state: [], error: 'Что-то пошло не так' }),
  [createRoleAsync.success]: (s, a) => ({ ...s, state: a.payload.data && a.payload.data.success ? [...s.state, a.payload.data.role] : [], error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : 'Что-то пошло не так' }),
  [createRoleAsync.failed]: (s, a) => ({ ...s, state: [], error: 'Что-то пошло не так' }),
  [editRoleAsync.success]: (s, a) => ({ ...s, state: a.payload.data && a.payload.data.success ? s.state.map(v => v._id == a.payload.data.role._id ? a.payload.data.role : v) : [], error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : 'Что-то пошло не так' }),
  [editRoleAsync.failed]: (s, a) => ({ ...s, state: [], error: 'Что-то пошло не так' }),
  [deleteRoleAsync.success]: (s, a) => ({ ...s, state: a.payload.data && a.payload.data.success ? s.state.filter(v => v._id != a.payload.data.role) : [], error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : 'Что-то пошло не так' }),
  [deleteRoleAsync.failed]: (s, a) => ({ ...s, state: [], error: 'Что-то пошло не так' }),
  [clearAllRolesErrorAsync.success]: (s, a) => ({ ...s, error: null }),
  [clearAllRolesErrorAsync.failed]: (s, a) => ({ ...s, error: null }),
}, initialState);
