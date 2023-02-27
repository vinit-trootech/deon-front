import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    deviceRequest,
    hideMessage,
    showAuthLoader,

} from "../../../../../appRedux/actions/Auth.js";
import { Spin } from 'antd';


function LoginRequest() {
    const dispatch = useDispatch();
    const { loader, alertMessage, showMessage, authUser } = useSelector(({ auth }) => auth);
    const history = useHistory();

    const { status } = useParams();

    useEffect(() => {
        dispatch(deviceRequest(status))
    }, [])

    return (
        <div><Spin /></div>
    )
}

export default LoginRequest;