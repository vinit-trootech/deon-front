import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import IntlMessages from "util/IntlMessages";
import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  hideMessage,
  showAuthLoader,
  resetPasswordRequest
} from "../../../../../appRedux/actions/Auth.js";
import CustomizerSystem from '../../../../Customizer';
import CircularProgress from '../../../../../components/CircularProgress';

const FormItem = Form.Item;


const ResetPassword = () => {

  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const [inputVal, setInputVal] = useState({
    password: '',
    confirm: ''
  })

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    // if (authUser !== null) {
    //   history.push('/');
    // }
  });

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    dispatch(showAuthLoader());
    dispatch(resetPasswordRequest({ values, params }));
  };

  const isValid = () => {
    if (inputVal && inputVal.password && inputVal.confirm && inputVal.password === inputVal.confirm) {
      return true
    }
    return false
  }

  const { id, token } = useParams();
  const params = { id: id, token: token }

  return (
    <div className="gx-login-container">
      <div className="gx-login-content">

        {/* <div className="gx-login-header">
          <img src="/assets/images/logo-white.png" alt="wieldy" title="wieldy" />
        </div> */}
        <div className="gx-mb-4">
          <h2>Reset Password</h2>
          <p><IntlMessages id="appModule.enterPasswordReset" /></p>
        </div>

        <Form
          initialValues={{ remember: true }}
          name="basic"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="gx-signin-form gx-form-row0">

          <FormItem rules={[{ required: true, message: 'Please enter your Password!' },
          {
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            message: 'Password must be 8 characters long, it includes one uppercase letter, one lowercase letter, one number and one special character.',
          },
          ]} name="password">
            <Input
              value={inputVal.password}
              onChange={e => setInputVal({ ...inputVal, password: e.target.value })}
              className='gx-input-lineheight' type="password" placeholder="Password" />
          </FormItem>

          <FormItem dependencies={['password']} rules={[{ required: true, message: 'Please confirm your password!' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),]} name="confirm">
            <Input
              value={inputVal.confirm}
              onChange={e => setInputVal({ ...inputVal, confirm: e.target.value })}
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
        {/* {showMessage ?
          message.error(alertMessage.toString()) : null} */}
      </div>
    </div>
  );
};

export default ResetPassword;
