import { all } from "redux-saga/effects";
import authSagas from "./Auth";
import commonSagas from "./Common"
// import notesSagas from "./Notes";

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    commonSagas()
  ]);
}
