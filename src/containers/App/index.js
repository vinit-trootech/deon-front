import React, { lazy, memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import URLSearchParams from 'url-search-params'
import { Redirect, Route, Switch, useHistory, useLocation, useRouteMatch, useParams } from "react-router-dom";
import { ConfigProvider } from 'antd';
import { IntlProvider } from "react-intl";

import AppLocale from "lngProvider";
import MainApp from "./MainApp";
import SignIn from "../SignIn";
import { setInitUrl } from "appRedux/actions/Auth";
import { onLayoutTypeChange, onNavStyleChange, setThemeType } from "appRedux/actions/Setting";

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  THEME_TYPE_DARK,
} from "../../constants/ThemeSetting";
import SecurityQuestions from "./Pages/SecurityQuestions";
import ResetPassword from "./Pages/userAuth/ResetPassword";
import ForgotPasswordPage from "./Pages/userAuth/ForgotPassword";
import LoginRequest from "./Pages/userAuth/LoginRequest";
import SecurityQuestion from "./Pages/SecurityQuestions";
import MainApptemp from '../../containers/App/MainApp'

import WaitingScreen from "./Pages/userAuth/WaitingScreen/WaitingScreen";


// const PrivateRoute = ({ component: Component, location, authUser, ...rest }) => 
//   <Route
//     {...rest}
//     render={props =>
//       <Component {...props} />}
//   /> ;
const PrivateRoute = ({ component: Component, location, authUser, ...rest }) =>
  <Route
    {...rest}
    render={props =>
      authUser
        ? <Component {...props} />
        : <Redirect
          to={{
            pathname: '/',
            state: { from: location }
          }}
        />}
  />;
const App = (props) => {

  const dispatch = useDispatch();
  const { locale, navStyle, layoutType, themeType } = useSelector(({ settings }) => settings);
  const { authUser, initURL, userData } = useSelector(({ auth }) => auth);
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();


  useEffect(() => {
    if (initURL === '') {
      dispatch(setInitUrl(location.pathname));
    }
    const params = new URLSearchParams(location.search);

    if (params.has("theme")) {
      dispatch(setThemeType(params.get('theme')));
    }
    if (params.has("nav-style")) {
      dispatch(onNavStyleChange(params.get('nav-style')));
    }
    if (params.has("layout-type")) {
      dispatch(onLayoutTypeChange(params.get('layout-type')));
    }
    setLayoutType(layoutType);
    setNavStyle(navStyle);
  }, [authUser, userData]);


  const setLayoutType = (layoutType) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };


  useEffect(() => {
    if (themeType === THEME_TYPE_DARK) {
      document.body.classList.add('dark-theme');
      document.body.classList.add('dark-theme');
      let link = document.createElement('link');
      link.type = 'text/css';
      link.rel = 'stylesheet';
      link.href = "/css/dark_theme.css";
      link.className = 'style_dark_theme';
      document.body.appendChild(link);
    }
  }, []);

  const setNavStyle = (navStyle) => {
    if (navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  const currentAppLocale = AppLocale[locale.locale];

  return (
    <ConfigProvider locale={currentAppLocale.antd}>
      <IntlProvider
        locale={currentAppLocale.locale}
        messages={currentAppLocale.messages}>
        <Switch>
          <Route exact path='/' component={SignIn} />
          <Route exact path='/securityquestion' component={SecurityQuestions} />
          <Route exact path='/' component={MainApptemp} />
          <Route exact path='/forgot-password' component={ForgotPasswordPage} />
          <Route exact path={`/reset-password/:id/:token`} component={ResetPassword} />
          <Route exact path={`/security-Question`} component={SecurityQuestion} />
          <Route exact path={`/check-access/:status`} component={LoginRequest} />
          <Route exact path='/waiting-screen' component={WaitingScreen} />
          <PrivateRoute path={`${match.url}`} authUser={authUser} location={location}
            component={MainApp} />

        </Switch>
      </IntlProvider>
    </ConfigProvider>
  )
};

export default memo(App);
