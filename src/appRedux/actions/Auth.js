import {
  HIDE_MESSAGE,
  INIT_URL,
  ON_HIDE_LOADER,
  ON_SHOW_LOADER,
  SHOW_MESSAGE,
  SIGNIN_FACEBOOK_USER,
  SIGNIN_FACEBOOK_USER_SUCCESS,
  SIGNIN_GITHUB_USER,
  SIGNIN_GITHUB_USER_SUCCESS,
  SIGNIN_GOOGLE_USER,
  SIGNIN_GOOGLE_USER_SUCCESS,
  SIGNIN_TWITTER_USER,
  SIGNIN_TWITTER_USER_SUCCESS,
  SIGNIN_USER,
  SIGNIN_USER_SUCCESS,
  SIGNOUT_USER,
  SIGNOUT_USER_SUCCESS,
  SIGNUP_USER,
  SIGNUP_USER_SUCCESS,
  FORGOT_PASSWORD_REQUEST_SUCCESS,
  FORGOT_PASSWORD_REQUEST,
  RESET_PASSWORD_REQUEST_SUCCESS,
  RESET_PASSWORD_REQUEST,
  CHANGE_PASSWORD_REQUEST,
  CHANGE_PASSWORD_REQUEST_SUCCESS,
  GET_ALL_SECURITY_QUESTION,
  GET_ALL_SECURITY_QUESTION_SUCCESS,
  SAVE_SECURITY_QUESTION_ANSWER,
  SAVE_SECURITY_QUESTION_ANSWER_SUCCESS,
  DEVICE_REQUEST,
  DEVICE_REQUEST_SUCCESS,
  VERIFICATION_REQUEST,
  VERIFICATION_REQUEST_SUCCESS,
  PROFILE_READ_REQUEST,
  PROFILE_READ_REQUEST_SUCCESS,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_REQUEST_SUCCESS,
  GET_TRADERS_REQUEST,
  GET_TRADERS_REQUEST_SUCCESS
} from "constants/ActionTypes";


export const userSignUp = (user) => {
  return {
    type: SIGNUP_USER,
    payload: user
  };
};
export const userSignIn = (user) => {
  return {
    type: SIGNIN_USER,
    payload: user
  };
};
export const userSignOut = () => {
  return {
    type: SIGNOUT_USER
  };
};
export const userSignUpSuccess = (authUser) => {
  return {
    type: SIGNUP_USER_SUCCESS,
    payload: authUser
  };
};

export const userSignInSuccess = (authUser, verified) => {
  return {
    type: SIGNIN_USER_SUCCESS,
    payload: { authUser, verified }
  }
};
export const userSignOutSuccess = () => {
  return {
    type: SIGNOUT_USER_SUCCESS,
  }
};

export const showAuthMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  };
};


export const userGoogleSignIn = () => {
  return {
    type: SIGNIN_GOOGLE_USER
  };
};
export const userGoogleSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GOOGLE_USER_SUCCESS,
    payload: authUser
  };
};
export const userFacebookSignIn = () => {
  return {
    type: SIGNIN_FACEBOOK_USER
  };
};
export const userFacebookSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_FACEBOOK_USER_SUCCESS,
    payload: authUser
  };
};
export const setInitUrl = (url) => {
  return {
    type: INIT_URL,
    payload: url
  };
};
export const userTwitterSignIn = () => {
  return {
    type: SIGNIN_TWITTER_USER
  };
};
export const userTwitterSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_TWITTER_USER_SUCCESS,
    payload: authUser
  };
};
export const userGithubSignIn = () => {
  return {
    type: SIGNIN_GITHUB_USER
  };
};
export const userGithubSignInSuccess = (authUser) => {
  return {
    type: SIGNIN_GITHUB_USER_SUCCESS,
    payload: authUser
  };
};
export const showAuthLoader = () => {
  return {
    type: ON_SHOW_LOADER,
  };
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE,
  };
};
export const hideAuthLoader = () => {
  return {
    type: ON_HIDE_LOADER,
  };
};


export const forgotPasswordRequest = (user) => {
  return {
    type: FORGOT_PASSWORD_REQUEST,
    payload: user
  }
}

export const forgotPasswordSuccess = (authUser) => {
  return {
    type: FORGOT_PASSWORD_REQUEST_SUCCESS,
    payload: authUser
  };
};

export const resetPasswordRequest = (user) => {
  return {
    type: RESET_PASSWORD_REQUEST,
    payload: user
  }
}

export const resetPasswordSuccess = (authUser) => {
  return {
    type: RESET_PASSWORD_REQUEST_SUCCESS,
    payload: authUser
  };
};

export const changePasswordRequest = (user) => {
  return {
    type: CHANGE_PASSWORD_REQUEST,
    payload: user
  }
}

export const changePasswordSuccess = (authUser) => {
  return {
    type: CHANGE_PASSWORD_REQUEST_SUCCESS,
    payload: authUser
  }
}

export const getAllSecurity = () => {
  return {
    type: GET_ALL_SECURITY_QUESTION,
  };
};

export const getAllSecuritySuccess = (res) => {
  return {
    type: GET_ALL_SECURITY_QUESTION_SUCCESS,
    payload: res
  }
};

export const saveSecurityQuestion = (value) => {
  return {
    type: SAVE_SECURITY_QUESTION_ANSWER,
    payload: value
  }
};

export const saveSecurityQuestionSuccess = (value) => {
  return {
    type: SAVE_SECURITY_QUESTION_ANSWER_SUCCESS,
    payload: value
  }
};
export const deviceRequest = (user) => {
  return {
    type: DEVICE_REQUEST,
    payload: user
  }
}

export const deviceRequestSuccess = (authUser) => {
  return {
    type: DEVICE_REQUEST_SUCCESS,
    payload: authUser
  }
}

export const verificationRequest = (user) => {
  return {
    type: VERIFICATION_REQUEST,
    payload: user
  }
}

export const verificationRequestSuccess = (authUser) => {
  return {
    type: VERIFICATION_REQUEST_SUCCESS,
    payload: authUser
  }
}

export const profileReadRequest = (user) => {
  return {
    type: PROFILE_READ_REQUEST,
    payload: user
  }
}

export const profileReadRequestSuccess = (authUser) => {
  return {
    type: PROFILE_READ_REQUEST_SUCCESS,
    payload: authUser
  }
}

export const profileUpdateRequest = (user) => {
  return {
    type: PROFILE_UPDATE_REQUEST,
    payload: user
  }
}

export const profileUpdateRequestSuccess = (authUser) => {
  return {
    type: PROFILE_UPDATE_REQUEST_SUCCESS,
    payload: authUser
  }
}
