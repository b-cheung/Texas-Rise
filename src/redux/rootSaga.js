import { all, fork } from 'redux-saga/effects';

import { watchInitialization, watchAuthentication } from '../modules/auth/sagas';
import { watchAnnouncements } from '../modules/main/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchInitialization),
    fork(watchAuthentication),
    fork(watchAnnouncements)
  ]);
}

// import { sagas as authSagas } from '../modules/auth';
// import { sagas as mainSagas } from '../modules/main';

// export default function* rootSaga() {
//   yield all([
//     ...authSagas,
//     ...mainSagas,
//   ]);
// }
