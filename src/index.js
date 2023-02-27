import React from "react";
import ReactDOM from "react-dom";

import NextApp from './NextApp';
import * as serviceWorker from './registerServiceWorker';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';


ReactDOM.render(<NextApp />, document.getElementById('root'));

serviceWorker.unregister();
