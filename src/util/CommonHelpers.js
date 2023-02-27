import axios from 'axios';
import BASE_URL from './url';

const baseUrl = BASE_URL;

const postHelper = (payload) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
        device_id: localStorage.getItem('deviceId'),
        user_id: payload.payload.user_id
    }
    let url = baseUrl + payload.payload.path1
    return axios.post(url, payload.payload.formData, { headers: headers })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
}

const getHelper = (payload) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
        device_id: localStorage.getItem('deviceId'),
        user_id: payload.payload.user_id
    }
    let path = payload.payload.path1
    let url = baseUrl + path
    return axios.get(url, { headers: headers })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
}

const putHelper = (payload) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
        device_id: localStorage.getItem('deviceId'),
        user_id: payload.payload.user_id
    }
    let url = baseUrl + payload.payload.path1
    return axios.post(url, payload.payload.formData, { headers: headers })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
}

const putPhotoHelper = (path1, payload, req) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
        device_id: localStorage.getItem('deviceId'),
        user_id: payload.payload.user_id
    }
    let url = baseUrl + path1
    let token = localStorage.getItem('token');
    const fileconfig = {
        headers: {
            Authorization: "Bearer ${token}",
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(url, req, fileconfig)
        .then(response => {
            if (response.status === false)
                throw response
            return response
        })
        .catch(error => {
            console.log(error)
            return error
        })
}

const deleteHelper = (payload) => {
    const headers = {
        Authorization: "Bearer " + localStorage.getItem("token"),
        device_id: localStorage.getItem('deviceId'),
        user_id: payload.payload.user_id
    }
    let url = baseUrl + payload.payload.path1
    return axios.delete(url, { headers: headers })
        .then(response => {
            return response
        })
        .catch(error => {
            return error
        })
}

export { postHelper, getHelper, putHelper, putPhotoHelper, deleteHelper }

