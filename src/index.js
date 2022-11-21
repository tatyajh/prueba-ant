import React from "react";
import RouterPath from './paths/RouterPath';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client"
import * as serviceWorker from './services/ServiceWorker.jsx';
import 'react-app-polyfill/stable';

const root = createRoot(document.getElementById("root"));
root.render(<RouterPath />);

serviceWorker.unregister();
