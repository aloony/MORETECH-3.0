import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import userReducer from './user.reducer';
import datahubReducer from './datahub.reducer';
import rolesReducer from './roles.reducer';

export default (history) => combineReducers({
  user: userReducer,
  datahub: datahubReducer,
  roles: rolesReducer,
  router: connectRouter(history),
});
