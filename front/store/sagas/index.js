import { all, take } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist';

import { userSaga } from './user.saga';
import { datahubSaga } from './datahub.saga';
import { rolesSaga } from './roles.saga';

export default function* () {
  yield take(REHYDRATE);
  yield all([
    userSaga(),
    datahubSaga(),
    rolesSaga(),
  ]);
}
