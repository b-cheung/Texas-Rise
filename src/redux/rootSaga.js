import { all, fork } from 'redux-saga/effects';

import { watchInitialization, watchAuthentication } from '../modules/auth/sagas';
import { watchAnnouncements } from '../modules/announcement/sagas';
import { watchPolls } from '../modules/poll/sagas';

export default function* rootSaga() {
  yield all([
    fork(watchInitialization),
    fork(watchAuthentication),
    fork(watchAnnouncements),
    fork(watchPolls)
  ]);
}

// import { sagas as authSagas } from '../modules/auth';
// import { sagas as announcementSagas } from '../modules/announcement';

// export default function* rootSaga() {
//   yield all([
//     ...authSagas,
//     ...announcementSagas,
//   ]);
// }
