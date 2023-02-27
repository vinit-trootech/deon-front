import {
  FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE,
  GET_DATA_SUCCESS, BROKER_GET_DATA, BROKER_GET_DATA_SUCCESS, BROKER_DELETE_DATA, BROKER_ADD_DATA, BROKER_UPDATE_DATA, BROKER_ADD_DATA_SUCCESS, BROKER_UPDATE_DATA_SUCCESS, BROKER_DELETE_DATA_SUCCESS,
  GET_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA,
  SECTOR_GET_DATA, SECTOR_GET_DATA_SUCCESS, SECTOR_DELETE_DATA,
  ADD_DATA_SUCCESS, UPDATE_DATA_SUCCESS, DELETE_DATA_SUCCESS, GET_DATA_ONE, GET_DATA_ONE_SUCCESS
} from "../../constants/ActionTypes";

export const fetchStart = () => {
  return {
    type: FETCH_START
  }
};

export const fetchSuccess = () => {
  return {
    type: FETCH_SUCCESS
  }
};

export const fetchError = (error) => {
  return {
    type: FETCH_ERROR,
    payload: error
  }
};

export const showMessage = (message) => {
  return {
    type: SHOW_MESSAGE,
    payload: message
  }
};

export const hideMessage = () => {
  return {
    type: HIDE_MESSAGE
  }
};

export const getData = (data) => {
  return {
    type: GET_DATA,
    payload: data
  };
};

export const getDataOne = (data) => {
  return {
    type: GET_DATA_ONE,
    payload: data
  };
};

export const getDataOneSuccess = (userdata) => {
  return {
    type: GET_DATA_ONE_SUCCESS,
    dataone: userdata
  }
}

export const getDataSuccess = (userdata) => {
  return {
    type: GET_DATA_SUCCESS,
    data: userdata
  }
}

export const addData = (userData) => {
  return {
    type: ADD_DATA,
    payload: userData
  };
};

export const addDataSuccess = (userData) => {
  return {
    type: ADD_DATA_SUCCESS,
    payload: userData
  };
};

export const updateData = (userData) => {
  return {
    type: UPDATE_DATA,
    payload: userData
  };
};

export const updateDataSuccess = (userData) => {
  return {
    type: UPDATE_DATA_SUCCESS,
    payload: userData
  };
};

export const deleteData = (userData) => {
  return {
    type: DELETE_DATA,
    payload: userData
  }
}

export const deleteDataSuccess = (userData) => {
  return {
    type: DELETE_DATA_SUCCESS,
    payload: userData
  }
}

export const getSectorData = () => {
  return {
    type: SECTOR_GET_DATA
  }
}

export const getSectorDataSuccess = (userData) => {
  return {
    type: SECTOR_GET_DATA_SUCCESS,
    data: userData
  }
}

export const deleteSectorData = (userData) => {
  return {
    type: SECTOR_DELETE_DATA,
    payload: userData
  }
}

export const getBrokerData = () => {
  return {
    type: BROKER_GET_DATA,
  }
}

export const getBrokerDataSuccess = (userData) => {
  return {
    type: BROKER_GET_DATA_SUCCESS,
    payload: userData
  }
}

export const deleteBrokerData = (userData) => {
  return {
    type: BROKER_DELETE_DATA,
    payload: userData
  }
}

export const deleteBrokerDataSuccess = (userData) => {
  return {
    type: BROKER_DELETE_DATA_SUCCESS,
    payload: userData
  }
}

export const addBrokerData = (userData) => {
  return {
    type: BROKER_ADD_DATA,
    payload: userData
  };
};

export const addBrokerDataSuccess = (userData) => {
  return {
    type: BROKER_ADD_DATA_SUCCESS,
    payload: userData
  };
};

export const updateBrokerData = (userData) => {
  return {
    type: BROKER_UPDATE_DATA,
    payload: userData
  };
};

export const updateBrokerDataSuccess = (userData) => {
  return {
    type: BROKER_UPDATE_DATA_SUCCESS,
    payload: userData
  };
};