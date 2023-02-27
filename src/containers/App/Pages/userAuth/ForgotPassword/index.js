import React, { useEffect, useState } from "react";
import { Button, Form, Input, message } from "antd";
import IntlMessages from "util/IntlMessages";
import { Link, useHistory } from "react-router-dom";
import LoginImg from "../../../../../assets/images/LoginImg.png";
import {
  hideMessage,
  showAuthLoader,
  forgotPasswordRequest
} from "appRedux/actions/Auth";
import '../../../../../styles/signin.css'
import { useDispatch, useSelector } from "react-redux";
import CustomizerSystem from '../../../../Customizer';
import CircularProgress from '../../../../../components/CircularProgress';
import brandLogo from '../../../../../assets/images/logo.png'
const FormItem = Form.Item;

const ForgotPassword = () => {

  const dispatch = useDispatch();
  const { loader, alertMessage, showMessage, authUser } = useSelector(({ auth }) => auth);
  const history = useHistory();
  const [isDisabled, setDisibility] = useState(true);

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
    dispatch(forgotPasswordRequest(values));
  };

  const isValidEmail = (e) => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    setDisibility(!pattern.test(e.target.value));
  }

  return (
    <div className="gx-app-login-wrap">
      <div className="gx-app-login-container">
        <div className="gx-app-login-main-content">
          <div className="gx-app-logo-content">
            <div className="gx-app-logo-content-bg">

              <img src={LoginImg} alt='Neature' />
            </div>
            <div className="gx-app-logo-wid">
              <img alt="example" src={brandLogo} />
            </div>
            <div className="gx-app-logo">
              <h2 className="login-subtitle">Vulnerable Leadership: The Power of Opening Up</h2>
              <p className="login-subtitle2">In the eighteenth century the German philosopher Immanuel Kant developed a theory of knowledge in which knowledge </p>
            </div>
          </div>
          <div className="gx-app-login-content">
            <div>
              <h3 className="forgot-password-text">Forgot Password?</h3>
            </div>
            <div>
              <p className=".forgot-password-subText">Please enter your registered email address to receive password reset instructions.</p>
            </div>
            <Form
              initialValues={{ remember: true }}
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className="gx-signin-form gx-form-row0">
              <FormItem name="email" rules={[{ required: true, message: 'Please enter your Email!' }, {
                pattern: /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
                message: 'Please Enter valid Email!',
              },]}>
                <Input
                  onChange={isValidEmail}
                  className='gx-input-lineheight' type="email" placeholder="Email Address*" />
              </FormItem>

              <FormItem>
                <Button className='gx-button h-52' disabled={isDisabled} type="primary" htmlType="submit">
                  <IntlMessages id="app.userAuth.continue" />
                </Button>
              </FormItem>
            </Form>
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <Link className="text-black" to="/">Back to login</Link>
            </div>
          </div>

          {/* <CustomizerSystem /> */}
          {loader ?
            <div className="gx-loader-view">
              <CircularProgress />
            </div> : null}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword
