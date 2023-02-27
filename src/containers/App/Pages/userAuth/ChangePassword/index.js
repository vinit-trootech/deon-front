import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import IntlMessages from "util/IntlMessages";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CustomizerSystem from '../../../../Customizer';
import CircularProgress from '../../../../../components/CircularProgress';
import {
    hideMessage,
    showAuthLoader,
    changePasswordRequest
} from "appRedux/actions/Auth";

const FormItem = Form.Item;


function ChangePassword() {

    const dispatch = useDispatch();
    const { loader, alertMessage, showMessage, authUser } = useSelector(({ auth }) => auth);
    const history = useHistory();
    const [inputVal, setInputVal] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    })

    useEffect(() => {
        if (showMessage) {
            setTimeout(() => {
                dispatch(hideMessage());
            }, 100);
        }

        if (!authUser) {
            history.push('/');
        }
    }, []);

    const { id } = useParams();

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const onFinish = values => {
        dispatch(showAuthLoader());
        dispatch(changePasswordRequest({ values, id }));
    };

    const isValid = () => {
        if (inputVal && inputVal.oldPassword && inputVal.newPassword && inputVal.confirmPassword && inputVal.newPassword === inputVal.confirmPassword) {
            return true
        }
        return false
    }


    return (
        <div className="gx-login-container">
            <div className="gx-login-content">

                {/* <div className="gx-login-header">
                    <img src="/assets/images/logo-white.png" alt="wieldy" title="wieldy" />
                </div> */}
                <div className="gx-mb-4">
                    <h2>Change Password</h2>
                </div>

                <Form
                    initialValues={{ remember: true }}
                    name="basic"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    className="gx-signin-form gx-form-row0">

                    <FormItem rules={[{ required: true, message: 'Please enter your old Password!' },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must be 8 characters long, it includes one uppercase letter, one lowercase letter, one number and one special character.',
                    },
                    ]} name="old_password">
                        <Input
                            value={inputVal.oldPassword}
                            onChange={e => setInputVal({ ...inputVal, oldPassword: e.target.value })}
                            className='gx-input-lineheight' type="password" placeholder="Old Password" />
                    </FormItem>

                    <FormItem rules={[{ required: true, message: 'Please enter your New Password!' },
                    {
                        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message: 'Password must be 8 characters long, it includes one uppercase letter, one lowercase letter, one number and one special character.',
                    },]} name="new_password">
                        <Input
                            value={inputVal.newPassword}
                            onChange={e => setInputVal({ ...inputVal, newPassword: e.target.value })}
                            className='gx-input-lineheight' type="password" placeholder="New Password" />
                    </FormItem>

                    <FormItem dependencies={['new_password']} rules={[{ required: true, message: 'Please confirm your password!' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('new_password') === value) {
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                        },
                    }),]} name="confirm_password">
                        <Input
                            value={inputVal.confirmPassword}
                            onChange={e => setInputVal({ ...inputVal, confirmPassword: e.target.value })}
                            className='gx-input-lineheight' placeholder="Retype New Password" type="password" />
                    </FormItem>

                    <FormItem>
                        <Button disabled={!isValid()} type="primary" htmlType="submit" >
                            <IntlMessages id="app.userAuth.reset" />
                        </Button>
                    </FormItem>
                </Form>

                {/* <CustomizerSystem /> */}
                {loader ?
                    <div className="gx-loader-view">
                        <CircularProgress />
                    </div> : null}
                {showMessage ?
                    message.error(alertMessage.toString()) : null}
            </div>
        </div>
    );
};

export default ChangePassword;
