import React from "react";
import * as ReactDOM from 'react-dom';
import RouterPath from './paths/RouterPath';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './services/ServiceWorker.jsx';
import 'react-app-polyfill/stable';

const root = document.getElementById("root");
ReactDOM.render(<RouterPath />, root);

serviceWorker.unregister();
