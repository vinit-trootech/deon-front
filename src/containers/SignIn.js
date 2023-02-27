import React, { useEffect, useState } from "react";
import { Button, Checkbox, Input, message, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import CustomizerSystem from './Customizer'
import {
  hideMessage,
  showAuthLoader,
  userSignIn
} from "appRedux/actions/Auth";
import '../styles/signin.css'
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";
import LoginImg from "../assets/images/LoginImg.png";
import brandLogo from '../assets/images/logo.png'
const ipInfo = require("ipinfo")
const SignIn = () => {

  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser, userData } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const [checked, setchecked] = useState(false)
  const [inputVal, setInputVal] = useState({
    email: '',
    password: '',
  })
  const isValid = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    var validEmail = pattern.test(inputVal.email)
    if (inputVal && validEmail && inputVal.password) {
      return true
    }
    return false
  }

  useEffect(() => {
    ipInfo('', 'fa089e5c123b35', (err, cLoc) => {
      localStorage.setItem('ip', cLoc.ip);
      localStorage.setItem('city', cLoc.city);
      localStorage.setItem('state', cLoc.region);
    })
    if (showMessage) {
      setTimeout(() => {
        dispatch(hideMessage());
      }, 100);
    }
    // if (authUser) {
    //   history.push('/');
    // }
  }, []);

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const onFinish = values => {
    const valuestemp = {
      username: values.username,
      password: values.password,
      remember: checked
    }
    dispatch(showAuthLoader());
    dispatch(userSignIn(valuestemp));
  };
  const onChange = (e) => {
    setchecked(e.target.checked)
  };
  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">
              <img src={LoginImg} alt='Neature' />
            </div>
            <div className="gx-app-logo-wid">
              {/* <h1><IntlMessages id="app.userAuth.signIn" /></h1> */}
              <img alt="example" src={brandLogo} />
            </div>
            <div className="gx-app-logo">
              <h2 className="login-subtitle">Vulnerable Leadership: The Power of Opening Up</h2>
              <p className="login-subtitle2">In the eighteenth century the German philosopher Immanuel Kant developed a theory of knowledge in which knowledge </p>
            </div>
          </div>
          <div className="gx-app-login-content">
            <Form
              // initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">
              <h1>Welcome</h1>
              <h4>Login to you account to continue</h4>

              <Form.Item
                rules={[{ required: true, message: 'Please enter your E-mail!' }, {
                  pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                  message: 'Please Enter valid E-mail!',
                },
                () => ({
                  validator(_, value) {
                    if (!value) {
                      return Promise.reject();
                    }
                    if (value.length > 35) {
                      return Promise.reject("Email should be less then 35 characters.");
                    }
                    return Promise.resolve();
                  },
                }),
                ]} name="username">
                <Input
                  value={inputVal.email}
                  className="gx-input-lineheight"
                  onChange={e => setInputVal({ ...inputVal, email: e.target.value })}
                  placeholder="Email Address*" />
              </Form.Item>

              <Form.Item
                rules={[{ required: true, message: 'Please enter your Password!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: 'Password must be 8 characters long, it includes one uppercase letter, one lowercase letter, one number and one special character.',
                },
                ]} name="password">
                <Input
                  value={inputVal.password}
                  className=" gx-input-lineheight"
                  onChange={e => setInputVal({ ...inputVal, password: e.target.value })}
                  type="password" placeholder="Password*" />
              </Form.Item>

              <div className="forgotpassword-line">
                <Form.Item
                  name="remember"
                  valuePropName="unchecked"
                  onChange={onChange}
                >
                  <Checkbox >Remember me</Checkbox>
                </Form.Item>
                <Link className="text-black" to='/forgot-password'>Forgot Password?</Link>
              </div>
              <Form.Item>
                <Button className='gx-button h-52' disabled={!isValid()} type="primary" htmlType="submit">
                  <IntlMessages id="app.userAuth.logIn" />
                </Button>
              </Form.Item>
            </Form>
          </div>

          {/* <CustomizerSystem /> */}
          {loader ?
            <div className="gx-loader-view">
              <CircularProgress />
            </div> : null}
          {/* {showMessage ?
            message.error(alertMessage.toString()) : null} */}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
