import { handleActions } from 'redux-actions';

import {
  getCurrentAccountInfoAsync,
  searchUsersAsync,
  clearAllUserErrorsAsync
} from '../actions/user.actions';

const initialState = {
  state: null,
  searched: [],
  error: null
};

export default handleActions({
  [getCurrentAccountInfoAsync.success]: (s, a) => ({ ...s, searched: [], state: a.payload.data && a.payload.data.success ? { ...s.state, ...a.payload.data.user } : null }),
  [getCurrentAccountInfoAsync.failed]: (s, a) => ({ ...s, state: null }),
  [searchUsersAsync.success]: (s, a) => ({ ...s, searched: a.payload.data && a.payload.data.success ? a.payload.data.users : [], error: a.payload.data && a.payload.data.success ? null : a.payload.data && a.payload.data.error ? a.payload.data.error : 'Что-то пошло не так' }),
  [searchUsersAsync.failed]: (s, a) => ({ ...s, state: null, error: 'Что-то пошло не так' }),
  [clearAllUserErrorsAsync.success]: (s, a) => ({ ...s, error: null }),
  [clearAllUserErrorsAsync.failed]: (s, a) => ({ ...s, error: null }),
}, initialState);
