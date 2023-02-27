import React from "react";
import { Route, Switch } from "react-router-dom";

import asyncComponent from "util/asyncComponent";
import BrokerRoutes from "./BrokerRoutes";
import routes from "./routes";
import TraderRoutes from "./TraderRoutes";
import FingerprintJS from '@fingerprintjs/fingerprintjs';
import axios from 'axios';
let selectedRoute = [];
let role = 'Admin';

if (role === 'Admin') {
  selectedRoute = routes
} else if (role === 'Trader') {
  selectedRoute = TraderRoutes
} else if (role === 'Broker') {
  selectedRoute = BrokerRoutes
}

const getDeviceInfo = async () => {
  const fp = await fpPromise
  const result = await fp.get()
  localStorage.setItem('deviceId', result.visitorId)
}
const fpPromise = FingerprintJS.load();
getDeviceInfo()


const App = ({ match }) => (
  <div className="gx-main-content-wrapper">
    <Switch>
      {/* <Route path={`${match.url}dashboard`} component={asyncComponent(() => import('../containers/App/Admin/Dashboard'))} /> */}
      {/* <Route path={`${match.url}admin/home`} component={() => <p>hello home</p>} /> */}
      {selectedRoute && selectedRoute.map(({ component: Component, path, exact }) => (
        <Route
          path={`${match.url}${path}`}
          component={Component}
          key={path}
        />
      ))}

    </Switch>
  </div>
);

export default App;
