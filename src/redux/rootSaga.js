import { all, fork } from 'redux-saga/effects';

import { initializationFlow, watchAuth } from '../modules/auth/sagas';
import { watchAnnouncements } from '../modules/main/sagas';

export default function* rootSaga() {
  yield all([
    fork(initializationFlow),
    fork(watchAuth),
    fork(watchAnnouncements)
  ]);
}
