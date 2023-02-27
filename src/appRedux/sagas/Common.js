import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { GET_DATA, ADD_DATA, UPDATE_DATA, DELETE_DATA, GET_DATA_ONE } from '../../constants/ActionTypes';
import { getDataSuccess, getDataOneSuccess, addDataSuccess, updateDataSuccess, deleteDataSuccess } from '../actions/Common'
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
    postHelper,
    getHelper,
    putHelper,
    deleteHelper,
} from "../../util/CommonHelpers";
import { signOutUser } from './Auth';
toast.configure()

function* fetchdata(payload) {
    try {
        const data = yield call(getHelper, payload);
        if(data.response == undefined)
          {
                if (data.data.code == 200) {
                    yield put(getDataSuccess(data.data.data.results))
                } else {
                    toast.error(data.data.data.message, { autoClose: 2000 });
                }
          }
          else
           {
                    if (data.response.status === 401) {
                      yield call(signOutUser);
                      }
           }
    }
    catch (error) {
         console.log(error);
    }
}

function* fetchdataOne(payload) {
    try {
        const data = yield call(getHelper, payload);
        if(data.response == undefined)
          {
            if (data.data.code == 200) {
                yield put(getDataOneSuccess(data.data.data.results))
            } else {
                toast.error(data.data.data.message, { autoClose: 2000 });
            }
          }
          else
          {  
                if (data.response.status == 401) 
                {
                 yield call(signOutUser);
                } 
           }      
    }
    catch (error) {
         console.log(error);
    }
}

function* savedata(payload) {
    const data = yield call(postHelper, payload)
    try {
        if(data.response == undefined)
          {
            if (data.data.code == 200) {
                toast.success(data.data.data.message, { autoClose: 2000 });
                yield put(addDataSuccess())
            } else {
                toast.error(data.data.data.username[0], { autoClose: 2000 });
            }
          }
          else
          {
            if (data.response.status === 401) {
                yield call(signOutUser);
            } 
          }
    }
    catch (error) {
        console.log(error);
    }
}

function* updatedata(payload) {
    try {
        const data = yield call(putHelper, payload)
         if(data.response == undefined)
            {
                if (data.data.code == 200) {
                    toast.success(data.data.data.message, { autoClose: 2000 });
                    yield put(updateDataSuccess())
                } else {
                    toast.error(data.data.data.message, { autoClose: 2000 });
                }
            }
          else
            {
                if (data.response.status === 401) {
                    yield call(signOutUser);
                }
            }  
    }
    catch (error) {
         console.log(error);
    }
}

function* deldata(payload) {
    try {
        const data = yield call(deleteHelper, payload)
        if(data.response == undefined)
           {
                if (data.data.code == 200) {
                    toast.success(data.data.data.message, { autoClose: 2000 });
                    yield put(deleteDataSuccess())
                } else {
                    toast.error(data.data.data.message, { autoClose: 2000 });
                }
           }
           else
           {
                if (data.response.status === 401) {
                    yield call(signOutUser);
                }
           }
    }
    catch (error) {
        console.log(error);
    }
}

export function* getData() {
    yield takeEvery(GET_DATA, fetchdata)
}

export function* getDataOne() {
    yield takeEvery(GET_DATA_ONE, fetchdataOne)
}

export function* addData() {
    yield takeEvery(ADD_DATA, savedata)
}

export function* updateData() {
    yield takeEvery(UPDATE_DATA, updatedata)
}

export function* deleteData() {
    yield takeEvery(DELETE_DATA, deldata)
}

export default function* rootSaga() {
    yield all([
        fork(getData),
        fork(addData),
        fork(updateData),
        fork(deleteData),
        fork(getDataOne)
    ]);
};