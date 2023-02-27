import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import {
  SIGNIN_USER,
  SIGNOUT_USER,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  GET_ALL_SECURITY_QUESTION,
  SAVE_SECURITY_QUESTION_ANSWER,
  DEVICE_REQUEST,
  VERIFICATION_REQUEST,
  PROFILE_READ_REQUEST,
  PROFILE_UPDATE_REQUEST,
} from "constants/ActionTypes";
import { showAuthMessage, userSignInSuccess, userSignOutSuccess, forgotPasswordSuccess, resetPasswordSuccess, changePasswordSuccess, deviceRequestSuccess, verificationRequestSuccess, profileReadRequestSuccess, profileUpdateRequestSuccess, getAllSecuritySuccess } from "../../appRedux/actions/Auth";
import axios from "axios";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { push } from 'react-router-redux';
import history from "../../util/history";
import BASE_URL from "../../util/url";
toast.configure()
const loginApiCall = (payload) => {
  const headers = {
    'device_id': localStorage.getItem('deviceId'),
    'ip_address': localStorage.getItem('ip'),
    'location': localStorage.getItem('city') + '/' + localStorage.getItem('state'),
  }
  return axios.post(BASE_URL + '/api/v1/users/login/', payload, { headers: headers })
}
const saveQue_AnsApiCall = (payload) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    device_id: localStorage.getItem('deviceId'),
    user_id: localStorage.getItem('user_id')
  }
  return axios.post(BASE_URL + '/api/v1/security/answer/create/', payload.payload, { headers: headers })
}
const secutiryQuestionApiCall = () => {
  const headers = {
    'Authorization': "Bearer " + localStorage.getItem("token"),
    'device_id': localStorage.getItem('deviceId'),
    'user_id': localStorage.getItem('user_id')
  }
  return axios.get(BASE_URL + '/api/v1/security/question/list/', { headers: headers })
}


const forgotPasswordApi = (payload) => {
  const headers = {
    device_id: localStorage.getItem('deviceId')
  }
  return axios.post(BASE_URL + '/api/v1/users/forgot/password/', payload, { headers: headers })
}

const changePasswordApi = (payload) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    device_id: localStorage.getItem('deviceId'),
    user_id: localStorage.getItem('user_id')
  }
  const id = payload.id;
  return axios.post(BASE_URL + `/api/v1/users/change/password/${id}/`, payload.values, { headers: headers })
}

const resetPasswordApi = (payload) => {
  const headers = {
    device_id: localStorage.getItem('deviceId'),
  }
  const { values, params } = payload;
  const temp = { new_password: values.password, confirm_password: values.confirm }
  return axios.post(BASE_URL + `/api/v1/users/reset/password/${params.id}/${params.token}/`, temp, { headers: headers })
}

const deviceAccessApi = (status) => {
  const headers = {
    device_id: localStorage.getItem('deviceId')
  }
  return axios.post(BASE_URL + `/api/v1/security/confirm/access/${status}/`, { headers: headers })
}

const verificationApi = (payload) => {
  const headers = {
    device_id: localStorage.getItem('deviceId'),
    user_id: localStorage.getItem('user_id')
  }
  return axios.post(BASE_URL + '/api/v1/security/device/verification/', payload, { headers: headers })
}

const axiosSignout = () => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    device_id: localStorage.getItem('deviceId'),
    user_id: localStorage.getItem('user_id')
  }
  return axios.get(BASE_URL + '/api/v1/users/logout/', { headers: headers })
}

const profileReadApi = (payload) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    device_id: localStorage.getItem('deviceId'),
    user_id: localStorage.getItem('user_id')
  }
  const id = payload;
  return axios.get(BASE_URL + `/api/v1/users/profile/${id}/`, { headers: headers })
}

const profileUpdateApi = (payload) => {
  const headers = {
    Authorization: "Bearer " + localStorage.getItem("token"),
    device_id: localStorage.getItem('deviceId'),
    user_id: localStorage.getItem('user_id')
  }
  const { id, formData } = payload;
  return axios.post(BASE_URL + `/api/v1/users/profile/update/${id}/`, formData, { headers: headers })
}

const signinApicalling = async (payload) =>
  await loginApiCall(payload)
    .then(authUser => authUser)
    .catch(error => error);

const SecurityQuestionApicalling = async () =>
  await secutiryQuestionApiCall()
    .then(response => response)
    .catch(error => error);

const SaveSecurityQuestionApicalling = async (payload) =>
  await saveQue_AnsApiCall(payload)
    .then(authUser => authUser)
    .catch(error => error);
const forgotPasswordApiCalling = async (payload) =>
  await forgotPasswordApi(payload)
    .then(authUser => authUser)
    .catch(error => error);

const resetPasswordApiCalling = async (payload) =>
  await resetPasswordApi(payload)
    .then(authUser => authUser)
    .catch(error => error);

const changePasswordApiCalling = async (payload) =>
  await changePasswordApi(payload)
    .then(authUser => authUser)
    .catch(error => error);

const deviceAccessApiCalling = async (status) =>
  await deviceAccessApi(status)
    .then(authUser => authUser)
    .catch(error => error);

const verifiedApiCalling = async (payload) =>
  await verificationApi(payload)
    .then(authUser => authUser)
    .catch(error => error);

const signoutApicalling = async () =>
  await axiosSignout()
    .then(authUser => authUser)
    .catch(error => error);

const profileReadApiCalling = async (payload) =>
  await profileReadApi(payload)
    .then(authUser => authUser)
    .catch(error => error)



const profileUpdateApiCalling = async (payload) =>
  await profileUpdateApi(payload)
    .then(authUser => authUser)
    .catch(error => error)



function* signin({ payload }) {
  const signInUser = yield call(signinApicalling, payload);
  const tempData = signInUser.data.data;
  try {
    if (signInUser.data.code !== 200) {
      yield put(showAuthMessage(signInUser.data.data.message));
      toast.error(signInUser.data.data.message, { autoClose: 2000 });
    } else {
      localStorage.setItem('token', signInUser.data.data.token);
      localStorage.setItem('access_verified', signInUser.data.data.device_verified);
      localStorage.setItem('user_id', signInUser.data.data.user_id);
      yield put(userSignInSuccess(signInUser.data.data));
      if (signInUser.data.data.device_verified == true) {
        if (signInUser.data.data.security_question_set == true) {
          history.push('/dashboard');
        } else {
          history.push('/security-Question');
        }
      }
      else {
        history.push('/waiting-screen');
      }
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}
function* securityQuestion() {
  const securityQuestion = yield call(SecurityQuestionApicalling);
  const tempData = securityQuestion.data.data.results;
  try {
    if (securityQuestion.data.status != "error") {
      yield put(showAuthMessage(securityQuestion.data.data.message));
      toast.error(securityQuestion.data.data.message, { autoClose: 2000 });
    } else {
      yield put(getAllSecuritySuccess(tempData));
      toast.success(securityQuestion.data.data.message, { autoClose: 2000 });
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    toast.error(tempData.message, { autoClose: 2000 });
  }
}
function* SavesecurityQuestion(payload) {
  const resSecurityQuestion = yield call(SaveSecurityQuestionApicalling, payload);
  try {
    if (resSecurityQuestion.data.code != 200) {
      yield put(showAuthMessage(resSecurityQuestion.data.data.message));
      toast.error(resSecurityQuestion.data.data.message, { autoClose: 2000 });
    } else {
      // yield put(push('/dashboard'))
      history.push('/dashboard')
      toast.success(resSecurityQuestion.data.data.message, { autoClose: 2000 });
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    toast.error("error found", { autoClose: 2000 });
  }
}
function* forgotPassword({ payload }) {
  const ForgotPasswordCall = yield call(forgotPasswordApiCalling, payload);
  try {
    if (ForgotPasswordCall.data.code != 200) {
      yield put(showAuthMessage(ForgotPasswordCall.data.data.message));
      toast.error(ForgotPasswordCall.data.data.message, { autoClose: 3000 });
    } else {
      toast.success(ForgotPasswordCall.data.data.message, { autoClose: 3000 });
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    toast.error(ForgotPasswordCall.data.data.message, { autoClose: 2000 });
  }
}

function* changePassword({ payload }) {
  const Changedata = yield call(changePasswordApiCalling, payload);
  try {
    if (Changedata.response == undefined) {
      if (Changedata.data.code != 200) {
        yield put(showAuthMessage(Changedata.data.data.message));
        toast.error(Changedata.data.data.message, { autoClose: 2000 });
      } else {
        yield put(changePasswordSuccess(Changedata));
        toast.success(Changedata.data.data.message, { autoClose: 2000 });
        history.push('/dashboard')
      }
    } else {
      if (Changedata.response.status === 401) {
        yield call(signOut);
      }
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    toast.error(Changedata.data.data.message, { autoClose: 2000 });
  }
}

function* resetPassword({ payload }) {
  const ResetPasswordCall = yield call(resetPasswordApiCalling, payload);
  try {
    if (ResetPasswordCall.response == undefined) {
      if (ResetPasswordCall.data.code != 200) {
        yield put(showAuthMessage(ResetPasswordCall.data.data.message));
        toast.error(ResetPasswordCall.data.data.message, { autoClose: 2000 });
      } else {
        toast.success(ResetPasswordCall.data.data.message, { autoClose: 2000 });
        history.push('/')
      }
    } else {
      if (ResetPasswordCall.response.status === 401) {
        yield call(signOut);
      }
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    toast.error(ResetPasswordCall.data.data.message, { autoClose: 2000 });
  }
}

function* signOut() {
  try {
    const signOutUser = yield call(signoutApicalling);
    if (signOutUser == undefined) {
      localStorage.clear();
      yield put(userSignOutSuccess(signOutUser));
    } else {
      localStorage.clear();
      history.push('/')
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    toast.error(signOutUser.data.data.message, { autoClose: 2000 });
  }
}

function* deviceAccess({ payload }) {
  const deviceData = yield call(deviceAccessApiCalling, payload);
  try {
    if (deviceData.data.code !== 200) {
      yield put(showAuthMessage(deviceData.data.data.message));
      toast.error(deviceData.data.data.message, { autoClose: 2000 });
    } else {
      localStorage.setItem('force_reset_password', deviceData.data.data.force_reset_password);
      yield put(deviceRequestSuccess(deviceData.data.data.force_reset_password));
      if (deviceData.data.data.force_reset_password == true) {
        history.push('/change-password/:id')
      } else {
        history.push('/dashboard')
      }
    }
  } catch (error) {
    yield put(showAuthMessage(error));
    toast.error(deviceData.data.data.message, { autoClose: 2000 });
  }
}

function* verification({ payload }) {
  const verifiedData = yield call(verifiedApiCalling, payload);
  try {
    if (verifiedData.data.code !== 200) {
      yield put(showAuthMessage(verifiedData.data.data.message));
      setTimeout(() => {
        history.push('/')
      }, 80000);
    } else {
      localStorage.setItem('device_is_verified', verifiedData.data.data.is_verified)
      yield put(verificationRequestSuccess(verifiedData.data.data));
      toast.success(verifiedData.data.data.message, { autoClose: 2000 });
      if (verifiedData.data.data.is_verified == true) {
        history.push('/dashboard')
      }
      // else {
      //   history.push('/waiting-screen')
      // }
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* profileRead({ payload }) {
  const profileReadData = yield call(profileReadApiCalling, payload);
  try {
    if (profileReadData.response == undefined) {
      if (profileReadData.data.code !== 200) {
        yield put(showAuthMessage(profileReadData.data.data.message));
      }
      else {
        yield put(profileReadRequestSuccess(profileReadData.data.data));
      }
    } else {
      if (profileReadData.response.status === 401) {
        yield call(signOut);
      }
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

function* profileUpdate({ payload }) {
  const profileUpdateData = yield call(profileUpdateApiCalling, payload);
  try {
    if (profileUpdateData.response == undefined) {
      if (profileUpdateData.data.code !== 200) {
        yield put(showAuthMessage(profileUpdateData.data.data.message));
      } else {
        yield put(profileUpdateRequestSuccess(profileUpdateData.data.data));
        toast.success(profileUpdateData.data.data.message, { autoClose: 2000 });
      }
    } else {
      if (profileUpdateData.response.status === 401) {
        yield call(signOut);
      }
    }
  } catch (error) {
    yield put(showAuthMessage(error));
  }
}

export function* signInUser() {
  yield takeEvery(SIGNIN_USER, signin);
}

export function* signOutUser() {
  yield takeEvery(SIGNOUT_USER, signOut);
}

export function* ForgotPasswordCall() {
  yield takeEvery(FORGOT_PASSWORD_REQUEST, forgotPassword);
}

export function* ResetPasswordCall() {
  yield takeEvery(RESET_PASSWORD_REQUEST, resetPassword);
}

export function* ChangePasswordCall() {
  yield takeEvery(CHANGE_PASSWORD_REQUEST, changePassword);
}

export function* FetchSecurityCall() {
  yield takeEvery(GET_ALL_SECURITY_QUESTION, securityQuestion)
}
export function* SaveSecurityCall() {
  yield takeEvery(SAVE_SECURITY_QUESTION_ANSWER, SavesecurityQuestion)
}
export function* DeviceAccessCall() {
  yield takeEvery(DEVICE_REQUEST, deviceAccess);
}

export function* DeviceVerificationCall() {
  yield takeEvery(VERIFICATION_REQUEST, verification);
}

export function* ProfileReadCall() {
  yield takeEvery(PROFILE_READ_REQUEST, profileRead);
}

export function* ProfileUpdateCall() {
  yield takeEvery(PROFILE_UPDATE_REQUEST, profileUpdate);
}

export default function* rootSaga() {
  yield all([fork(signInUser),
  fork(signOutUser),
  fork(ForgotPasswordCall),
  fork(ResetPasswordCall),
  fork(ChangePasswordCall),
  fork(FetchSecurityCall),
  fork(SaveSecurityCall),
  fork(DeviceAccessCall),
  fork(DeviceVerificationCall),
  fork(ProfileReadCall),
  fork(ProfileUpdateCall),
  ]);
}

