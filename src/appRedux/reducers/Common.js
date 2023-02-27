import {
  FETCH_ERROR, FETCH_START, FETCH_SUCCESS, HIDE_MESSAGE, SHOW_MESSAGE,
  GET_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA, GET_DATA_SUCCESS, BROKER_GET_DATA_SUCCESS, BROKER_GET_DATA, BROKER_DELETE_DATA, BROKER_ADD_DATA, BROKER_UPDATE_DATA,
  SECTOR_GET_DATA, SECTOR_GET_DATA_SUCCESS, BROKER_UPDATE_DATA_SUCCESS, TOGGLE_COLLAPSED_NAV, WINDOW_WIDTH,
  ADD_DATA_SUCCESS, UPDATE_DATA_SUCCESS, DELETE_DATA_SUCCESS, BROKER_ADD_DATA_SUCCESS, BROKER_DELETE_DATA_SUCCESS, GET_DATA_ONE_SUCCESS, GET_DATA_ONE
} from 'constants/ActionTypes'

const INIT_STATE = {
  error: "",
  loading: false,
  message: '',
  navCollapsed: true,
  width: window.innerWidth,
  pathname: '/',
  data: [],
  dataone: [],
  brokersuccessGet: false,
  brokersuccessAdd: false,
  brokersuccessUpdate: false,
  brokersuccessDelete: false,
  successGet: false,
  successAdd: false,
  successUpdate: false,
  successDelete: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case '@@router/LOCATION_CHANGE': {
      return {
        ...state,
        pathname: action.payload.location.pathname,
        navCollapsed: false
      }
    }
    case WINDOW_WIDTH:
      return {
        ...state,
        width: action.width,
      };
    case TOGGLE_COLLAPSED_NAV: {
      return {
        ...state,
        navCollapsed: action.navCollapsed
      }
    }
    case FETCH_START: {
      return { ...state, error: '', message: '', loading: true };
    }
    case FETCH_SUCCESS: {
      return { ...state, error: '', message: '', loading: false };
    }
    case SHOW_MESSAGE: {
      return { ...state, error: '', message: action.payload, loading: false };
    }
    case FETCH_ERROR: {
      return { ...state, loading: false, error: action.payload, message: '' };
    }
    case HIDE_MESSAGE: {
      return { ...state, loading: false, error: '', message: '' };
    }
    case GET_DATA: {
      return {
        ...state,
        data: []
      }
    }
    case GET_DATA_SUCCESS: {
      return {
        ...state,
        data: action.data,
        successGet: true,
        successAdd: false,
        successUpdate: false,
        successDelete: false
      }
    }
    case GET_DATA_ONE: {
      return {
        ...state,
        dataone: []
      }
    }
    case GET_DATA_ONE_SUCCESS: {
      return {
        ...state,
        dataone: action.dataone,
        successGet: true,
        successAdd: false,
        successUpdate: false,
        successDelete: false
      }
    }
    case ADD_DATA: {
      return {
        ...state,
      }
    }
    case ADD_DATA_SUCCESS: {
      return {
        ...state,
        successAdd: true,
        successGet: false,
        successUpdate: false,
        successDelete: false
      }
    }
    case UPDATE_DATA: {
      return {
        ...state,
        data: action.data,
      }
    }
    case UPDATE_DATA_SUCCESS: {
      return {
        ...state,
        successUpdate: true,
        successGet: false,
        successAdd: false,
        successDelete: false
      }
    }
    case DELETE_DATA: {
      return {
        ...state,
      }
    }
    case DELETE_DATA_SUCCESS: {
      return {
        ...state,
        successDelete: true,
        successGet: false,
        successAdd: false,
        successUpdate: false,
      }
    }
    case SECTOR_GET_DATA: {
      return {
        ...state,
      }
    }
    case SECTOR_GET_DATA_SUCCESS: {
      return {
        ...state,
        data: action.data,
      }
    }
    // case SECTOR_DELETE_DATA: {
    //   return {
    //     ...state,
    //   }
    // }
    case BROKER_GET_DATA: {
      return {
        ...state,
      }
    }
    case BROKER_GET_DATA_SUCCESS: {
      return {
        ...state,
        data: action.data,
        brokersuccessGet: true
      }
    }
    case BROKER_DELETE_DATA: {
      return {
        ...state
      }
    }
    case BROKER_DELETE_DATA_SUCCESS: {
      return {
        ...state,
        brokersuccessDelete: true
      }
    }
    case BROKER_ADD_DATA: {
      return {
        ...state,
      }
    }
    case BROKER_ADD_DATA_SUCCESS: {
      return {
        ...state,
        brokersuccessAdd: true,
      }
    }

    case BROKER_UPDATE_DATA: {
      return {
        ...state,
      }
    }
    case BROKER_UPDATE_DATA_SUCCESS: {
      return {
        ...state,
        brokersuccessUpdate: true,
      }
    }
    default:
      return state;
  }
}
