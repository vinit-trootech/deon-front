import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LoadingOutlined } from '@ant-design/icons';
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    verificationRequest,
    hideMessage,
    showAuthLoader,

} from "../../../../../appRedux/actions/Auth.js";

const WaitingScreen = () => {
    const dispatch = useDispatch();
    const { loader, alertMessage, showMessage, authUser } = useSelector(({ auth }) => auth);
    const history = useHistory();
    const verified_data = localStorage.getItem('device_verified')

    useEffect(() => {
        function getAlerts() {
            dispatch(showAuthLoader());
            dispatch(verificationRequest());
        }
        getAlerts()
        const interval = setInterval(() => getAlerts(), 10000)
        return () => {
            clearInterval(interval);
        }
    }, [verified_data])

    return !verified_data ? ( //!isLoading
        <div className="container">
            <h1>Please Wait... <LoadingOutlined /></h1>
        </div>
    ) : ('')
}

export default WaitingScreen;