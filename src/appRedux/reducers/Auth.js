import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER_SUCCESS,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST_SUCCESS,
  CHANGE_PASSWORD_REQUEST_SUCCESS,
  GET_ALL_SECURITY_QUESTION_SUCCESS,
  SAVE_SECURITY_QUESTION_ANSWER_SUCCESS,
  DEVICE_REQUEST_SUCCESS,
  VERIFICATION_REQUEST_SUCCESS,
  PROFILE_READ_REQUEST_SUCCESS,
  PROFILE_UPDATE_REQUEST_SUCCESS,
} from "constants/ActionTypes";

const INIT_STATE = {
  loader: false,
  alertMessage: '',
  showMessage: false,
  initURL: '',
  authUser: '',
  userData: "",
  data: [],
  access_verified: localStorage.getItem('access_verified'),
  device_is_verified: localStorage.getItem('device_is_verified'),
  wholeData: {}
};


export default (state = INIT_STATE, action) => {
  switch (action.type) {

    case SIGNIN_USER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload.authUser.token,
        userData: action.payload
      }
    }
    case GET_ALL_SECURITY_QUESTION_SUCCESS: {
      return {
        ...state,
        data: action.payload
      }
    }
    case SAVE_SECURITY_QUESTION_ANSWER_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload.authUser.token,
        access_verified: action.payload.authUser.device_verified
      }
    }
    case INIT_URL: {
      return {
        ...state,
        initURL: action.payload
      }
    }
    case FORGOT_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case RESET_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case CHANGE_PASSWORD_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case DEVICE_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload
      }
    }
    case VERIFICATION_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload.authUser.token,
        device_is_verified: action.payload.authUser.is_verified
      }
    }
    case PROFILE_READ_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        wholeData: action.payload
      }
    }

    case PROFILE_UPDATE_REQUEST_SUCCESS: {
      return {
        ...state,
        loader: false,
        authUser: action.payload,
        wholeData: action.payload
      }
    }

    case SIGNOUT_USER_SUCCESS: {
      return {
        ...state,
        authUser: null,
        initURL: '/',
        loader: false,
        userData: null
      }
    }

    case SHOW_MESSAGE: {
      return {
        ...state,
        alertMessage: action.payload,
        showMessage: true,
        loader: false
      }
    }
    case HIDE_MESSAGE: {
      return {
        ...state,
        alertMessage: '',
        showMessage: false,
        loader: false
      }
    }
    case ON_SHOW_LOADER: {
      return {
        ...state,
        loader: true
      }
    }
    case ON_HIDE_LOADER: {
      return {
        ...state,
        loader: false
      }
    }
    default:
      return state;
  }
}
