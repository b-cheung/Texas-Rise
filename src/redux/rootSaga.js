import { all, fork } from 'redux-saga/effects';

import { initializationFlow, watchAuth } from '../modules/auth/sagas';

export default function* rootSaga() {
  yield all([
    fork(initializationFlow),
    fork(watchAuth)
  ]);
}
